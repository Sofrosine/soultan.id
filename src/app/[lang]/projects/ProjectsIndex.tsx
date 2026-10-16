import Link from 'next/link';
import ProjectMedia from '@/components/ProjectMedia';
import Reveal from '@/components/Reveal';
import RichText from '@/components/RichText';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';
import type { Project } from '@/lib/data';

type Props = {
    lang: Locale;
    t: Dictionary['work'];
    /** Breadcrumb root, the localized name of the home page. */
    root: string;
    kinds: Record<string, string>;
    projects: Project[];
};

const ProjectsIndex = ({ lang, t, root, kinds, projects }: Props) => {
    return (
        <section className="page">
            <div className="page-head">
                <div className="mono dim crumbs">{root} / <span>{t.crumb}</span></div>
                <Reveal as="h1" className="page-h">
                    <RichText value={t.title} /><span className="dim">{t.titleDim}</span>
                </Reveal>
                <Reveal className="page-lede" delay={120}>
                    <p>{t.lede(projects.length)}</p>
                </Reveal>
            </div>

            <div className="proj-grid">
                {projects.map((p) => (
                    <Link
                        key={p.slug || p.title}
                        className="proj-card"
                        href={localePath(lang, p.slug ? `/projects/${p.slug}` : '/projects')}
                    >
                        <div className="proj-card-img">
                            <ProjectMedia
                                image={p.image}
                                video={p.video}
                                background={p.mediaBg}
                                alt={p.title}
                                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            />
                        </div>
                        <div className="proj-card-body">
                            <div className="proj-card-meta mono">
                                <span>{p.year} · {kinds[p.kind] ?? p.kind}</span>
                                <span className="feat-arrow">→</span>
                            </div>
                            <h3 className="proj-card-title">{p.title}</h3>
                            <p className="proj-card-desc">{p.description.slice(0, 110)}…</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProjectsIndex;
