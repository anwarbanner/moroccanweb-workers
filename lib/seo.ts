import type { Metadata } from 'next';
import { SITE, LOCALES, ogLocale, pathFor, absUrl, type Locale, type PageKey } from './site';
import { getDict } from './i18n';

type MetaKey = 'home' | 'about' | 'services' | 'portfolio' | 'industries' | 'contact';
const metaKey = (p: PageKey): MetaKey => (p === '' ? 'home' : p);

export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const d = getDict(locale);
  const m = d.meta[metaKey(page)];
  const url = absUrl(pathFor(locale, page));
  const languages: Record<string, string> = {};
  LOCALES.forEach((l) => (languages[l] = absUrl(pathFor(l, page))));
  languages['x-default'] = absUrl(pathFor('fr', page));

  return {
    metadataBase: new URL(SITE.url),
    title: m.title,
    description: m.desc,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title: m.title,
      description: m.desc,
      url,
      locale: ogLocale[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MWW Digital Studio — We Build. We Create. We Grow.' }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.desc, images: ['/og-image.jpg'] },
    robots: { index: true, follow: true, 'max-image-preview': 'large' } as Metadata['robots'],
    icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
    manifest: '/manifest.webmanifest',
    other: { 'geo.region': 'MA', 'geo.placename': 'Marrakech, Casablanca' },
  };
}

/** Organization + local business schema (Google rich results / Maps). */
export function orgJsonLd(locale: Locale) {
  const d = getDict(locale);
  const sameAs = Object.values(SITE.socials).filter(Boolean);
  const org = {
    '@type': 'Organization',
    '@id': SITE.url + '/#org',
    name: SITE.name,
    alternateName: SITE.legalName,
    url: SITE.url,
    logo: SITE.url + '/logo.png',
    image: SITE.url + '/og-image.jpg',
    email: SITE.email,
    telephone: SITE.phoneIntl,
    slogan: 'We Build. We Create. We Grow.',
    description: d.meta.home.desc,
    areaServed: ['Morocco', 'Worldwide'],
    knowsLanguage: ['fr', 'en', 'ar'],
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phoneIntl,
      email: SITE.email,
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Arabic'],
    },
  };
  const local = SITE.cities.map((city) => ({
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#${city.toLowerCase()}`,
    name: `${SITE.name} — ${city}`,
    parentOrganization: { '@id': SITE.url + '/#org' },
    url: absUrl(pathFor(locale)),
    image: SITE.url + '/og-image.jpg',
    telephone: SITE.phoneIntl,
    email: SITE.email,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'MA' },
    areaServed: { '@type': 'City', name: city },
  }));
  const website = { '@type': 'WebSite', '@id': SITE.url + '/#website', url: SITE.url, name: SITE.name, inLanguage: locale, publisher: { '@id': SITE.url + '/#org' } };
  return { '@context': 'https://schema.org', '@graph': [org, ...local, website] };
}

export function breadcrumbJsonLd(locale: Locale, page: PageKey, name: string) {
  const d = getDict(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: d.common.home, item: absUrl(pathFor(locale)) },
      { '@type': 'ListItem', position: 2, name, item: absUrl(pathFor(locale, page)) },
    ],
  };
}

export function servicesJsonLd(locale: Locale) {
  const d = getDict(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': d.depts.items.map((s) => ({
      '@type': 'Service',
      name: s.name,
      serviceType: s.sub,
      description: s.desc + ' ' + s.long,
      provider: { '@id': SITE.url + '/#org' },
      areaServed: 'Morocco',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: s.name,
        itemListElement: s.list.map((x) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: x } })),
      },
    })),
  };
}
