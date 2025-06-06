import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog | Soultan Muhammad Albar',
  description: 'Read articles and insights about web development, software engineering, and technology',
};

export default function Blog() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Thoughts, insights, and tutorials on web development and software engineering.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-10">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-64 h-48 md:h-full relative">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.date}
                    </span>
                    <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime} min read
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <h2 className="text-xl md:text-2xl font-bold mb-3">{post.title}</h2>
                  </Link>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 md:line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}