import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Harish Karthick S | Full Stack Developer',
  description:
    'Portfolio of Harish Karthick S — Full Stack Developer specializing in React, Next.js and Node.js',
  icons: {
    icon: '/images/logo.png',
  },
  openGraph: {
    title: 'Harish Karthick S | Full Stack Developer',
    description: 'Portfolio of Harish Karthick S',
    url: 'https://harishkarthick.dev',
    siteName: 'Harish Karthick S Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        <div style={{ position: 'relative', zIndex: 1, paddingTop: '64px' }}>{children}</div>
      </body>
    </html>
  );
}
