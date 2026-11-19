import { Fragment } from 'react';
import { srcSet } from '@/lib/images';

/** Renders "text *highlight*" with the gradient on the highlighted part. */
export function Grad({ text }: { text: string }) {
  const parts = text.split('*');
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <span key={i} className="grad">{p}</span> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}

export function Photo({
  src, alt, ratio = 0.66, sizes = '(max-width: 720px) 100vw, 50vw', priority = false, className,
}: { src: string; alt: string; ratio?: number; sizes?: string; priority?: boolean; className?: string }) {
  const s = srcSet(src, ratio);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={s.src}
      srcSet={s.srcSet}
      sizes={sizes}
      alt={alt}
      width={1200}
      height={Math.round(1200 * ratio)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
    />
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function LogoSymbol() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <mask id="lm"><rect width="1280" height="1280" fill="#fff" /><rect y="366" width="1280" height="50" fill="#000" /></mask>
        <symbol id="mww-logo" viewBox="140 140 1000 1000">
          <circle cx="640" cy="640" r="471" fill="none" stroke="currentColor" strokeWidth="38" mask="url(#lm)" />
          <path fill="currentColor" d="M222 392H438V465L418 432H300L460 710L545 560L640 710L735 560L820 710L978 432H862L842 465V392H1062L820 810L730 655L640 810L550 655L460 810Z M548 545L575 604H522Z M732 545L758 604H706Z" />
          <circle fill="currentColor" cx="1007" cy="782" r="30" />
        </symbol>
      </defs>
    </svg>
  );
}

export const Logo = ({ className = 'logo-mark' }: { className?: string }) => (
  <svg className={className} aria-hidden="true"><use href="#mww-logo" /></svg>
);

export const Arrow = () => (
  <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const Icon = {
  wa: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 21.8zM12 .2a11.8 11.8 0 00-10.2 17.7L.1 24l6.3-1.6A11.8 11.8 0 1012 .2z" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
  ),
  dept: {
    development: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></svg>,
    creative: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><circle cx="12" cy="13" r="4" /></svg>,
    marketing: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8M14 7h7v7" /></svg>,
    consulting: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></svg>,
  } as Record<string, React.ReactNode>,
  social: {
    instagram: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zM17.3 5.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM12 2C9.3 2 9 2 7.9 2.1 4.3 2.2 2.2 4.2 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.1 3.6 2.2 5.7 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.1 5.7-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1C21.8 4.3 19.8 2.2 16.1 2.1 15 2 14.7 2 12 2zm0 1.8c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.4.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.4.1-4 .1s-3 0-4-.1C5.3 20 4 18.7 3.9 16c-.1-1-.1-1.4-.1-4s0-3 .1-4C4 5.3 5.3 4 8 3.9c1-.1 1.3-.1 4-.1z" /></svg>,
    linkedin: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" /></svg>,
    facebook: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.7-4.5 4.5V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z" /></svg>,
    tiktok: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.8A4.3 4.3 0 0115.5 3h-3.1v12.4a2.6 2.6 0 11-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 104.9 5.7V9a7.4 7.4 0 004.3 1.4V7.3a4.3 4.3 0 01-3.2-1.5z" /></svg>,
  } as Record<string, React.ReactNode>,
};
