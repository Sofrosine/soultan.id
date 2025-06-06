import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Soultan Muhammad Albar | Software Engineer',
    description: 'Personal portfolio of Soultan Muhammad Albar, a Software Engineer with 5+ years of experience',
    keywords: 'software engineer, next.js, typescript, react, portfolio',
    openGraph: {
        title: 'Soultan Muhammad Albar | Software Engineer',
        description: 'Personal portfolio of Soultan Muhammad Albar, a Software Engineer with 5+ years of experience',
        url: 'https://soultanmuhammad.com',
        siteName: 'Soultan Muhammad Albar',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Soultan Muhammad Albar',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Soultan Muhammad Albar | Software Engineer',
        description: 'Personal portfolio of Soultan Muhammad Albar, a Software Engineer with 5+ years of experience',
        images: ['/images/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
        <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Header/>
        <main>{children}</main>
        <Footer/>
        </body>
        </html>
    );
}