import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

// "/" sends visitors to their language (browser language, else French).
export const metadata: Metadata = {
  title: 'MWW Digital Studio — We Build. We Create. We Grow.',
  description: 'Studio digital marocain à Marrakech et Casablanca. Moroccan digital creative & technology studio.',
  alternates: {
    canonical: SITE.url + '/fr/',
    languages: { fr: SITE.url + '/fr/', en: SITE.url + '/en/', ar: SITE.url + '/ar/', 'x-default': SITE.url + '/fr/' },
  },
  icons: { icon: '/favicon.svg' },
};

const script = `(function(){var l=(navigator.language||'fr').slice(0,2);var t=['fr','en','ar'].indexOf(l)>-1?l:'fr';location.replace('/'+t+'/');})();`;

export default function Root() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/fr/" />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <p style={{ padding: 40 }}>
        <a href="/fr/">Français</a> · <a href="/en/">English</a> · <a href="/ar/">العربية</a>
      </p>
    </>
  );
}
