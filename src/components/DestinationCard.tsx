'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Destination } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DestinationCard({ destination }: { destination: Destination }) {
  const { locale, t } = useLanguage();

  // Combine hero image and gallery for the photo carousel
  const images = [destination.heroImage, ...(destination.gallery || [])];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play slideshow (every 5s when not explicitly hovered)
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide(index);
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <Link
        href={`/destinations/${destination.slug}`}
        className="group relative flex flex-col h-full overflow-hidden rounded-3xl card-concierge cursor-pointer"
      >
        {/* --- IMAGE SLIDESHOW CONTAINER --- */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentSlide]}
                alt={`${destination.name[locale]} - Slide ${currentSlide + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
          </AnimatePresence>

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-stone-950/40 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-900/85 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-md">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              {destination.guideCount} {t('guidesAvailable')}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold font-mono bg-stone-900/85 backdrop-blur-md text-stone-200 border border-white/10">
              {destination.currency}
            </span>
          </div>

          {/* Previous / Next Arrow Controls on Hover */}
          {images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                onClick={prevSlide}
                className="p-1.5 rounded-full bg-stone-950/70 hover:bg-stone-900 text-amber-200 backdrop-blur-md border border-amber-500/30 shadow-md pointer-events-auto transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-1.5 rounded-full bg-stone-950/70 hover:bg-stone-900 text-amber-200 backdrop-blur-md border border-amber-500/30 shadow-md pointer-events-auto transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Slide Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-16 inset-x-0 flex items-center justify-center gap-1.5 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => goToSlide(e, idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${
                    currentSlide === idx
                      ? 'w-6 bg-amber-400 shadow-md'
                      : 'w-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Destination Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
            <h3 className="font-editorial text-2xl font-bold text-white tracking-tight drop-shadow-md">
              {destination.name[locale]}
            </h3>
            <p className="text-xs text-stone-300 font-normal line-clamp-1 mt-0.5 drop-shadow-xs">
              {destination.tagline[locale]}
            </p>
          </div>
        </div>

        {/* --- CARD BODY --- */}
        <div className="p-6 flex flex-col flex-1 justify-between bg-white">
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-6 font-sans">
            {destination.description[locale]}
          </p>

          {/* Top Attraction Highlights */}
          <div className="mb-6 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              {t('topAttractionsTitle')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {destination.topAttractions[locale].slice(0, 3).map((item, index) => (
                <span
                  key={index}
                  className="text-xs font-medium bg-[#FAF8F5] text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-800 group-hover:text-amber-600 transition-colors">
            <span>{t('viewDestination')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
