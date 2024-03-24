import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-lato",
});

const META = {
  title: "Soultan | Software Engineer",
  description:
    "Your favorite Software Engineer with 4+ years experience & 20+ projects completed",
  image:
    "https://instagram.fjog3-1.fna.fbcdn.net/v/t51.2885-19/369932123_1218921702835274_4484478325707841253_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fjog3-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Gf8X1RVCS9sAX_5wrT3&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCdu2ZtgUWcUHsFc4ucCrnoAnuER56ONb64V5AeQY4vww&oe=65CD63CA&_nc_sid=8b3546",
  keywords:
    "soultan,soultanid,soultan.id,soultan albar,soultan muhammad,soultan muhammad albar,soultan albar,sofrosine,programmer,software engineer",
};

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  keywords: META.keywords?.split(","),
  robots: "index, follow",
  authors: [{ name: "Soultan Muhammad Albar", url: "https://soultan.id" }],
  creator: "Soultan Muhammad Albar",
  openGraph: {
    type: "website",
    url: "https://soultan.id",
    title: META.title,
    description: META.description,
    images: [META.image],
    // <meta property="og:type" content="website" />
    // <meta property="og:url" content={url} />
    // <meta property="og:title" content={title} />
    // <meta property="og:description" content={description} />
    // <meta property="og:image" content={image} />
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(lato.className)}>{children}</body>
    </html>
  );
}
