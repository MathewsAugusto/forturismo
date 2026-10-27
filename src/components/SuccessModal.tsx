'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, MessageCircle, Copy, Check, X, ExternalLink } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceCode: string;
  whatsAppUrl: string;
  messageText: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  referenceCode,
  whatsAppUrl,
  messageText,
}: SuccessModalProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-black tracking-tight">{t('modalSuccessTitle')}</h3>
          <p className="text-xs text-emerald-100 mt-1">
            {t('modalSuccessSubtitle')}{' '}
            <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md text-white">
              {referenceCode}
            </span>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 text-center leading-relaxed">
            {t('modalSuccessDesc')}
          </p>

          {/* Formatted Message Box */}
          <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-4 max-h-48 overflow-y-auto text-xs text-slate-700 whitespace-pre-wrap font-sans">
            {messageText}
          </div>

          {/* Primary Action: WhatsApp Deep Link */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-900/10 transition-all text-center"
          >
            <MessageCircle className="w-5 h-5" />
            {t('openWhatsAppBtn')}
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>

          {/* Secondary Action: Copy text */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{t('copiedText')}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>{t('copyMessageBtn')}</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            {t('closeModal')}
          </button>
        </div>
      </div>
    </div>
  );
}
