import { MetadataRoute } from 'next';
import { projects } from '@/lib/data';
import { blogPosts } from '@/lib/data';
import { alternates, baseUrl, locales, localePath } from '@/i18n/config';
import { BLOG_ENABLED } from '@/lib/features';
import { formatDateForSitemap, getCurrentDate } from '@/utils/date';

type Entry = Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'> & { path: string };

/** One sitemap row per locale, each pointing at its siblings so search engines pair them up. */
const expand = ({ path, ...rest }: Entry): MetadataRoute.Sitemap => {
    const { languages } = alternates(path, 'en');
    const absolute = Object.fromEntries(
        Object.entries(languages).map(([k, v]) => [k, `${baseUrl}${v === '/' ? '' : v}`]),
    );
    return locales.map((lang) => {
        const p = localePath(lang, path);
        return {
            url: `${baseUrl}${p === '/' ? '' : p}`,
            ...rest,
            alternates: { languages: absolute },
        };
    });
};

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = getCurrentDate();

    const projectRoutes: Entry[] = projects
        .filter(project => project.slug) // Only include projects with slugs
        .map(project => ({
            path: `/projects/${project.slug}`,
            lastModified: project.lastModified
                ? formatDateForSitemap(project.lastModified)
                : currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

    const blogRoutes: Entry[] = blogPosts.map(post => ({
        path: `/blog/${post.slug}`,
        lastModified: post.lastModified
            ? formatDateForSitemap(post.lastModified)
            : formatDateForSitemap(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const staticRoutes: Entry[] = [
        { path: '/', lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
        { path: '/projects', lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { path: '/contact', lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    ];

    if (BLOG_ENABLED) {
        staticRoutes.push({ path: '/blog', lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 });
    }

    return [...staticRoutes, ...projectRoutes, ...(BLOG_ENABLED ? blogRoutes : [])].flatMap(expand);
}
