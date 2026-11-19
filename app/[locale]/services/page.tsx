import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { buildMetadata, breadcrumbJsonLd, servicesJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/site';
import { IMG } from '@/lib/images';
import { JsonLd, Grad } from '@/components/ui';
import { PageHero, Departments, Process, ContactInfo } from '@/components/Sections';
import { ContactForm } from '@/components/Client';

type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return buildMetadata((await params).locale, 'services');
}

export default async function Services({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  const s = d.servicesPage;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, 'services', d.nav.services)} />
      <JsonLd data={servicesJsonLd(locale)} />
      <PageHero d={d} locale={locale} tag={s.tag} title={s.title} p={s.p} img={IMG.colleagues} alt="Équipe digitale au travail" crumb={d.nav.services} />
      <nav className="wrap jump reveal" aria-label={d.nav.services}>
        {d.depts.items.map((x) => <a key={x.id} href={`#${x.id}`}>{x.name}</a>)}
      </nav>
      <Departments d={d} locale={locale} full />
      <Process d={d} />
      <section id="quote">
        <div className="wrap contact-grid">
          <div className="reveal">
            <h2 className="h2"><Grad text={s.customT} /></h2>
            <p className="lead">{s.customP}</p>
            <ContactInfo d={d} />
          </div>
          <div className="reveal"><h2 className="h3 mb">{s.quoteT}</h2><ContactForm c={d.contact} /></div>
        </div>
      </section>
    </>
  );
}
