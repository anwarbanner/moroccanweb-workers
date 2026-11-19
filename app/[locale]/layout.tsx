import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, isLocale, dirOf, SITE } from '@/lib/site';
import { getDict } from '@/lib/i18n';
import { orgJsonLd } from '@/lib/seo';
import Header from '@/components/Header';
import { Footer } from '@/components/Sections';
import { Reveal, Particles } from '@/components/Client';
import { JsonLd, LogoSymbol, Icon } from '@/components/ui';
import '../globals.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
export const viewport: Viewport = { themeColor: '#0B1220', width: 'device-width', initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <html lang={locale} dir={dirOf(locale)} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Animations only when JS runs: content stays visible for Google & no-JS visitors */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          rel="stylesheet"
          href={
            locale === 'ar'
              ? 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Poppins:wght@600;700;800&display=swap'
              : 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700;800&display=swap'
          }
        />
        <JsonLd data={orgJsonLd(locale)} />
      </head>
      <body>
        <LogoSymbol />
        <a href="#main" className="skip">{d.common.skip}</a>
        <div className="bg" aria-hidden="true"><div className="aurora a" /><div className="aurora b" /><div className="aurora c" /><canvas id="particles" className="particles" /></div>
        <Header locale={locale} nav={d.nav} langLabel={d.common.langLabel} />
        <main id="main">{children}</main>
        <Footer d={d} locale={locale} />
        <a className="wa-float" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(d.contact.waQuick)}`} target="_blank" rel="noopener" aria-label="WhatsApp">{Icon.wa}</a>
        <Reveal />
        <Particles />
      </body>
    </html>
  );
}
