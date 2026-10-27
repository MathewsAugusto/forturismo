'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/types';
import { Compass, Globe2, Menu, X, MessageSquare, ChevronDown } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-900/10 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
                For<span className="text-emerald-600">Turismo</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 -mt-1">
                International Guides
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#destinations"
              className="text-sm font-semibold text-slate-700 hover:text-sky-700 transition-colors"
            >
              {t('navDestinations')}
            </Link>
            <Link
              href="/guides"
              className="text-sm font-semibold text-slate-700 hover:text-sky-700 transition-colors"
            >
              {t('navGuides')}
            </Link>
            <Link
              href="/#tours"
              className="text-sm font-semibold text-slate-700 hover:text-sky-700 transition-colors"
            >
              {t('navTours')}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-semibold text-slate-700 hover:text-sky-700 transition-colors"
            >
              {t('navHowItWorks')}
            </Link>
          </nav>

          {/* Right Section: Language Selector + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                aria-expanded={langDropdownOpen}
              >
                <Globe2 className="w-4 h-4 text-sky-600" />
                <span className="text-base">{currentLang.flag}</span>
                <span className="font-semibold">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left font-medium transition-colors ${
                        locale === lang.code
                          ? 'bg-sky-50 text-sky-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {locale === lang.code && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-sky-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plan Your Trip CTA */}
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-md shadow-emerald-900/10 hover:shadow-lg hover:from-emerald-500 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              {t('navRequestBooking')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick Mobile Language Switcher */}
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 text-xs font-semibold">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={`px-2 py-1 rounded ${
                    locale === lang.code
                      ? 'bg-sky-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              {t('navDestinations')}
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              {t('navGuides')} (14)
            </Link>
            <Link
              href="/#tours"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              {t('navTours')}
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              {t('navHowItWorks')}
            </Link>
          </nav>

          <div className="pt-2">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-base shadow-md"
            >
              <MessageSquare className="w-5 h-5" />
              {t('navRequestBooking')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
