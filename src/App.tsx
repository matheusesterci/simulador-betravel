import React, { useState, useRef } from 'react';
import {
  ClientQuoteInfo,
  DEFAULT_RATES,
  InstallmentRate,
} from './types/simulator';
import { calculateSimulation } from './utils/calculator';
import {
  downloadElementAsPng,
  copyElementAsPngToClipboard,
  generateWhatsAppMessage,
} from './utils/exportUtils';
import { SimuladorCard } from './components/SimuladorCard';
import { PngPreviewCard } from './components/PngPreviewCard';
import { RateEditorModal } from './components/RateEditorModal';
import { BeTravelLogo } from './components/BeTravelLogo';
import {
  FileCheck2,
  Camera,
  Sparkles,
} from 'lucide-react';

const STORAGE_KEY_RATES = 'betravel_simulador_taxas_v2';
const STORAGE_KEY_LOGO = 'betravel_official_logo_v3';
const STORAGE_KEY_EXTRA = 'betravel_extra_por_parcela_v2';

export default function App() {
  const [amount, setAmount] = useState<number>(1000);
  const [isGeneratingPng, setIsGeneratingPng] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState<boolean>(false);

  // Extra margin per installment (gorjetinha)
  const [extraPerInstallment, setExtraPerInstallment] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EXTRA);
      if (saved !== null) {
        return parseFloat(saved) || 0;
      }
    } catch {}
    return 0;
  });

  // Logo file persisted in localStorage as DataURL
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_LOGO) || null;
  });

  // Dedicated off-screen fixed-size ref for 100% reliable PNG rendering without any cropping
  const exportCardRef = useRef<HTMLDivElement | null>(null);

  // Load custom rates or default
  const [rates, setRates] = useState<InstallmentRate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RATES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 18) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_RATES;
  });

  const [clientInfo, setClientInfo] = useState<ClientQuoteInfo>({
    clientName: '',
    destination: '',
    notes: '',
    date: new Date().toLocaleDateString('pt-BR'),
  });

  // Selected map (all 1 to 18 true by default)
  const [selectedMap, setSelectedMap] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    for (let i = 1; i <= 18; i++) initial[i] = true;
    return initial;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleToggleRow = (installments: number) => {
    setSelectedMap((prev) => ({
      ...prev,
      [installments]: !prev[installments],
    }));
  };

  const handleSelectPresetList = (list: number[]) => {
    const next: Record<number, boolean> = {};
    for (let i = 1; i <= 18; i++) {
      next[i] = list.includes(i);
    }
    setSelectedMap(next);
  };

  const handleSaveExtra = (newExtra: number) => {
    setExtraPerInstallment(newExtra);
    localStorage.setItem(STORAGE_KEY_EXTRA, newExtra.toString());
    showToast('Adicional por parcela salvo com sucesso!');
  };

  const rows = calculateSimulation(amount, rates, selectedMap, extraPerInstallment);

  // PNG Actions - ALWAYS using exportCardRef which has exact fixed dimensions (700px horizontal)
  const handleDownloadPng = async () => {
    if (!exportCardRef.current) return;
    setIsGeneratingPng(true);
    try {
      const filename = clientInfo.clientName
        ? `simulacao_${clientInfo.clientName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png`
        : `simulacao_parcelas_${amount.toFixed(0)}.png`;
      await downloadElementAsPng(exportCardRef.current, filename);
      showToast('📸 Imagem PNG baixada com sucesso!');
    } catch (err) {
      console.error(err);
      showToast('Erro ao gerar PNG. Tente novamente.');
    } finally {
      setIsGeneratingPng(false);
    }
  };

  const handleCopyPng = async () => {
    if (!exportCardRef.current) return;
    setIsGeneratingPng(true);
    try {
      const ok = await copyElementAsPngToClipboard(exportCardRef.current);
      if (ok) {
        showToast('📋 Imagem copiada! Cole no WhatsApp (Ctrl+V).');
      } else {
        await handleDownloadPng();
      }
    } catch (err) {
      console.error(err);
      showToast('Erro ao copiar imagem. Baixando arquivo...');
      await handleDownloadPng();
    } finally {
      setIsGeneratingPng(false);
    }
  };

  const handleCopyWhatsAppText = async () => {
    const text = generateWhatsAppMessage(rows, amount, clientInfo);
    try {
      await navigator.clipboard.writeText(text);
      showToast('💬 Texto formatado para WhatsApp copiado!');
    } catch {
      showToast('Não foi possível copiar o texto.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100/80 via-sky-50 to-blue-50/60 font-sans text-slate-800 pb-16">
      {/* ======================================================== */}
      {/* Off-screen fixed 700px snapshot target for pixel-perfect PNG */}
      {/* ======================================================== */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          zIndex: -999,
          pointerEvents: 'none',
          width: '700px',
          minWidth: '700px',
          maxWidth: '700px',
        }}
      >
        <div ref={exportCardRef}>
          <PngPreviewCard
            rows={rows}
            baseValue={amount}
            clientInfo={clientInfo}
            isExport={true}
            logoUrl={logoUrl}
          />
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm animate-fade-in border border-sky-500/30">
          <FileCheck2 className="w-5 h-5 text-sky-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Clean Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-sky-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="BE TRAVEL"
                className="h-10 max-w-[160px] object-contain"
              />
            ) : (
              <BeTravelLogo className="h-10 sm:h-12" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPng}
              disabled={amount <= 0 || isGeneratingPng}
              className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:scale-95 rounded-xl transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Gerar PNG (WhatsApp)</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Interactive Simulator Input Controls */}
          <div className="lg:col-span-5">
            <SimuladorCard
              amount={amount}
              onAmountChange={setAmount}
              rows={rows}
              onToggleRow={handleToggleRow}
              onSelectPresetList={handleSelectPresetList}
              clientInfo={clientInfo}
              onClientInfoChange={setClientInfo}
              onDownloadPng={handleDownloadPng}
              onCopyPng={handleCopyPng}
              onCopyWhatsAppText={handleCopyWhatsAppText}
              onOpenRateEditor={() => setIsRateModalOpen(true)}
              isGeneratingPng={isGeneratingPng}
              logoUrl={logoUrl}
            />
          </div>

          {/* Column 2: Live Preview of the Generated PNG */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                Prévia da Imagem PNG (Horizontal WhatsApp)
              </span>
              <button
                onClick={handleDownloadPng}
                disabled={amount <= 0 || isGeneratingPng}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 underline cursor-pointer"
              >
                Baixar agora
              </button>
            </div>

            {/* On-screen display */}
            <div className="w-full flex justify-center overflow-x-auto p-1">
              <PngPreviewCard
                rows={rows}
                baseValue={amount}
                clientInfo={clientInfo}
                isExport={false}
                logoUrl={logoUrl}
              />
            </div>
            <p className="text-[11px] text-sky-800/70 mt-3 text-center max-w-md">
              Formato horizontal em 2 colunas: o cliente vê todas as parcelas diretamente no balão de mensagem do WhatsApp sem cortes.
            </p>
          </div>
        </div>
      </main>

      {/* Modal de Adicional por Parcela (Margem / Gorjetinha) */}
      <RateEditorModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        extraPerInstallment={extraPerInstallment}
        onSaveExtra={handleSaveExtra}
      />
    </div>
  );
}
