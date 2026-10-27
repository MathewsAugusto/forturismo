'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS, GUIDES, TOURS } from '@/data/mock-data';
import { BookingRequest, Locale } from '@/types';
import {
  generateBookingReferenceCode,
  formatWhatsAppMessage,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';
import SuccessModal from './SuccessModal';
import {
  Calendar,
  Users,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Compass,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function BookingForm() {
  const searchParams = useSearchParams();
  const { locale, t } = useLanguage();

  // URL Query Parameters pre-fill
  const paramDestination = searchParams.get('destination') || '';
  const paramGuide = searchParams.get('guide') || '';
  const paramTour = searchParams.get('tour') || '';

  // Form State
  const [destinationId, setDestinationId] = useState<string>(DESTINATIONS[0].id);
  const [guideId, setGuideId] = useState<string>('');
  const [tourId, setTourId] = useState<string>('');
  const [travelDateStart, setTravelDateStart] = useState<string>('');
  const [travelDateEnd, setTravelDateEnd] = useState<string>('');
  const [paxAdults, setPaxAdults] = useState<number>(2);
  const [paxChildren, setPaxChildren] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [preferredLocale, setPreferredLocale] = useState<Locale>(locale);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Success Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<BookingRequest | null>(null);
  const [modalWhatsAppUrl, setModalWhatsAppUrl] = useState<string>('');
  const [modalMessageText, setModalMessageText] = useState<string>('');

  // Handle URL parameters initialization
  useEffect(() => {
    if (paramDestination) {
      const matchDest = DESTINATIONS.find((d) => d.id === paramDestination || d.slug === paramDestination);
      if (matchDest) setDestinationId(matchDest.id);
    }
    if (paramGuide) {
      const matchGuide = GUIDES.find((g) => g.id === paramGuide || g.slug === paramGuide);
      if (matchGuide) {
        setGuideId(matchGuide.id);
        setDestinationId(matchGuide.destinationId);
      }
    }
    if (paramTour) {
      const matchTour = TOURS.find((t) => t.id === paramTour || t.slug === paramTour);
      if (matchTour) {
        setTourId(matchTour.id);
        setDestinationId(matchTour.destinationId);
        if (matchTour.guideId) setGuideId(matchTour.guideId);
      }
    }
  }, [paramDestination, paramGuide, paramTour]);

  // Keep preferredLocale in sync with active locale if user hasn't explicitly overridden
  useEffect(() => {
    setPreferredLocale(locale);
  }, [locale]);

  // Filter available guides and tours based on destination
  const availableGuides = GUIDES.filter((g) => g.destinationId === destinationId);
  const availableTours = TOURS.filter((t) => t.destinationId === destinationId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refCode = generateBookingReferenceCode();

    const booking: BookingRequest = {
      id: `booking-${Date.now()}`,
      referenceCode: refCode,
      destinationId,
      guideId: guideId || undefined,
      tourId: tourId || undefined,
      customerName,
      customerEmail,
      customerPhone,
      travelDateStart: travelDateStart || new Date().toISOString().split('T')[0],
      travelDateEnd: travelDateEnd || undefined,
      paxAdults,
      paxChildren,
      preferredLocale,
      specialNotes,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    // Save in localStorage for audit
    try {
      const existing = JSON.parse(localStorage.getItem('forturismo_bookings') || '[]');
      existing.unshift(booking);
      localStorage.setItem('forturismo_bookings', JSON.stringify(existing));
    } catch {
      // Storage error fallback
    }

    const waUrl = buildWhatsAppUrl({ booking });
    const waText = formatWhatsAppMessage(booking, preferredLocale);

    setCreatedBooking(booking);
    setModalWhatsAppUrl(waUrl);
    setModalMessageText(waText);
    setIsSubmitting(false);
    setModalOpen(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-8"
      >
        {/* Destination & Preferences Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-sky-700 font-bold text-sm uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>1. {t('fieldDestination')} & {t('navGuides')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldDestination')} *
              </label>
              <select
                value={destinationId}
                onChange={(e) => {
                  setDestinationId(e.target.value);
                  setGuideId(''); // reset guide on destination change
                  setTourId('');
                }}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm font-semibold text-slate-900 transition-colors"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name[locale]} ({d.guideCount} {t('guidesAvailable').split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Guide Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldGuide')}
              </label>
              <select
                value={guideId}
                onChange={(e) => setGuideId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900 transition-colors"
              >
                <option value="">{t('fieldGuideAny')}</option>
                {availableGuides.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.fullName} — {g.rating.toFixed(2)} ★ ({g.yearsExperience} yrs exp)
                  </option>
                ))}
              </select>
            </div>

            {/* Tour Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldTour')}
              </label>
              <select
                value={tourId}
                onChange={(e) => setTourId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900 transition-colors"
              >
                <option value="">{t('fieldTourCustom')}</option>
                {availableTours.map((tour) => (
                  <option key={tour.id} value={tour.id}>
                    {tour.title[locale]} ({tour.durationHours}h — From ${tour.priceStartingUSD})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dates & Group Size */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-sky-700 font-bold text-sm uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>2. {t('fieldDates')} & {t('fieldAdults')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldDateStart')} *
              </label>
              <input
                type="date"
                required
                value={travelDateStart}
                onChange={(e) => setTravelDateStart(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldDateEnd')}
              </label>
              <input
                type="date"
                value={travelDateEnd}
                onChange={(e) => setTravelDateEnd(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldAdults')} *
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  max="50"
                  required
                  value={paxAdults}
                  onChange={(e) => setPaxAdults(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm font-semibold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldChildren')}
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={paxChildren}
                  onChange={(e) => setPaxChildren(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm font-semibold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Traveler Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-sky-700 font-bold text-sm uppercase tracking-wider">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>3. {t('fieldName')} & Contato</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldName')} *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Oliveira"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldEmail')} *
              </label>
              <input
                type="email"
                required
                placeholder="carlos@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('fieldPhone')} *
              </label>
              <input
                type="tel"
                required
                placeholder="+55 11 98888-7777"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('fieldLocale')}
            </label>
            <div className="flex gap-4">
              {[
                { code: 'pt', label: 'Português' },
                { code: 'en', label: 'English' },
                { code: 'es', label: 'Español' },
              ].map((item) => (
                <label
                  key={item.code}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-xs font-bold transition-all ${
                    preferredLocale === item.code
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="preferredLocale"
                    value={item.code}
                    checked={preferredLocale === item.code}
                    onChange={() => setPreferredLocale(item.code as Locale)}
                    className="sr-only"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('fieldNotes')}
            </label>
            <textarea
              rows={3}
              placeholder={t('fieldNotesPlaceholder')}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm text-slate-900"
            />
          </div>
        </div>

        {/* Submit Section */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('privacyDisclaimer')}</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white font-black text-base shadow-lg shadow-emerald-900/15 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            <MessageCircle className="w-5 h-5" />
            {isSubmitting ? t('submittingBtn') : t('submitBookingBtn')}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {createdBooking && (
        <SuccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          referenceCode={createdBooking.referenceCode}
          whatsAppUrl={modalWhatsAppUrl}
          messageText={modalMessageText}
        />
      )}
    </>
  );
}
