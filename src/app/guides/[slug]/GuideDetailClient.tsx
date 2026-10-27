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
  Clock,
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
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Cover Image Banner */}
      <div className="relative h-64 sm:h-96 w-full bg-slate-900 overflow-hidden">
        <Image
          src={guide.coverUrl}
          alt={guide.fullName}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guides</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Summary Box */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl text-center sm:text-left">
              {/* Avatar */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden mx-auto sm:mx-0 border-4 border-white shadow-xl -mt-16 sm:-mt-20 mb-6 bg-slate-100">
                <Image
                  src={guide.avatarUrl}
                  alt={guide.fullName}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
                {guide.isVerified && (
                  <div className="absolute bottom-2 right-2 bg-emerald-600 text-white rounded-full p-1.5 shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full hover:bg-sky-100 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {destination.name[locale]}
                </Link>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight pt-2">
                  {guide.fullName}
                </h1>
                <p className="text-sm font-semibold text-slate-500">
                  {guide.professionalTitle[locale]}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 py-4 my-4 border-y border-slate-100 text-sm">
                <div className="flex items-center gap-1 font-black text-amber-500 text-lg">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  {guide.rating.toFixed(2)}
                </div>
                <span className="text-slate-400">({guide.reviewCount} {t('reviewsLabel')})</span>
                <span className="ml-auto text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                  {guide.yearsExperience} {t('yearsExp')}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs text-slate-600 italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-6">
                &ldquo;{guide.tagline[locale]}&rdquo;
              </p>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href={`/booking?destination=${guide.destinationId}&guide=${guide.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('requestBookingWithThisGuide')}
                </Link>
              </div>
            </div>

            {/* Official Credentials Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                {t('credentialsTitle')}
              </h3>
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1">
                <span className="font-bold text-emerald-950 block text-sm">
                  {guide.licenseNumber}
                </span>
                <span className="text-emerald-800 block">
                  {guide.licenseAuthority}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Identity & Background Verified
                </span>
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Languages className="w-4 h-4 text-sky-600" />
                {t('languagesTitle')}
              </h3>
              <div className="space-y-2">
                {guide.languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="font-bold text-slate-800">{lang.name[locale]}</span>
                    <span className="capitalize font-medium text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[11px]">
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
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                {t('guideBioTitle')}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {guide.bio[locale]}
              </p>

              {/* Specialties */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  {t('specialtiesTitle')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties[locale].map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200/60"
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
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
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
