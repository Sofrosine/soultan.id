import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { blogPosts } from '@/lib/data';

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: 'Post Not Found' };
    return {
        title: `${post.title} | Writing | Soultan Muhammad Albar`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Soultan Muhammad Albar'],
        },
    };
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetail({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    return (
        <section className="page detail post-detail">
            <div className="page-head">
                <div className="mono dim crumbs">
                    <Link href="/blog">Writing</Link>
                    {' / '}<span>{post.slug}</span>
                </div>
                <Reveal as="div" className="post-d-meta mono" delay={40}>
                    <span>{post.date}</span>
                    <span className="sep">·</span>
                    <span>{post.readTime} min read</span>
                    <span className="sep">·</span>
                    {post.tags.map((t) => (
                        <span key={t} className="tag tag-inline">{t}</span>
                    ))}
                </Reveal>
                <Reveal as="h1" className="post-d-h" delay={120}>
                    {post.title}<em className="serif-it">.</em>
                </Reveal>
                <Reveal className="post-d-author mono dim" delay={200}>
                    by Soultan Muhammad Albar
                </Reveal>
            </div>

            <article className="post-d-body" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="post-d-end">
                <span className="mono dim">— end —</span>
                <Link className="btn-ghost" href="/blog">← All writing</Link>
            </div>
        </section>
    );
}
