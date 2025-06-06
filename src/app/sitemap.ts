import { MetadataRoute } from 'next';
import { projects } from '@/lib/data';
import { blogPosts } from '@/lib/data';
import { formatDateForSitemap, getCurrentDate } from '@/utils/date';

const baseUrl = 'https://www.soultanmuhammad.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = getCurrentDate();

    // Get all project routes
    const projectRoutes = projects
        .filter(project => project.slug) // Only include projects with slugs
        .map(project => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: project.lastModified
                ? formatDateForSitemap(project.lastModified)
                : currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

    // Get all blog routes
    const blogRoutes = blogPosts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.lastModified
            ? formatDateForSitemap(post.lastModified)
            : formatDateForSitemap(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Define static routes
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ];

    // Combine all routes
    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}