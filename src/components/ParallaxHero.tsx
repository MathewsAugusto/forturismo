'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS } from '@/data/mock-data';
import { Sparkles, MapPin, Languages, ArrowRight, Star, Video, Play } from 'lucide-react';

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
    videoUrl: 'https://cdn.coverr.co/videos/coverr-flying-over-dubai-at-sunset-5401/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'dest-thailand',
    nameKey: 'thailand',
    label: { en: 'Thailand', pt: 'Tailândia', es: 'Tailandia' },
    videoUrl: 'https://cdn.coverr.co/videos/coverr-tropical-beach-and-palms-in-thailand-6098/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'dest-brazil',
    nameKey: 'brazil',
    label: { en: 'Brazil (Rio)', pt: 'Brasil (Rio)', es: 'Brasil (Río)' },
    videoUrl: 'https://cdn.coverr.co/videos/coverr-flying-over-rio-de-janeiro-5621/1080p.mp4',
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
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* --- PARALLAX BACKGROUND VIDEO CONTAINER --- */}
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
          poster={currentVideo.poster}
          className="w-full h-full object-cover object-center opacity-45 transition-opacity duration-1000"
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
        </video>

        {/* Cinematic Vignette & Color Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90" />
      </motion.div>

      {/* --- FOREGROUND PARALLAX CONTENT --- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center"
      >
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs sm:text-sm font-bold shadow-lg mb-6"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span>{t('heroBadge')}</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-lg max-w-4xl"
        >
          {t('heroTitle')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow-md"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* Interactive Search Bar with Floating Glassmorphism */}
        <motion.form
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleHeroSearch}
          className="mt-10 w-full max-w-3xl bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/30 flex flex-col md:flex-row items-center gap-3 text-left hover:shadow-emerald-950/20 transition-all"
        >
          {/* Destination select */}
          <div className="w-full md:w-1/2 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus-within:border-sky-500 focus-within:bg-white transition-colors">
            <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
            <div className="flex-1">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t('searchDestinationLabel')}
              </span>
              <select
                value={selectedDestFilter}
                onChange={(e) => setSelectedDestFilter(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
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
          <div className="w-full md:w-1/3 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus-within:border-emerald-500 focus-within:bg-white transition-colors">
            <Languages className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="flex-1">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t('searchLanguageLabel')}
              </span>
              <select
                value={selectedLangFilter}
                onChange={(e) => setSelectedLangFilter(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
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
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-md hover:from-emerald-500 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
          >
            {t('searchSubmit')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>

        {/* Live Social Proof Stats with Subtle Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-6 sm:gap-12 border-t border-white/10 pt-8 w-full max-w-2xl text-white"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">14</div>
            <div className="text-xs text-slate-300 font-medium mt-1">{t('heroStatsGuides')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-400">3</div>
            <div className="text-xs text-slate-300 font-medium mt-1">{t('heroStatsDestinations')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-amber-400" />
              4.96
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">{t('heroStatsRating')}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* --- INTERACTIVE VIDEO DESTINATION SWITCHER BAR --- */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1">
          <Video className="w-3.5 h-3.5 text-emerald-400" /> Video:
        </span>
        {VIDEO_DESTINATIONS.map((dest, idx) => (
          <button
            key={dest.id}
            onClick={() => setActiveVideoIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeVideoIndex === idx
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {dest.label[locale]}
          </button>
        ))}
      </div>
    </section>
  );
}
