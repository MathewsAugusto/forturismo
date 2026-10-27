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

  // Quick Filter State in Hero
  const [selectedDestFilter, setSelectedDestFilter] = useState('');
  const [selectedLangFilter, setSelectedLangFilter] = useState('');

  const featuredGuides = GUIDES.filter((g) => g.isFeatured).slice(0, 6);
  const featuredTours = TOURS.filter((t) => t.isFeatured).slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/guides';
    const params = new URLSearchParams();
    if (selectedDestFilter) params.append('destination', selectedDestFilter);
    if (selectedLangFilter) params.append('language', selectedLangFilter);
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    window.location.href = url;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Scenic Image with Dark Gradients */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop"
            alt="World Destinations"
            fill
            priority
            className="object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Badge */}
          <MotionReveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs sm:text-sm font-bold shadow-lg mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t('heroBadge')}</span>
            </div>
          </MotionReveal>

          {/* Main Title */}
          <MotionReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md max-w-4xl">
              {t('heroTitle')}
            </h1>
          </MotionReveal>

          {/* Subtitle */}
          <MotionReveal direction="up" delay={0.3}>
            <p className="mt-6 text-base sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow-xs">
              {t('heroSubtitle')}
            </p>
          </MotionReveal>

          {/* Quick Hero Interactive Search Bar */}
          <MotionReveal direction="scale" delay={0.4} className="w-full max-w-3xl">
            <form
              onSubmit={handleHeroSearch}
              className="mt-10 w-full bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/30 flex flex-col md:flex-row items-center gap-3 text-left"
            >
              {/* Destination select */}
              <div className="w-full md:w-1/2 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
                <div className="flex-1">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {t('searchDestinationLabel')}
                  </span>
                  <select
                    value={selectedDestFilter}
                    onChange={(e) => setSelectedDestFilter(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="">{t('searchAllDestinations')}</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name[locale]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Language filter */}
              <div className="w-full md:w-1/3 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                <Languages className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {t('searchLanguageLabel')}
                  </span>
                  <select
                    value={selectedLangFilter}
                    onChange={(e) => setSelectedLangFilter(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="">{t('searchAllLanguages')}</option>
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية (Arabic)</option>
                    <option value="th">ไทย (Thai)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-500 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
              >
                {t('searchSubmit')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </MotionReveal>

          {/* Social Proof Stats */}
          <MotionReveal direction="up" delay={0.5} className="w-full max-w-2xl">
            <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-12 border-t border-white/10 pt-8 w-full text-white">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">14</div>
                <div className="text-xs text-slate-300 font-medium mt-1">{t('heroStatsGuides')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-sky-400">3</div>
                <div className="text-xs text-slate-300 font-medium mt-1">{t('heroStatsDestinations')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400" />
                  4.96
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1">{t('heroStatsRating')}</div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

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
