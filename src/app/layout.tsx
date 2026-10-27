import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfairDisplay = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ForTurismo — Elite Private Tour Guides | Thailand, Dubai & Brazil',
  description:
    'Experience curated private journeys with 14 accredited elite tour guides across Bangkok, Chiang Mai, Phuket, Dubai, and Rio de Janeiro. Real-time multilingual concierge.',
  keywords: [
    'private luxury tour guides',
    'certified tour guides',
    'thailand luxury tours',
    'dubai private guide',
    'rio de janeiro certified guide',
    'TAT license guide',
    'DTCM licensed tour guide',
    'CADASTUR MTur',
  ],
  authors: [{ name: 'ForTurismo Concierge' }],
  openGraph: {
    title: 'ForTurismo — Discover the World with Certified Elite Guides',
    description:
      'Connecting discerning travelers with 14 verified local tour guides in Thailand, Dubai, and Brazil. Tailored private journeys and seamless WhatsApp concierge.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      data-scroll-behavior="smooth"
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#121826] selection:bg-[#C59B27] selection:text-white font-sans">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
