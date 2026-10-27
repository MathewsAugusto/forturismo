'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { GUIDES, DESTINATIONS } from '@/data/mock-data';
import GuideCard from '@/components/GuideCard';
import { Search, MapPin, Languages, Filter, Users, X } from 'lucide-react';

function GuidesDirectoryContent() {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();

  // Initial params
  const initialDest = searchParams.get('destination') || '';
  const initialLang = searchParams.get('language') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(initialDest);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLang);

  const filteredGuides = useMemo(() => {
    return GUIDES.filter((guide) => {
      // Destination filter
      if (selectedDestination && guide.destinationId !== selectedDestination) {
        return false;
      }

      // Language filter
      if (selectedLanguage) {
        const speaks = guide.languages.some((l) => l.code === selectedLanguage);
        if (!speaks) return false;
      }

      // Search query (name, title, bio, specialties)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = guide.fullName.toLowerCase().includes(query);
        const matchesTitle = guide.professionalTitle[locale].toLowerCase().includes(query);
        const matchesBio = guide.bio[locale].toLowerCase().includes(query);
        const matchesSpecialties = guide.specialties[locale].some((s) => s.toLowerCase().includes(query));

        if (!matchesName && !matchesTitle && !matchesBio && !matchesSpecialties) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDestination, selectedLanguage, searchQuery, locale]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDestination('');
    setSelectedLanguage('');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full">
            Verified Tourism Professionals
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            {t('navGuides')}
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guide name, specialty, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Destination Filter */}
            <div className="relative">
              <MapPin className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-800 cursor-pointer"
              >
                <option value="">{t('searchAllDestinations')}</option>
                {DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name[locale]} ({dest.guideCount})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="relative">
              <Languages className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-800 cursor-pointer"
              >
                <option value="">{t('searchAllLanguages')}</option>
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="th">ไทย (Thai)</option>
                <option value="it">Italiano</option>
              </select>
            </div>
          </div>

          {/* Result Count and Active Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span>
                Showing <strong className="text-slate-900">{filteredGuides.length}</strong> of{' '}
                <strong>{GUIDES.length}</strong> guides
              </span>
            </div>

            {(selectedDestination || selectedLanguage || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No guides found</h3>
            <p className="text-sm text-slate-500 mb-6">
              We couldn’t find any guides matching your current filters. Try searching with fewer conditions.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-emerald-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GuidesDirectoryPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading guides...</div>}>
      <GuidesDirectoryContent />
    </Suspense>
  );
}
