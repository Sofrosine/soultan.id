import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StormShell from '@/components/storm/StormShell';
import { projects } from '@/lib/data';

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: `${project.title} | Work | Soultan Muhammad Albar`,
        description: project.description,
    };
}

export function generateStaticParams() {
    return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }));
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    const idx = projects.findIndex((p) => p.slug === slug);
    const prev = projects[idx - 1];
    const next = projects[idx + 1];

    return (
        <StormShell>
            <div className="sp-doc">
                <div className="sp-crumb">
                    <Link href="/projects">Work</Link>
                    {' / '}
                    <span>{project.slug}</span>
                </div>
                <h1 className="sp-doc-h">
                    {project.title}
                    <em>.</em>
                </h1>
                <div className="sp-doc-meta">
                    <span>{project.year}</span>
                    <span className="sep">·</span>
                    <span>{project.kind}</span>
                    <span className="sep">·</span>
                    <span>{project.technologies.length} technologies</span>
                    {project.demo && (
                        <>
                            <span className="sep">·</span>
                            <a href={project.demo} target="_blank" rel="noreferrer">
                                live ↗
                            </a>
                        </>
                    )}
                    {project.github && (
                        <>
                            <span className="sep">·</span>
                            <a href={project.github} target="_blank" rel="noreferrer">
                                source ↗
                            </a>
                        </>
                    )}
                </div>

                <div className="sp-doc-hero">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 1000px) 100vw, 1000px" priority />
                </div>

                <div className="sp-doc-grid">
                    <aside>
                        <div className="sp-side-block">
                            <div className="sp-side-h">Stack</div>
                            <div className="sp-side-tags">
                                {project.technologies.map((t) => (
                                    <span className="st-chip" key={t}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="sp-side-block">
                            <div className="sp-side-h">Year</div>
                            <div className="sp-side-v">{project.year}</div>
                        </div>
                        <div className="sp-side-block">
                            <div className="sp-side-h">Kind</div>
                            <div className="sp-side-v">{project.kind}</div>
                        </div>
                        {project.demo && (
                            <a className="sp-btn sp-btn-prim sp-btn-block" href={project.demo} target="_blank" rel="noreferrer" style={{ marginBottom: 10 }}>
                                Visit live site →
                            </a>
                        )}
                        {project.github && (
                            <a className="sp-btn sp-btn-ghost sp-btn-block" href={project.github} target="_blank" rel="noreferrer">
                                View source ↗
                            </a>
                        )}
                    </aside>

                    <article>
                        <h2 className="sp-prose-h">Overview</h2>
                        <p className="sp-prose-lede">{project.description}</p>

                        {project.features && project.features.length > 0 && (
                            <>
                                <h2 className="sp-prose-h">Key features</h2>
                                <ul className="sp-prose-list">
                                    {project.features.map((f, i) => (
                                        <li key={i}>
                                            <span className="sp-prose-num">{String(i + 1).padStart(2, '0')}</span>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {project.challenges && (
                            <>
                                <h2 className="sp-prose-h">Challenges &amp; solutions</h2>
                                <p className="sp-prose-q">{project.challenges}</p>
                            </>
                        )}
                    </article>
                </div>

                <div className="sp-docnav">
                    {prev && prev.slug ? (
                        <Link className="sp-dnav" href={`/projects/${prev.slug}`}>
                            <span className="sp-dnav-k">← previous</span>
                            <span className="sp-dnav-t">{prev.title}</span>
                        </Link>
                    ) : (
                        <span />
                    )}
                    {next && next.slug ? (
                        <Link className="sp-dnav sp-dnav-next" href={`/projects/${next.slug}`}>
                            <span className="sp-dnav-k">next →</span>
                            <span className="sp-dnav-t">{next.title}</span>
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
            </div>
        </StormShell>
    );
}
