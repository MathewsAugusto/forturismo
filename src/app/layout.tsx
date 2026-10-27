import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ForTurismo — International Tourism Platform | Certified Local Guides',
  description:
    'Connect with 14 verified, elite local guides in Thailand, Dubai/UAE, and Brazil. Authentic private tours, multilingual support, and seamless WhatsApp concierge.',
  keywords: [
    'tour guides',
    'private tours',
    'thailand tour guide',
    'dubai tour guide',
    'rio de janeiro tour guide',
    'brazil tourism',
    'certified tour guides',
    'whatsapp travel booking',
  ],
  authors: [{ name: 'ForTurismo' }],
  openGraph: {
    title: 'ForTurismo — Discover the World with Certified Local Guides',
    description:
      'Connecting travelers with qualified local tour guides in Thailand, Dubai/UAE, and Brazil. Tailored private experiences and instant WhatsApp coordination.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
