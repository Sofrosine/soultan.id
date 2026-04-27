import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
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
    return projects
        .filter((p) => p.slug)
        .map((p) => ({ slug: p.slug as string }));
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    const idx = projects.findIndex((p) => p.slug === slug);
    const prev = projects[idx - 1];
    const next = projects[idx + 1];

    return (
        <section className="page detail">
            <div className="page-head">
                <div className="mono dim crumbs">
                    <Link href="/projects">Work</Link>
                    {' / '}<span>{project.slug}</span>
                </div>
                <Reveal as="h1" className="detail-h">
                    {project.title}<em className="serif-it">.</em>
                </Reveal>
                <Reveal className="detail-meta mono" delay={100}>
                    <span>{project.year}</span>
                    <span className="sep">·</span>
                    <span>{project.kind}</span>
                    <span className="sep">·</span>
                    <span>{project.technologies.length} technologies</span>
                    {project.demo && (
                        <>
                            <span className="sep">·</span>
                            <a href={project.demo} target="_blank" rel="noreferrer" className="ulink">
                                live ↗
                            </a>
                        </>
                    )}
                    {project.github && (
                        <>
                            <span className="sep">·</span>
                            <a href={project.github} target="_blank" rel="noreferrer" className="ulink">
                                source ↗
                            </a>
                        </>
                    )}
                </Reveal>
            </div>

            <Reveal className="detail-hero">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1320px) 100vw, 1320px"
                    priority
                />
            </Reveal>

            <div className="detail-body">
                <aside className="detail-side">
                    <div className="side-block">
                        <div className="side-h mono">Stack</div>
                        <div className="side-tags">
                            {project.technologies.map((t) => (
                                <span className="tag" key={t}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="side-block">
                        <div className="side-h mono">Year</div>
                        <div className="side-v">{project.year}</div>
                    </div>
                    <div className="side-block">
                        <div className="side-h mono">Kind</div>
                        <div className="side-v">{project.kind}</div>
                    </div>
                    {project.demo && (
                        <a className="btn-prim btn-block" href={project.demo} target="_blank" rel="noreferrer">
                            Visit live site →
                        </a>
                    )}
                    {project.github && (
                        <a className="btn-ghost btn-block" href={project.github} target="_blank" rel="noreferrer">
                            View source on GitHub ↗
                        </a>
                    )}
                </aside>

                <article className="detail-prose">
                    <h2 className="prose-h"><span className="mono dim">§</span> Overview</h2>
                    <p className="prose-lede">{project.description}</p>

                    {project.features && project.features.length > 0 && (
                        <>
                            <h2 className="prose-h"><span className="mono dim">§</span> Key features</h2>
                            <ul className="prose-list">
                                {project.features.map((f, i) => (
                                    <li key={i}>
                                        <span className="prose-num mono">{String(i + 1).padStart(2, '0')}</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {project.challenges && (
                        <>
                            <h2 className="prose-h"><span className="mono dim">§</span> Challenges &amp; solutions</h2>
                            <p className="prose-q">{project.challenges}</p>
                        </>
                    )}
                </article>
            </div>

            <div className="detail-nav">
                {prev && prev.slug ? (
                    <Link className="dnav dnav-prev" href={`/projects/${prev.slug}`}>
                        <span className="mono dim">← previous</span>
                        <span className="dnav-title">{prev.title}</span>
                    </Link>
                ) : <span />}
                {next && next.slug ? (
                    <Link className="dnav dnav-next" href={`/projects/${next.slug}`}>
                        <span className="mono dim">next →</span>
                        <span className="dnav-title">{next.title}</span>
                    </Link>
                ) : <span />}
            </div>
        </section>
    );
}
