import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StormShell from '@/components/storm/StormShell';
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
        <StormShell>
            <div className="sp-doc">
                <div className="sp-crumb">
                    <Link href="/blog">Writing</Link>
                    {' / '}
                    <span>{post.slug}</span>
                </div>
                <div className="sp-doc-meta">
                    <span>{post.date}</span>
                    <span className="sep">·</span>
                    <span>{post.readTime} min read</span>
                    <span className="sep">·</span>
                    {post.tags.map((t) => (
                        <span key={t} className="st-chip">
                            {t}
                        </span>
                    ))}
                </div>
                <h1 className="sp-doc-h">
                    {post.title}
                    <em>.</em>
                </h1>
                <div className="sp-doc-meta" style={{ marginTop: 4 }}>
                    by Soultan Muhammad Albar
                </div>

                <article className="sp-article" dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className="sp-docnav">
                    <span />
                    <Link className="sp-btn sp-btn-ghost" href="/blog">
                        ← All writing
                    </Link>
                </div>
            </div>
        </StormShell>
    );
}
