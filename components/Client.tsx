'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';
import type { Dict } from '@/lib/i18n';
import { Photo, Arrow } from './ui';

/** Fades sections in as you scroll + spotlight effect on cards. */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
    const move = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest<HTMLElement>('.card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', move, { passive: true });
    return () => { io.disconnect(); document.removeEventListener('pointermove', move); };
  }, [pathname]);
  return null;
}

type WorkItem = Dict['work']['items'][number] & { img: string };

export function PortfolioGrid({ items, filters, concept, showFilters = true }: { items: WorkItem[]; filters: Dict['work']['filters']; concept: string; showFilters?: boolean }) {
  const [f, setF] = useState<string>('all');
  const keys = Object.keys(filters) as (keyof typeof filters)[];
  return (
    <>
      {showFilters && (
        <div className="filters" role="group">
          {keys.map((k) => (
            <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{filters[k]}</button>
          ))}
        </div>
      )}
      <div className="works">
        {items.filter((w) => f === 'all' || w.cat === f).map((w) => (
          <article className="work" key={w.t}>
            <div className="work-img">
              <Photo src={w.img} alt={`${w.t} — ${w.label}`} ratio={0.75} sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw" />
              <span className="badge">{concept}</span>
            </div>
            <div className="work-b">
              <small>{filters[w.cat as keyof typeof filters]} · {w.label}</small>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function ContactForm({ c }: { c: Dict['contact'] }) {
  const f = c.form;
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('website')) return; // honeypot (anti-spam)
    const v = (k: string) => String(fd.get(k) || '').trim();
    const n = v('name'), em = v('email'), ph = v('phone'), sv = v('service'), m = v('message');
    const er: Record<string, string> = {};
    if (n.length < 2) er.name = f.eReq;
    if (!em) er.email = f.eReq; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) er.email = f.eMail;
    if (!sv) er.service = f.eReq;
    if (!m) er.message = f.eReq; else if (m.length < 20) er.message = f.eShort;
    setErr(er);
    if (Object.keys(er).length) {
      (e.currentTarget.querySelector(`[name="${Object.keys(er)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    const L = c.waLabels;
    const txt = `${c.waIntro}\n\n${L.n}: ${n}\n${L.e}: ${em}${ph ? `\n${L.p}: ${ph}` : ''}\n${L.s}: ${sv}\n${L.m}: ${m}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
    setOk(true);
    e.currentTarget.reset();
  }

  const field = (name: string) => ({ name, id: name, 'aria-invalid': !!err[name] || undefined, 'aria-describedby': err[name] ? `${name}-err` : undefined, onInput: () => err[name] && setErr({ ...err, [name]: '' }) });
  const msg = (name: string) => <div className="msg" id={`${name}-err`}>{err[name]}</div>;

  return (
    <form className="card form" noValidate onSubmit={submit}>
      <div className="row">
        <div className={`field${err.name ? ' err' : ''}`}><label htmlFor="name">{f.name}</label><input {...field('name')} autoComplete="name" placeholder={f.phName} />{msg('name')}</div>
        <div className={`field${err.email ? ' err' : ''}`}><label htmlFor="email">{f.email}</label><input {...field('email')} type="email" autoComplete="email" placeholder="vous@exemple.com" dir="ltr" />{msg('email')}</div>
      </div>
      <div className="row">
        <div className="field"><label htmlFor="phone">{f.phone}</label><input {...field('phone')} type="tel" autoComplete="tel" placeholder="+212 6 …" dir="ltr" /></div>
        <div className={`field${err.service ? ' err' : ''}`}><label htmlFor="service">{f.service}</label>
          <select {...field('service')} defaultValue="" onChange={() => err.service && setErr({ ...err, service: '' })}>
            <option value="">{f.choose}</option>
            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>{msg('service')}</div>
      </div>
      <div className={`field${err.message ? ' err' : ''}`}><label htmlFor="message">{f.msg}</label><textarea {...field('message')} placeholder={f.phMsg} />{msg('message')}</div>
      <div className="hp" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <button type="submit" className="btn btn-p btn-block"><span>{f.send}</span><Arrow /></button>
      <p className="form-note">{f.note} <a href={`mailto:${SITE.email}`}>{f.sendMail}</a></p>
      {ok && <div className="ok" role="status">{f.ok}</div>}
    </form>
  );
}

/** Subtle animated network of points (canvas). Pauses when the tab is hidden; disabled with reduced motion. */
export function Particles() {
  useEffect(() => {
    const canvas = document.getElementById('particles') as HTMLCanvasElement | null;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let pts: P[] = [];

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, Math.max(28, (w * h) / 22000)));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };
    const LINK = 140;
    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        // gentle attraction to the cursor
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d2 = dx * dx + dy * dy;
        if (d2 < 40000) { p.vx += dx * 0.000012; p.vy += dy * 0.000012; }
        p.vx *= 0.995; p.vy *= 0.995;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp < 0.08) { p.vx += (Math.random() - 0.5) * 0.02; p.vy += (Math.random() - 0.5) * 0.02; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / LINK) * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(147,197,253,.85)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onVis = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(frame);
    };
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(resize, 200); };

    resize();
    raf = requestAnimationFrame(frame);
    canvas.classList.add('on');
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false; cancelAnimationFrame(raf); clearTimeout(t);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);
  return null;
}
