import { getTranslations } from '@sg/i18n';

export async function serverSideTranslations(locale: string) {
  try {
    const mod = await getTranslations(locale);
    const translations = (mod && typeof mod === 'object' && 'default' in mod ? (mod as any).default : mod) ?? {};
    return translations as Record<string, any>;
  } catch (e) {
    return {};
  }
}
