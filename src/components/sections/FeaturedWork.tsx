import ProjectMedia from '@/components/ProjectMedia';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import RichText from '@/components/RichText';
import SectionLabel from '@/components/SectionLabel';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';
import type { Project } from '@/lib/data';

type Props = {
    lang: Locale;
    t: Dictionary['featured'];
    kinds: Record<string, string>;
    projects: Project[];
};

const FeaturedWork = ({ lang, t, kinds, projects }: Props) => {
    const featured = projects.slice(0, 4);
    return (
        <section className="featured">
            <SectionLabel
                num="04"
                kicker={t.kicker}
                title={<RichText value={t.title} />}
                lede={
                    <>
                        {t.ledeBefore(projects.length)}
                        <Link className="ulink" href={localePath(lang, '/projects')}>{t.ledeLink}</Link>.
                    </>
                }
            />
            <div className="feat-grid">
                {featured.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 80}>
                        <Link className="feat-card" href={localePath(lang, p.slug ? `/projects/${p.slug}` : '/projects')}>
                            <div className="feat-card-img">
                                <ProjectMedia
                                    image={p.image}
                                    video={p.video}
                                    background={p.mediaBg}
                                    alt={p.title}
                                    sizes="(max-width: 820px) 100vw, 50vw"
                                />
                            </div>
                            <div className="feat-meta mono">
                                <span>{p.year} · {kinds[p.kind] ?? p.kind}</span>
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
                <Link className="btn-ghost" href={localePath(lang, '/projects')}>
                    {t.seeAll(projects.length)}
                </Link>
            </div>
        </section>
    );
};

export default FeaturedWork;
