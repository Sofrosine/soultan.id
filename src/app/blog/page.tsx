import { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { blogPosts } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Writing | Soultan Muhammad Albar',
    description: 'Notes on building things — TypeScript, React Native, and the boring infrastructure that keeps shipped products alive.',
};

export default function BlogIndex() {
    return (
        <section className="page">
            <div className="page-head">
                <div className="mono dim crumbs">Index / <span>Writing</span></div>
                <Reveal as="h1" className="page-h">
                    Notes on <em className="serif-it">building</em> things.
                </Reveal>
                <Reveal className="page-lede" delay={120}>
                    <p>
                        Occasional essays on TypeScript, React Native, and the boring infrastructure that
                        keeps shipped products alive. New posts arrive when there&apos;s something actually
                        worth saying.
                    </p>
                </Reveal>
            </div>

            <div className="blog-list">
                {blogPosts.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 80}>
                        <Link className="post-row" href={`/blog/${p.slug}`}>
                            <div className="post-meta mono">
                                <span>{p.date}</span>
                                <span className="sep">·</span>
                                <span>{p.readTime} min read</span>
                            </div>
                            <h2 className="post-title">{p.title}</h2>
                            <p className="post-excerpt">{p.excerpt}</p>
                            <div className="post-tags">
                                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                                <span className="post-read">Read →</span>
                            </div>
                        </Link>
                    </Reveal>
                ))}
                <div className="post-row post-row-coming">
                    <div className="post-meta mono">
                        <span>— soon</span>
                    </div>
                    <h2 className="post-title dim">
                        <em className="serif-it">More notes in progress.</em>
                    </h2>
                    <p className="post-excerpt dim">
                        React Native CodePush in production · designing CI/CD templates · what I learned from
                        migrating Mobx to Recoil. Drafts in the editor.
                    </p>
                </div>
            </div>
        </section>
    );
}
