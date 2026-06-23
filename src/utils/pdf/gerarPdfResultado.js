import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const gerarPDF = async (elementId = 'resultado') => {
  const element = document.getElementById(elementId);
  if (!element) {
    alert(`Não encontrei o elemento #${elementId} para gerar o PDF.`);
    return;
  }

  const targetW = Math.ceil(element.scrollWidth);
  const targetH = Math.ceil(element.scrollHeight);

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      width: targetW,
      height: targetH,
      windowWidth: targetW,
      windowHeight: targetH,
      onclone: (clonedDoc) => {
        clonedDoc
          .querySelectorAll('link[rel="stylesheet"]')
          .forEach((n) => n.remove());
        clonedDoc.querySelectorAll('style').forEach((n) => n.remove());
        const root = clonedDoc.getElementById(elementId);
        if (root) {
          root.style.width = `${targetW}px`;
          root.style.minHeight = `${targetH}px`;
          root.style.boxSizing = 'border-box';
          root.style.display = 'block';
        }
      },
      ignoreElements: (el) => {
        if (!el) return false;
        if (el.dataset?.pdfIgnore === 'true') return true;
        if (el.classList?.contains('pdf-ignore')) return true;
        return false;
      },
    });

    const img = canvas.toDataURL('image/png');

    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 5;
    const availW = pageWidth - margin * 2;
    const availH = pageHeight - margin * 2;

    const props = pdf.getImageProperties(img);
    const pxW = props.width || canvas.width;
    const pxH = props.height || canvas.height;

    const ratio = pxH / pxW;
    const heightIfFullWidth = ratio * availW;

    let imgWidth;
    let imgHeight;
    let xImg;

    if (heightIfFullWidth <= availH) {
      const mmPerPx = Math.min(availW / pxW, availH / pxH);
      imgWidth = pxW * mmPerPx;
      imgHeight = pxH * mmPerPx;
      xImg = margin + (availW - imgWidth) / 2;
    } else {
      imgWidth = availW;
      imgHeight = heightIfFullWidth;
      xImg = margin;
    }

    let heightLeft = imgHeight;
    let y = margin;

    pdf.addImage(img, 'PNG', xImg, y, imgWidth, imgHeight);
    heightLeft -= availH;

    while (heightLeft > 0) {
      pdf.addPage();
      y = margin - (imgHeight - heightLeft);
      pdf.addImage(img, 'PNG', xImg, y, imgWidth, imgHeight);
      heightLeft -= availH;
    }

    pdf.save('comparativo-tributario.pdf');
  } catch (err) {
    console.error(err);
    alert('Erro ao gerar o PDF.');
  }
};
