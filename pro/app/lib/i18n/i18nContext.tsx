import { createContext, useContext, ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { getTranslations } from '@sg/i18n';

type Translations = Record<string, string>;

type I18nContextType = {
  t: (key: string, fallback?: string) => string;
  formatMessage: (key: string, values?: Record<string, any>, fallback?: string) => ReactNode;
  locale: string;
  setLocale: (locale: string) => void;
  isLoading: boolean;
  error: string | null;
};
export const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'it', name: 'Italiano' },
  { code: 'cn', name: '中文' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
];

export const flags = languages.map(({ code, name }) => ({
  code,
  name,
  source: `https://flagcdn.com/w40/${code === 'en' ? 'gb' : code}.png`,
}));

const I18nContext = createContext<I18nContextType | null>(null);

export const fetchTranslations = async (locale: string): Promise<Translations> => {
  const mod = await getTranslations(locale);
  // Dynamic import from JSON returns a module: { default: {...} }
  return (mod && typeof mod === 'object' && 'default' in mod ? (mod as any).default : mod) as Translations;
};

export function I18nProvider({
  children,
  defaultLocale = 'fr',
  defaultTranslations = {},
  stockage_cookie = '',
}: {
  children: ReactNode;
  defaultLocale?: string;
  defaultTranslations: {};
  stockage_cookie: string;
}) {
  const [locale, setLocaleState] = useState(defaultLocale);

  const {
    data: translations = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['translations', locale],
    queryFn: () => fetchTranslations(locale),
    initialData: defaultTranslations,
  });

  const t = (key: string, fallback?: string) => {
    if (isLoading) return fallback || key;

    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return value || fallback || key;
  };
  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    Cookies.set(stockage_cookie, newLocale, {
      expires: 365,
      sameSite: 'lax',
    });
  };
  const formatMessage = (key: string, values?: Record<string, any>, fallback?: string) => {
    const message = t(key, fallback);
    return parseMessage(message, values);
  };
  return (
    <I18nContext.Provider
      value={{
        t,
        formatMessage,
        locale,
        setLocale,
        isLoading,
        error: error?.message || null,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

export const useLocale = () => {
  const { locale, setLocale, isLoading, t } = useI18n();
  return { locale, setLocale, isLoading, t };
};

const parseMessage = (message: string, values: Record<string, any> = {}): ReactNode => {
  const parts: ReactNode[] = [];
  let currentIndex = 0;
  let keyCounter = 0;

  const regex = /<(\w+)>(.*?)<\/\1>/g;
  let match;

  while ((match = regex.exec(message)) !== null) {
    if (match.index > currentIndex) {
      const textBefore = message.slice(currentIndex, match.index);
      const processedText = textBefore.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        return values[key] !== undefined ? String(values[key]) : `{{${key}}}`;
      });
      parts.push(processedText);
    }

    const tagName = match[1];
    let content = match[2];

    content = content.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return values[key] !== undefined ? String(values[key]) : `{{${key}}}`;
    });

    if (values[tagName]) {
      const renderFunction = values[tagName];

      if (typeof renderFunction === 'function') {
        parts.push(renderFunction(content, keyCounter++));
      } else {
        parts.push(renderFunction);
      }
    } else {
      parts.push(content);
    }

    currentIndex = match.index + match[0].length;
  }

  if (currentIndex < message.length) {
    const remainingText = message.slice(currentIndex);
    const processedText = remainingText.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return values[key] !== undefined ? String(values[key]) : `{{${key}}}`;
    });
    parts.push(processedText);
  }

  return parts.length === 0 ? '' : parts.length === 1 ? parts[0] : <>{parts}</>;
};

interface FormattedMessageProps {
  id: string;
  defaultMessage?: string;
  values?: Record<string, any>;
}
export function FormattedMessage({ id, defaultMessage, values }: FormattedMessageProps) {
  const { formatMessage } = useI18n();

  return <>{formatMessage(id, values, defaultMessage)}</>;
}
