'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Destination, Guide, Tour } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import GuideCard from '@/components/GuideCard';
import TourCard from '@/components/TourCard';
import {
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Coins,
  Compass,
  ArrowRight,
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
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="relative h-80 sm:h-[480px] w-full bg-slate-950 overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.name[locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 sm:pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold w-fit mb-4">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{destination.countryCode}</span>
            <span>•</span>
            <span>{guides.length} {t('guidesAvailable')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
            {destination.name[locale]}
          </h1>
          <p className="mt-2 text-base sm:text-xl text-slate-200 font-medium max-w-2xl drop-shadow-xs">
            {destination.tagline[locale]}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Overview & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destination Description */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              About {destination.name[locale]}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {destination.description[locale]}
            </p>

            {/* Travel Tips & Etiquette */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {t('travelTipsTitle')}
              </h3>
              <ul className="space-y-2.5">
                {destination.travelTips[locale].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t('bestTimeToVisitTitle')}
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {destination.bestTimeToVisit[locale]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Coins className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Local Currency
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {destination.currency} ({destination.currencySymbol})
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/booking?destination=${destination.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('navRequestBooking')}
                </Link>
              </div>
            </div>

            {/* Top Attractions List */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-600" />
                {t('topAttractionsTitle')}
              </h3>
              <div className="space-y-2">
                {destination.topAttractions[locale].map((attraction, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700"
                  >
                    {attraction}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guides Section for this Destination */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                Local Experts
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {t('guidesInDestination')} {destination.name[locale]} ({guides.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>

        {/* Tours Section for this Destination */}
        {tours.length > 0 && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full">
                Featured Itineraries
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {t('toursInDestination')} {destination.name[locale]} ({tours.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
