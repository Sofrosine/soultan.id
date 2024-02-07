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

export const metadata: Metadata = {
  title: "Soultan | Frontend Engineer",
  description: "Your favorite Frontend Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(lato.className, 'bg-white')}>{children}</body>
    </html>
  );
}
