'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Página Inicial</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Termos de Uso e Condições de Serviço
            </h1>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Bem-vindo à <strong>ForTurismo</strong>. Ao navegar e utilizar nossos serviços de conexão com guias locais na Tailândia, Dubai/EAU e Brasil, você concorda com as condições descritas abaixo.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            1. Natureza da Plataforma
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            A ForTurismo atua como facilitadora e curadora internacional, conectando viajantes a guias turísticos autônomos ou credenciados pelas autoridades governamentais competentes de cada destino (TAT na Tailândia, DTCM em Dubai, CADASTUR no Brasil).
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            2. Solicitações de Reserva e Confirmação
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            O envio do formulário de solicitação no website não constitui confirmação imediata ou cobrança de valores. Toda reserva é validada em canal assistido (WhatsApp) de acordo com a disponibilidade da agenda dos guias e alinhamento de itinerário.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            3. Condições e Políticas de Cancelamento
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            As políticas de cancelamento e eventuais reembolsos são acordadas diretamente com a equipe de concierge ou com o guia credenciado antes da confirmação final do pagamento da experiência.
          </p>
        </div>
      </div>
    </div>
  );
}
