import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  title: 'Soultan Muhammad Albar | Software Engineer',
  description: `Personal portfolio of Soultan Muhammad Albar, a Software Engineer with ${yearsOfExperience}+ years of experience`,
  keywords: 'software engineer, next.js, typescript, react, portfolio',
  openGraph: {
    title: 'Soultan Muhammad Albar | Software Engineer',
    description: `Personal portfolio of Soultan Muhammad Albar, a Software Engineer with ${yearsOfExperience}+ years of experience`,
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
    title: 'Soultan Muhammad Albar | Software Engineer',
    description: `Personal portfolio of Soultan Muhammad Albar, a Software Engineer with ${yearsOfExperience}+ years of experience`,
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
        <div className="app">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
