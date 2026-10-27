'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Política de Privacidade & Proteção de Dados (LGPD / GDPR)
            </h1>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            A <strong>ForTurismo</strong> valoriza a segurança, transparência e privacidade das informações dos viajantes e dos guias parceiros credenciados na Tailândia, Dubai/EAU e Brasil.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            1. Coleta e Finalidade dos Dados
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Os dados coletados em nossos formulários de solicitação de reserva (nome completo, e-mail, número de WhatsApp, datas de viagem e quantidade de viajantes) são utilizados estritamente para a finalidade de planejar, orçar e confirmar a disponibilidade dos serviços turísticos com os guias credenciados.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            2. Comunicação via WhatsApp
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ao submeter uma solicitação na ForTurismo, o usuário concorda em ser direcionado para atendimento assistido via WhatsApp, permitindo comunicação ágil e direta com a equipe de concierge ou com o guia turístico selecionado.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            3. Compartilhamento e Sigilo
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Não comercializamos, alugamos ou compartilhamos dados com terceiros para fins de marketing ou publicidade. Os dados ficam restritos à equipe de operações da ForTurismo e aos guias designados para o atendimento da viagem.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            4. Seus Direitos
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Em conformidade com a LGPD (Lei Geral de Proteção de Dados do Brasil) e a GDPR (União Europeia), você tem o direito de solicitar a qualquer momento a confirmação, correção ou exclusão dos seus dados cadastrais através dos nossos canais de atendimento.
          </p>
        </div>
      </div>
    </div>
  );
}
