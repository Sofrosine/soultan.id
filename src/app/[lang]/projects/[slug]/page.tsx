import { Metadata } from 'next';
import ProjectMedia from '@/components/ProjectMedia';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { getDictionary } from '@/i18n';
import { alternates, localePath, locales, type Locale } from '@/i18n/config';
import { getProjects } from '@/lib/localized';

type Props = {
    params: Promise<{ lang: Locale; slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const t = getDictionary(lang).meta;
    const project = getProjects(lang).find((p) => p.slug === slug);
    if (!project) return { title: t.projectNotFound };
    return {
        title: t.projectTitle(project.title),
        description: project.description,
        alternates: alternates(`/projects/${slug}`, lang),
    };
}

export function generateStaticParams() {
    return locales.flatMap((lang) =>
        getProjects(lang)
            .filter((p) => p.slug)
            .map((p) => ({ lang, slug: p.slug as string })),
    );
}

export default async function ProjectDetailPage({ params }: Props) {
    const { lang, slug } = await params;
    const t = getDictionary(lang).project;
    const crumb = getDictionary(lang).work.crumb;
    const projects = getProjects(lang);
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    const idx = projects.findIndex((p) => p.slug === slug);
    const prev = projects[idx - 1];
    const next = projects[idx + 1];

    return (
        <section className="page detail">
            <div className="page-head">
                <div className="mono dim crumbs">
                    <Link href={localePath(lang, '/projects')}>{crumb}</Link>
                    {' / '}<span>{project.slug}</span>
                </div>
                <Reveal as="h1" className="detail-h">
                    {project.title}<em className="serif-it">.</em>
                </Reveal>
                <Reveal className="detail-meta mono" delay={100}>
                    <span>{project.year}</span>
                    <span className="sep">·</span>
                    <span>{t.kinds[project.kind] ?? project.kind}</span>
                    <span className="sep">·</span>
                    <span>{t.technologies(project.technologies.length)}</span>
                    {project.demo && (
                        <>
                            <span className="sep">·</span>
                            <a href={project.demo} target="_blank" rel="noreferrer" className="ulink">
                                {t.live}
                            </a>
                        </>
                    )}
                    {project.github && (
                        <>
                            <span className="sep">·</span>
                            <a href={project.github} target="_blank" rel="noreferrer" className="ulink">
                                {t.source}
                            </a>
                        </>
                    )}
                </Reveal>
            </div>

            <Reveal className={`detail-hero${project.video ? ' detail-hero-video' : ''}`}>
                <ProjectMedia
                    image={project.image}
                    video={project.video}
                    background={project.mediaBg}
                    alt={project.title}
                    sizes="(max-width: 1320px) 100vw, 1320px"
                    priority
                />
            </Reveal>

            <div className="detail-body">
                <aside className="detail-side">
                    <div className="side-block">
                        <div className="side-h mono">{t.stack}</div>
                        <div className="side-tags">
                            {project.technologies.map((t) => (
                                <span className="tag" key={t}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="side-block">
                        <div className="side-h mono">{t.year}</div>
                        <div className="side-v">{project.year}</div>
                    </div>
                    <div className="side-block">
                        <div className="side-h mono">{t.kind}</div>
                        <div className="side-v">{t.kinds[project.kind] ?? project.kind}</div>
                    </div>
                    {project.demo && (
                        <a className="btn-prim btn-block" href={project.demo} target="_blank" rel="noreferrer">
                            {t.visit}
                        </a>
                    )}
                    {project.github && (
                        <a className="btn-ghost btn-block" href={project.github} target="_blank" rel="noreferrer">
                            {t.viewSource}
                        </a>
                    )}
                </aside>

                <article className="detail-prose">
                    <h2 className="prose-h"><span className="mono dim">§</span> {t.overview}</h2>
                    <p className="prose-lede">{project.description}</p>

                    {project.features && project.features.length > 0 && (
                        <>
                            <h2 className="prose-h"><span className="mono dim">§</span> {t.features}</h2>
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
                            <h2 className="prose-h"><span className="mono dim">§</span> {t.challenges}</h2>
                            <p className="prose-q">{project.challenges}</p>
                        </>
                    )}
                </article>
            </div>

            <div className="detail-nav">
                {prev && prev.slug ? (
                    <Link className="dnav dnav-prev" href={localePath(lang, `/projects/${prev.slug}`)}>
                        <span className="mono dim">{t.previous}</span>
                        <span className="dnav-title">{prev.title}</span>
                    </Link>
                ) : <span />}
                {next && next.slug ? (
                    <Link className="dnav dnav-next" href={localePath(lang, `/projects/${next.slug}`)}>
                        <span className="mono dim">{t.next}</span>
                        <span className="dnav-title">{next.title}</span>
                    </Link>
                ) : <span />}
            </div>
        </section>
    );
}
