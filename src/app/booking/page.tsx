'use client';

import React, { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';

function BookingPageContent() {
  const { t } = useLanguage();

  return (
    <div className="py-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-800 bg-amber-500/10 border border-amber-600/20 px-3.5 py-1.5 rounded-full inline-block">
            Direct Concierge Protocol
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mt-4">
            {t('bookingPageTitle')}
          </h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed font-sans">
            {t('bookingPageSubtitle')}
          </p>
        </div>

        {/* Value Prop Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-stone-900 block font-editorial">100% Accredited Guides</span>
              <span className="text-stone-500 font-mono text-[11px]">TAT, DTCM & CADASTUR</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
            <MessageCircle className="w-5 h-5 text-emerald-700 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-stone-900 block font-editorial">Direct WhatsApp Chat</span>
              <span className="text-stone-500 font-mono text-[11px]">Protocol #FOR-2026</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-stone-900 block font-editorial">Private Custom Route</span>
              <span className="text-stone-500 font-mono text-[11px]">Personalized to your pace</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <BookingForm />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500 font-mono">Loading concierge booking...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
