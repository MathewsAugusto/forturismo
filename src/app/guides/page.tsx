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
    <div className="py-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-800 bg-amber-500/10 border border-amber-600/20 px-3.5 py-1.5 rounded-full inline-block">
            Elite Accredited Network
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mt-4">
            {t('navGuides')}
          </h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed font-sans">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-stone-200/90 shadow-sm mb-12 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-amber-700 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search guide by name, city, specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:outline-hidden text-xs sm:text-sm text-stone-900 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Destination Filter */}
            <div className="relative">
              <MapPin className="w-4 h-4 text-amber-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-2xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:outline-hidden text-xs sm:text-sm text-stone-800 cursor-pointer font-medium transition-all"
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
              <Languages className="w-4 h-4 text-amber-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-2xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:outline-hidden text-xs sm:text-sm text-stone-800 cursor-pointer font-medium transition-all"
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
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100 text-xs font-semibold text-stone-500 font-mono">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700" />
              <span>
                Showing <strong className="text-stone-900 font-bold">{filteredGuides.length}</strong> of{' '}
                <strong>{GUIDES.length}</strong> accredited guides
              </span>
            </div>

            {(selectedDestination || selectedLanguage || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-amber-800 hover:text-amber-900 font-bold hover:underline cursor-pointer"
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
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] flex items-center justify-center text-amber-600 mb-4 border border-stone-200">
              <Filter className="w-7 h-7" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-stone-900 mb-2">No guides found</h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-6 font-sans">
              We couldn’t find any guides matching your criteria. Try adjusting or clearing your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-stone-900 text-amber-200 border border-amber-500/30 font-bold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
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
    <Suspense fallback={<div className="p-12 text-center text-stone-500 font-mono">Loading concierge network...</div>}>
      <GuidesDirectoryContent />
    </Suspense>
  );
}
