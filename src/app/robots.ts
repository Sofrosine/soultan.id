import { MetadataRoute } from 'next';

// Define your website URL
const baseUrl = 'https://soultan.id'; // Replace with your actual domain

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Add any paths you want to disallow
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}