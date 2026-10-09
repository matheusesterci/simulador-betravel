export interface InstallmentRate {
  installments: number;
  rate: number; // percentage
}

export interface SimulationRow {
  installments: number;
  rate: number;
  installmentValue: number;
  totalToPay: number;
  selected: boolean;
}

export interface ClientQuoteInfo {
  clientName: string;
  destination: string;
  notes: string;
  date: string;
}

export const DEFAULT_RATES: InstallmentRate[] = [
  { installments: 1, rate: 2.99 },
  { installments: 2, rate: 4.43 },
  { installments: 3, rate: 5.18 },
  { installments: 4, rate: 5.93 },
  { installments: 5, rate: 6.68 },
  { installments: 6, rate: 7.43 },
  { installments: 7, rate: 7.75 },
  { installments: 8, rate: 8.50 },
  { installments: 9, rate: 9.25 },
  { installments: 10, rate: 10.00 },
  { installments: 11, rate: 10.75 },
  { installments: 12, rate: 11.50 },
  { installments: 13, rate: 14.10 },
  { installments: 14, rate: 14.95 },
  { installments: 15, rate: 15.80 },
  { installments: 16, rate: 16.65 },
  { installments: 17, rate: 17.50 },
  { installments: 18, rate: 18.35 },
];
