'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Destination, Guide, Tour } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import GuideCard from '@/components/GuideCard';
import TourCard from '@/components/TourCard';
import MotionReveal from '@/components/MotionReveal';
import {
  MapPin,
  Calendar,
  Sparkles,
  Coins,
  Compass,
  MessageCircle,
} from 'lucide-react';

interface DestinationDetailClientProps {
  destination: Destination;
  guides: Guide[];
  tours: Tour[];
}

export default function DestinationDetailClient({
  destination,
  guides,
  tours,
}: DestinationDetailClientProps) {
  const { locale, t } = useLanguage();

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-28">
      {/* Hero Banner */}
      <div className="relative h-80 sm:h-[480px] w-full bg-stone-950 overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.name[locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 sm:pb-16">
          <MotionReveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-semibold w-fit mb-4">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{destination.countryCode}</span>
              <span>•</span>
              <span>{guides.length} {t('guidesAvailable')}</span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2}>
            <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white tracking-tight drop-shadow-md">
              {destination.name[locale]}
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.3}>
            <p className="mt-2 text-base sm:text-xl text-stone-200 font-normal max-w-2xl drop-shadow-xs font-sans">
              {destination.tagline[locale]}
            </p>
          </MotionReveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Overview & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destination Description */}
          <MotionReveal direction="up" delay={0.1} className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6 h-full">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                About {destination.name[locale]}
              </h2>
              <p className="text-base text-stone-600 leading-relaxed font-sans">
                {destination.description[locale]}
              </p>

              {/* Travel Tips & Etiquette */}
              <div className="pt-6 border-t border-stone-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  {t('travelTipsTitle')}
                </h3>
                <ul className="space-y-3">
                  {destination.travelTips[locale].map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionReveal>

          {/* Quick Info Sidebar */}
          <MotionReveal direction="up" delay={0.2} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0 mt-1" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    {t('bestTimeToVisitTitle')}
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 mt-1">
                    {destination.bestTimeToVisit[locale]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <Coins className="w-4 h-4 text-amber-700 shrink-0 mt-1" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Local Currency
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 mt-1 font-mono">
                    {destination.currency} ({destination.currencySymbol})
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <Link
                  href={`/booking?destination=${destination.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-stone-900 text-amber-200 border border-amber-500/30 hover:bg-stone-800 hover:border-amber-400 font-bold text-xs uppercase tracking-wider transition-all text-center btn-tactile cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-amber-400" />
                  {t('navRequestBooking')}
                </Link>
              </div>
            </div>

            {/* Top Attractions List */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-700" />
                {t('topAttractionsTitle')}
              </h3>
              <div className="space-y-2">
                {destination.topAttractions[locale].map((attraction, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/70 text-xs font-medium text-stone-800"
                  >
                    {attraction}
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* Guides Section for this Destination */}
        <div className="space-y-8">
          <MotionReveal direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-800 bg-amber-500/10 border border-amber-600/20 px-3 py-1 rounded-full inline-block">
                  Concierge Network
                </span>
                <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-2">
                  {t('guidesInDestination')} {destination.name[locale]} ({guides.length})
                </h2>
              </div>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, idx) => (
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

        {/* Tours Section for this Destination */}
        {tours.length > 0 && (
          <div className="space-y-8">
            <MotionReveal direction="up">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-800 bg-amber-500/10 border border-amber-600/20 px-3 py-1 rounded-full inline-block">
                  Private Expeditions
                </span>
                <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-2">
                  {t('toursInDestination')} {destination.name[locale]} ({tours.length})
                </h2>
              </div>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour, idx) => (
                <MotionReveal
                  key={tour.id}
                  direction="up"
                  delay={idx * 0.15}
                  className="h-full"
                >
                  <TourCard tour={tour} />
                </MotionReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
