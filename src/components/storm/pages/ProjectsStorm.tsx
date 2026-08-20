'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/data';

export default function ProjectsStorm() {
    const allKinds = useMemo(
        () => ['All', ...Array.from(new Set(projects.map((p) => p.kind))).sort()],
        []
    );
    const [kind, setKind] = useState('All');
    const [q, setQ] = useState('');

    const filtered = projects.filter((p) => {
        if (kind !== 'All' && p.kind !== kind) return false;
        if (q && !(p.title + ' ' + p.description).toLowerCase().includes(q.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="sp-wrap">
            <div className="sp-head">
                <div className="sp-crumb">
                    Index / <span>Work</span>
                </div>
                <h1 className="sp-title">
                    Selected <em>&amp; less-selected</em> work.
                </h1>
                <p className="sp-lede">
                    {projects.length} projects across web and mobile, for clients in Indonesia, Hong Kong, and
                    South Korea — swipe the rail, filter by sector or keyword.
                </p>
            </div>

            <div className="sp-filters">
                {allKinds.map((k) => (
                    <button key={k} className={`sp-chip${kind === k ? ' is-on' : ''}`} onClick={() => setKind(k)}>
                        {k}
                    </button>
                ))}
                <input
                    className="sp-search"
                    placeholder="search title or description…"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
                <span className="sp-count">
                    {filtered.length} / {projects.length}
                </span>
            </div>

            {filtered.length === 0 ? (
                <div className="sp-empty">{'// no matches — try widening the filter'}</div>
            ) : (
                <div className="sp-rail">
                    {filtered.map((p) => (
                        <Link
                            key={p.slug ?? p.title}
                            className="sp-card"
                            href={p.slug ? `/projects/${p.slug}` : '/projects'}
                        >
                            <div className="sp-card-img">
                                <Image src={p.image} alt={p.title} fill sizes="320px" />
                            </div>
                            <div className="sp-card-body">
                                <span className="sp-card-kind">
                                    {p.kind} · {p.year}
                                </span>
                                <h3 className="sp-card-title">{p.title}</h3>
                                <p className="sp-card-desc">{p.description.slice(0, 96)}…</p>
                                <div className="sp-card-tags">
                                    {p.technologies.slice(0, 3).map((t) => (
                                        <span className="st-chip" key={t}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
