import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/site';
import { IMG } from '@/lib/images';
import { JsonLd } from '@/components/ui';
import { PageHero, Work, CTA } from '@/components/Sections';

type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return buildMetadata((await params).locale, 'portfolio');
}

export default async function Portfolio({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, 'portfolio', d.nav.portfolio)} />
      <PageHero d={d} locale={locale} tag={d.work.tag} title={d.portfolioPage.title} p={d.portfolioPage.p} img={IMG.wireframe} alt="Conception de maquettes UX/UI" crumb={d.nav.portfolio} />
      <Work d={d} locale={locale} head={false} />
      <CTA d={d} locale={locale} />
    </>
  );
}
