import { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import RichText from '@/components/RichText';
import { getDictionary } from '@/i18n';
import { alternates, localePath, type Locale } from '@/i18n/config';
import { getBlogPosts } from '@/lib/localized';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = getDictionary(lang).meta;
    return {
        title: t.writingTitle,
        description: t.writingDescription,
        alternates: alternates('/blog', lang),
    };
}

export default async function BlogIndex({ params }: Props) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const t = dict.writing;
    const blogPosts = getBlogPosts(lang);
    return (
        <section className="page">
            <div className="page-head">
                <div className="mono dim crumbs">{dict.nav.index} / <span>{t.crumb}</span></div>
                <Reveal as="h1" className="page-h">
                    <RichText value={t.title} />
                </Reveal>
                <Reveal className="page-lede" delay={120}>
                    <p>{t.lede}</p>
                </Reveal>
            </div>

            <div className="blog-list">
                {blogPosts.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 80}>
                        <Link className="post-row" href={localePath(lang, `/blog/${p.slug}`)}>
                            <div className="post-meta mono">
                                <span>{p.date}</span>
                                <span className="sep">·</span>
                                <span>{t.minRead(p.readTime)}</span>
                            </div>
                            <h2 className="post-title">{p.title}</h2>
                            <p className="post-excerpt">{p.excerpt}</p>
                            <div className="post-tags">
                                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                                <span className="post-read">{t.read}</span>
                            </div>
                        </Link>
                    </Reveal>
                ))}
                <div className="post-row post-row-coming">
                    <div className="post-meta mono">
                        <span>{t.soon}</span>
                    </div>
                    <h2 className="post-title dim">
                        <em className="serif-it">{t.moreTitle}</em>
                    </h2>
                    <p className="post-excerpt dim">{t.moreBody}</p>
                </div>
            </div>
        </section>
    );
}
