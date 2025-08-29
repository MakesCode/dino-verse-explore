import React from 'react';
import { AutoFormField } from './AutoFormField';
import { useAutoForm } from './context';
import { ParsedField } from '../core/types';
import { getLabel } from '../core/label';

export const ObjectField: React.FC<{
  field: ParsedField;
  path: string[];
}> = ({ field, path }) => {
  const { uiComponents } = useAutoForm();

  return (
    <uiComponents.ObjectWrapper label={getLabel(field)} field={field}>
      {Object.entries(field.schema!).map(([_key, subField]) => (
        <AutoFormField key={`${path.join('.')}.${subField.key}`} field={subField} path={[...path, subField.key]} />
      ))}
    </uiComponents.ObjectWrapper>
  );
};
