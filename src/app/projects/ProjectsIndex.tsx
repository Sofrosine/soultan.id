import Link from 'next/link';
import ProjectMedia from '@/components/ProjectMedia';
import Reveal from '@/components/Reveal';
import { projects } from '@/lib/data';

const ProjectsIndex = () => {
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
                        and South Korea.
                    </p>
                </Reveal>
            </div>

            <div className="proj-grid">
                {projects.map((p) => (
                    <Link
                        key={p.slug || p.title}
                        className="proj-card"
                        href={p.slug ? `/projects/${p.slug}` : '/projects'}
                    >
                        <div className="proj-card-img">
                            <ProjectMedia
                                image={p.image}
                                video={p.video}
                                alt={p.title}
                                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            />
                        </div>
                        <div className="proj-card-body">
                            <div className="proj-card-meta mono">
                                <span>{p.year} · {p.kind}</span>
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
