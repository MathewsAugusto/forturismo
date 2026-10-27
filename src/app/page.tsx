'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS, GUIDES, TOURS } from '@/data/mock-data';
import DestinationCard from '@/components/DestinationCard';
import GuideCard from '@/components/GuideCard';
import TourCard from '@/components/TourCard';
import MotionReveal from '@/components/MotionReveal';
import ParallaxHero from '@/components/ParallaxHero';
import {
  Compass,
  ShieldCheck,
  Languages,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  Users,
  Award,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const { locale, t } = useLanguage();

  const featuredGuides = GUIDES.filter((g) => g.isFeatured).slice(0, 6);
  const featuredTours = TOURS.filter((t) => t.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- CINEMATIC PARALLAX HERO WITH BACKGROUND VIDEO --- */}
      <ParallaxHero />

      {/* --- DESTINATIONS SHOWCASE SECTION --- */}
      <section id="destinations" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded-full">
                Explore By Country
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
                {t('destinationsTitle')}
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
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

      {/* --- VALUE PROPOSITION / TRUST SECTION --- */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full">
                Guaranteed Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
                {t('whyUsTitle')}
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {t('whyUsSubtitle')}
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <MotionReveal direction="up" delay={0.1} className="h-full">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg transition-all h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  {t('feature1Title')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('feature1Desc')}
                </p>
              </div>
            </MotionReveal>

            {/* Feature 2 */}
            <MotionReveal direction="up" delay={0.2} className="h-full">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg transition-all h-full">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
                  <Languages className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  {t('feature2Title')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('feature2Desc')}
                </p>
              </div>
            </MotionReveal>

            {/* Feature 3 */}
            <MotionReveal direction="up" delay={0.3} className="h-full">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg transition-all h-full">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  {t('feature3Title')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('feature3Desc')}
                </p>
              </div>
            </MotionReveal>

            {/* Feature 4 */}
            <MotionReveal direction="up" delay={0.4} className="h-full">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg transition-all h-full">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  {t('feature4Title')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('feature4Desc')}
                </p>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* --- FEATURED GUIDES SECTION --- */}
      <section id="guides" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full">
                  Elite Network
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
                  {t('featuredGuidesTitle')}
                </h2>
                <p className="mt-3 text-base text-slate-600 max-w-xl">
                  {t('featuredGuidesSubtitle')}
                </p>
              </div>

              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-emerald-600 transition-colors self-start md:self-auto"
              >
                <span>{t('viewAllGuides')}</span>
                <ArrowRight className="w-4 h-4" />
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
      <section id="tours" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded-full">
                Handcrafted Itineraries
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
                {t('featuredToursTitle')}
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
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

      {/* --- HOW IT WORKS / CUSTOMER JOURNEY --- */}
      <section id="how-it-works" className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3.5 py-1.5 rounded-full">
                Seamless Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
                {t('howItWorksTitle')}
              </h2>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <MotionReveal direction="up" delay={0.1}>
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative h-full">
                <span className="text-4xl font-black text-emerald-500/30 mb-4 block">01</span>
                <h3 className="text-lg font-bold text-white mb-2">{t('step1Title')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('step1Desc')}</p>
              </div>
            </MotionReveal>

            {/* Step 2 */}
            <MotionReveal direction="up" delay={0.2}>
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative h-full">
                <span className="text-4xl font-black text-sky-500/30 mb-4 block">02</span>
                <h3 className="text-lg font-bold text-white mb-2">{t('step2Title')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('step2Desc')}</p>
              </div>
            </MotionReveal>

            {/* Step 3 */}
            <MotionReveal direction="up" delay={0.3}>
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative h-full">
                <span className="text-4xl font-black text-teal-500/30 mb-4 block">03</span>
                <h3 className="text-lg font-bold text-white mb-2">{t('step3Title')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('step3Desc')}</p>
              </div>
            </MotionReveal>

            {/* Step 4 */}
            <MotionReveal direction="up" delay={0.4}>
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative h-full">
                <span className="text-4xl font-black text-emerald-400/40 mb-4 block">04</span>
                <h3 className="text-lg font-bold text-white mb-2">{t('step4Title')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('step4Desc')}</p>
              </div>
            </MotionReveal>
          </div>

          {/* CTA under journey */}
          <MotionReveal direction="scale" delay={0.5}>
            <div className="mt-16 text-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-slate-950" />
                {t('navRequestBooking')}
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
}
