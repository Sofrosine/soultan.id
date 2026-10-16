import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteProgress from '@/components/RouteProgress';
import { Suspense } from 'react';
import { getYearsOfExperience } from '@/lib/experience';

const yearsOfExperience = getYearsOfExperience();

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soultan Muhammad Albar | Product & Software Engineer',
  description: `Soultan Muhammad Albar — Product & Software Engineer with ${yearsOfExperience}+ years of product development across Indonesia, Hong Kong, and South Korea. Next.js, React, React Native, Python, Golang, and AI-powered products.`,
  keywords: 'product engineer, software engineer, next.js, react, react native, golang, python, ai, portfolio',
  openGraph: {
    title: 'Soultan Muhammad Albar | Product & Software Engineer',
    description: `Soultan Muhammad Albar — Product & Software Engineer with ${yearsOfExperience}+ years of product development across Indonesia, Hong Kong, and South Korea. Next.js, React, React Native, Python, Golang, and AI-powered products.`,
    url: 'https://soultan.id',
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
    title: 'Soultan Muhammad Albar | Product & Software Engineer',
    description: `Soultan Muhammad Albar — Product & Software Engineer with ${yearsOfExperience}+ years of product development across Indonesia, Hong Kong, and South Korea. Next.js, React, React Native, Python, Golang, and AI-powered products.`,
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
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body>
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <div className="app">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
