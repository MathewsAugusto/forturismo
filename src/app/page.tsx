'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS, GUIDES, TOURS } from '@/data/mock-data';
import DestinationCard from '@/components/DestinationCard';
import GuideCard from '@/components/GuideCard';
import TourCard from '@/components/TourCard';
import MotionReveal from '@/components/MotionReveal';
import ParallaxHero from '@/components/ParallaxHero';
import {
  ShieldCheck,
  Languages,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Award,
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const { locale, t } = useLanguage();

  const featuredGuides = GUIDES.filter((g) => g.isFeatured).slice(0, 6);
  const featuredTours = TOURS.filter((t) => t.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* --- CINEMATIC PARALLAX HERO --- */}
      <ParallaxHero />

      {/* --- DESTINATIONS SHOWCASE SECTION --- */}
      <section id="destinations" className="py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-800 bg-amber-500/10 border border-amber-600/20 px-3.5 py-1.5 rounded-full inline-block">
                Curated Territories
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mt-4">
                {t('destinationsTitle')}
              </h2>
              <p className="mt-4 text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-sans">
                {t('destinationsSubtitle')}
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DESTINATIONS.map((destination, index) => (
              <MotionReveal
                key={destination.id}
                direction="up"
                delay={index * 0.15}
                className="h-full"
              >
                <DestinationCard destination={destination} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION / CONCIERGE TRUST SECTION --- */}
      <section className="py-28 bg-white border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500 bg-stone-100 border border-stone-200 px-3.5 py-1.5 rounded-full inline-block">
                The Standards of Discretion
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mt-4">
                {t('whyUsTitle')}
              </h2>
              <p className="mt-4 text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-sans">
                {t('whyUsSubtitle')}
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {/* Feature 1 */}
            <MotionReveal direction="up" delay={0.1} className="h-full">
              <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6 text-amber-700" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-stone-900 mb-2.5">
                    {t('feature1Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {t('feature1Desc')}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-200/50 text-[10px] uppercase tracking-wider font-mono text-amber-900 font-semibold">
                  TAT • DTCM • CADASTUR
                </div>
              </div>
            </MotionReveal>

            {/* Feature 2 */}
            <MotionReveal direction="up" delay={0.2} className="h-full">
              <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center mb-6 shadow-sm">
                    <Languages className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-stone-900 mb-2.5">
                    {t('feature2Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {t('feature2Desc')}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-200/50 text-[10px] uppercase tracking-wider font-mono text-stone-500 font-semibold">
                  PT • EN • ES • FR • AR • TH
                </div>
              </div>
            </MotionReveal>

            {/* Feature 3 */}
            <MotionReveal direction="up" delay={0.3} className="h-full">
              <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center mb-6">
                    <MessageCircle className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-stone-900 mb-2.5">
                    {t('feature3Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {t('feature3Desc')}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-200/50 text-[10px] uppercase tracking-wider font-mono text-emerald-800 font-semibold">
                  Direct WhatsApp Protocol
                </div>
              </div>
            </MotionReveal>

            {/* Feature 4 */}
            <MotionReveal direction="up" delay={0.4} className="h-full">
              <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center mb-6">
                    <Award className="w-6 h-6 text-amber-700" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-stone-900 mb-2.5">
                    {t('feature4Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {t('feature4Desc')}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-200/50 text-[10px] uppercase tracking-wider font-mono text-amber-900 font-semibold">
                  Tailored Private Routes
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* --- FEATURED GUIDES SECTION --- */}
      <section id="guides" className="py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-800 bg-amber-500/10 border border-amber-600/20 px-3.5 py-1.5 rounded-full inline-block">
                  Accredited Professionals
                </span>
                <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mt-4">
                  {t('featuredGuidesTitle')}
                </h2>
                <p className="mt-4 text-base text-stone-600 max-w-xl font-sans">
                  {t('featuredGuidesSubtitle')}
                </p>
              </div>

              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 hover:text-amber-700 transition-colors self-start md:self-auto cursor-pointer"
              >
                <span>{t('viewAllGuides')} (14)</span>
                <ArrowRight className="w-4 h-4 text-amber-700" />
              </Link>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGuides.map((guide, idx) => (
              <MotionReveal
                key={guide.id}
                direction="up"
                delay={(idx % 3) * 0.15}
                className="h-full"
              >
                <GuideCard guide={guide} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED TOURS & EXPERIENCES --- */}
      <section id="tours" className="py-28 bg-white border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-800 bg-amber-500/10 border border-amber-600/20 px-3.5 py-1.5 rounded-full inline-block">
                Exclusive Itineraries
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mt-4">
                {t('featuredToursTitle')}
              </h2>
              <p className="mt-4 text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-sans">
                {t('featuredToursSubtitle')}
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTours.map((tour, index) => (
              <MotionReveal
                key={tour.id}
                direction="up"
                delay={index * 0.15}
                className="h-full"
              >
                <TourCard tour={tour} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS / BESPOKE CONCIERGE JOURNEY --- */}
      <section id="how-it-works" className="py-28 bg-[#090E17] text-[#FAF8F5] relative overflow-hidden">
        {/* Subtle ambient gold radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300 bg-amber-950/70 border border-amber-500/30 px-3.5 py-1.5 rounded-full inline-block">
                Protocol & Process
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#FAF8F5] tracking-tight mt-4">
                {t('howItWorksTitle')}
              </h2>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {/* Step 1 */}
            <MotionReveal direction="up" delay={0.1}>
              <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400/80 mb-5">
                    Phase 01
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white mb-3">{t('step1Title')}</h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">{t('step1Desc')}</p>
                </div>
              </div>
            </MotionReveal>

            {/* Step 2 */}
            <MotionReveal direction="up" delay={0.2}>
              <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400/80 mb-5">
                    Phase 02
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white mb-3">{t('step2Title')}</h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">{t('step2Desc')}</p>
                </div>
              </div>
            </MotionReveal>

            {/* Step 3 */}
            <MotionReveal direction="up" delay={0.3}>
              <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400/80 mb-5">
                    Phase 03
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white mb-3">{t('step3Title')}</h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">{t('step3Desc')}</p>
                </div>
              </div>
            </MotionReveal>

            {/* Step 4 */}
            <MotionReveal direction="up" delay={0.4}>
              <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400/80 mb-5">
                    Phase 04
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white mb-3">{t('step4Title')}</h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">{t('step4Desc')}</p>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* CTA under journey */}
          <MotionReveal direction="scale" delay={0.5}>
            <div className="mt-20 text-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-400/10 btn-tactile cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>{t('navRequestBooking')}</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
}
