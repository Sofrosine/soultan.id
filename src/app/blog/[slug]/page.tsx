import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {blogPosts} from '@/lib/data';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Blog | Soultan Muhammad Albar`,
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
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({params}: Props) {
    const {slug} = await params
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <section className="py-24 px-4 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-4xl">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-8 hover:underline"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        ></path>
                    </svg>
                    Back to Blog
                </Link>

                <article className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="relative h-96 w-full">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="p-8">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center mb-6">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </span>
                                <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.readTime} min read
                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                                    >
                    {tag}
                  </span>
                                ))}
                            </div>

                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <div dangerouslySetInnerHTML={{__html: post.content}}/>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}