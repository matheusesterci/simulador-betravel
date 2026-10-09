import * as XLSX from 'xlsx';
import { toPng, toBlob } from 'html-to-image';
import { ClientQuoteInfo, SimulationRow } from '../types/simulator';
import { formatBRL } from './calculator';

export async function downloadElementAsPng(
  element: HTMLElement,
  filename: string = 'simulacao_parcelamento_betravel.png'
): Promise<void> {
  const dataUrl = await toPng(element, {
    quality: 0.98,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    cacheBust: true,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyElementAsPngToClipboard(
  element: HTMLElement
): Promise<boolean> {
  try {
    const blob = await toBlob(element, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
    });

    if (!blob) return false;

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Falha ao copiar imagem:', err);
    return false;
  }
}

export function generateWhatsAppMessage(
  rows: SimulationRow[],
  baseValue: number,
  clientInfo?: ClientQuoteInfo
): string {
  const selectedRows = rows.filter((r) => r.selected);
  const rowsToExport = selectedRows.length > 0 ? selectedRows : rows;

  let msg = `✈️ *BE TRAVEL - SIMULAÇÃO DE PARCELAMENTO*\n\n`;

  if (clientInfo?.clientName) {
    msg += `Olá, *${clientInfo.clientName}*!\n`;
  }
  if (clientInfo?.destination) {
    msg += `📍 *Destino:* ${clientInfo.destination}\n`;
  }
  msg += `💰 *Valor da viagem / PIX:* ${formatBRL(baseValue)}\n\n`;
  msg += `*Opções no Cartão de Crédito:*\n`;

  rowsToExport.forEach((r) => {
    msg += `▫️ *${r.installments}x* de *${formatBRL(r.installmentValue)}* (Total: ${formatBRL(r.totalToPay)})\n`;
  });

  if (clientInfo?.notes) {
    msg += `\n📝 *Observação:* ${clientInfo.notes}\n`;
  }

  msg += `\n*BE TRAVEL* · Instagram: @betr4vel`;

  return msg;
}

export function exportToExcel(
  rows: SimulationRow[],
  baseValue: number,
  clientInfo?: ClientQuoteInfo
) {
  const selectedRows = rows.filter((r) => r.selected);
  const rowsToExport = selectedRows.length > 0 ? selectedRows : rows;

  const headerData: (string | number)[][] = [
    ['BE TRAVEL - SIMULAÇÃO DE PARCELAMENTO NO CARTÃO'],
    ['Data:', clientInfo?.date || new Date().toLocaleDateString('pt-BR')],
    ['Valor à Vista:', formatBRL(baseValue)],
  ];

  if (clientInfo?.clientName) {
    headerData.push(['Cliente:', clientInfo.clientName]);
  }
  if (clientInfo?.destination) {
    headerData.push(['Destino:', clientInfo.destination]);
  }

  headerData.push([]);

  const tableHeaders = ['Parcelas', 'Valor da Parcela (R$)', 'Total (R$)'];
  const tableData = rowsToExport.map((r) => [
    `${r.installments}x`,
    r.installmentValue,
    r.totalToPay,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([
    ...headerData,
    tableHeaders,
    ...tableData,
  ]);

  worksheet['!cols'] = [{ wch: 15 }, { wch: 25 }, { wch: 25 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Parcelamento');

  const safeFilename = clientInfo?.clientName
    ? `simulacao_${clientInfo.clientName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.xlsx`
    : `simulacao_parcelamento_${baseValue.toFixed(0)}.xlsx`;

  XLSX.writeFile(workbook, safeFilename);
}
