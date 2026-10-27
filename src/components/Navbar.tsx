'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/types';
import { Compass, Globe2, Menu, X, MessageSquare, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <header className="sticky top-0 z-50 glass-luxury border-b border-[#E8E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - Quiet Luxury Identity */}
          <Link href="/" className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md group-hover:border-amber-400/60 transition-all duration-300">
              <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-stone-900">
                For<span className="text-amber-700 italic font-normal">Turismo</span>
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-stone-500 -mt-0.5">
                Elite Private Concierge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-9">
            <Link
              href="/#destinations"
              className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
            >
              {t('navDestinations')}
            </Link>
            <Link
              href="/guides"
              className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{t('navGuides')}</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">14</span>
            </Link>
            <Link
              href="/#tours"
              className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
            >
              {t('navTours')}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
            >
              {t('navHowItWorks')}
            </Link>
          </nav>

          {/* Right Section: Language Selector + Luxury CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-100/80 border border-[#E2DBD2] transition-colors cursor-pointer"
                aria-expanded={langDropdownOpen}
              >
                <Globe2 className="w-3.5 h-3.5 text-amber-700" />
                <span className="text-sm">{currentLang.flag}</span>
                <span className="font-semibold text-stone-800">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-stone-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-xs text-left font-medium transition-colors cursor-pointer ${
                        locale === lang.code
                          ? 'bg-amber-50 text-amber-900 font-bold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {locale === lang.code && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plan Your Trip CTA - Editorial Concierge Style */}
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-amber-200 border border-amber-500/30 hover:bg-stone-800 hover:border-amber-400 font-semibold text-xs tracking-wider uppercase shadow-md shadow-stone-900/10 btn-tactile cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('navRequestBooking')}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick Mobile Language Switcher */}
            <div className="flex items-center border border-[#E2DBD2] rounded-lg p-0.5 text-xs font-semibold bg-white/80">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    locale === lang.code
                      ? 'bg-stone-900 text-amber-300 font-bold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-5 pt-3 pb-6 space-y-4 animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              {t('navDestinations')}
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100 flex items-center justify-between"
            >
              <span>{t('navGuides')}</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">14 Guides</span>
            </Link>
            <Link
              href="/#tours"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              {t('navTours')}
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              {t('navHowItWorks')}
            </Link>
          </nav>

          <div className="pt-2">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 text-amber-300 font-semibold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              {t('navRequestBooking')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
