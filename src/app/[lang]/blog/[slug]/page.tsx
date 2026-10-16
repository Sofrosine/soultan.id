import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { getDictionary } from '@/i18n';
import { alternates, localePath, locales, type Locale } from '@/i18n/config';
import { blogPosts } from '@/lib/data';
import { getBlogPosts } from '@/lib/localized';

type Props = {
    params: Promise<{ lang: Locale; slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const t = getDictionary(lang).meta;
    const post = getBlogPosts(lang).find((p) => p.slug === slug);
    if (!post) return { title: t.postNotFound };
    // The localized date is display text; the English one is the parseable original.
    const published = blogPosts.find((p) => p.slug === slug)?.date;
    return {
        title: t.postTitle(post.title),
        description: post.excerpt,
        alternates: alternates(`/blog/${slug}`, lang),
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: published,
            authors: ['Soultan Muhammad Albar'],
        },
    };
}

export function generateStaticParams() {
    return locales.flatMap((lang) => blogPosts.map((post) => ({ lang, slug: post.slug })));
}

export default async function BlogDetail({ params }: Props) {
    const { lang, slug } = await params;
    const t = getDictionary(lang).writing;
    const post = getBlogPosts(lang).find((p) => p.slug === slug);
    if (!post) notFound();

    return (
        <section className="page detail post-detail">
            <div className="page-head">
                <div className="mono dim crumbs">
                    <Link href={localePath(lang, '/blog')}>{t.crumb}</Link>
                    {' / '}<span>{post.slug}</span>
                </div>
                <Reveal as="div" className="post-d-meta mono" delay={40}>
                    <span>{post.date}</span>
                    <span className="sep">·</span>
                    <span>{t.minRead(post.readTime)}</span>
                    <span className="sep">·</span>
                    {post.tags.map((t) => (
                        <span key={t} className="tag tag-inline">{t}</span>
                    ))}
                </Reveal>
                <Reveal as="h1" className="post-d-h" delay={120}>
                    {post.title}<em className="serif-it">.</em>
                </Reveal>
                <Reveal className="post-d-author mono dim" delay={200}>
                    {t.by}
                </Reveal>
            </div>

            <article className="post-d-body" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="post-d-end">
                <span className="mono dim">{t.end}</span>
                <Link className="btn-ghost" href={localePath(lang, '/blog')}>{t.all}</Link>
            </div>
        </section>
    );
}
