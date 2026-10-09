import React, { useState } from 'react';
import { X, Check, DollarSign } from 'lucide-react';

interface RateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  extraPerInstallment: number;
  onSaveExtra: (extra: number) => void;
}

export const RateEditorModal: React.FC<RateEditorModalProps> = ({
  isOpen,
  onClose,
  extraPerInstallment,
  onSaveExtra,
}) => {
  const [editedExtra, setEditedExtra] = useState<number>(extraPerInstallment || 0);
  const [customInput, setCustomInput] = useState<string>(
    extraPerInstallment > 0 ? extraPerInstallment.toString() : ''
  );

  if (!isOpen) return null;

  const handleSelectPreset = (value: number) => {
    setEditedExtra(value);
    setCustomInput(value > 0 ? value.toString() : '');
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setCustomInput(e.target.value);
    const parsed = parseFloat(valStr);
    if (!isNaN(parsed) && parsed >= 0) {
      setEditedExtra(parsed);
    } else if (valStr === '') {
      setEditedExtra(0);
    }
  };

  const handleSave = () => {
    onSaveExtra(Math.max(0, editedExtra));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-sky-600" />
              Adicional por Parcela (Margem / Gorjetinha)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Defina um valor adicional por parcela embutido de forma invisível para o cliente.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50/60 border border-sky-200">
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-950 block mb-1">
              Atalhos Rápidos:
            </span>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <button
                type="button"
                onClick={() => handleSelectPreset(0)}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
                  editedExtra === 0
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                R$ 0 (Nenhum)
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(10)}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
                  editedExtra === 10
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-sky-900 border-sky-200 hover:bg-sky-50'
                }`}
              >
                +R$ 10
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(30)}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
                  editedExtra === 30
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-sky-900 border-sky-200 hover:bg-sky-50'
                }`}
              >
                +R$ 30
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(50)}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
                  editedExtra === 50
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-sky-900 border-sky-200 hover:bg-sky-50'
                }`}
              >
                +R$ 50
              </button>
            </div>
          </div>

          {/* Custom Amount Input */}
          <div>
            <label
              htmlFor="custom-extra"
              className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-1.5"
            >
              Ou digite a quantidade desejada por parcela (R$):
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                R$
              </span>
              <input
                id="custom-extra"
                type="text"
                inputMode="decimal"
                placeholder="Ex: 25,00"
                value={customInput}
                onChange={handleCustomInputChange}
                className="w-full pl-11 pr-4 py-2.5 text-base font-bold font-mono-numbers text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 outline-none transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              {editedExtra > 0
                ? `Será somado R$ ${editedExtra.toFixed(2)} a cada parcela no cartão.`
                : 'Nenhum adicional será somado (apenas a taxa padrão da maquininha).'}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleSelectPreset(0)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Zerar adicional
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Adicional</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
