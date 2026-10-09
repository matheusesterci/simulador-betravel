import JSZip from 'jszip';
import { PROJECT_SOURCE_FILES } from './projectFiles';

export async function downloadProjectZip(filename: string = 'simulador-betravel.zip'): Promise<void> {
  const zip = new JSZip();

  for (const [path, content] of Object.entries(PROJECT_SOURCE_FILES)) {
    zip.file(path, content, {
      date: new Date(),
      unixPermissions: '644',
    });
  }

  const blob = await zip.generateAsync({
    type: 'blob',
    mimeType: 'application/zip',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
    platform: 'UNIX',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
