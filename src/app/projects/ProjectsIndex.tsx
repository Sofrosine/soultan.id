'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { projects } from '@/lib/data';

const ProjectsIndex = () => {
    const allTech = useMemo(() => {
        const s = new Set<string>();
        projects.forEach((p) => p.technologies.forEach((t) => s.add(t)));
        return ['All', ...Array.from(s).sort()];
    }, []);
    const allKinds = useMemo(
        () => ['All', ...Array.from(new Set(projects.map((p) => p.kind))).sort()],
        []
    );

    const [tech, setTech] = useState('All');
    const [kind, setKind] = useState('All');
    const [q, setQ] = useState('');

    const filtered = projects.filter((p) => {
        if (tech !== 'All' && !p.technologies.includes(tech)) return false;
        if (kind !== 'All' && p.kind !== kind) return false;
        if (q && !(p.title + ' ' + p.description).toLowerCase().includes(q.toLowerCase())) return false;
        return true;
    });

    return (
        <section className="page">
            <div className="page-head">
                <div className="mono dim crumbs">Index / <span>Work</span></div>
                <Reveal as="h1" className="page-h">
                    <em className="serif-it">Selected</em> &amp; less-selected work, <span className="dim">2020 — now.</span>
                </Reveal>
                <Reveal className="page-lede" delay={120}>
                    <p>
                        {projects.length} projects across web and mobile, for clients in Indonesia, Hong Kong,
                        and South Korea. Filter by stack, sector, or keyword.
                    </p>
                </Reveal>
            </div>

            <div className="filters">
                <div className="filter-row">
                    <span className="filter-label mono">stack</span>
                    <div className="chips">
                        {allTech.slice(0, 14).map((t) => (
                            <button
                                key={t}
                                className={`chip${tech === t ? ' is-on' : ''}`}
                                onClick={() => setTech(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="filter-row">
                    <span className="filter-label mono">kind</span>
                    <div className="chips">
                        {allKinds.map((k) => (
                            <button
                                key={k}
                                className={`chip${kind === k ? ' is-on' : ''}`}
                                onClick={() => setKind(k)}
                            >
                                {k}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="filter-row">
                    <span className="filter-label mono">find</span>
                    <input
                        className="search"
                        placeholder="search title or description…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    <span className="filter-count mono dim">
                        {filtered.length} / {projects.length}
                    </span>
                </div>
            </div>

            <div className="proj-list">
                <div className="proj-thead mono dim">
                    <span>#</span><span></span><span>Project</span><span>Stack</span><span>Year</span><span></span>
                </div>
                {filtered.map((p, i) => (
                    <Link
                        key={p.slug}
                        className="proj-row"
                        href={p.slug ? `/projects/${p.slug}` : '/projects'}
                    >
                        <span className="proj-num mono">{String(i + 1).padStart(2, '0')}</span>
                        <div className="proj-thumb">
                            <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                sizes="72px"
                            />
                        </div>
                        <div className="proj-name">
                            <h3>{p.title}</h3>
                            <p>{p.description.slice(0, 110)}…</p>
                        </div>
                        <div className="proj-stack">
                            {p.technologies.slice(0, 3).map((t) => (
                                <span className="tag" key={t}>{t}</span>
                            ))}
                            {p.technologies.length > 3 && (
                                <span className="tag tag-more">+{p.technologies.length - 3}</span>
                            )}
                        </div>
                        <span className="proj-year mono">{p.year}</span>
                        <span className="proj-arrow">↗</span>
                    </Link>
                ))}
                {filtered.length === 0 && (
                    <div className="empty mono">{'// no matches — try widening the filter'}</div>
                )}
            </div>
        </section>
    );
};

export default ProjectsIndex;
