'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Work' },
    { href: '/blog', label: 'Writing' },
    { href: '/contact', label: 'Contact' },
];

export default function StormTopNav() {
    const path = usePathname();
    const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
    return (
        <nav className="storm-topnav" aria-label="Primary">
            {LINKS.map((l) => (
                <Link
                    key={l.href}
                    href={l.href}
                    className={`storm-topnav-link${active(l.href) ? ' is-on' : ''}`}
                    aria-current={active(l.href) ? 'page' : undefined}
                >
                    {l.label}
                </Link>
            ))}
        </nav>
    );
}
