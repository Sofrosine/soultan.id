// Add lastModified date to project and blog interfaces
interface Project {
    title: string;
    slug?: string;
    description: string;
    image: string;
    technologies: string[];
    github?: string;
    demo?: string;
    features?: string[];
    challenges?: string;
    lastModified?: string; // New field for sitemap
}

interface BlogPost {
    title: string;
    slug: string;
    date: string;
    readTime: number;
    excerpt: string;
    coverImage: string;
    tags: string[];
    content: string;
    lastModified?: string; // New field for sitemap
}


export const projects: Project[] = [
    {
        title: 'E-commerce Platform',
        slug: 'ecommerce-platform',
        description: 'A modern e-commerce platform built with Next.js and a headless CMS. Features include product listings, search functionality, cart management, user authentication, and payment processing.',
        image: '/images/projects/ecommerce.jpg',
        technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Stripe', 'Prisma', 'PostgreSQL'],
        github: 'https://github.com/soultandev/ecommerce-platform',
        demo: 'https://ecommerce-platform-demo.vercel.app',
        features: [
            'Responsive product catalog with filtering and sorting',
            'User authentication and profile management',
            'Shopping cart with persistent storage',
            'Secure checkout with Stripe integration',
            'Admin dashboard for product and order management',
            'SEO optimized product pages'
        ],
        challenges: 'One of the main challenges was implementing a performant search functionality that could handle a large product catalog. I solved this by implementing server-side search with pagination and caching strategies to improve performance.',
        lastModified: '2025-06-06', // Add this field to each project
    },
    {
        title: 'Task Management App',
        slug: 'task-management-app',
        description: 'A collaborative task management application that helps teams organize and track their projects. Built with React and Node.js.',
        image: '/images/projects/task-management.jpg',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'TailwindCSS'],
        github: 'https://github.com/soultandev/task-management-app',
        demo: 'https://task-app-demo.vercel.app',
        features: [
            'Drag-and-drop task organization',
            'Real-time collaboration using WebSockets',
            'Project and team management',
            'Task assignments and deadlines',
            'Activity tracking and notifications',
            'Mobile-responsive design'
        ],
        lastModified: '2025-06-06', // Add this field to each project
    },
    {
        title: 'Finance Dashboard',
        slug: 'finance-dashboard',
        description: 'A comprehensive financial dashboard that visualizes personal finance data. Features include expense tracking, budget management, and financial goal setting.',
        image: '/images/projects/finance-dashboard.jpg',
        technologies: ['Next.js', 'TypeScript', 'Redux', 'Chart.js', 'Firebase', 'TailwindCSS'],
        github: 'https://github.com/soultandev/finance-dashboard',
        demo: 'https://finance-dashboard-demo.vercel.app',
        lastModified: '2025-06-06',
    },
    {
        title: 'Social Media Platform',
        slug: 'social-media-platform',
        description: 'A social networking platform with features similar to popular social media sites. Includes user profiles, posts, comments, likes, and real-time notifications.',
        image: '/images/projects/social-media.jpg',
        technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'AWS S3', 'TailwindCSS'],
        github: 'https://github.com/soultandev/social-media-platform',
        lastModified: '2025-06-06',
    },
    {
        title: 'AI Content Generator',
        slug: 'ai-content-generator',
        description: 'An AI-powered content generation tool that helps users create blog posts, social media captions, and more. Integrates with OpenAI API.',
        image: '/images/projects/ai-content.jpg',
        technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
        github: 'https://github.com/soultandev/ai-content-generator',
        demo: 'https://ai-content-generator-demo.vercel.app',
        lastModified: '2025-06-06',
    },
    {
        title: 'Fitness Tracking App',
        slug: 'fitness-tracking-app',
        description: 'A mobile-first fitness tracking application that helps users monitor workouts, nutrition, and progress. Features include workout plans, progress charts, and social sharing.',
        image: '/images/projects/fitness-app.jpg',
        technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Chart.js'],
        github: 'https://github.com/soultandev/fitness-tracking-app',
        lastModified: '2025-06-06',
    }
];

export const blogPosts: BlogPost[] = [
    {
        title: 'Building a Performant Next.js Application with App Router',
        slug: 'building-performant-nextjs-app-router',
        date: 'June 1, 2025',
        readTime: 8,
        excerpt: 'Learn how to leverage the power of Next.js App Router to build fast, SEO-friendly web applications with server components and streaming.',
        coverImage: '/images/blog/nextjs-app-router.jpg',
        tags: ['Next.js', 'React', 'Performance', 'SEO'],
        content: `
      <p>Next.js 15 introduces significant improvements to the App Router, making it easier than ever to build performant web applications. In this article, we'll explore the key features and best practices for getting the most out of the App Router.</p>
      
      <h2>Understanding Server Components</h2>
      <p>React Server Components allow you to render components on the server, reducing the JavaScript sent to the client and improving initial load performance. Here's how you can effectively use them:</p>
      
      <pre><code>// app/page.tsx
export default function HomePage() {
  // This component is a Server Component by default
  return (
    <div>
      <h1>Welcome to my website</h1>
      <ClientComponent />
    </div>
  );
}

// ClientComponent.tsx
'use client';

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}</code></pre>

      <h2>Streaming and Suspense</h2>
      <p>Streaming allows you to progressively render parts of your UI, improving perceived performance. Combined with Suspense, you can create a smooth loading experience:</p>
      
      <pre><code>// app/dashboard/page.tsx
import { Suspense } from 'react';
import Loading from './loading';
import ProfileSection from './ProfileSection';
import AnalyticsSection from './AnalyticsSection';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<Loading section="profile" />}>
        <ProfileSection />
      </Suspense>
      
      <Suspense fallback={<Loading section="analytics" />}>
        <AnalyticsSection />
      </Suspense>
    </div>
  );
}</code></pre>

      <h2>Data Fetching Strategies</h2>
      <p>Next.js provides multiple ways to fetch data in your application. Here's a comparison of the different approaches:</p>
      
      <ul>
        <li><strong>Server Components</strong>: Fetch data directly in server components for the best performance</li>
        <li><strong>Route Handlers</strong>: Create API endpoints for client-side data fetching</li>
        <li><strong>Server Actions</strong>: Mutate data from client components without building a separate API</li>
      </ul>
      
      <p>Example of data fetching in a server component:</p>
      
      <pre><code>// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}</code></pre>

      <h2>Optimizing for SEO</h2>
      <p>The App Router makes it easy to implement SEO best practices through metadata configuration:</p>
      
      <pre><code>// app/blog/[slug]/page.tsx
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}</code></pre>

      <h2>Conclusion</h2>
      <p>The Next.js App Router provides a powerful foundation for building modern web applications. By leveraging server components, streaming, and efficient data fetching strategies, you can create fast, SEO-friendly experiences for your users.</p>
      
      <p>What strategies have you found effective when working with the App Router? Share your experiences in the comments below!</p>
    `,
        lastModified: '2025-06-06', // This could be the same as the publication date
    },
    {
        title: 'Mastering TypeScript: Advanced Types and Patterns',
        slug: 'mastering-typescript-advanced-types-patterns',
        date: 'May 15, 2025',
        readTime: 10,
        excerpt: 'Explore advanced TypeScript features like conditional types, mapped types, and utility types to write more robust and maintainable code.',
        coverImage: '/images/blog/typescript-advanced.jpg',
        tags: ['TypeScript', 'JavaScript', 'Web Development'],
        content: `<p>This is a placeholder for the full blog post content about TypeScript advanced types and patterns.</p>`,
        lastModified: '2025-06-06', // This could be the same as the publication date
    },
    {
        title: 'Implementing Authentication in Next.js Applications',
        slug: 'implementing-authentication-nextjs',
        date: 'May 1, 2025',
        readTime: 12,
        excerpt: 'A comprehensive guide to implementing authentication in Next.js applications using NextAuth.js, with strategies for both client and server components.',
        coverImage: '/images/blog/nextjs-auth.jpg',
        tags: ['Next.js', 'Authentication', 'Security', 'Web Development'],
        content: `<p>This is a placeholder for the full blog post content about implementing authentication in Next.js.</p>`,
        lastModified: '2025-06-06', // This could be the same as the publication date
    },
    {
        title: 'Optimizing Docker Containers for Node.js Applications',
        slug: 'optimizing-docker-containers-nodejs',
        date: 'April 15, 2025',
        readTime: 7,
        excerpt: 'Learn how to optimize Docker containers for Node.js applications to improve build times, reduce image size, and enhance security.',
        coverImage: '/images/blog/docker-nodejs.jpg',
        tags: ['Docker', 'Node.js', 'DevOps', 'Performance'],
        content: `<p>This is a placeholder for the full blog post content about optimizing Docker containers for Node.js.</p>`,
        lastModified: '2025-06-06', // This could be the same as the publication date
    }
];