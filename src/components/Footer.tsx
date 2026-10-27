'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, ShieldCheck, MessageCircle, Award } from 'lucide-react';
import { DESTINATIONS } from '@/data/mock-data';

export default function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer className="bg-[#06090F] text-stone-300 pt-20 pb-14 border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-stone-850">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-editorial text-2xl font-bold text-white tracking-tight">
                For<span className="text-amber-400 font-normal italic">Turismo</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
              {t('footerAboutText')}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-stone-400 font-mono">
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> 100% Accredited
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-stone-300 font-medium">
                <MessageCircle className="w-4 h-4 text-emerald-400" /> Concierge WhatsApp
              </span>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-5 font-mono">
              {t('footerDestinations')}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {DESTINATIONS.map((dest) => (
                <li key={dest.id}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="hover:text-amber-400 transition-colors flex items-center justify-between text-stone-400 hover:text-white"
                  >
                    <span>{dest.name[locale]}</span>
                    <span className="text-[10px] font-mono bg-stone-900 border border-stone-800 px-2 py-0.5 rounded-full text-amber-400/80">
                      {dest.guideCount} {t('guidesAvailable').split(' ')[0]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-5 font-mono">
              {t('whyUsTitle')}
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-400 font-sans">
              <li className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>TAT, DTCM & CADASTUR Government Licenses</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Verified Traveler Concierge Reviews</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Instant WhatsApp Protocol (#FOR-2026)</span>
              </li>
            </ul>
          </div>

          {/* Quick Action */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-5 font-mono">
              {t('navRequestBooking')}
            </h4>
            <p className="text-xs sm:text-sm text-stone-400 mb-5 leading-relaxed font-sans">
              {t('heroSubtitle')}
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center btn-tactile cursor-pointer"
            >
              {t('navRequestBooking')}
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <p>© 2026 ForTurismo. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">
              {t('termsOfService')}
            </Link>
            <Link href="/admin" className="hover:text-amber-400 transition-colors font-mono">
              Admin Backoffice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
