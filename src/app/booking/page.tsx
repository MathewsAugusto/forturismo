'use client';

import React, { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, MessageCircle, Clock, Award, Sparkles } from 'lucide-react';

function BookingPageContent() {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full">
            Direct Concierge Coordination
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            {t('bookingPageTitle')}
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {t('bookingPageSubtitle')}
          </p>
        </div>

        {/* Value Prop Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">100% Verified Guides</span>
              <span className="text-slate-500">TAT, DTCM & CADASTUR</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <MessageCircle className="w-5 h-5 text-teal-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">Direct WhatsApp Chat</span>
              <span className="text-slate-500">Fast answers, no bots</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">Tailor-Made Schedules</span>
              <span className="text-slate-500">Customized to your pace</span>
            </div>
          </div>
        </div>

        {/* The Booking Form */}
        <BookingForm />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading booking form...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
