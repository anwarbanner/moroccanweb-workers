import Link from 'next/link';
import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { type Locale } from '@/lib/site';
import { IMG } from '@/lib/images';
import { Photo, Arrow, Logo } from '@/components/ui';
import { Intro, Departments, Work, Industries, Process, CTA, Contact } from '@/components/Sections';

type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return buildMetadata((await params).locale, '');
}

export default async function Home({ params }: P) {
  const { locale } = await params;
  const d = getDict(locale);
  const h = d.hero;
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-text">
            <div className="pill reveal"><span className="dot" />{h.eyebrow}</div>
            <h1 className="reveal">
              <span className="sr-only">MWW Digital Studio — </span>
              <span dir="ltr">We Build.</span><span className="l2" dir="ltr">We Create.</span><span className="l3" dir="ltr">We Grow.</span>
            </h1>
            <p className="hero-sub reveal">{h.sub}</p>
            <p className="lead reveal">{h.p}</p>
            <div className="hero-cta reveal">
              <Link href={`/${locale}/contact/`} className="btn btn-p"><span>{d.common.ctaPrimary}</span><Arrow /></Link>
              <Link href={`/${locale}/portfolio/`} className="btn btn-g">{d.common.ctaSecondary}</Link>
            </div>
            <div className="stats reveal">
              {h.stats.map((s) => <div className="stat" key={s.l}><b>{s.n}</b><span>{s.l}</span></div>)}
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="hv-main"><Photo src={IMG.teamLaptops} alt="L'équipe MWW Digital Studio en réunion de projet" ratio={1.2} sizes="(max-width: 1080px) 90vw, 40vw" priority /></div>
            <div className="hv-small hv-1"><Photo src={IMG.photographer} alt="Photographe en tournage" ratio={1} sizes="200px" /></div>
            <div className="hv-small hv-2"><Photo src={IMG.colleagues} alt="Deux collègues travaillant sur un ordinateur" ratio={1} sizes="200px" /></div>
            <div className="hv-chip hv-c1"><Logo className="chip-logo" /><span>{h.float1}</span></div>
            <div className="hv-chip hv-c2"><i />{h.float2}</div>
            <div className="hv-ring" aria-hidden="true" />
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[0, 1].map((k) => (
            <div key={k} className="track-g">
              {d.depts.items.flatMap((s) => s.list.slice(0, 3)).map((x, i) => <span key={k + '-' + i}>{x}</span>)}
            </div>
          ))}
        </div>
      </div>

      <Intro d={d} locale={locale} />
      <Departments d={d} locale={locale} />
      <Work d={d} locale={locale} limit={6} filters={false} />
      <Industries d={d} locale={locale} />
      <Process d={d} />
      <CTA d={d} locale={locale} />
      <Contact d={d} />
    </>
  );
}
