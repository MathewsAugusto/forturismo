'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookingRequest, Guide } from '@/types';
import { DESTINATIONS, GUIDES, TOURS } from '@/data/mock-data';
import { getCentralConciergePhone } from '@/lib/whatsapp';
import {
  ShieldCheck,
  Users,
  Compass,
  MessageCircle,
  Calendar,
  Lock,
  LogOut,
  TrendingUp,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Settings,
  Phone,
  Eye,
  Trash2,
  Plus,
  RefreshCw,
  Star,
  Award,
} from 'lucide-react';

// Default Admin PIN for the MVP
const ADMIN_PIN = 'admin2026';

// Seed sample leads if local storage is empty
const INITIAL_SAMPLE_LEADS: BookingRequest[] = [
  {
    id: 'booking-1730000001',
    referenceCode: '#FOR-2026-4821',
    destinationId: 'dest-dubai',
    guideId: 'guide-ae-01',
    tourId: 'tour-ae-01',
    customerName: 'Rodrigo Santoro Mendes',
    customerEmail: 'rodrigo.mendes@exemplo.com.br',
    customerPhone: '+55 11 98765-4321',
    travelDateStart: '2026-11-15',
    travelDateEnd: '2026-11-20',
    paxAdults: 2,
    paxChildren: 1,
    preferredLocale: 'pt',
    specialNotes: 'Viagem de lua de mel. Desejamos incluir reserva em restaurante com vista panorâmica.',
    status: 'CONTACTED',
    createdAt: '2026-10-26T14:30:00Z',
  },
  {
    id: 'booking-1730000002',
    referenceCode: '#FOR-2026-8914',
    destinationId: 'dest-thailand',
    guideId: 'guide-th-02',
    tourId: 'tour-th-02',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@traveler.com',
    customerPhone: '+1 415 555-2671',
    travelDateStart: '2026-12-05',
    travelDateEnd: '2026-12-12',
    paxAdults: 4,
    paxChildren: 0,
    preferredLocale: 'en',
    specialNotes: 'Interested in ethical animal welfare only. Excited about Chiang Mai mountain trekking.',
    status: 'CONFIRMED',
    createdAt: '2026-10-27T09:15:00Z',
  },
  {
    id: 'booking-1730000003',
    referenceCode: '#FOR-2026-3109',
    destinationId: 'dest-brazil',
    guideId: 'guide-br-01',
    tourId: 'tour-br-01',
    customerName: 'Alejandro Gomez',
    customerEmail: 'agomez@buenosaires.ar',
    customerPhone: '+54 9 11 4432-8899',
    travelDateStart: '2026-11-28',
    travelDateEnd: '2026-12-02',
    paxAdults: 2,
    paxChildren: 0,
    preferredLocale: 'es',
    specialNotes: 'Primera vez en Río de Janeiro. Queremos evitar filas en el Cristo Redentor.',
    status: 'PENDING',
    createdAt: '2026-10-27T12:45:00Z',
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'guides' | 'settings'>('overview');

  // Leads State
  const [leads, setLeads] = useState<BookingRequest[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [destinationFilter, setDestinationFilter] = useState('ALL');

  // Selected Lead for Detail Modal
  const [selectedLead, setSelectedLead] = useState<BookingRequest | null>(null);

  // Settings State
  const [centralPhone, setCentralPhone] = useState<string>('');
  const [routingMode, setRoutingMode] = useState<'central' | 'direct'>('central');
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);

  // Check auth session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('forturismo_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load leads from localStorage
  useEffect(() => {
    if (!isAuthenticated) return;

    try {
      const stored = localStorage.getItem('forturismo_bookings');
      if (stored) {
        const parsed: BookingRequest[] = JSON.parse(stored);
        setLeads(parsed);
      } else {
        // Initialize with realistic mock leads for immediate usability
        setLeads(INITIAL_SAMPLE_LEADS);
        localStorage.setItem('forturismo_bookings', JSON.stringify(INITIAL_SAMPLE_LEADS));
      }
    } catch {
      setLeads(INITIAL_SAMPLE_LEADS);
    }

    // Load settings
    const currentPhone = getCentralConciergePhone();
    setCentralPhone(currentPhone);

    const savedMode = localStorage.getItem('forturismo_routing_mode');
    if (savedMode === 'direct') setRoutingMode('direct');
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('forturismo_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Senha incorreta. Tente novamente (Dica padrão: admin2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('forturismo_admin_auth');
  };

  // Update lead status
  const handleUpdateStatus = (leadId: string, newStatus: BookingRequest['status']) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
    setLeads(updated);
    localStorage.setItem('forturismo_bookings', JSON.stringify(updated));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  // Delete lead
  const handleDeleteLead = (leadId: string) => {
    if (confirm('Tem certeza que deseja excluir esta solicitação de reserva?')) {
      const updated = leads.filter((l) => l.id !== leadId);
      setLeads(updated);
      localStorage.setItem('forturismo_bookings', JSON.stringify(updated));
      if (selectedLead && selectedLead.id === leadId) setSelectedLead(null);
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = centralPhone.replace(/[^0-9]/g, '');
    localStorage.setItem('forturismo_central_phone', cleanPhone);
    localStorage.setItem('forturismo_routing_mode', routingMode);
    setCentralPhone(cleanPhone);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Protocolo', 'Data Registro', 'Nome', 'Email', 'Telefone', 'Destino', 'Guia', 'Inicio', 'Termino', 'Adultos', 'Criancas', 'Status', 'Notas'];
    const rows = leads.map((l) => {
      const dest = DESTINATIONS.find((d) => d.id === l.destinationId)?.name.pt || l.destinationId;
      const guide = GUIDES.find((g) => g.id === l.guideId)?.fullName || 'N/A';
      return [
        l.referenceCode,
        l.createdAt,
        `"${l.customerName}"`,
        l.customerEmail,
        `"${l.customerPhone}"`,
        `"${dest}"`,
        `"${guide}"`,
        l.travelDateStart,
        l.travelDateEnd || '',
        l.paxAdults,
        l.paxChildren,
        l.status,
        `"${(l.specialNotes || '').replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `forturismo_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== 'ALL' && lead.status !== statusFilter) return false;
    if (destinationFilter !== 'ALL' && lead.destinationId !== destinationFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchName = lead.customerName.toLowerCase().includes(q);
      const matchEmail = lead.customerEmail.toLowerCase().includes(q);
      const matchPhone = lead.customerPhone.toLowerCase().includes(q);
      const matchRef = lead.referenceCode.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchRef) return false;
    }
    return true;
  });

  // Analytics Metrics
  const totalLeads = leads.length;
  const pendingLeads = leads.filter((l) => l.status === 'PENDING').length;
  const contactedLeads = leads.filter((l) => l.status === 'CONTACTED').length;
  const confirmedLeads = leads.filter((l) => l.status === 'CONFIRMED').length;

  // Render Login Gate if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-sky-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-sky-900/10">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              For<span className="text-emerald-600">Turismo</span> Admin
            </h1>
            <p className="text-xs text-slate-500">
              Painel de Gestão de Leads e Concierge (Piloto MVP)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Senha de Acesso Administrativo
              </label>
              <input
                type="password"
                required
                placeholder="Digite a senha (padrão: admin2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-sm font-semibold text-slate-900"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-medium mt-2">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all"
            >
              Entrar no Backoffice
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="text-xs font-bold text-sky-700 hover:text-emerald-600 transition-colors"
            >
              ← Voltar para o Site Público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Admin Top Navbar */}
      <header className="bg-slate-950 text-white sticky top-0 z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight">
                  For<span className="text-emerald-400">Turismo</span>{' '}
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 bg-slate-800 px-2 py-0.5 rounded-md">
                    Admin Backoffice
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <span>Ver Site Público</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 text-xs font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-800/80 pt-2 pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              📊 Visão Geral & Métricas
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl transition-all relative ${
                activeTab === 'leads'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              📋 Leads & Reservas ({leads.length})
              {pendingLeads > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                  {pendingLeads}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'guides'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              👥 Rede de Guias ({GUIDES.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              ⚙️ Configurações & WhatsApp
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Total de Solicitações</span>
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">{totalLeads}</div>
                <p className="text-xs text-slate-500 mt-1">Registradas na plataforma</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Pendentes de Resposta</span>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-3xl font-black text-amber-600">{pendingLeads}</div>
                <p className="text-xs text-slate-500 mt-1">Aguardando contato inicial</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-sky-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Em Negociação</span>
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-3xl font-black text-sky-600">{contactedLeads}</div>
                <p className="text-xs text-slate-500 mt-1">Em atendimento no WhatsApp</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Reservas Fechadas</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-3xl font-black text-emerald-600">{confirmedLeads}</div>
                <p className="text-xs text-slate-500 mt-1">Viagens confirmadas</p>
              </div>
            </div>

            {/* Quick Actions & Destinations Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Destinations Distribution */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Demanda por Destino
                </h3>
                <div className="space-y-3">
                  {DESTINATIONS.map((dest) => {
                    const count = leads.filter((l) => l.destinationId === dest.id).length;
                    const percent = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                    return (
                      <div key={dest.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{dest.name.pt} ({dest.countryCode})</span>
                          <span>{count} leads ({percent}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Últimas Solicitações de Reserva
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-sky-700 hover:text-emerald-600"
                  >
                    Ver todas as solicitações →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {leads.slice(0, 4).map((lead) => {
                    const dest = DESTINATIONS.find((d) => d.id === lead.destinationId);
                    return (
                      <div key={lead.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-sky-700">
                              {lead.referenceCode}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                lead.status === 'PENDING'
                                  ? 'bg-amber-100 text-amber-800'
                                  : lead.status === 'CONFIRMED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-sky-100 text-sky-800'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 truncate mt-0.5">
                            {lead.customerName}
                          </p>
                          <span className="text-xs text-slate-500">
                            {dest?.name.pt} • {lead.paxAdults} adultos • Data: {lead.travelDateStart}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setActiveTab('leads');
                          }}
                          className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700"
                        >
                          Gerenciar
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LEADS CRM ================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Action Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar por cliente, e-mail, telefone ou protocolo..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs text-slate-800 font-semibold"
                  >
                    <option value="ALL">Todos os Status</option>
                    <option value="PENDING">🟡 PENDENTE (Novo)</option>
                    <option value="CONTACTED">🔵 CONTATADO (Em conversa)</option>
                    <option value="CONFIRMED">🟢 CONFIRMADO (Fechado)</option>
                    <option value="CANCELLED">⚪ CANCELADO</option>
                  </select>
                </div>

                <div>
                  <select
                    value={destinationFilter}
                    onChange={(e) => setDestinationFilter(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs text-slate-800 font-semibold"
                  >
                    <option value="ALL">Todos os Destinos</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name.pt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-semibold">
                  Exibindo <strong>{filteredLeads.length}</strong> de <strong>{leads.length}</strong> solicitações
                </span>

                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-600 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  Exportar Relatório (CSV)
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                      <th className="py-3.5 px-4">Protocolo / Data</th>
                      <th className="py-3.5 px-4">Viajante</th>
                      <th className="py-3.5 px-4">Destino & Guia</th>
                      <th className="py-3.5 px-4">Período / Pax</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Ações Rápidas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => {
                      const dest = DESTINATIONS.find((d) => d.id === lead.destinationId);
                      const guide = GUIDES.find((g) => g.id === lead.guideId);
                      const rawPhone = lead.customerPhone.replace(/[^0-9]/g, '');
                      const clientWaUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
                        `Olá ${lead.customerName}! Aqui é da equipe ForTurismo Concierge referente à sua solicitação ${lead.referenceCode}.`
                      )}`;

                      return (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-sky-700 block text-xs">
                              {lead.referenceCode}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block text-xs">
                              {lead.customerName}
                            </span>
                            <span className="text-slate-500 block text-[11px]">{lead.customerEmail}</span>
                            <span className="text-slate-400 block text-[10px]">{lead.customerPhone}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-800 block">
                              {dest?.name.pt || lead.destinationId}
                            </span>
                            <span className="text-slate-500 text-[11px]">
                              {guide ? guide.fullName : 'Qualquer guia'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800 block">
                              {lead.travelDateStart}
                            </span>
                            <span className="text-slate-500 text-[11px]">
                              {lead.paxAdults} adultos{lead.paxChildren > 0 ? `, ${lead.paxChildren} crianças` : ''}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateStatus(lead.id, e.target.value as BookingRequest['status'])
                              }
                              className={`text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer focus:outline-hidden ${
                                lead.status === 'PENDING'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : lead.status === 'CONTACTED'
                                  ? 'bg-sky-50 text-sky-800 border-sky-300'
                                  : lead.status === 'CONFIRMED'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-slate-100 text-slate-600 border-slate-300'
                              }`}
                            >
                              <option value="PENDING">🟡 PENDENTE</option>
                              <option value="CONTACTED">🔵 CONTATADO</option>
                              <option value="CONFIRMED">🟢 CONFIRMADO</option>
                              <option value="CANCELLED">⚪ CANCELADO</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            <a
                              href={clientWaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-xs"
                              title="Chamar cliente no WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              WhatsApp
                            </a>

                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                              title="Ver detalhes completos"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 border border-slate-200"
                              title="Excluir solicitação"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: GUIDES DIRECTORY ================= */}
        {activeTab === 'guides' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Rede de 14 Guias Verificados
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tailândia (6), Dubai/EAU (5) e Brasil (3) credenciados oficialmente no Piloto MVP.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1.5 rounded-full">
                100% Homologados
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GUIDES.map((guide) => {
                const dest = DESTINATIONS.find((d) => d.id === guide.destinationId);
                return (
                  <div
                    key={guide.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-emerald-500">
                        <Image
                          src={guide.avatarUrl}
                          alt={guide.fullName}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                          {dest?.name.pt}
                        </span>
                        <h4 className="font-bold text-slate-900 truncate mt-0.5">
                          {guide.fullName}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-amber-400 mr-1" />
                            {guide.rating.toFixed(2)}
                          </span>
                          <span>•</span>
                          <span>{guide.yearsExperience} anos exp.</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-semibold">Licença:</span>
                        <span className="font-mono font-bold text-slate-900">{guide.licenseNumber}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-semibold">WhatsApp Guia:</span>
                        <span className="font-mono text-slate-900">{guide.whatsappNumber}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-semibold">Tarifa Base:</span>
                        <span className="font-bold text-emerald-700">${guide.baseRateUSD} USD</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/guides/${guide.slug}`}
                        target="_blank"
                        className="text-xs font-bold text-sky-700 hover:text-emerald-600 inline-flex items-center gap-1"
                      >
                        Ver Perfil Público <ExternalLink className="w-3 h-3" />
                      </Link>
                      <a
                        href={`https://wa.me/${guide.whatsappNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        Chamar Guia
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Configurações Globais da ForTurismo
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ajuste o número central do WhatsApp de atendimento e as regras de roteamento de leads.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Número Oficial de Atendimento WhatsApp (Concierge Central) *
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-emerald-600 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: 5511999998888 (com código do país e DDD)"
                      value={centralPhone}
                      onChange={(e) => setCentralPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 text-sm font-semibold text-slate-900"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Todas as solicitações de reserva feitas no site serão direcionadas para este número.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Modo de Roteamento de Conversão
                  </label>
                  <div className="space-y-2">
                    <label
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        routingMode === 'central'
                          ? 'border-emerald-600 bg-emerald-50/70 text-slate-900'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="routingMode"
                        value="central"
                        checked={routingMode === 'central'}
                        onChange={() => setRoutingMode('central')}
                        className="mt-1"
                      />
                      <div>
                        <span className="font-bold text-sm block">Concierge Centralizado (Recomendado)</span>
                        <span className="text-xs text-slate-500">
                          Os leads caem no WhatsApp da equipe da ForTurismo, que faz a curadoria, valida agenda e cobra a taxa da plataforma.
                        </span>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        routingMode === 'direct'
                          ? 'border-emerald-600 bg-emerald-50/70 text-slate-900'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="routingMode"
                        value="direct"
                        checked={routingMode === 'direct'}
                        onChange={() => setRoutingMode('direct')}
                        className="mt-1"
                      />
                      <div>
                        <span className="font-bold text-sm block">Direto para o Guia</span>
                        <span className="text-xs text-slate-500">
                          O botão de reserva direciona o viajante diretamente para o WhatsApp pessoal do guia selecionado.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {settingsSaved ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Configurações salvas com sucesso!
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Alterações têm efeito imediato no site</span>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal for Selected Lead */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-sky-700 block">
                  {selectedLead.referenceCode}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {selectedLead.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 block font-semibold">E-mail:</span>
                  <span className="font-bold text-slate-800">{selectedLead.customerEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">WhatsApp:</span>
                  <span className="font-bold text-slate-800">{selectedLead.customerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Datas:</span>
                  <span className="font-bold text-slate-800">
                    {selectedLead.travelDateStart} {selectedLead.travelDateEnd ? `→ ${selectedLead.travelDateEnd}` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Viajantes:</span>
                  <span className="font-bold text-slate-800">
                    {selectedLead.paxAdults} adultos, {selectedLead.paxChildren} crianças
                  </span>
                </div>
              </div>

              {selectedLead.specialNotes && (
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-950">
                  <span className="font-bold block mb-1">Notas do Viajante:</span>
                  <p className="leading-relaxed">{selectedLead.specialNotes}</p>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Alterar Status do Lead:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['PENDING', 'CONTACTED', 'CONFIRMED', 'CANCELLED'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
                        selectedLead.status === st
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`https://wa.me/${selectedLead.customerPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                Conversar no WhatsApp
              </a>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
