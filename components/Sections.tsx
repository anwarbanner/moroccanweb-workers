import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import { SITE, type Locale } from '@/lib/site';
import { IMG } from '@/lib/images';
import { Grad, Photo, Arrow, Icon, Logo } from './ui';
import { ContactForm, PortfolioGrid } from './Client';

export const DEPT_IMG: Record<string, { src: string; alt: string }> = {
  development: { src: IMG.devs, alt: 'Développeurs travaillant sur du code' },
  creative: { src: IMG.videoEdit, alt: 'Montage vidéo professionnel' },
  marketing: { src: IMG.analytics, alt: 'Tableau de bord marketing et statistiques' },
  consulting: { src: IMG.consulting, alt: 'Réunion de conseil en stratégie' },
};
export const WORK_IMG = [IMG.house, IMG.riad, IMG.cafe, IMG.videoEdit, IMG.clinic, IMG.teamSticky, IMG.retail, IMG.wireframe];
export const IND_IMG = [IMG.villa, IMG.hotelPool, IMG.cafe, IMG.clinic, IMG.retail, IMG.startup, IMG.sme, IMG.volunteers];

export function SectionHead({ tag, title, intro, h1 = false }: { tag?: string; title: string; intro?: string; h1?: boolean }) {
  const H = h1 ? 'h1' : 'h2';
  return (
    <div className="head-row reveal">
      <div>
        {tag && <div className="tag">{tag}</div>}
        <H className="h2"><Grad text={title} /></H>
      </div>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );
}

export function PageHero({ d, tag, title, p, img, alt, crumb, locale }: { d: Dict; tag: string; title: string; p: string; img: string; alt: string; crumb: string; locale: Locale }) {
  return (
    <section className="page-hero">
      <div className="ph-bg"><Photo src={img} alt={alt} ratio={0.45} sizes="100vw" priority /></div>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href={`/${locale}/`}>{d.common.home}</Link><span aria-hidden="true">/</span><span>{crumb}</span></nav>
        <div className="tag">{tag}</div>
        <h1 className="h1"><Grad text={title} /></h1>
        <p className="lead">{p}</p>
      </div>
    </section>
  );
}

export function Intro({ d, locale }: { d: Dict; locale: Locale }) {
  return (
    <section>
      <div className="wrap split">
        <div className="photo-stack reveal">
          <Photo className="ps-a" src={IMG.teamGroup} alt="Équipe créative MWW en collaboration autour d'un ordinateur" ratio={1.1} sizes="(max-width: 1080px) 90vw, 40vw" />
          <Photo className="ps-b" src={IMG.camera} alt="Photographe professionnel avec un appareil photo" ratio={0.8} sizes="(max-width: 1080px) 50vw, 20vw" />
          <div className="ps-badge"><Logo className="ps-logo" /><span>{d.hero.float1}</span></div>
        </div>
        <div className="reveal">
          <div className="tag">{d.intro.tag}</div>
          <h2 className="h2"><Grad text={d.intro.title} /></h2>
          <p className="muted mt">{d.intro.p1}</p>
          <p className="muted mt">{d.intro.p2}</p>
          <ul className="pillars">
            {d.intro.pillars.map((p) => <li key={p.t}><strong>{p.t}</strong>{p.d}</li>)}
          </ul>
          <Link href={`/${locale}/about/`} className="btn btn-g mt-lg"><span>{d.common.learnMore}</span><Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

export function Departments({ d, locale, full = false }: { d: Dict; locale: Locale; full?: boolean }) {
  if (full) {
    return (
      <section>
        <div className="wrap svc-list">
          {d.depts.items.map((s, i) => (
            <article id={s.id} key={s.id} className={`svc reveal${i % 2 ? ' rev' : ''}`}>
              <div className="svc-img"><Photo src={DEPT_IMG[s.id].src} alt={DEPT_IMG[s.id].alt} ratio={0.75} sizes="(max-width: 1080px) 100vw, 50vw" /><span className="num">0{i + 1}</span></div>
              <div className="svc-b">
                <span className="verb">{s.verb}</span>
                <h2>{s.name}</h2>
                <p className="sub">{s.sub}</p>
                <p className="muted">{s.desc}</p>
                <p className="muted mt">{s.long}</p>
                <ul className="checks">{s.list.map((x) => <li key={x}>{Icon.check}{x}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section id="services">
      <div className="wrap">
        <SectionHead tag={d.depts.tag} title={d.depts.title} intro={d.depts.intro} />
        <div className="depts">
          {d.depts.items.map((s, i) => (
            <article key={s.id} className="card dept reveal">
              <div className="dept-img"><Photo src={DEPT_IMG[s.id].src} alt={DEPT_IMG[s.id].alt} ratio={0.5} sizes="(max-width: 720px) 100vw, 50vw" /></div>
              <div className="dept-body">
                <div className="dept-top"><div className="ico">{Icon.dept[s.id]}</div><span className="num">0{i + 1}</span></div>
                <span className="verb">{s.verb}</span>
                <h3>{s.name}</h3>
                <p className="sub">{s.sub}</p>
                <p>{s.desc}</p>
                <ul>{s.list.slice(0, 4).map((x) => <li key={x}>{x}</li>)}</ul>
                <Link className="more" href={`/${locale}/services/#${s.id}`}>{d.common.learnMore} <Arrow /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work({ d, locale, limit, filters = true, head = true }: { d: Dict; locale: Locale; limit?: number; filters?: boolean; head?: boolean }) {
  const items = d.work.items.map((w, i) => ({ ...w, img: WORK_IMG[i] })).slice(0, limit);
  return (
    <section id="work">
      <div className="wrap">
        {head && <SectionHead tag={d.work.tag} title={d.work.title} intro={d.work.intro} />}
        <div className="reveal"><PortfolioGrid items={items} filters={d.work.filters} concept={d.common.concept} showFilters={filters} /></div>
        <div className="center mt-xl reveal"><Link href={limit ? `/${locale}/portfolio/` : `/${locale}/contact/`} className="btn btn-g"><span>{limit ? d.common.ctaSecondary : d.work.cta}</span><Arrow /></Link></div>
      </div>
    </section>
  );
}

export function Industries({ d, locale, full = false, head = true }: { d: Dict; locale: Locale; full?: boolean; head?: boolean }) {
  return (
    <section id="industries">
      <div className="wrap">
        {head && <SectionHead tag={d.industries.tag} title={d.industries.title} intro={d.industries.intro} />}
        <div className={full ? 'inds-full' : 'inds'}>
          {d.industries.items.map((it, i) => (
            <article key={it.t} className="ind reveal">
              <Photo src={IND_IMG[i]} alt={it.t} ratio={full ? 0.7 : 1.15} sizes="(max-width: 720px) 50vw, 25vw" />
              <div className="ind-b">
                <h3>{it.t}</h3>
                <p>{full ? it.long : it.d}</p>
              </div>
            </article>
          ))}
        </div>
        {!full && <div className="center mt-xl reveal"><Link href={`/${locale}/industries/`} className="btn btn-g"><span>{d.common.learnMore}</span><Arrow /></Link></div>}
      </div>
    </section>
  );
}

export function Process({ d }: { d: Dict }) {
  return (
    <section id="process">
      <div className="wrap">
        <SectionHead tag={d.process.tag} title={d.process.title} intro={d.process.intro} />
        <ol className="steps">
          {d.process.steps.map((s, i) => (
            <li key={s.t} className="step reveal"><span className="n">0{i + 1}</span><div><h3>{s.t}</h3><p>{s.d}</p></div></li>
          ))}
        </ol>
        <p className="motto reveal">{d.process.motto}</p>
      </div>
    </section>
  );
}

export function Cities({ d }: { d: Dict }) {
  return (
    <section className="cities-sec">
      <div className="wrap">
        <SectionHead title={d.about.citiesT} intro={d.about.citiesP} />
        <div className="cities">
          <figure className="city reveal"><Photo src={IMG.marrakech} alt="Marrakech — mosquée Koutoubia et Atlas" ratio={0.6} sizes="(max-width: 720px) 100vw, 50vw" /><figcaption>Marrakech</figcaption></figure>
          <figure className="city reveal"><Photo src={IMG.casablanca} alt="Casablanca — mosquée Hassan II" ratio={0.6} sizes="(max-width: 720px) 100vw, 50vw" /><figcaption>Casablanca</figcaption></figure>
        </div>
      </div>
    </section>
  );
}

export function CTA({ d, locale }: { d: Dict; locale: Locale }) {
  return (
    <section className="cta-sec">
      <div className="wrap">
        <div className="cta-box reveal">
          <div className="cta-bg"><Photo src={IMG.highFive} alt="" ratio={0.45} sizes="100vw" /></div>
          <h2><Grad text={d.cta.title} /></h2>
          <p>{d.cta.p}</p>
          <div className="hero-cta center-x">
            <Link href={`/${locale}/contact/`} className="btn btn-p"><span>{d.common.ctaPrimary}</span><Arrow /></Link>
            <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(d.contact.waQuick)}`} target="_blank" rel="noopener" className="btn btn-g">{Icon.wa}<span>WhatsApp</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactInfo({ d }: { d: Dict }) {
  const c = d.contact;
  const socials = Object.entries(SITE.socials).filter(([, u]) => u);
  return (
    <>
      <div className="info">
        <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(c.waQuick)}`} target="_blank" rel="noopener"><span className="ico">{Icon.wa}</span><div><small>{c.wa}</small><b dir="ltr">{SITE.phoneDisplay}</b></div></a>
        <a href={`tel:${SITE.phoneIntl}`}><span className="ico">{Icon.phone}</span><div><small>{c.phone}</small><b dir="ltr">{SITE.phoneDisplay}</b></div></a>
        <a href={`mailto:${SITE.email}`}><span className="ico">{Icon.mail}</span><div><small>{c.mail}</small><b dir="ltr">{SITE.email}</b></div></a>
        <div className="it"><span className="ico">{Icon.pin}</span><div><small>{c.loc}</small><b>{c.locV}</b></div></div>
      </div>
      {socials.length > 0 && (
        <div className="socials" aria-label={c.follow}>
          {socials.map(([k, u]) => <a key={k} href={u} target="_blank" rel="noopener" aria-label={k}>{Icon.social[k]}</a>)}
        </div>
      )}
    </>
  );
}

export function Contact({ d, h1 = false }: { d: Dict; h1?: boolean }) {
  const c = d.contact;
  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div className="reveal">
          {!h1 && <><div className="tag">{c.tag}</div><h2 className="h2"><Grad text={c.title} /></h2><p className="lead">{c.p}</p></>}
          <ContactInfo d={d} />
        </div>
        <div className="reveal"><ContactForm c={c} /></div>
      </div>
    </section>
  );
}

export function Footer({ d, locale }: { d: Dict; locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <div>
            <Link href={`/${locale}/`} className="logo"><Logo /><span>MWW<small>DIGITAL STUDIO</small></span></Link>
            <p>{d.footer.p}</p>
          </div>
          <div>
            <h3>{d.footer.nav}</h3>
            <ul>
              <li><Link href={`/${locale}/about/`}>{d.nav.about}</Link></li>
              <li><Link href={`/${locale}/services/`}>{d.nav.services}</Link></li>
              <li><Link href={`/${locale}/portfolio/`}>{d.nav.portfolio}</Link></li>
              <li><Link href={`/${locale}/industries/`}>{d.nav.industries}</Link></li>
              <li><Link href={`/${locale}/contact/`}>{d.nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h3>{d.footer.deps}</h3>
            <ul>{d.depts.items.map((s) => <li key={s.id}><Link href={`/${locale}/services/#${s.id}`}>{s.name}</Link></li>)}</ul>
          </div>
          <div>
            <h3>{d.footer.contact}</h3>
            <ul>
              <li><a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phoneIntl}`} dir="ltr">{SITE.phoneDisplay}</a></li>
              <li>{d.contact.locV}</li>
            </ul>
          </div>
        </div>
        <div className="foot-b">
          <span>© {year} MWW Digital Studio — {d.footer.rights} · {d.footer.photos}</span>
          <b>WE BUILD · WE CREATE · WE GROW</b>
        </div>
      </div>
    </footer>
  );
}
