import { ParsedField } from '../../../../component/sgComponent/autoform/core/types';

// Types TypeScript
interface FieldConfig {
  label?: string;
  fieldType?: string;
  inputProps?: Record<string, any>;
  customData?: Record<string, any>;
  description?: string;
}

interface FormError {
  path: (string | number)[];
  message: string;
  field: ParsedField;
}

interface ErrorMessageOptions {
  maxErrors?: number;
  title?: string;
  showBullets?: boolean;
}

export const generateFormErrorMessage = (errors: FormError[], options: ErrorMessageOptions = {}): string => {
  const { maxErrors = 3, title = 'Veuillez corriger les erreurs suivantes :', showBullets = true } = options;

  if (!errors || errors.length === 0) {
    return 'Une erreur est survenue lors de la validation du formulaire.';
  }

  const getFieldLabel = (field: ParsedField): string => {
    return (field?.fieldConfig?.label || field?.key || 'Champ inconnu') as string;
  };

  const groupErrorsByParentField = (errors: FormError[]): Record<string, FormError[]> => {
    return errors.reduce(
      (groups, error) => {
        const parentField = error.path.length > 1 ? error.path[0] : error.field.key;

        if (!groups[parentField]) {
          groups[parentField] = [];
        }
        groups[parentField].push(error);

        return groups;
      },
      {} as Record<string, FormError[]>,
    );
  };

  const formatErrorGroup = (parentField: string, errorGroup: FormError[]): string => {
    const fieldLabels: Record<string, string> = {
      phone: 'Téléphone',
      status: 'Statut',
      address: 'Adresse',
    };

    const parentLabel = fieldLabels[parentField] || errorGroup[0]?.field?.fieldConfig?.label || parentField;

    if (errorGroup.length === 1) {
      const error = errorGroup[0];
      if (error.path.length === 1) {
        const label = getFieldLabel(error.field);
        return `${label} : ${error.message}`;
      }
      return `${parentLabel} : ${error.message}`;
    }

    const priorityMessages: Record<string, number> = {
      'invalide': 1,
      'incorrect': 1,
      'requis': 2,
      'obligatoire': 2,
    };

    const sortedErrors = errorGroup.sort((a, b) => {
      const aPriority = Object.keys(priorityMessages).find((key) => a.message.toLowerCase().includes(key))
        ? priorityMessages[Object.keys(priorityMessages).find((key) => a.message.toLowerCase().includes(key))!]
        : 3;

      const bPriority = Object.keys(priorityMessages).find((key) => b.message.toLowerCase().includes(key))
        ? priorityMessages[Object.keys(priorityMessages).find((key) => b.message.toLowerCase().includes(key))!]
        : 3;

      return aPriority - bPriority;
    });

    const mainError = sortedErrors[0];
    return `${parentLabel} : ${mainError.message}`;
  };

  const errorGroups = groupErrorsByParentField(errors);

  const errorMessages: string[] = Object.entries(errorGroups).map(([parentField, errorGroup]) => formatErrorGroup(parentField, errorGroup));

  const displayedErrors: string[] = errorMessages.slice(0, maxErrors);
  const remainingCount: number = errorMessages.length - maxErrors;

  let finalMessage: string = title;
  if (title && !title.endsWith('\n')) {
    finalMessage += '\n';
  }

  const bullet: string = showBullets ? '• ' : '';
  finalMessage += displayedErrors.map((msg) => `${bullet}${msg}`).join('\n');

  if (remainingCount > 0) {
    finalMessage += `\n... et ${remainingCount} autre${remainingCount > 1 ? 's' : ''} erreur${remainingCount > 1 ? 's' : ''}`;
  }

  return finalMessage;
};
