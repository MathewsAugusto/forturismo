'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS } from '@/data/mock-data';
import { Sparkles, MapPin, Languages, ArrowRight, Star, Video } from 'lucide-react';

interface VideoDestination {
  id: string;
  nameKey: 'thailand' | 'dubai' | 'brazil';
  label: { en: string; pt: string; es: string };
  videoUrl: string;
  poster: string;
}

const VIDEO_DESTINATIONS: VideoDestination[] = [
  {
    id: 'dest-dubai',
    nameKey: 'dubai',
    label: { en: 'Dubai & UAE', pt: 'Dubai e Emirados', es: 'Dubái y EAU' },
    videoUrl: '/videos/dubai.mp4',
    poster: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'dest-thailand',
    nameKey: 'thailand',
    label: { en: 'Thailand', pt: 'Tailândia', es: 'Tailandia' },
    videoUrl: '/videos/thailand.mp4',
    poster: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'dest-brazil',
    nameKey: 'brazil',
    label: { en: 'Brazil (Rio)', pt: 'Brasil (Rio)', es: 'Brasil (Río)' },
    videoUrl: '/videos/brazil.mp4',
    poster: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000&auto=format&fit=crop',
  },
];

export default function ParallaxHero() {
  const { locale, t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  // Active Background Video
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const currentVideo = VIDEO_DESTINATIONS[activeVideoIndex];

  // Quick Filter Form State
  const [selectedDestFilter, setSelectedDestFilter] = useState('');
  const [selectedLangFilter, setSelectedLangFilter] = useState('');

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax Transformations
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/guides';
    const params = new URLSearchParams();
    if (selectedDestFilter) params.append('destination', selectedDestFilter);
    if (selectedLangFilter) params.append('language', selectedLangFilter);
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    window.location.href = url;
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#090E17]"
    >
      {/* --- PARALLAX CINEMATIC BACKGROUND VIDEO --- */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
      >
        <video
          key={currentVideo.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={currentVideo.poster}
          className="w-full h-full object-cover object-center opacity-55 transition-opacity duration-1000"
          onCanPlay={(e) => {
            const playPromise = e.currentTarget.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          }}
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
        </video>

        {/* Cinematic Vignette & Warm Charcoal Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090E17] via-[#090E17]/60 to-[#090E17]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#090E17]/40 to-[#090E17]/90" />
      </motion.div>

      {/* --- FOREGROUND EDITORIAL CONTENT --- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center"
      >
        {/* Floating Concierge Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-xl mb-7"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('heroBadge')}</span>
        </motion.div>

        {/* Main Headline - Editorial Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold text-[#FAF8F5] tracking-tight leading-[1.12] max-w-4xl drop-shadow-md"
        >
          {t('heroTitle')}
        </motion.h1>

        {/* Subtitle - Refined Editorial Lead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg text-stone-300 max-w-2xl font-normal leading-relaxed drop-shadow-sm font-sans"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* Interactive Search Bar - Quiet Luxury Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleHeroSearch}
          className="mt-12 w-full max-w-3xl glass-luxury p-3 sm:p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-3 text-left hover-gold-sheen transition-all"
        >
          {/* Destination select */}
          <div className="w-full md:w-1/2 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
            <div className="flex-1">
              <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                {t('searchDestinationLabel')}
              </span>
              <select
                value={selectedDestFilter}
                onChange={(e) => setSelectedDestFilter(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
              >
                <option value="">{t('searchAllDestinations')}</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name[locale]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Language filter */}
          <div className="w-full md:w-1/3 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all">
            <Languages className="w-4 h-4 text-amber-700 shrink-0" />
            <div className="flex-1">
              <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                {t('searchLanguageLabel')}
              </span>
              <select
                value={selectedLangFilter}
                onChange={(e) => setSelectedLangFilter(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
              >
                <option value="">{t('searchAllLanguages')}</option>
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="th">ไทย (Thai)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-stone-900 text-amber-300 border border-amber-500/40 hover:bg-stone-800 hover:border-amber-400 font-bold text-xs uppercase tracking-wider shadow-lg btn-tactile cursor-pointer whitespace-nowrap"
          >
            <span>{t('searchSubmit')}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </motion.form>

        {/* Live Social Proof Stats - Editorial Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-14 grid grid-cols-3 gap-6 sm:gap-14 border-t border-white/10 pt-8 w-full max-w-2xl text-[#FAF8F5]"
        >
          <div>
            <div className="font-editorial text-2xl sm:text-4xl font-bold text-amber-300">14</div>
            <div className="text-xs text-stone-400 font-medium mt-1 uppercase tracking-wider">{t('heroStatsGuides')}</div>
          </div>
          <div>
            <div className="font-editorial text-2xl sm:text-4xl font-bold text-stone-200">3</div>
            <div className="text-xs text-stone-400 font-medium mt-1 uppercase tracking-wider">{t('heroStatsDestinations')}</div>
          </div>
          <div>
            <div className="font-editorial text-2xl sm:text-4xl font-bold text-amber-400 flex items-center justify-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              4.96
            </div>
            <div className="text-xs text-stone-400 font-medium mt-1 uppercase tracking-wider">{t('heroStatsRating')}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* --- VIDEO DESTINATION SWITCHER BAR --- */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-[#090E17]/85 backdrop-blur-md p-1.5 rounded-2xl border border-amber-500/20 shadow-2xl">
        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 px-2 flex items-center gap-1.5">
          <Video className="w-3.5 h-3.5 text-amber-400" /> Video:
        </span>
        {VIDEO_DESTINATIONS.map((dest, idx) => (
          <button
            key={dest.id}
            onClick={() => setActiveVideoIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeVideoIndex === idx
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
            }`}
          >
            {dest.label[locale]}
          </button>
        ))}
      </div>
    </section>
  );
}
