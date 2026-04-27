'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Index', to: '/', match: 'home' },
    { name: 'Work', to: '/projects', match: 'projects' },
    { name: 'Writing', to: '/blog', match: 'blog' },
    { name: 'Contact', to: '/contact', match: 'contact' },
];

const matchActive = (pathname: string): string => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/projects')) return 'projects';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/contact')) return 'contact';
    return '';
};

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const pathname = usePathname() || '/';
    const active = matchActive(pathname);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
            <div className="nav-inner">
                <Link href="/" className="brand" onClick={() => setOpen(false)}>
                    <span className="brand-mark">SMA</span>
                    <span className="brand-meta">
                        <span className="brand-name">Soultan M. Albar</span>
                        <span className="brand-role">Software Engineer · est. 2020</span>
                    </span>
                </Link>
                <nav className="nav-links">
                    {links.map((l, i) => (
                        <Link
                            key={l.to}
                            href={l.to}
                            className={`nav-link${active === l.match ? ' is-active' : ''}`}
                        >
                            <span className="nav-num">{String(i + 1).padStart(2, '0')}</span>
                            <span className="nav-name">{l.name}</span>
                        </Link>
                    ))}
                </nav>
                <button
                    className="nav-toggle"
                    aria-label="Menu"
                    aria-expanded={open}
                    onClick={() => setOpen((o) => !o)}
                >
                    <span /><span /><span />
                </button>
            </div>
            {open && (
                <div className="nav-mobile">
                    {links.map((l) => (
                        <Link
                            key={l.to}
                            href={l.to}
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
