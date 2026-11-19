'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/site';
import { LOCALES } from '@/lib/site';
import type { Dict } from '@/lib/i18n';
import { Logo } from './ui';

const LABEL: Record<Locale, string> = { fr: 'FR', en: 'EN', ar: 'ع' };
const NAME: Record<Locale, string> = { fr: 'Français', en: 'English', ar: 'العربية' };

export default function Header({ locale, nav, langLabel }: { locale: Locale; nav: Dict['nav']; langLabel: string }) {
  const pathname = usePathname() || `/${locale}/`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const rest = pathname.replace(/^\/(fr|en|ar)/, '') || '/';
  const links = [
    { href: `/${locale}/about/`, label: nav.about },
    { href: `/${locale}/services/`, label: nav.services },
    { href: `/${locale}/portfolio/`, label: nav.portfolio },
    { href: `/${locale}/industries/`, label: nav.industries },
    { href: `/${locale}/contact/`, label: nav.contact },
  ];
  const norm = (p: string) => (p.endsWith('/') ? p : p + '/');

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <div className="wrap nav">
        <Link href={`/${locale}/`} className="logo" aria-label="MWW Digital Studio">
          <Logo />
          <span>MWW<small>DIGITAL STUDIO</small></span>
        </Link>
        <nav className="links" aria-label={nav.menu}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={norm(pathname) === l.href ? 'active' : ''} aria-current={norm(pathname) === l.href ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-r">
          <div className="lang" role="group" aria-label={langLabel}>
            {LOCALES.map((l) => (
              <Link key={l} href={`/${l}${rest}`} hrefLang={l} lang={l} aria-label={NAME[l]} aria-current={l === locale ? 'true' : undefined} className={l === locale ? 'on' : ''}>
                {LABEL[l]}
              </Link>
            ))}
          </div>
          <Link href={`/${locale}/contact/`} className="btn btn-p btn-sm nav-cta">{nav.cta}</Link>
          <button className="burger" type="button" aria-label={nav.menu} aria-expanded={open} onClick={() => setOpen(!open)}><span /></button>
        </div>
      </div>
    </header>
  );
}
