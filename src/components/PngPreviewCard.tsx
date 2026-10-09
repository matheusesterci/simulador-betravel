import React from 'react';
import { SimulationRow, ClientQuoteInfo } from '../types/simulator';
import { formatBRL } from '../utils/calculator';
import { BeTravelLogo } from './BeTravelLogo';
import { Calendar, User, MapPin, Instagram } from 'lucide-react';

interface PngPreviewCardProps {
  cardRef?: React.RefObject<HTMLDivElement | null>;
  rows: SimulationRow[];
  baseValue: number;
  clientInfo: ClientQuoteInfo;
  isExport?: boolean;
  logoUrl?: string | null;
}

export const PngPreviewCard: React.FC<PngPreviewCardProps> = ({
  cardRef,
  rows,
  baseValue,
  clientInfo,
  isExport = false,
  logoUrl = null,
}) => {
  const selectedRows = rows.filter((r) => r.selected);
  const rowsToDisplay = selectedRows.length > 0 ? selectedRows : rows;

  // Split into 2 balanced columns for horizontal WhatsApp format
  const midpoint = Math.ceil(rowsToDisplay.length / 2);
  const col1 = rowsToDisplay.slice(0, midpoint);
  const col2 = rowsToDisplay.slice(midpoint);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-3xl border border-sky-200/90 shadow-xl text-slate-800 ${
        isExport ? 'w-[700px] p-7' : 'w-full max-w-[700px] p-5 sm:p-7'
      }`}
      style={{
        boxSizing: 'border-box',
        background: '#FFFFFF',
      }}
    >
      {/* 1. Header with BE TRAVEL Logo */}
      <div className="flex items-center justify-between pb-4 border-b border-sky-100 gap-4">
        <div className="flex items-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="BE TRAVEL"
              className="h-12 sm:h-14 max-w-[200px] object-contain"
            />
          ) : (
            <BeTravelLogo className="h-12 sm:h-14" />
          )}
        </div>
        <div className="text-right shrink-0">
          <span className="inline-block px-3 py-1 text-[11px] font-black uppercase tracking-wider text-sky-900 bg-sky-100 rounded-full">
            Cartão de Crédito
          </span>
          <p className="text-[11px] text-slate-400 mt-1 font-semibold flex items-center justify-end gap-1">
            <Calendar className="w-3.5 h-3.5 text-sky-500" />
            {clientInfo.date || new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* 2. Value Banner & Client Details */}
      <div className="my-4 bg-gradient-to-r from-sky-50 to-blue-50/70 p-4 rounded-2xl border border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-sky-700 block">
              Valor da viagem / PIX
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {formatBRL(baseValue)}
            </div>
          </div>

          {(clientInfo.clientName || clientInfo.destination) && (
            <div className="text-left sm:text-right text-xs">
              {clientInfo.clientName && (
                <div className="font-bold text-slate-800 flex items-center sm:justify-end gap-1">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span>{clientInfo.clientName}</span>
                </div>
              )}
              {clientInfo.destination && (
                <div className="text-sky-700 flex items-center sm:justify-end gap-1 mt-0.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  <span>{clientInfo.destination}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Installments Grid (Exclusively Horizontal 2-Columns) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Column 1 */}
        <div className="border border-sky-100 rounded-xl overflow-hidden bg-sky-50/20">
          <div className="flex items-center justify-between text-[10px] font-extrabold text-sky-950 uppercase tracking-wider px-3 py-1.5 bg-sky-100/60 border-b border-sky-100">
            <span>Parcelamento</span>
            <span>Total</span>
          </div>
          <div className="divide-y divide-sky-100/80">
            {col1.map((row) => (
              <div
                key={row.installments}
                className="flex items-center justify-between py-2 px-3 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-7 font-black text-sky-950 text-sm">
                    {row.installments}x
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">de</span>
                  <span className="font-black text-slate-900 text-sm">
                    {formatBRL(row.installmentValue)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-500 font-medium">
                  Total: <strong className="text-slate-800 font-bold">{formatBRL(row.totalToPay)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="border border-sky-100 rounded-xl overflow-hidden bg-sky-50/20">
          <div className="flex items-center justify-between text-[10px] font-extrabold text-sky-950 uppercase tracking-wider px-3 py-1.5 bg-sky-100/60 border-b border-sky-100">
            <span>Parcelamento</span>
            <span>Total</span>
          </div>
          <div className="divide-y divide-sky-100/80">
            {col2.map((row) => (
              <div
                key={row.installments}
                className="flex items-center justify-between py-2 px-3 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-7 font-black text-sky-950 text-sm">
                    {row.installments}x
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">de</span>
                  <span className="font-black text-slate-900 text-sm">
                    {formatBRL(row.installmentValue)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-500 font-medium">
                  Total: <strong className="text-slate-800 font-bold">{formatBRL(row.totalToPay)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Optional Note */}
      {clientInfo.notes && (
        <div className="mt-3 p-2.5 bg-sky-50/60 rounded-xl border border-sky-100 text-[11px] text-slate-600 italic">
          "{clientInfo.notes}"
        </div>
      )}

      {/* 5. Footer Branding */}
      <div className="mt-4 pt-3 border-t border-sky-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="font-black text-[#47558A] tracking-wider">
            BE TRAVEL
          </span>
          <a
            href="https://www.instagram.com/betr4vel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 hover:text-sky-950 px-2.5 py-1 rounded-lg border border-sky-100 transition-colors cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5 text-sky-600" />
            <span>@betr4vel</span>
          </a>
        </div>
      </div>
    </div>
  );
};
