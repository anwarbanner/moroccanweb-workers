import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/site';
import { IMG } from '@/lib/images';
import { JsonLd } from '@/components/ui';
import { PageHero, Contact, Cities } from '@/components/Sections';

type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return buildMetadata((await params).locale, 'contact');
}

export default async function ContactPage({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  const c = d.contact;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, 'contact', d.nav.contact)} />
      <PageHero d={d} locale={locale} tag={c.tag} title={c.title} p={c.p} img={IMG.marrakech} alt="Marrakech, Maroc" crumb={d.nav.contact} />
      <Contact d={d} h1 />
      <Cities d={d} />
    </>
  );
}
