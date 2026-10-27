'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Guide } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS } from '@/data/mock-data';
import { ShieldCheck, Star, Award, Languages, MessageSquare, ArrowRight } from 'lucide-react';

export default function GuideCard({ guide }: { guide: Guide }) {
  const { locale, t } = useLanguage();
  const destination = DESTINATIONS.find((d) => d.id === guide.destinationId);

  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden">
      {/* Card Header with Avatar & Status */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-500 shadow-md">
            <Image
              src={guide.avatarUrl}
              alt={guide.fullName}
              fill
              sizes="96px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {guide.isVerified && (
              <div
                className="absolute bottom-1 right-1 bg-emerald-600 text-white rounded-full p-1 shadow-md"
                title="Verified Professional Guide"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {destination && (
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full mb-1">
                {destination.name[locale]}
              </span>
            )}
            <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
              {guide.fullName}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1 font-medium mt-0.5">
              {guide.professionalTitle[locale]}
            </p>

            {/* Rating & Experience */}
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {guide.rating.toFixed(2)}
              </span>
              <span className="text-slate-400">({guide.reviewCount} {t('reviewsLabel')})</span>
              <span>•</span>
              <span className="font-semibold text-slate-700">
                {guide.yearsExperience} {t('yearsExp')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Tagline & Specialties */}
      <div className="px-6 py-2 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-600 italic line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          &ldquo;{guide.tagline[locale]}&rdquo;
        </p>

        {/* License Badge */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-100 font-semibold">
          <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">{guide.licenseNumber} ({guide.licenseAuthority.split(' ')[0]})</span>
        </div>

        {/* Languages Badges */}
        <div className="mt-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1.5">
            <Languages className="w-3.5 h-3.5 text-sky-600" />
            <span>{t('languagesTitle')}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {guide.languages.map((lang) => (
              <span
                key={lang.code}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
              >
                {lang.name[locale]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 pt-4 border-t border-slate-100 flex items-center gap-3 mt-4">
        <Link
          href={`/guides/${guide.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {t('viewProfile')}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href={`/booking?destination=${guide.destinationId}&guide=${guide.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xs hover:from-emerald-500 hover:to-teal-500 transition-all text-center"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {t('requestWithGuide')}
        </Link>
      </div>
    </div>
  );
}
