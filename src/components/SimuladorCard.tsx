import React, { useState } from 'react';
import { ClientQuoteInfo, SimulationRow } from '../types/simulator';
import { BeTravelLogo } from './BeTravelLogo';
import {
  Camera,
  Copy,
  Check,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronUp,
  Sliders,
} from 'lucide-react';

interface SimuladorCardProps {
  amount: number;
  onAmountChange: (value: number) => void;
  rows: SimulationRow[];
  onToggleRow: (installments: number) => void;
  onSelectPresetList: (installments: number[]) => void;
  clientInfo: ClientQuoteInfo;
  onClientInfoChange: (info: ClientQuoteInfo) => void;
  onDownloadPng: () => Promise<void>;
  onCopyPng: () => Promise<void>;
  onCopyWhatsAppText: () => Promise<void>;
  onOpenRateEditor: () => void;
  isGeneratingPng: boolean;
  logoUrl?: string | null;
}

export const SimuladorCard: React.FC<SimuladorCardProps> = ({
  amount,
  onAmountChange,
  rows,
  onToggleRow,
  onSelectPresetList,
  clientInfo,
  onClientInfoChange,
  onDownloadPng,
  onCopyPng,
  onCopyWhatsAppText,
  onOpenRateEditor,
  isGeneratingPng,
  logoUrl,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(
    amount > 0 ? amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''
  );
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showOptionsFilter, setShowOptionsFilter] = useState<boolean>(false);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Formatter for currency input as user types
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    if (!rawDigits) {
      setDisplayValue('');
      onAmountChange(0);
      return;
    }
    const num = Number(rawDigits) / 100;
    setDisplayValue(
      num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );
    onAmountChange(num);
  };

  const handleCopyPngClick = async () => {
    await onCopyPng();
    setCopiedImage(true);
    setTimeout(() => setCopiedImage(false), 2200);
  };

  const handleCopyTextClick = async () => {
    await onCopyWhatsAppText();
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2200);
  };

  const selectedCount = rows.filter((r) => r.selected).length;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-sky-200/90 shadow-xl p-6 sm:p-8 max-w-xl mx-auto transition-all">
      {/* Brand Logo & Header */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-sky-100">
        <div className="mb-2">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="BE TRAVEL"
              className="h-16 sm:h-20 max-w-[240px] object-contain cursor-pointer transition-transform hover:scale-105"
              title="Clique para substituir a logo oficial"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const res = ev.target?.result as string;
                      if (res) {
                        localStorage.setItem('betravel_official_logo_v3', res);
                        window.dispatchEvent(new Event('logo-updated'));
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
            />
          ) : (
            <BeTravelLogo className="h-16 sm:h-20" />
          )}
        </div>

        {!logoUrl && (
          <label className="text-[11px] text-sky-700/80 hover:text-sky-950 underline font-semibold cursor-pointer mb-2 transition-colors">
            Carregar logo oficial (be travel.png)
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const res = ev.target?.result as string;
                    if (res) {
                      localStorage.setItem('betravel_official_logo_v3', res);
                      window.dispatchEvent(new Event('logo-updated'));
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        )}

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Simulador de Parcelamento
        </h1>
        <p className="text-xs sm:text-sm text-sky-800 font-medium mt-1">
          Informe o valor para gerar a imagem horizontal de envio no WhatsApp
        </p>
      </div>

      {/* Primary Input: Valor da compra */}
      <div className="mt-6">
        <label
          htmlFor="valor-compra"
          className="block text-xs font-bold uppercase tracking-wider text-sky-950 mb-2"
        >
          Valor da Compra / Viagem
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-600 font-extrabold text-xl">
            R$
          </div>
          <input
            id="valor-compra"
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleValueChange}
            placeholder="0,00"
            className="block w-full pl-14 pr-4 py-3.5 text-2xl sm:text-3xl font-black font-mono-numbers text-slate-900 bg-sky-50/60 border-2 border-sky-200 rounded-2xl focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100 outline-none transition-all"
            autoFocus
          />
        </div>
      </div>

      {/* Installment Filter Buttons */}
      <div className="mt-5 pt-4 border-t border-sky-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-950 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-sky-600" />
            Parcelas a Exibir ({selectedCount})
          </span>
          <button
            type="button"
            onClick={() => setShowOptionsFilter(!showOptionsFilter)}
            className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-0.5 cursor-pointer"
          >
            {showOptionsFilter ? 'Ocultar opções' : 'Escolher parcelas'}
            {showOptionsFilter ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Quick presets for installments (1, 3, 6, 9 e 12 | 1, 3, 6, 9, 12, 15 e 18 | 1 a 12 | 1 a 18) */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onSelectPresetList([1, 3, 6, 9, 12])}
            className={`py-2 px-2.5 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
              selectedCount === 5 &&
              [1, 3, 6, 9, 12].every((n) => rows.find((r) => r.installments === n)?.selected)
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100'
            }`}
          >
            1, 3, 6, 9 e 12
          </button>
          <button
            type="button"
            onClick={() => onSelectPresetList([1, 3, 6, 9, 12, 15, 18])}
            className={`py-2 px-2.5 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
              selectedCount === 7 &&
              [1, 3, 6, 9, 12, 15, 18].every((n) => rows.find((r) => r.installments === n)?.selected)
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100'
            }`}
          >
            1, 3, 6, 9, 12, 15 e 18
          </button>
          <button
            type="button"
            onClick={() => onSelectPresetList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}
            className={`py-2 px-2.5 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
              selectedCount === 12 &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((n) => rows.find((r) => r.installments === n)?.selected)
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100'
            }`}
          >
            Até 12x
          </button>
          <button
            type="button"
            onClick={() => onSelectPresetList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])}
            className={`py-2 px-2.5 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
              selectedCount === 18 &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].every((n) => rows.find((r) => r.installments === n)?.selected)
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100'
            }`}
          >
            Até 18x
          </button>
        </div>

        {/* Individual installment check list (accordion) */}
        {showOptionsFilter && (
          <div className="mt-3 p-3 bg-sky-50/80 rounded-xl border border-sky-200 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {rows.map((r) => (
              <label
                key={r.installments}
                className="flex items-center gap-1.5 text-xs text-slate-800 font-semibold cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={r.selected}
                  onChange={() => onToggleRow(r.installments)}
                  className="rounded border-sky-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className="font-mono-numbers">{r.installments}x</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Optional Client and Destination info */}
      <div className="mt-4 pt-3 border-t border-sky-100">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-xs font-bold text-sky-800 hover:text-sky-950 transition-colors py-1 cursor-pointer"
        >
          <span>Adicionar Nome do Cliente / Destino (Opcional)</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDetails && (
          <div className="mt-2.5 space-y-2.5 p-3.5 bg-sky-50/60 rounded-xl border border-sky-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Nome do Cliente
              </label>
              <input
                type="text"
                placeholder="Ex: Carlos Eduardo"
                value={clientInfo.clientName}
                onChange={(e) =>
                  onClientInfoChange({ ...clientInfo, clientName: e.target.value })
                }
                className="w-full px-3 py-1.5 text-xs bg-white border border-sky-200 rounded-lg focus:border-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Destino
              </label>
              <input
                type="text"
                placeholder="Ex: Porto de Galinhas / Orlando"
                value={clientInfo.destination}
                onChange={(e) =>
                  onClientInfoChange({ ...clientInfo, destination: e.target.value })
                }
                className="w-full px-3 py-1.5 text-xs bg-white border border-sky-200 rounded-lg focus:border-sky-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Primary Actions: GERAR PNG & COPIAR */}
      <div className="mt-6 pt-5 border-t border-sky-200 space-y-3">
        {/* Main CTA: Baixar PNG */}
        <button
          type="button"
          onClick={onDownloadPng}
          disabled={isGeneratingPng || amount <= 0}
          className="w-full py-4 px-6 text-base font-extrabold text-white bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 hover:from-sky-500 hover:to-blue-600 active:scale-[0.99] rounded-2xl shadow-lg shadow-sky-600/25 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Camera className="w-5 h-5" />
          <span>{isGeneratingPng ? 'Gerando Imagem...' : '📸 Gerar e Baixar PNG (WhatsApp)'}</span>
        </button>

        {/* Secondary: Copiar Imagem para o WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopyPngClick}
            disabled={isGeneratingPng || amount <= 0}
            className="py-3 px-3 text-xs font-bold text-sky-950 bg-sky-100/80 hover:bg-sky-200 active:bg-sky-300 rounded-xl transition-all flex items-center justify-center gap-2 border border-sky-200 cursor-pointer"
            title="Copia a imagem PNG para você colar direto no WhatsApp Web (Ctrl+V)"
          >
            {copiedImage ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Imagem Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-sky-700" />
                <span>Copiar Imagem (WhatsApp)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyTextClick}
            disabled={amount <= 0}
            className="py-3 px-3 text-xs font-bold text-sky-950 bg-sky-100/80 hover:bg-sky-200 active:bg-sky-300 rounded-xl transition-all flex items-center justify-center gap-2 border border-sky-200 cursor-pointer"
            title="Copia texto formatado com valores e parcelas para envio"
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Texto Copiado!</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 text-sky-700" />
                <span>Copiar Texto WhatsApp</span>
              </>
            )}
          </button>
        </div>

        {/* Tools bar */}
        <div className="flex items-center justify-end pt-2 text-xs text-sky-700 font-medium">
          <button
            type="button"
            onClick={onOpenRateEditor}
            className="flex items-center gap-1.5 hover:text-sky-950 hover:underline transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Adicional por Parcela (Gorjetinha)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
