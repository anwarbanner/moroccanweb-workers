import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/site';
import { IMG } from '@/lib/images';
import { JsonLd } from '@/components/ui';
import { PageHero, Industries, CTA } from '@/components/Sections';

type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return buildMetadata((await params).locale, 'industries');
}

export default async function IndustriesPage({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, 'industries', d.nav.industries)} />
      <PageHero d={d} locale={locale} tag={d.industries.tag} title={d.industriesPage.title} p={d.industriesPage.p} img={IMG.riad} alt="Riad marocain avec patio et piscine" crumb={d.nav.industries} />
      <Industries d={d} locale={locale} full head={false} />
      <CTA d={d} locale={locale} />
    </>
  );
}
