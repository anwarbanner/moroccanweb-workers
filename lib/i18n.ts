import fr from './dict/fr';
import en from './dict/en';
import ar from './dict/ar';
import type { Locale } from './site';
import { DEFAULT_LOCALE, isLocale } from './site';

const dicts = { fr, en, ar };
export const getDict = (l: string) => dicts[isLocale(l) ? l : DEFAULT_LOCALE];
export type { Dict } from './dict/fr';
export type { Locale };
