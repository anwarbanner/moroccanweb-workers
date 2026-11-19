import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/site';
import { IMG } from '@/lib/images';
import { Photo, JsonLd, Icon, Grad } from '@/components/ui';
import { PageHero, Process, Cities, CTA } from '@/components/Sections';

type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return buildMetadata((await params).locale, 'about');
}

export default async function About({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  const a = d.about;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, 'about', d.nav.about)} />
      <PageHero d={d} locale={locale} tag={a.tag} title={a.title} p={a.p} img={IMG.teamTable} alt="Équipe MWW réunie autour d'une table" crumb={d.nav.about} />

      <section>
        <div className="wrap split">
          <div className="reveal">
            <h2 className="h2">{a.storyT}</h2>
            <p className="muted mt">{a.storyP1}</p>
            <p className="muted mt">{a.storyP2}</p>
          </div>
          <div className="photo-stack reveal">
            <Photo className="ps-a" src={IMG.teamSticky} alt="Atelier de stratégie avec post-it" ratio={1.1} sizes="(max-width: 1080px) 90vw, 40vw" />
            <Photo className="ps-b" src={IMG.swatches} alt="Nuancier de couleurs pour une identité visuelle" ratio={0.8} sizes="(max-width: 1080px) 50vw, 20vw" />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap mvv">
          <article className="card reveal"><h2 className="h3">{a.missionT}</h2><p>{a.missionP}</p></article>
          <article className="card reveal"><h2 className="h3">{a.visionT}</h2><p>{a.visionP}</p></article>
          <article className="card reveal"><h2 className="h3">{a.valuesT}</h2><ul className="values">{a.values.map((v) => <li key={v}>{v}</li>)}</ul></article>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div className="reveal photo-single"><Photo src={IMG.highFive} alt="Collaboration et réussite en équipe" ratio={0.8} sizes="(max-width: 1080px) 90vw, 45vw" /></div>
          <div className="reveal">
            <h2 className="h2"><Grad text={a.teamT} /></h2>
            <p className="muted mt">{a.teamP}</p>
            <ul className="checks">{a.roles.map((r) => <li key={r}>{Icon.check}{r}</li>)}</ul>
          </div>
        </div>
      </section>

      <Process d={d} />
      <Cities d={d} />
      <CTA d={d} locale={locale} />
    </>
  );
}
