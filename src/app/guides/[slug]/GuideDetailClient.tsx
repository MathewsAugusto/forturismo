'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Guide, Destination, Tour } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import TourCard from '@/components/TourCard';
import {
  ShieldCheck,
  Star,
  Award,
  Languages,
  MessageCircle,
  MapPin,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface GuideDetailClientProps {
  guide: Guide;
  destination: Destination;
  tours: Tour[];
}

export default function GuideDetailClient({
  guide,
  destination,
  tours,
}: GuideDetailClientProps) {
  const { locale, t } = useLanguage();

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-28">
      {/* Cover Image Banner */}
      <div className="relative h-64 sm:h-96 w-full bg-stone-950 overflow-hidden">
        <Image
          src={guide.coverUrl}
          alt={guide.fullName}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/85 hover:bg-stone-900 text-amber-200 border border-amber-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Guides</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Summary Box */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xl text-center sm:text-left">
              {/* Avatar */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden mx-auto sm:mx-0 border-4 border-white shadow-xl -mt-16 sm:-mt-20 mb-6 bg-stone-100">
                <Image
                  src={guide.avatarUrl}
                  alt={guide.fullName}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
                {guide.isVerified && (
                  <div className="absolute bottom-2 right-2 bg-stone-900 text-amber-400 border border-amber-500/40 rounded-full p-1.5 shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-amber-700" />
                  {destination.name[locale]}
                </Link>
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight pt-2">
                  {guide.fullName}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-stone-500 font-sans">
                  {guide.professionalTitle[locale]}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 py-4 my-4 border-y border-stone-100 text-xs sm:text-sm">
                <div className="flex items-center gap-1 font-bold text-amber-600 text-lg">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {guide.rating.toFixed(2)}
                </div>
                <span className="text-stone-400">({guide.reviewCount} {t('reviewsLabel')})</span>
                <span className="ml-auto text-xs font-bold text-stone-700 bg-[#FAF8F5] border border-stone-200/80 px-2.5 py-1 rounded-lg">
                  {guide.yearsExperience} {t('yearsExp')}
                </span>
              </div>

              {/* Tagline */}
              <p className="font-editorial-italic text-xs text-stone-700 bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/70 mb-6 leading-relaxed">
                &ldquo;{guide.tagline[locale]}&rdquo;
              </p>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href={`/booking?destination=${guide.destinationId}&guide=${guide.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-stone-900 text-amber-200 border border-amber-500/30 hover:bg-stone-800 hover:border-amber-400 font-bold text-xs uppercase tracking-wider shadow-md transition-all text-center btn-tactile cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-amber-400" />
                  {t('requestBookingWithThisGuide')}
                </Link>
              </div>
            </div>

            {/* Official Credentials Box */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                {t('credentialsTitle')}
              </h3>
              <div className="p-4 rounded-2xl badge-accreditation text-xs space-y-1 font-mono">
                <span className="font-bold text-amber-950 block text-sm">
                  {guide.licenseNumber}
                </span>
                <span className="text-amber-900 block text-xs">
                  {guide.licenseAuthority}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Identity & Background Verified
                </span>
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                <Languages className="w-4 h-4 text-amber-700" />
                {t('languagesTitle')}
              </h3>
              <div className="space-y-2">
                {guide.languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200/70"
                  >
                    <span className="font-bold text-stone-800">{lang.name[locale]}</span>
                    <span className="capitalize font-medium text-stone-500 bg-white px-2 py-0.5 rounded-md border border-stone-200 text-[11px]">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Specialties, Tours */}
          <div className="lg:col-span-2 space-y-8">
            {/* Guide Bio */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-4">
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-600" />
                {t('guideBioTitle')}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
                {guide.bio[locale]}
              </p>

              {/* Specialties */}
              <div className="pt-6 border-t border-stone-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                  {t('specialtiesTitle')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties[locale].map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] text-stone-800 text-xs font-medium border border-stone-200/80"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tours by this Guide */}
            {tours.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    {t('featuredToursByGuide')} ({tours.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
