import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteProgress from '@/components/RouteProgress';
import { getYearsOfExperience } from '@/lib/experience';
import { alternates, baseUrl, isLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  const title = t.homeTitle;
  const description = t.homeDescription(yearsOfExperience);
  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: 'product engineer, software engineer, next.js, react, react native, golang, python, ai, portfolio',
    alternates: alternates('/', lang),
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: t.siteName,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Soultan Muhammad Albar',
        },
      ],
      locale: t.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang as Locale);
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body>
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <div className="app">
          <Header lang={lang} t={dict.nav} />
          <main>{children}</main>
          <Footer t={dict.footer} />
        </div>
      </body>
    </html>
  );
}
