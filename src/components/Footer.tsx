'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, ShieldCheck, MessageCircle, Award, Heart } from 'lucide-react';
import { DESTINATIONS } from '@/data/mock-data';

export default function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                For<span className="text-emerald-400">Turismo</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('footerAboutText')}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> 100% Licensed
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-sky-400 font-medium">
                <MessageCircle className="w-4 h-4" /> WhatsApp Assisted
              </span>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {t('footerDestinations')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {DESTINATIONS.map((dest) => (
                <li key={dest.id}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                  >
                    <span>{dest.name[locale]}</span>
                    <span className="text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-slate-400">
                      {dest.guideCount} {t('guidesAvailable').split(' ')[0]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {t('whyUsTitle')}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>TAT, DTCM & CADASTUR Accredited</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Verified Traveler Reviews</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Direct WhatsApp Coordination</span>
              </li>
            </ul>
          </div>

          {/* Quick Action */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {t('navRequestBooking')}
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              {t('heroSubtitle')}
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all text-center"
            >
              {t('navRequestBooking')}
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ForTurismo. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
