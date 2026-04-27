'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getYearsOfExperience } from '@/lib/experience';
import { projects } from '@/lib/data';

const ROLES = ['Frontend Engineer', 'Mobile Engineer', 'Full-stack Builder', 'Product Engineer', 'AI Engineer'];
const STACK_MARQUEE = [
    'Next.js', 'React Native', 'TypeScript', 'Golang', 'PostgreSQL', 'RabbitMQ',
    'Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Redis', 'GraphQL', 'Storyblok', 'Firebase', 'Stripe', 'Midtrans',
];

const Hero = () => {
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
                <span>—  Personal Index  /  v2.0</span>
                <span className="hero-meta-spacer" />
                <span className="dim">Yogyakarta · ID  ·  GMT+7  ·  Available now</span>
            </div>

            <div className="hero-grid">
                <div className="hero-left">
                    <Reveal as="div" className="hero-tagline mono">
                        <span className="dot" /> Open to new opportunities
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
                        <span className="role-text">{text}</span>
                        <span className="caret" />
                    </Reveal>

                    <Reveal className="hero-lede" delay={320}>
                        <p>
                            I build durable, well-typed software for teams that have to ship — across web,
                            mobile, and the awkward bits in between. {years} years spanning startups in
                            Yogyakarta, contracts in Hong Kong &amp; Seoul, and the freelance work that keeps
                            the rest honest.
                        </p>
                    </Reveal>

                    <Reveal className="hero-cta" delay={420}>
                        <Link className="btn-prim" href="/projects">
                            Browse work →
                        </Link>
                        <Link className="btn-ghost" href="/contact">
                            Start a conversation
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
                            <div className="stat-l mono">Years shipping software</div>
                        </div>
                        <div className="stat">
                            <div className="stat-n">{projects.length}</div>
                            <div className="stat-l mono">Projects shipped</div>
                        </div>
                        <div className="stat">
                            <div className="stat-n">3</div>
                            <div className="stat-l mono">Countries collaborated with</div>
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
