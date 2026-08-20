'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, experiences, skillGroups } from '@/lib/data';
import { getYearsOfExperience } from '@/lib/experience';

const years = getYearsOfExperience();
const FEATURED_SLUGS = ['sekula-indonesia', 'ibhc-2024', 'fk-trisakti'];
const featured = FEATURED_SLUGS.map((s) => projects.find((p) => p.slug === s)).filter(
    (p): p is (typeof projects)[number] => Boolean(p)
);

export const PANELS = [
    { id: 'intro', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Stack' },
    { id: 'work', label: 'Work' },
    { id: 'featured', label: 'Featured' },
] as const;

const ROLES = ['Frontend Engineer', 'Mobile Engineer', 'Full-stack Builder', 'Product Engineer', 'AI Engineer'];

function useTypewriter(words: string[]) {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState('');
    const [del, setDel] = useState(false);
    useEffect(() => {
        const target = words[idx];
        const speed = del ? 40 : 80;
        const t = setTimeout(() => {
            if (!del) {
                if (text.length < target.length) setText(target.slice(0, text.length + 1));
                else setTimeout(() => setDel(true), 1500);
            } else {
                if (text.length > 0) setText(target.slice(0, text.length - 1));
                else {
                    setDel(false);
                    setIdx((idx + 1) % words.length);
                }
            }
        }, speed);
        return () => clearTimeout(t);
    }, [text, del, idx, words]);
    return text;
}

/* ------------------------------- Intro ------------------------------- */
export function IntroPanel() {
    const role = useTypewriter(ROLES);
    return (
        <div className="st-hero">
            <div className="st-panel-card">
                <span className="st-hero-tag">
                    <span className="st-dot" /> Open to new opportunities · Yogyakarta · GMT+7
                </span>
                <h1 className="st-hero-h">
                    <span className="st-line">Soultan</span>
                    <span className="st-line">Muhammad</span>
                    <span className="st-line">
                        <em>Albar</em>
                        <span className="st-spark">.</span>
                    </span>
                </h1>
                <div className="st-hero-role">
                    <span className="st-role-k">role&nbsp;=</span>
                    <span className="st-role-v">{role}</span>
                    <span className="st-caret" />
                </div>
                <p className="st-hero-lede">
                    I build durable, well-typed software for teams that have to ship — across web, mobile, and the
                    awkward bits in between. {years} years spanning startups in Yogyakarta, contracts in Hong Kong
                    &amp; Seoul, and the freelance work that keeps the rest honest.
                </p>
                <div className="st-cta-row">
                    <Link className="st-btn st-btn-prim" href="/projects">
                        Browse work →
                    </Link>
                    <Link className="st-btn st-btn-ghost" href="/contact">
                        Start a conversation
                    </Link>
                </div>
            </div>

            <div className="st-hero-side">
                <div className="st-stats">
                    <div className="st-stat">
                        <div className="st-stat-n">{years}+</div>
                        <div className="st-stat-l">Years shipping software</div>
                    </div>
                    <div className="st-stat">
                        <div className="st-stat-n">{projects.length}</div>
                        <div className="st-stat-l">Projects shipped</div>
                    </div>
                    <div className="st-stat">
                        <div className="st-stat-n">3</div>
                        <div className="st-stat-l">Countries collaborated</div>
                    </div>
                </div>
                <div className="st-orb-card">
                    <div className="st-orb-card-title">↯ Storm core · live telemetry</div>
                    <div className="st-orb-bars">
                        {[
                            ['web', 92],
                            ['mobile', 88],
                            ['backend', 74],
                            ['ai / llm', 68],
                        ].map(([k, v]) => (
                            <div className="st-orb-bar" key={k as string}>
                                <span>{k}</span>
                                <span className="st-track">
                                    <span className="st-fill" style={{ width: `${v}%` }} />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------- About ------------------------------- */
const HIGHLIGHTS: [string, string][] = [
    ['Startup pace', 'Pre-Series B founding-team velocity, owning roadmap chunks end-to-end.'],
    ['International work', 'Embedded with teams in Hong Kong, Seoul, and Indonesia across timezones.'],
    ['Stack reach', 'Next.js · React Native · Go · Postgres · AWS — picked for fit, not fashion.'],
    ['Product lifecycle', 'Discovery → architecture → ship → measure → iterate.'],
];

export function AboutPanel() {
    return (
        <div>
            <span className="st-eyebrow">
                <span className="st-num">01</span> About
            </span>
            <div className="st-about">
                <div className="st-panel-card">
                    <h2 className="st-title">
                        Engineer first, with the <em>judgment</em> of someone who has shipped a lot.
                    </h2>
                    <div className="st-about-prose">
                        <p>
                            With <strong>{years} years</strong> in product development, I&apos;ve contributed to
                            dynamic, fast-paced environments — including pre-Series B startups — and collaborated with
                            clients from Hong Kong and South Korea.
                        </p>
                        <p>
                            I work fluently across the stack: Next.js and React for the web, React Native for mobile,
                            Golang for the systems behind them. My instinct is to keep architecture small, types tight,
                            and the shipping cadence boring — in the good way.
                        </p>
                    </div>
                </div>
                <ul className="st-hl-list">
                    {HIGHLIGHTS.map(([h, b], i) => (
                        <li className="st-hl" key={h}>
                            <span className="st-hl-num">0{i + 1}</span>
                            <div>
                                <div className="st-hl-h">{h}</div>
                                <p className="st-hl-b">{b}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/* ------------------------------- Skills ------------------------------ */
export function SkillsPanel() {
    return (
        <div>
            <div className="st-panel-card st-panel-card--tight st-head">
                <span className="st-eyebrow">
                    <span className="st-num">02</span> Stack
                </span>
                <h2 className="st-title">
                    Tools I reach for, <em>chosen for fit</em>.
                </h2>
                <p className="st-lede">A working toolkit assembled over {years} years of shipping — not a wishlist.</p>
            </div>
            <div className="st-skills-grid">
                {skillGroups.map((g, i) => (
                    <div className="st-skill" key={g.group}>
                        <div className="st-skill-h">
                            <span className="st-i">0{i + 1}</span>
                            {g.group}
                        </div>
                        <div className="st-chips">
                            {g.items.map((it) => (
                                <span className="st-chip" key={it}>
                                    {it}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ---------------------------- Experience ----------------------------- */
export function WorkPanel() {
    return (
        <div>
            <div className="st-panel-card st-panel-card--tight st-head">
                <span className="st-eyebrow">
                    <span className="st-num">03</span> Experience
                </span>
                <h2 className="st-title">
                    Where I&apos;ve <em>shipped</em>.
                </h2>
                <p className="st-lede">Scroll the rail — most recent first.</p>
            </div>
            <div className="st-exp-rail">
                {experiences.map((exp) => (
                    <article className="st-exp-card" key={`${exp.company}-${exp.duration}`}>
                        <span className="st-exp-dur">{exp.duration}</span>
                        <h3 className="st-exp-role">{exp.title}</h3>
                        <div className="st-exp-co">
                            <span>{exp.company}</span> · {exp.location}
                        </div>
                        <ul className="st-exp-desc">
                            {exp.description.slice(0, 2).map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                        <div className="st-exp-tech">
                            {exp.tech.slice(0, 4).map((t) => (
                                <span className="st-chip" key={t}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

/* ----------------------------- Featured ------------------------------ */
export function FeaturedPanel() {
    return (
        <div>
            <div className="st-panel-card st-panel-card--tight st-head">
                <span className="st-eyebrow">
                    <span className="st-num">04</span> Featured
                </span>
                <h2 className="st-title">
                    Selected <em>work</em>.
                </h2>
            </div>
            <div className="st-feat-grid">
                {featured.map((p) => (
                    <Link className="st-feat" key={p.slug ?? p.title} href={p.slug ? `/projects/${p.slug}` : '/projects'}>
                        <div className="st-feat-img">
                            <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" />
                        </div>
                        <div className="st-feat-body">
                            <div className="st-feat-kind">
                                {p.kind} · {p.year}
                            </div>
                            <h3 className="st-feat-title">{p.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <Link className="st-feat-cta" href="/projects">
                View all {projects.length} projects →
            </Link>
        </div>
    );
}

export const PANEL_COMPONENTS = [IntroPanel, AboutPanel, SkillsPanel, WorkPanel, FeaturedPanel];
