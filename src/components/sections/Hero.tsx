'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getYearsOfExperience } from '@/lib/experience';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

const ROLES = ['Product Engineer', 'Software Engineer'];
const STACK_MARQUEE = [
    'Next.js', 'React Native', 'TypeScript', 'Golang', 'PostgreSQL', 'RabbitMQ',
    'Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Redis', 'GraphQL', 'Storyblok', 'Firebase', 'Stripe', 'Midtrans',
];

type Props = {
    /** `lede` is a function in the dictionary, so it arrives already filled in. */
    t: Omit<Dictionary['hero'], 'lede'>;
    lede: string;
    lang: Locale;
    projectCount: number;
};

const Hero = ({ t, lede, lang, projectCount }: Props) => {
    const years = getYearsOfExperience();
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState('');
    const [del, setDel] = useState(false);

    useEffect(() => {
        const target = ROLES[idx];
        const speed = del ? 40 : 75;
        const t = setTimeout(() => {
            if (!del) {
                if (text.length < target.length) setText(target.slice(0, text.length + 1));
                else setTimeout(() => setDel(true), 1400);
            } else {
                if (text.length > 0) setText(target.slice(0, text.length - 1));
                else { setDel(false); setIdx((idx + 1) % ROLES.length); }
            }
        }, speed);
        return () => clearTimeout(t);
    }, [text, del, idx]);

    return (
        <section className="hero">
            <div className="hero-meta mono">
                <span>{t.meta}</span>
                <span className="hero-meta-spacer" />
                <span className="dim">{t.location}</span>
            </div>

            <div className="hero-grid">
                <div className="hero-left">
                    <Reveal as="div" className="hero-tagline mono">
                        <span className="dot" /> {t.tagline}
                    </Reveal>

                    <Reveal as="h1" className="hero-h" delay={80}>
                        <span className="hero-line">Soultan</span>
                        <span className="hero-line">Muhammad</span>
                        <span className="hero-line">
                            <em className="serif-it">Albar</em>
                            <span className="hero-amp">.</span>
                        </span>
                    </Reveal>

                    <Reveal as="div" className="hero-role" delay={220}>
                        <span className="mono dim">role&nbsp;=</span>
                        {/* Zero-width space keeps the line box the same height while the text is fully erased. */}
                        <span className="role-text">{text || '\u200b'}</span>
                        <span className="caret" />
                    </Reveal>

                    <Reveal className="hero-lede" delay={320}>
                        <p>{lede}</p>
                    </Reveal>

                    <Reveal className="hero-cta" delay={420}>
                        <Link className="btn-prim" href={localePath(lang, '/projects')}>
                            {t.browse}
                        </Link>
                        <Link className="btn-ghost" href={localePath(lang, '/contact')}>
                            {t.talk}
                        </Link>
                    </Reveal>
                </div>

                <div className="hero-right">
                    <Reveal className="hero-card" delay={150}>
                        <div className="hero-card-img">
                            <Image
                                src="/images/profile.JPG"
                                alt="Soultan Muhammad Albar"
                                fill
                                priority
                                sizes="(max-width: 920px) 100vw, 40vw"
                            />
                        </div>
                        <div className="hero-card-meta mono">
                            <span>file ↳ profile.JPG</span>
                            <span>1240×1654</span>
                        </div>
                    </Reveal>

                    <Reveal className="hero-stats" delay={300}>
                        <div className="stat">
                            <div className="stat-n">{years}+</div>
                            <div className="stat-l mono">{t.statYears}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-n">{projectCount}</div>
                            <div className="stat-l mono">{t.statProjects}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-n">3</div>
                            <div className="stat-l mono">{t.statCountries}</div>
                        </div>
                    </Reveal>
                </div>
            </div>

            <Reveal className="hero-marquee" delay={500}>
                <div className="marquee-track">
                    {[0, 1].map((j) => (
                        <div className="marquee-row" key={j}>
                            {STACK_MARQUEE.map((t, i) => (
                                <span className="marq-item" key={`${j}-${i}`}>
                                    <span className="marq-dot" />{t}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
};

export default Hero;
