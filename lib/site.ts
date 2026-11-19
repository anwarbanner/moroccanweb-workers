// ===== Global settings — edit here =====
export const SITE = {
  url: 'https://www.moroccanwebworkers.com', // your domain (no trailing slash)
  name: 'MWW Digital Studio',
  legalName: 'Moroccan Web Workers',
  email: 'mww@moroccanwebworkers.com',
  phoneDisplay: '+212 6 10 51 63 60',
  phoneIntl: '+212610516360',
  whatsapp: '212610516360', // international format, no "+"
  cities: ['Marrakech', 'Casablanca'],
  // Add your real profile links here (leave '' to hide an icon)
  socials: {
    instagram: '',
    linkedin: '',
    facebook: '',
    tiktok: '',
  },
};

export const LOCALES = ['fr', 'en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';
export const isLocale = (l: string): l is Locale => (LOCALES as readonly string[]).includes(l);
export const dirOf = (l: Locale) => (l === 'ar' ? 'rtl' : 'ltr');
export const ogLocale: Record<Locale, string> = { fr: 'fr_MA', en: 'en_US', ar: 'ar_MA' };

export const PAGES = ['', 'about', 'services', 'portfolio', 'industries', 'contact'] as const;
export type PageKey = (typeof PAGES)[number];

export const pathFor = (l: Locale, page: PageKey | string = '') => `/${l}/${page ? page + '/' : ''}`;
export const absUrl = (p: string) => SITE.url + p;
