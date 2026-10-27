'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Guide } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS } from '@/data/mock-data';
import { ShieldCheck, Star, Award, Languages, ArrowRight } from 'lucide-react';

export default function GuideCard({ guide }: { guide: Guide }) {
  const { locale, t } = useLanguage();
  const destination = DESTINATIONS.find((d) => d.id === guide.destinationId);

  return (
    <motion.div
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
      className="group flex flex-col h-full card-concierge rounded-3xl overflow-hidden"
    >
      {/* Card Header with Avatar & Accreditation */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-amber-500/30 shadow-md">
            <Image
              src={guide.avatarUrl}
              alt={guide.fullName}
              fill
              sizes="88px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {guide.isVerified && (
              <div
                className="absolute bottom-1 right-1 bg-stone-900 text-amber-400 border border-amber-500/40 rounded-full p-1 shadow-md"
                title="Verified & Accredited Elite Guide"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {destination && (
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full mb-1">
                {destination.name[locale]}
              </span>
            )}
            <h3 className="font-editorial text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
              {guide.fullName}
            </h3>
            <p className="text-xs text-stone-500 line-clamp-1 font-medium mt-0.5">
              {guide.professionalTitle[locale]}
            </p>

            {/* Rating & Experience */}
            <div className="flex items-center gap-3 mt-2 text-xs text-stone-600">
              <span className="flex items-center gap-1 font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {guide.rating.toFixed(2)}
              </span>
              <span className="text-stone-400">({guide.reviewCount} {t('reviewsLabel')})</span>
              <span>•</span>
              <span className="font-semibold text-stone-700">
                {guide.yearsExperience} {t('yearsExp')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Tagline & Specialties */}
      <div className="px-6 py-2 flex-1 flex flex-col justify-between">
        <p className="font-editorial-italic text-xs text-stone-700 line-clamp-2 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/60 leading-relaxed">
          &ldquo;{guide.tagline[locale]}&rdquo;
        </p>

        {/* Official License Badge */}
        <div className="mt-3.5 flex items-center gap-2 text-[11px] badge-accreditation px-3 py-1.5 rounded-xl font-mono font-medium">
          <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="truncate">{guide.licenseNumber} • {guide.licenseAuthority.split(' ')[0]}</span>
        </div>

        {/* Languages Badges */}
        <div className="mt-3.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
            <Languages className="w-3 h-3 text-amber-700" />
            <span>{t('languagesTitle')}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {guide.languages.map((lang) => (
              <span
                key={lang.code}
                className="text-[11px] font-medium bg-[#FAF8F5] text-stone-700 px-2 py-0.5 rounded-md border border-stone-200/80"
              >
                {lang.name[locale]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3 bg-[#FAF8F5]/60 mt-4">
        <div>
          <span className="text-[9px] text-stone-400 block font-bold uppercase tracking-widest">
            {t('fromPrice')}
          </span>
          <span className="font-editorial text-lg font-bold text-stone-900">
            ${guide.baseRateUSD}
            <span className="text-xs text-stone-500 font-normal font-sans"> / day</span>
          </span>
        </div>

        <Link
          href={`/guides/${guide.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-amber-200 border border-amber-500/30 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 hover:border-amber-400 transition-colors shadow-sm btn-tactile cursor-pointer"
        >
          <span>{t('viewProfile')}</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </Link>
      </div>
    </motion.div>
  );
}
