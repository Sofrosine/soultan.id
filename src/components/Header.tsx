'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dictionary } from '@/i18n';
import { localePath, stripLocale, type Locale } from '@/i18n/config';
import { BLOG_ENABLED } from '@/lib/features';

const matchActive = (path: string): string => {
    if (path === '/') return 'home';
    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/contact')) return 'contact';
    return '';
};

type Props = { lang: Locale; t: Dictionary['nav'] };

const Header = ({ lang, t }: Props) => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { path } = stripLocale(usePathname() || '/');
    const active = matchActive(path);
    const other: Locale = lang === 'en' ? 'id' : 'en';

    const links = [
        { name: t.index, to: '/', match: 'home' },
        { name: t.work, to: '/projects', match: 'projects' },
        ...(BLOG_ENABLED ? [{ name: t.writing, to: '/blog', match: 'blog' }] : []),
        { name: t.contact, to: '/contact', match: 'contact' },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const langSwitch = (
        <Link
            href={localePath(other, path)}
            className="nav-lang mono"
            hrefLang={other}
            title={t.switchTo}
            aria-label={t.switchTo}
            onClick={() => setOpen(false)}
        >
            <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
            <span className="nav-lang-sep">/</span>
            <span className={lang === 'id' ? 'is-on' : ''}>ID</span>
        </Link>
    );

    return (
        <header className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
            <div className="nav-inner">
                <Link href={localePath(lang, '/')} className="brand" onClick={() => setOpen(false)}>
                    <span className="brand-mark">SMA</span>
                    <span className="brand-meta">
                        <span className="brand-name">Soultan M. Albar</span>
                        <span className="brand-role">{t.role}</span>
                    </span>
                </Link>
                <nav className="nav-links">
                    {links.map((l, i) => (
                        <Link
                            key={l.to}
                            href={localePath(lang, l.to)}
                            className={`nav-link${active === l.match ? ' is-active' : ''}`}
                        >
                            <span className="nav-num">{String(i + 1).padStart(2, '0')}</span>
                            <span className="nav-name">{l.name}</span>
                        </Link>
                    ))}
                    {langSwitch}
                </nav>
                <div className="nav-mobile-actions">
                    {langSwitch}
                    <button
                        className="nav-toggle"
                        aria-label={t.menu}
                        aria-expanded={open}
                        onClick={() => setOpen((o) => !o)}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>
            {open && (
                <div className="nav-mobile">
                    {links.map((l) => (
                        <Link
                            key={l.to}
                            href={localePath(lang, l.to)}
                            className={`nav-mobile-link${active === l.match ? ' is-active' : ''}`}
                            onClick={() => setOpen(false)}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
