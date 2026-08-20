import { Metadata } from 'next';
import Link from 'next/link';
import StormShell from '@/components/storm/StormShell';
import { blogPosts } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Writing | Soultan Muhammad Albar',
    description: 'Notes on building things — TypeScript, React Native, and the boring infrastructure that keeps shipped products alive.',
};

export default function BlogIndex() {
    return (
        <StormShell>
            <div className="sp-wrap">
                <div className="sp-head">
                    <div className="sp-crumb">
                        Index / <span>Writing</span>
                    </div>
                    <h1 className="sp-title">
                        Notes on <em>building</em> things.
                    </h1>
                    <p className="sp-lede">
                        Occasional essays on TypeScript, React Native, and the boring infrastructure that keeps
                        shipped products alive. New posts arrive when there&apos;s something actually worth saying.
                    </p>
                </div>

                <div className="sp-posts">
                    {blogPosts.map((p) => (
                        <Link key={p.slug} className="sp-post" href={`/blog/${p.slug}`}>
                            <div className="sp-post-meta">
                                <span>{p.date}</span>
                                <span className="sep">·</span>
                                <span>{p.readTime} min read</span>
                            </div>
                            <h2 className="sp-post-title">{p.title}</h2>
                            <p className="sp-post-ex">{p.excerpt}</p>
                            <div className="sp-post-tags">
                                {p.tags.map((t) => (
                                    <span className="st-chip" key={t}>
                                        {t}
                                    </span>
                                ))}
                                <span className="sp-post-read">Read →</span>
                            </div>
                        </Link>
                    ))}
                    <div className="sp-post sp-post-soon">
                        <div className="sp-post-meta">
                            <span>— soon</span>
                        </div>
                        <h2 className="sp-post-title">More notes in progress.</h2>
                        <p className="sp-post-ex">
                            React Native CodePush in production · designing CI/CD templates · what I learned from
                            migrating MobX to Recoil. Drafts in the editor.
                        </p>
                    </div>
                </div>
            </div>
        </StormShell>
    );
}
