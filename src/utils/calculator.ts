import { InstallmentRate, SimulationRow } from '../types/simulator';

export function formatBRL(value: number): string {
  if (isNaN(value) || value <= 0) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(rate: number): string {
  if (isNaN(rate)) return '0,00%';
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rate) + '%';
}

export function calculateSimulation(
  baseValue: number,
  rates: InstallmentRate[],
  selectedMap: Record<number, boolean>,
  extraPerInstallment: number = 0
): SimulationRow[] {
  if (!baseValue || baseValue <= 0) {
    return rates.map((r) => ({
      installments: r.installments,
      rate: r.rate,
      installmentValue: 0,
      totalToPay: 0,
      selected: selectedMap[r.installments] ?? true,
    }));
  }

  const extra = Math.max(0, extraPerInstallment || 0);

  return rates.map((r) => {
    const rateDecimal = r.rate / 100;
    // Padrão maquininha (repasse): baseValue / (1 - rateDecimal)
    const totalNormal = rateDecimal >= 1 ? baseValue : baseValue / (1 - rateDecimal);
    const installmentNormal = totalNormal / r.installments;

    // Gorjetinha somada por parcela
    let installmentValue = Math.round((installmentNormal + extra) * 100) / 100;
    let totalToPay = Math.round(installmentValue * r.installments * 100) / 100;

    return {
      installments: r.installments,
      rate: r.rate,
      installmentValue,
      totalToPay,
      selected: selectedMap[r.installments] ?? true,
    };
  });
}
