interface PDFOptions {
  filename?: string;
}

/**
 * Generates a printable document and opens the browser print dialog.
 * Users can choose "Save as PDF" from the print destination.
 */
export const generatePDF = async (elementId: string, options: PDFOptions = {}): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id '${elementId}' not found`);
  }

  const printable = element.cloneNode(true) as HTMLElement;
  const title = options.filename?.replace(/\.pdf$/i, '') || 'Resume';

  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=1024,height=768');
  if (!printWindow) {
    throw new Error('Unable to open print window. Please allow popups and try again.');
  }

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    @page { size: A4; margin: 10mm 12mm; }
    html, body { margin: 0; padding: 0; background: #fff; }
    body {
      font-family: Inter, 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #141414;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    #print-root { width: 100%; }
    .resume-container {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      box-shadow: none !important;
      border: none !important;
      border-radius: 0 !important;
    }
  </style>
</head>
<body>
  <div id="print-root"></div>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  const mountNode = printWindow.document.getElementById('print-root');
  if (!mountNode) {
    printWindow.close();
    throw new Error('Failed to prepare print document.');
  }
  mountNode.appendChild(printWindow.document.importNode(printable, true));

  await new Promise<void>((resolve) => {
    const invokePrint = () => {
      printWindow.focus();
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
        resolve();
      }, 300);
    };

    if (printWindow.document.readyState === 'complete') {
      invokePrint();
      return;
    }

    printWindow.addEventListener('load', invokePrint, { once: true });
  });
};
