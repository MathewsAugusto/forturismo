'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS, GUIDES } from '@/data/mock-data';
import { Clock, CheckCircle2, MessageSquare } from 'lucide-react';

export default function TourCard({ tour }: { tour: Tour }) {
  const { locale, t } = useLanguage();
  const destination = DESTINATIONS.find((d) => d.id === tour.destinationId);
  const guide = GUIDES.find((g) => g.id === tour.guideId);

  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <Image
          src={tour.heroImage}
          alt={tour.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          {destination && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
              {destination.name[locale]}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-white backdrop-blur-md border border-white/20">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            {tour.durationHours} {t('hoursLabel')}
          </span>
        </div>

        {/* Price on Image */}
        <div className="absolute bottom-3 left-4">
          <span className="text-[11px] font-medium text-slate-300 block">
            {t('fromPrice')}
          </span>
          <span className="text-xl font-black text-white tracking-tight drop-shadow-sm">
            ${tour.priceStartingUSD} <span className="text-xs font-normal text-slate-200">USD</span>
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
            {tour.title[locale]}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
            {tour.tagline[locale]}
          </p>

          {/* Guide preview */}
          {guide && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-500">
                <Image
                  src={guide.avatarUrl}
                  alt={guide.fullName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px]">Guided by</span>
                <span className="font-bold text-slate-800">{guide.fullName}</span>
              </div>
            </div>
          )}

          {/* Inclusions highlights */}
          <div className="mt-4 space-y-1.5">
            {tour.inclusions[locale].slice(0, 2).map((inc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            href={`/booking?destination=${tour.destinationId}&guide=${tour.guideId}&tour=${tour.id}`}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white hover:bg-emerald-600 font-bold text-xs transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            {t('bookTour')}
          </Link>
        </div>
      </div>
    </div>
  );
}
