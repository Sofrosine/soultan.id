import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import { projects } from '@/lib/data';

const FeaturedWork = () => {
    const featured = projects.slice(0, 4);
    return (
        <section className="featured">
            <SectionLabel
                num="04"
                kicker="Selected Work"
                title={<>Recent <em className="serif-it">things</em> I shipped.</>}
                lede={
                    <>
                        Four highlights from {projects.length} total — full archive in{' '}
                        <Link className="ulink" href="/projects">Work</Link>.
                    </>
                }
            />
            <div className="feat-grid">
                {featured.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 80}>
                        <Link className="feat-card" href={p.slug ? `/projects/${p.slug}` : '/projects'}>
                            <div className="feat-card-img">
                                <Image
                                    src={p.image}
                                    alt={p.title}
                                    fill
                                    sizes="(max-width: 820px) 100vw, 50vw"
                                />
                            </div>
                            <div className="feat-meta mono">
                                <span>{p.year} · {p.kind}</span>
                                <span className="feat-arrow">→</span>
                            </div>
                            <h3 className="feat-title">{p.title}</h3>
                            <p className="feat-desc">{p.description.slice(0, 130)}…</p>
                            <div className="feat-tech">
                                {p.technologies.slice(0, 4).map((t) => <span className="tag" key={t}>{t}</span>)}
                                {p.technologies.length > 4 && (
                                    <span className="tag tag-more">+{p.technologies.length - 4}</span>
                                )}
                            </div>
                        </Link>
                    </Reveal>
                ))}
            </div>
            <div className="feat-cta">
                <Link className="btn-ghost" href="/projects">
                    See all {projects.length} projects →
                </Link>
            </div>
        </section>
    );
};

export default FeaturedWork;
