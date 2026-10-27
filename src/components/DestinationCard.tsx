'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Destination } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

export default function DestinationCard({ destination }: { destination: Destination }) {
  const { locale, t } = useLanguage();

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300"
    >
      {/* Hero Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
        <Image
          src={destination.heroImage}
          alt={destination.name[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Soft dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            {destination.guideCount} {t('guidesAvailable')}
          </span>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
            {destination.currency}
          </span>
        </div>

        {/* Title on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
            {destination.name[locale]}
          </h3>
          <p className="text-xs text-slate-200 font-medium line-clamp-1 mt-0.5">
            {destination.tagline[locale]}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white">
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
          {destination.description[locale]}
        </p>

        {/* Top Attraction Highlights */}
        <div className="mb-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {t('topAttractionsTitle')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {destination.topAttractions[locale].slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-sky-700 group-hover:text-emerald-600 transition-colors">
          <span>{t('viewDestination')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
