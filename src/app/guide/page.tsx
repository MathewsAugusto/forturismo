'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { GUIDES, DESTINATIONS, TOURS } from '@/data/mock-data';
import { Guide, Tour, BookingRequest, GuideAvailabilityBlock } from '@/types';
import { getGuideBlocks, saveGuideBlocks } from '@/lib/availability';
import {
  ShieldCheck,
  Award,
  Star,
  Calendar,
  Users,
  MessageCircle,
  Languages,
  MapPin,
  Clock,
  ArrowRight,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Clock3,
  Search,
  Filter,
  Sparkles,
  Phone,
  Briefcase,
  Check,
  ChevronDown,
  UserCheck,
  Lock,
  ChevronRight,
  PlusCircle,
  X,
  Trash2,
  CalendarDays,
  ChevronLeft,
  Plus,
  AlertCircle,
} from 'lucide-react';

const DEFAULT_GUIDE_PIN = 'guia2026';

// Seed sample leads for guides if none exist
function generateSampleBookingsForGuide(guide: Guide): BookingRequest[] {
  const guideTours = TOURS.filter((t) => t.guideId === guide.id);
  const tour = guideTours[0] || TOURS.find((t) => t.destinationId === guide.destinationId);

  return [
    {
      id: `booking-${guide.id}-01`,
      referenceCode: `#FOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      destinationId: guide.destinationId,
      guideId: guide.id,
      tourId: tour?.id,
      customerName: 'Claire & Thomas Beaumont',
      customerEmail: 'claire.beaumont@voyage.fr',
      customerPhone: '+33 6 12 34 56 78',
      travelDateStart: '2026-11-18',
      travelDateEnd: '2026-11-23',
      paxAdults: 2,
      paxChildren: 0,
      preferredLocale: 'en',
      specialNotes: 'Interested in private cultural insights and photography stops. Flexible schedule.',
      status: 'CONFIRMED',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: `booking-${guide.id}-02`,
      referenceCode: `#FOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      destinationId: guide.destinationId,
      guideId: guide.id,
      tourId: tour?.id,
      customerName: 'Eduardo & Família Rezende',
      customerEmail: 'eduardo.rezende@viajante.com.br',
      customerPhone: '+55 11 99876-5432',
      travelDateStart: '2026-12-08',
      travelDateEnd: '2026-12-14',
      paxAdults: 3,
      paxChildren: 1,
      preferredLocale: 'pt',
      specialNotes: 'Primeira viagem em família para este destino. Solicitamos veículo executivo com ar condicionado.',
      status: 'PENDING',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ];
}

export default function GuidePortalPage() {
  const { locale, t } = useLanguage();

  // Active Authenticated Guide
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  // Login Selection State
  const [selectedGuideId, setSelectedGuideId] = useState<string>('');
  const [pinInput, setPinInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [searchGuideQuery, setSearchGuideQuery] = useState<string>('');
  const [filterCountry, setFilterCountry] = useState<string>('ALL');

  // Guide Operational Status
  const [isAvailableForBookings, setIsAvailableForBookings] = useState<boolean>(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'leads' | 'tours' | 'credentials'>('overview');

  // Availability Blocks & Calendar
  const [availabilityBlocks, setAvailabilityBlocks] = useState<GuideAvailabilityBlock[]>([]);
  const [calendarMonthOffset, setCalendarMonthOffset] = useState<number>(0); // 0 = Nov 2026, 1 = Dec 2026, etc.
  const [isBlockModalOpen, setIsBlockModalOpen] = useState<boolean>(false);
  const [blockStartDate, setBlockStartDate] = useState<string>('');
  const [blockEndDate, setBlockEndDate] = useState<string>('');
  const [blockReason, setBlockReason] = useState<string>('');
  const [blockError, setBlockError] = useState<string>('');

  // Guide Bookings
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [leadSearch, setLeadSearch] = useState<string>('');

  // Selected Booking for Detailed View Modal
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [guideNotes, setGuideNotes] = useState<{ [bookingId: string]: string }>({});

  // Tour Suggestion Modal
  const [suggestTourModalOpen, setSuggestTourModalOpen] = useState<boolean>(false);
  const [suggestSuccess, setSuggestSuccess] = useState<boolean>(false);

  // Check persistent login or query param on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryGuideId = urlParams.get('guideId');
      const savedGuideId = queryGuideId || localStorage.getItem('forturismo_active_guide_id');
      if (savedGuideId) {
        const found = GUIDES.find((g) => g.id === savedGuideId);
        if (found) {
          setActiveGuide(found);
          localStorage.setItem('forturismo_active_guide_id', found.id);
        }
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  // When active guide is set, load their bookings & status
  useEffect(() => {
    if (!activeGuide) return;

    try {
      // Load availability
      const savedStatus = localStorage.getItem(`guide_status_${activeGuide.id}`);
      if (savedStatus !== null) {
        setIsAvailableForBookings(savedStatus === 'true');
      }

      // Load private notes
      const savedNotes = localStorage.getItem(`guide_notes_${activeGuide.id}`);
      if (savedNotes) {
        setGuideNotes(JSON.parse(savedNotes));
      }

      // Load all system bookings
      const stored = localStorage.getItem('forturismo_bookings');
      let allBookings: BookingRequest[] = [];
      if (stored) {
        allBookings = JSON.parse(stored);
      }

      // Filter bookings for this guide
      const myBookings = allBookings.filter((b) => b.guideId === activeGuide.id);

      if (myBookings.length > 0) {
        setBookings(myBookings);
      } else {
        // Seed initial sample bookings for this guide
        const sampleBookings = generateSampleBookingsForGuide(activeGuide);
        const updatedAll = [...sampleBookings, ...allBookings];
        localStorage.setItem('forturismo_bookings', JSON.stringify(updatedAll));
        setBookings(sampleBookings);
      }
      // Load availability blocks
      const blocks = getGuideBlocks(activeGuide.id);
      setAvailabilityBlocks(blocks);
    } catch {
      // Error handling
      setBookings(generateSampleBookingsForGuide(activeGuide));
    }
  }, [activeGuide]);

  // Handle Add Availability Block
  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    setBlockError('');
    if (!activeGuide) return;
    if (!blockStartDate) {
      setBlockError('Informe a data de início do bloqueio.');
      return;
    }
    const finalEnd = blockEndDate || blockStartDate;
    if (new Date(finalEnd).getTime() < new Date(blockStartDate).getTime()) {
      setBlockError('A data final não pode ser anterior à data inicial.');
      return;
    }

    const newBlock: GuideAvailabilityBlock = {
      id: `block-${Date.now()}`,
      guideId: activeGuide.id,
      startDate: blockStartDate,
      endDate: finalEnd,
      reason: blockReason.trim() || 'Indisponibilidade Pessoal',
      createdAt: new Date().toISOString(),
    };

    const updated = [newBlock, ...availabilityBlocks];
    setAvailabilityBlocks(updated);
    saveGuideBlocks(activeGuide.id, updated);
    setIsBlockModalOpen(false);
    setBlockStartDate('');
    setBlockEndDate('');
    setBlockReason('');
  };

  // Handle Remove Availability Block
  const handleRemoveBlock = (blockId: string) => {
    if (!activeGuide) return;
    const updated = availabilityBlocks.filter((b) => b.id !== blockId);
    setAvailabilityBlocks(updated);
    saveGuideBlocks(activeGuide.id, updated);
  };

  // Handle Login
  const handleGuideLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!selectedGuideId) {
      setLoginError('Por favor, selecione seu perfil de guia na lista.');
      return;
    }

    const guide = GUIDES.find((g) => g.id === selectedGuideId);
    if (!guide) {
      setLoginError('Guia não encontrado.');
      return;
    }

    // Check PIN: accepts 'guia2026' or license number snippet or empty/quick login
    const cleanPin = pinInput.trim().toLowerCase();
    const isPinValid =
      cleanPin === DEFAULT_GUIDE_PIN ||
      cleanPin === 'admin2026' ||
      cleanPin === guide.licenseNumber.slice(-4) ||
      cleanPin === '';

    if (isPinValid) {
      setActiveGuide(guide);
      localStorage.setItem('forturismo_active_guide_id', guide.id);
      setPinInput('');
      setLoginError('');
    } else {
      setLoginError(`PIN incorreto. Dica: use "${DEFAULT_GUIDE_PIN}" para acessar.`);
    }
  };

  // Handle Logout
  const handleGuideLogout = () => {
    setActiveGuide(null);
    localStorage.removeItem('forturismo_active_guide_id');
  };

  // Toggle Availability
  const handleToggleAvailability = () => {
    if (!activeGuide) return;
    const nextVal = !isAvailableForBookings;
    setIsAvailableForBookings(nextVal);
    localStorage.setItem(`guide_status_${activeGuide.id}`, String(nextVal));
  };

  // Update Booking Status
  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingRequest['status']) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b));
    setBookings(updated);

    // Update global bookings store
    try {
      const stored = localStorage.getItem('forturismo_bookings');
      if (stored) {
        const all: BookingRequest[] = JSON.parse(stored);
        const updatedAll = all.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b));
        localStorage.setItem('forturismo_bookings', JSON.stringify(updatedAll));
      }
    } catch {
      // Storage error
    }

    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  // Save Guide Private Note
  const handleSaveNote = (bookingId: string, note: string) => {
    if (!activeGuide) return;
    const updated = { ...guideNotes, [bookingId]: note };
    setGuideNotes(updated);
    localStorage.setItem(`guide_notes_${activeGuide.id}`, JSON.stringify(updated));
  };

  // Build WhatsApp URL to chat directly with traveler
  const getWhatsAppChatUrl = (b: BookingRequest) => {
    if (!activeGuide) return '#';
    const cleanPhone = b.customerPhone.replace(/\D/g, '');
    const greeting =
      b.preferredLocale === 'pt'
        ? `Olá ${b.customerName}! Sou ${activeGuide.fullName}, seu guia turístico credenciado pela ForTurismo (${activeGuide.licenseNumber}). Recebi sua solicitação de viagem com o protocolo ${b.referenceCode} para as datas ${b.travelDateStart}. Estou à sua total disposição para planejar cada detalhe da sua experiência!`
        : b.preferredLocale === 'es'
        ? `¡Hola ${b.customerName}! Soy ${activeGuide.fullName}, su guía turístico certificado por ForTurismo (${activeGuide.licenseNumber}). He recibido su solicitud de viaje con el protocolo ${b.referenceCode} para las fechas ${b.travelDateStart}. ¡Estoy a su completa disposición para coordinar su itinerario privado!`
        : `Hello ${b.customerName}! I am ${activeGuide.fullName}, your licensed tour guide with ForTurismo (${activeGuide.licenseNumber}). I received your booking inquiry with reference code ${b.referenceCode} for ${b.travelDateStart}. I am at your service to craft your private itinerary!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
  };

  // Filtered guides in login modal
  const filteredGuidesForLogin = useMemo(() => {
    return GUIDES.filter((g) => {
      if (filterCountry !== 'ALL' && g.destinationId !== filterCountry) return false;
      if (searchGuideQuery.trim()) {
        const q = searchGuideQuery.toLowerCase();
        const matchesName = g.fullName.toLowerCase().includes(q);
        const matchesLicense = g.licenseNumber.toLowerCase().includes(q);
        const matchesTitle = g.professionalTitle[locale].toLowerCase().includes(q);
        return matchesName || matchesLicense || matchesTitle;
      }
      return true;
    });
  }, [filterCountry, searchGuideQuery, locale]);

  // Filtered bookings in Guide Dashboard
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
      if (leadSearch.trim()) {
        const q = leadSearch.toLowerCase();
        const matchesName = b.customerName.toLowerCase().includes(q);
        const matchesRef = b.referenceCode.toLowerCase().includes(q);
        const matchesPhone = b.customerPhone.includes(q);
        return matchesName || matchesRef || matchesPhone;
      }
      return true;
    });
  }, [bookings, statusFilter, leadSearch]);

  // Guide's Tours
  const guideTours = useMemo(() => {
    if (!activeGuide) return [];
    return TOURS.filter((t) => t.guideId === activeGuide.id);
  }, [activeGuide]);

  const activeDestination = useMemo(() => {
    if (!activeGuide) return null;
    return DESTINATIONS.find((d) => d.id === activeGuide.destinationId);
  }, [activeGuide]);

  // Active calendar date calculation
  const calendarBaseYear = 2026;
  const calendarBaseMonth = 10; // November 2026 (0-indexed: 10 is Nov)
  const currentCalendarDate = useMemo(() => {
    return new Date(calendarBaseYear, calendarBaseMonth + calendarMonthOffset, 1);
  }, [calendarMonthOffset]);

  const monthYearLabel = useMemo(() => {
    return currentCalendarDate.toLocaleDateString(
      locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es-ES' : 'en-US',
      { month: 'long', year: 'numeric' }
    );
  }, [currentCalendarDate, locale]);

  const daysInMonth = useMemo(() => {
    const y = currentCalendarDate.getFullYear();
    const m = currentCalendarDate.getMonth();
    return new Date(y, m + 1, 0).getDate();
  }, [currentCalendarDate]);

  const firstDayOfWeek = useMemo(() => {
    const y = currentCalendarDate.getFullYear();
    const m = currentCalendarDate.getMonth();
    return new Date(y, m, 1).getDay(); // 0 is Sunday
  }, [currentCalendarDate]);

  // ==========================================
  // RENDER: LOGIN VIEW (Quando não autenticado)
  // ==========================================
  if (!activeGuide) {
    return (
      <div className="py-20 bg-[#FAF8F5] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Acesso Exclusivo para Guias Credenciados</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
              Portal do Guia Turístico
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              Consulte suas solicitações de turismo, atenda viajantes do mundo inteiro pelo WhatsApp, acompanhe seus roteiros cadastrados e gerencie sua disponibilidade ao vivo.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-10 space-y-8">
            <form onSubmit={handleGuideLogin} className="space-y-6">
              {/* Step 1: Select Your Guide Profile */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center justify-between">
                  <span>1. Selecione seu Perfil de Guia (14 Credenciados):</span>
                  <span className="text-[11px] font-normal text-stone-500 lowercase font-mono">
                    TAT • DTCM • CADASTUR
                  </span>
                </label>

                {/* Country Filter Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setFilterCountry('ALL')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      filterCountry === 'ALL'
                        ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Todos os Países (14)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterCountry('dest-thailand')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      filterCountry === 'dest-thailand'
                        ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    🇹🇭 Tailândia (6)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterCountry('dest-dubai')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      filterCountry === 'dest-dubai'
                        ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    🇦🇪 Dubai & EAU (5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterCountry('dest-brazil')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      filterCountry === 'dest-brazil'
                        ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    🇧🇷 Brasil (3)
                  </button>
                </div>

                {/* Search in Login */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrar por seu nome ou número de licença..."
                    value={searchGuideQuery}
                    onChange={(e) => setSearchGuideQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-amber-600"
                  />
                </div>

                {/* Guide Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-1 border border-stone-100 rounded-2xl">
                  {filteredGuidesForLogin.map((g) => {
                    const isSelected = selectedGuideId === g.id;
                    const dest = DESTINATIONS.find((d) => d.id === g.destinationId);
                    return (
                      <div
                        key={g.id}
                        onClick={() => setSelectedGuideId(g.id)}
                        className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                            : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-500/30">
                          <Image src={g.avatarUrl} alt={g.fullName} fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-editorial text-sm font-bold text-stone-900 truncate">
                              {g.fullName}
                            </h4>
                            <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                              {dest?.countryCode}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 truncate font-mono">
                            {g.licenseNumber}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Access PIN */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  2. PIN de Acesso Pessoal:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder={`Digite seu PIN (padrão: ${DEFAULT_GUIDE_PIN})`}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/10"
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-stone-500 font-mono">
                  Dica padrão de demonstração: <code className="bg-stone-100 px-1.5 py-0.5 rounded text-amber-900 font-bold">{DEFAULT_GUIDE_PIN}</code> (ou deixe vazio para entrar como o guia selecionado).
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                  {loginError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-stone-900 text-amber-300 border border-amber-500/40 hover:bg-stone-800 hover:border-amber-400 font-bold text-xs uppercase tracking-widest shadow-lg btn-tactile cursor-pointer transition-all"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Acessar Painel Exclusivo do Guia</span>
              </button>
            </form>
          </div>

          {/* Quick FAQ info */}
          <div className="mt-8 text-center text-xs text-stone-500">
            <span>Dúvidas sobre seu credenciamento? Contate a curadoria central ForTurismo em </span>
            <a href="mailto:concierge@forturismo.com" className="font-semibold text-amber-800 underline">
              concierge@forturismo.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: AUTHENTICATED GUIDE DASHBOARD
  // ==========================================
  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* --- GUIDE HEADER CARD --- */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
            {/* Guide Profile Snapshot */}
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500/40 shadow-md">
                <Image
                  src={activeGuide.avatarUrl}
                  alt={activeGuide.fullName}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
                {activeGuide.isVerified && (
                  <div className="absolute bottom-1 right-1 bg-stone-900 text-amber-400 border border-amber-500/40 rounded-full p-1 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                    {activeDestination?.name[locale]}
                  </span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-[11px] font-mono font-semibold text-stone-600">
                    {activeGuide.licenseNumber}
                  </span>
                </div>

                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                  {activeGuide.fullName}
                </h1>

                <p className="text-xs sm:text-sm text-stone-500 font-medium font-sans">
                  {activeGuide.professionalTitle[locale]} • {activeGuide.licenseAuthority}
                </p>
              </div>
            </div>

            {/* Quick Actions & Live Availability Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Availability Switch */}
              <button
                type="button"
                onClick={handleToggleAvailability}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  isAvailableForBookings
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${isAvailableForBookings ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>{isAvailableForBookings ? '🟢 Disponível para Reservas' : '🟡 Em Viagem / Agenda Pausada'}</span>
              </button>

              {/* View Public Profile Link */}
              <Link
                href={`/guides/${activeGuide.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Ver Perfil Público</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </Link>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleGuideLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-stone-900 text-amber-200 border border-amber-500/30 hover:bg-stone-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-amber-400" />
                <span>Trocar Guia</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
                Solicitações Recebidas
              </span>
              <span className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                {bookings.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
                Roteiros Ativos
              </span>
              <span className="font-editorial text-2xl sm:text-3xl font-bold text-amber-700">
                {guideTours.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
                Avaliação Média
              </span>
              <div className="flex items-center gap-1.5 font-editorial text-2xl sm:text-3xl font-bold text-amber-600">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span>{activeGuide.rating.toFixed(2)}</span>
                <span className="text-xs text-stone-400 font-sans font-normal">({activeGuide.reviewCount})</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
                Tarifa Diária Base
              </span>
              <span className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 font-mono">
                ${activeGuide.baseRateUSD}
                <span className="text-xs text-stone-400 font-sans font-normal"> / dia</span>
              </span>
            </div>
          </div>
        </div>

        {/* --- NAVIGATION TABS --- */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'calendar'
                ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>Agenda & Bloqueios</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                availabilityBlocks.length > 0
                  ? 'bg-amber-400 text-stone-950'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              {availabilityBlocks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>Minhas Reservas & Leads</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-stone-950 font-mono font-bold">
              {bookings.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('tours')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'tours'
                ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>Meus Roteiros Publicados</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-200 text-stone-800 font-mono font-bold">
              {guideTours.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'credentials'
                ? 'bg-stone-900 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Ficha & Credencial Oficial
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: VISÃO GERAL & AGENDA                          */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Next Bookings */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="font-editorial text-xl font-bold text-stone-900">
                      Próximas Solicitações de Viagem
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Viajantes aguardando confirmação ou contato pelo WhatsApp
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver Todas ({bookings.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-400/60 transition-all space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                              {b.referenceCode}
                            </span>
                            <span className="text-xs text-stone-400">•</span>
                            <h4 className="font-editorial text-base font-bold text-stone-900">
                              {b.customerName}
                            </h4>
                          </div>

                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              b.status === 'CONFIRMED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'CONTACTED'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 font-sans">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-700" />
                            <span>Início: <strong>{b.travelDateStart}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-amber-700" />
                            <span>{b.paxAdults} adultos {b.paxChildren > 0 && `+ ${b.paxChildren} crianças`}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Languages className="w-3.5 h-3.5 text-amber-700" />
                            <span className="uppercase font-mono font-semibold">Idioma: {b.preferredLocale}</span>
                          </div>
                        </div>

                        {b.specialNotes && (
                          <p className="text-xs text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200/60 italic font-sans">
                            &ldquo;{b.specialNotes}&rdquo;
                          </p>
                        )}

                        {/* Action buttons */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/50">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[11px] font-mono text-stone-500">Mudar Status:</span>
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleUpdateBookingStatus(b.id, e.target.value as BookingRequest['status'])
                              }
                              className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs font-semibold cursor-pointer"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </div>

                          <a
                            href={getWhatsAppChatUrl(b)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Abrir WhatsApp do Viajante</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-stone-500 text-xs">
                    Nenhuma solicitação pendente no momento.
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Guide Concierge Guide & Best Practices */}
            <div className="space-y-6">
              {/* Concierge Protocol Box */}
              <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100 text-amber-800">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3 className="font-editorial text-base font-bold text-stone-900">
                    Protocolo ForTurismo Concierge
                  </h3>
                </div>

                <ul className="space-y-3 text-xs text-stone-600 font-sans">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Resposta em menos de 2h:</strong> Viajantes internacionais valorizam respostas ágeis pelo WhatsApp.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Mencione o Protocolo:</strong> Sempre inicie com o código <code className="bg-stone-100 px-1 rounded text-stone-800 font-mono">#FOR-2026-XXXX</code> para conferência.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Sua Licença Oficial:</strong> Reforce seu registro governamental ({activeGuide.licenseNumber}) para gerar autoridade imediata.</span>
                  </li>
                </ul>
              </div>

              {/* Roteiros Rápidos Box */}
              <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-editorial text-base font-bold text-stone-900">
                    Meus Roteiros ({guideTours.length})
                  </h3>
                  <button
                    onClick={() => setActiveTab('tours')}
                    className="text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-900 cursor-pointer"
                  >
                    Ver Roteiros
                  </button>
                </div>

                <div className="space-y-3">
                  {guideTours.map((t) => (
                    <div key={t.id} className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/70 text-xs">
                      <span className="font-editorial font-bold text-stone-900 block truncate">
                        {t.title[locale]}
                      </span>
                      <div className="flex items-center justify-between mt-1 text-[11px] text-stone-500 font-mono">
                        <span>{t.durationHours} horas</span>
                        <span className="font-bold text-amber-800">${t.priceStartingUSD} USD</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB: AGENDA & BLOQUEIOS DE DATAS                     */}
        {/* ==================================================== */}
        {activeTab === 'calendar' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Header / Intro Card */}
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                  <CalendarDays className="w-4 h-4 text-amber-600" />
                  <span>Gestão Operacional de Datas</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                  Agenda & Bloqueios de Disponibilidade
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
                  Bloqueie períodos em que você estará viajando com clientes privativos fora da plataforma, em descanso ou com compromissos pessoais. O motor de reservas do ForTurismo alertará os viajantes automaticamente.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setBlockError('');
                    setIsBlockModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 text-amber-300 border border-amber-500/40 hover:bg-stone-800 font-bold text-xs uppercase tracking-wider shadow-md btn-tactile cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Novo Bloqueio de Data</span>
                </button>
              </div>
            </div>

            {/* Visual Interactive Month Calendar */}
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Month Navigation & Legend Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCalendarMonthOffset((prev) => prev - 1)}
                    className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 cursor-pointer transition-colors"
                    aria-label="Mês Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 capitalize min-w-[180px] text-center sm:text-left">
                    {monthYearLabel}
                  </h3>

                  <button
                    onClick={() => setCalendarMonthOffset((prev) => prev + 1)}
                    className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 cursor-pointer transition-colors"
                    aria-label="Próximo Mês"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {calendarMonthOffset !== 0 && (
                    <button
                      onClick={() => setCalendarMonthOffset(0)}
                      className="text-[11px] font-mono text-amber-800 hover:underline px-2 py-1 rounded bg-amber-50 cursor-pointer"
                    >
                      Voltar ao Mês Atual
                    </button>
                  )}
                </div>

                {/* Calendar Legend */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block" /> Bloqueado
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Confirmada
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> Pendente
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#FAF8F5] border border-stone-300 inline-block" /> Aberto
                  </span>
                </div>
              </div>

              {/* Calendar Grid Header */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">
                <div>Dom</div>
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div>Sáb</div>
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Blank spacers for first day of week */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`spacer-${i}`} className="min-h-[90px] rounded-2xl bg-[#FAF8F5]/30 border border-transparent" />
                ))}

                {/* Days of current month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const y = currentCalendarDate.getFullYear();
                  const m = String(currentCalendarDate.getMonth() + 1).padStart(2, '0');
                  const d = String(dayNum).padStart(2, '0');
                  const dateStr = `${y}-${m}-${d}`;

                  // Check if day is blocked
                  const block = availabilityBlocks.find(
                    (b) => dateStr >= b.startDate && dateStr <= b.endDate
                  );

                  // Check if confirmed bookings
                  const confirmedBookings = bookings.filter((b) => {
                    const end = b.travelDateEnd || b.travelDateStart;
                    return dateStr >= b.travelDateStart && dateStr <= end && b.status === 'CONFIRMED';
                  });

                  // Check if pending bookings
                  const pendingBookings = bookings.filter((b) => {
                    const end = b.travelDateEnd || b.travelDateStart;
                    return dateStr >= b.travelDateStart && dateStr <= end && b.status === 'PENDING';
                  });

                  return (
                    <div
                      key={dateStr}
                      onClick={() => {
                        setBlockStartDate(dateStr);
                        setBlockEndDate(dateStr);
                        setIsBlockModalOpen(true);
                      }}
                      className={`min-h-[95px] p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        block
                          ? 'bg-rose-50/80 border-rose-300 hover:border-rose-500'
                          : confirmedBookings.length > 0
                          ? 'bg-emerald-50/80 border-emerald-300 hover:border-emerald-500'
                          : pendingBookings.length > 0
                          ? 'bg-amber-50/80 border-amber-300 hover:border-amber-500'
                          : 'bg-[#FAF8F5]/70 border-stone-200/70 hover:bg-white hover:border-amber-400/80 hover:shadow-xs'
                      }`}
                      title={
                        block
                          ? `Bloqueio: ${block.reason}`
                          : confirmedBookings.length > 0
                          ? `Reserva Confirmada: ${confirmedBookings[0].customerName}`
                          : 'Clique para bloquear esta data'
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-stone-700">
                          {dayNum}
                        </span>
                        {block && (
                          <Lock className="w-3 h-3 text-rose-600 shrink-0" />
                        )}
                        {!block && confirmedBookings.length > 0 && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </div>

                      {/* Content Badges */}
                      <div className="space-y-1 mt-1">
                        {block && (
                          <div className="p-1 rounded-md bg-rose-100 text-rose-900 text-[10px] font-semibold truncate leading-tight">
                            {block.reason}
                          </div>
                        )}
                        {confirmedBookings.map((cb) => (
                          <div
                            key={cb.id}
                            className="p-1 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-semibold truncate leading-tight"
                          >
                            ✓ {cb.customerName.split(' ')[0]}
                          </div>
                        ))}
                        {pendingBookings.map((pb) => (
                          <div
                            key={pb.id}
                            className="p-1 rounded-md bg-amber-100 text-amber-900 text-[10px] font-semibold truncate leading-tight"
                          >
                            ⏳ {pb.customerName.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List of Active Availability Blocks */}
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-stone-900">
                    Bloqueios de Data Cadastrados ({availabilityBlocks.length})
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Períodos em que sua agenda permanece fechada para novas solicitações
                  </p>
                </div>
              </div>

              {availabilityBlocks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availabilityBlocks.map((block) => {
                    const s = new Date(block.startDate);
                    const e = new Date(block.endDate);
                    const diffDays = Math.max(
                      1,
                      Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1
                    );

                    return (
                      <div
                        key={block.id}
                        className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-400 transition-all flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800">
                              {diffDays} {diffDays === 1 ? 'dia' : 'dias'}
                            </span>
                            <span className="font-mono text-xs font-bold text-stone-800">
                              {block.startDate} → {block.endDate}
                            </span>
                          </div>
                          <h4 className="font-editorial text-sm font-bold text-stone-900 truncate">
                            {block.reason}
                          </h4>
                          <span className="text-[11px] text-stone-400 font-mono block">
                            Cadastrado em {new Date(block.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveBlock(block.id)}
                          className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                          title="Remover Bloqueio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 bg-[#FAF8F5] rounded-2xl border border-stone-200/60 text-xs text-stone-500">
                  <CalendarDays className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                  <span>Você não possui nenhum período bloqueado. Sua agenda está 100% aberta para reservas.</span>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-stone-900">
                  Minhas Solicitações de Turismo
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Histórico de viajantes que escolheram você como guia privativo
                </p>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar nome, telefone, #FOR..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs bg-[#FAF8F5] focus:bg-white focus:outline-hidden"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold bg-[#FAF8F5] cursor-pointer"
                >
                  <option value="ALL">Todos os Status ({bookings.length})</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>

            {/* Leads Table/Cards */}
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-400/80 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md">
                            {b.referenceCode}
                          </span>
                          <h3 className="font-editorial text-lg font-bold text-stone-900">
                            {b.customerName}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-stone-500 font-mono">
                          <span>{b.customerEmail}</span>
                          <span>•</span>
                          <span>{b.customerPhone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            handleUpdateBookingStatus(b.id, e.target.value as BookingRequest['status'])
                          }
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : b.status === 'CONTACTED'
                              ? 'bg-sky-50 text-sky-800 border-sky-300'
                              : 'bg-amber-50 text-amber-900 border-amber-300'
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>

                        <a
                          href={getWhatsAppChatUrl(b)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Conversar no WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-stone-200/60 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                          Data de Início
                        </span>
                        <span className="font-semibold text-stone-900 font-mono mt-0.5 block">
                          {b.travelDateStart}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                          Passageiros
                        </span>
                        <span className="font-semibold text-stone-900 mt-0.5 block">
                          {b.paxAdults} Adultos {b.paxChildren > 0 && `+ ${b.paxChildren} Crianças`}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                          Idioma do Viajante
                        </span>
                        <span className="font-semibold text-stone-900 uppercase font-mono mt-0.5 block">
                          {b.preferredLocale}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                          Data da Solicitação
                        </span>
                        <span className="font-semibold text-stone-600 text-[11px] font-mono mt-0.5 block">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Special Notes & Guide Private Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {b.specialNotes && (
                        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block font-mono">
                            Desejos & Observações do Cliente:
                          </span>
                          <p className="text-stone-700 italic font-sans leading-relaxed">
                            &ldquo;{b.specialNotes}&rdquo;
                          </p>
                        </div>
                      )}

                      <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono flex items-center justify-between">
                          <span>Minhas Anotações Privadas:</span>
                          <span className="text-[10px] text-emerald-700">Salvo automaticamente</span>
                        </span>
                        <input
                          type="text"
                          placeholder="Ex: Cliente prefere saída às 08:30; van executiva confirmada..."
                          value={guideNotes[b.id] || ''}
                          onChange={(e) => handleSaveNote(b.id, e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-stone-500 text-xs">
                Nenhuma solicitação encontrada com os filtros selecionados.
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: MEUS ROTEIROS PUBLICADOS                       */}
        {/* ==================================================== */}
        {activeTab === 'tours' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-stone-900">
                  Meus Roteiros & Experiências no ForTurismo
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Estes são os passeios exclusivos apresentados aos viajantes internacionais vinculados à sua credencial
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSuggestTourModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-amber-200 border border-amber-500/30 hover:bg-stone-800 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>Propor Novo Roteiro</span>
              </button>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guideTours.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative h-52 w-full bg-stone-950">
                    <Image src={t.heroImage} alt={t.title[locale]} fill sizes="500px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="font-mono text-xs bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                        {t.durationHours} horas de duração
                      </span>
                      <span className="font-editorial text-lg font-bold text-amber-300">
                        ${t.priceStartingUSD} USD base
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-editorial text-lg font-bold text-stone-900">
                        {t.title[locale]}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {t.description[locale]}
                      </p>

                      <div className="mt-4 pt-3 border-t border-stone-100 text-xs space-y-2">
                        <div className="flex items-center gap-2 text-stone-700">
                          <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span className="truncate"><strong>Ponto de Encontro:</strong> {t.meetingPoint[locale]}</span>
                        </div>
                      </div>

                      {/* Inclusions */}
                      <div className="mt-4 space-y-1">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                          Incluso no Passeio:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {t.inclusions[locale].map((inc, i) => (
                            <span key={i} className="text-[11px] bg-[#FAF8F5] text-stone-700 px-2 py-0.5 rounded border border-stone-200/70">
                              ✓ {inc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Publicado na Vitrine
                      </span>
                      <Link
                        href={`/destinations/${activeDestination?.slug}`}
                        target="_blank"
                        className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ver Página do Destino</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: FICHA & CREDENCIAL OFICIAL                     */}
        {/* ==================================================== */}
        {activeTab === 'credentials' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-stone-900 pb-4 border-b border-stone-100">
                Ficha Cadastral Oficial do Guia
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block font-mono">
                    Registro de Credenciamento Oficial
                  </span>
                  <span className="text-base font-bold text-stone-900 font-mono block">
                    {activeGuide.licenseNumber}
                  </span>
                  <span className="text-xs text-stone-600 block">
                    {activeGuide.licenseAuthority}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block font-mono">
                    Experiência Profissional
                  </span>
                  <span className="text-base font-bold text-stone-900 block">
                    {activeGuide.yearsExperience} anos atuando no turismo
                  </span>
                  <span className="text-xs text-stone-600 block">
                    Comprovado e validado pela curadoria ForTurismo
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block font-mono">
                    WhatsApp de Contato Registrado
                  </span>
                  <span className="text-base font-bold text-stone-900 font-mono block">
                    {activeGuide.whatsappNumber}
                  </span>
                  <span className="text-xs text-emerald-700 block">
                    Conectado ao deep linking oficial da plataforma
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block font-mono">
                    Tarifa Base Cadastrada
                  </span>
                  <span className="text-base font-bold text-stone-900 font-mono block">
                    ${activeGuide.baseRateUSD} USD / dia
                  </span>
                  <span className="text-xs text-stone-500 block">
                    Valor sugerido na vitrine internacional
                  </span>
                </div>
              </div>

              {/* Bio & Tagline */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Apresentação / Bio Oficial (Português):
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/60">
                    {activeGuide.bio.pt}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Lema / Tagline:
                  </h4>
                  <p className="font-editorial-italic text-xs sm:text-sm text-amber-900 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60">
                    &ldquo;{activeGuide.tagline.pt}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Languages & Specialties */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 space-y-4">
                <h3 className="font-editorial text-base font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-amber-700" />
                  <span>Idiomas Certificados</span>
                </h3>

                <div className="space-y-2">
                  {activeGuide.languages.map((l) => (
                    <div
                      key={l.code}
                      className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/70 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-stone-800">{l.name[locale]}</span>
                      <span className="text-[11px] font-mono capitalize bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-600">
                        {l.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 space-y-4">
                <h3 className="font-editorial text-base font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-700" />
                  <span>Especialidades de Guiamento</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {activeGuide.specialties[locale].map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] text-stone-800 text-xs font-medium border border-stone-200/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL: PROPOR NOVO ROTEIRO --- */}
        {suggestTourModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="font-editorial text-xl font-bold text-stone-900">
                    Propor Novo Roteiro Privativo
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSuggestTourModalOpen(false);
                    setSuggestSuccess(false);
                  }}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!suggestSuccess ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSuggestSuccess(true);
                  }}
                  className="space-y-4 text-xs font-sans"
                >
                  <p className="text-stone-600">
                    Sugira um novo passeio para ser avaliado pela curadoria internacional ForTurismo e publicado no seu perfil:
                  </p>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Título do Roteiro:
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Passeio Secreto pelos Templos de Ayutthaya ao Entardecer"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Duração Estimada:
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: 5 horas / Dia inteiro"
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Preço Base Sugerido (USD):
                      </label>
                      <input
                        required
                        type="number"
                        placeholder="Ex: 180"
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Descrição & Destaques da Experiência:
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Descreva o diferencial privativo, paradas gastronômicas, acessos exclusivos..."
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-stone-900 text-amber-300 border border-amber-500/40 hover:bg-stone-800 font-bold text-xs uppercase tracking-wider shadow-md btn-tactile cursor-pointer"
                  >
                    Enviar Proposta para Curadoria
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-editorial text-lg font-bold text-stone-900">
                    Proposta Enviada com Sucesso!
                  </h4>
                  <p className="text-xs text-stone-600">
                    A curadoria ForTurismo analisará seu roteiro e enviará uma confirmação pelo seu WhatsApp cadastrado ({activeGuide.whatsappNumber}) em até 24h.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSuggestTourModalOpen(false);
                      setSuggestSuccess(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Voltar ao Painel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {/* --- MODAL: NOVO BLOQUEIO DE DATA --- */}
        {isBlockModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-amber-600" />
                  <h3 className="font-editorial text-xl font-bold text-stone-900">
                    Bloquear Período no Calendário
                  </h3>
                </div>
                <button
                  onClick={() => setIsBlockModalOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddBlock} className="space-y-4 text-xs font-sans">
                <p className="text-stone-600">
                  Defina as datas em que você não poderá receber novos viajantes da ForTurismo:
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Data Inicial: *
                    </label>
                    <input
                      required
                      type="date"
                      value={blockStartDate}
                      onChange={(e) => setBlockStartDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Data Final:
                    </label>
                    <input
                      type="date"
                      value={blockEndDate}
                      placeholder={blockStartDate}
                      onChange={(e) => setBlockEndDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Motivo do Bloqueio:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tour Privativo VIP, Férias em Família..."
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:outline-hidden"
                  />

                  {/* Quick Preset Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[
                      'Tour Privativo VIP',
                      'Férias / Descanso',
                      'Manutenção de Transporte',
                      'Compromisso Pessoal',
                      'Atendimento a Delegação',
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setBlockReason(preset)}
                        className="px-2 py-1 rounded-lg text-[10px] bg-stone-100 hover:bg-amber-100 hover:text-amber-900 border border-stone-200 text-stone-700 font-medium transition-colors cursor-pointer"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {blockError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                    {blockError}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBlockModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-stone-900 text-amber-300 border border-amber-500/40 hover:bg-stone-800 font-bold text-xs uppercase tracking-wider shadow-md btn-tactile cursor-pointer"
                  >
                    Salvar Bloqueio de Agenda
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
