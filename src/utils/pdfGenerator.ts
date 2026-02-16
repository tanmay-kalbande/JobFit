import html2pdf from 'html2pdf.js';

interface PDFOptions {
  margin?: number | [number, number, number, number];
  filename?: string;
  image?: { type: string; quality: number };
  html2canvas?: any;
  jsPDF?: any;
}

export const generatePDF = async (elementId: string, options: PDFOptions = {}) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id '${elementId}' not found`);
  }

  // Clone the element to modify styles for PDF generation without affecting the UI
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Create a container for the clone that's off-screen but rendered
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);
  container.appendChild(clone);

  // Apply PDF-specific styles to the clone
  // This ensures the clone looks right even if the original has responsive styles applied
  clone.style.width = '210mm'; // A4 width
  clone.style.padding = '20mm'; // Standard padding
  clone.style.backgroundColor = 'white';
  clone.style.color = 'black';
  clone.style.fontSize = '12pt';

  // Force all text to be black for better readability
  const allElements = clone.querySelectorAll('*');
  allElements.forEach((el) => {
      if (el instanceof HTMLElement) {
          el.style.color = 'black'; 
      }
  });

  const defaultOptions = {
    margin: 0, 
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const config = { ...defaultOptions, ...options };

  try {
    await html2pdf().set(config).from(clone).save();
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};
