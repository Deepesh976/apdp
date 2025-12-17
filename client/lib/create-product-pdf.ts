import { PDFDocument, PDFFont, PDFImage, StandardFonts, rgb } from "pdf-lib";

import type { Product, ProductSpecKV } from "@/data/products";

const PAGE_MARGIN = 50;
const BODY_FONT_SIZE = 12;
const SECTION_TITLE_SIZE = 14;
const TITLE_FONT_SIZE = 20;
const SUBTITLE_FONT_SIZE = 12;

type DrawContext = {
  pdfDoc: PDFDocument;
  page: ReturnType<PDFDocument["addPage"]>;
  y: number;
  setPage: (page: ReturnType<PDFDocument["addPage"]>) => void;
  setY: (value: number) => void;
};

const lineHeightFor = (size: number) => size * 1.4;

const sanitizeFileName = (value: string) => {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .trim();
  return slug || "product";
};

const loadProductImage = async (pdfDoc: PDFDocument, imageUrl?: string | null): Promise<PDFImage | null> => {
  if (!imageUrl) {
    return null;
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("Content-Type")?.toLowerCase() ?? "";
    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const isPng = contentType.includes("png") || imageUrl.toLowerCase().endsWith(".png");

    if (isPng) {
      return await pdfDoc.embedPng(bytes);
    }

    return await pdfDoc.embedJpg(bytes);
  } catch (error) {
    console.error("Failed to load product image for PDF", error);
    return null;
  }
};

const PDF_CHAR_MAP: Record<string, string> = {
  "\u00a0": " ", // nbsp
  "\u200b": "", // zero-width space
  "\u2010": "-",
  "\u2011": "-",
  "\u2012": "-",
  "\u2013": "-",
  "\u2014": "-",
  "\u2018": "'",
  "\u2019": "'",
  "\u201c": '"',
  "\u201d": '"',
  "\u2022": "*",
  "\u2026": "...",
  "\u2122": "TM",
};

const normalizeForPdf = (value: string) =>
  value.replace(/[\u00a0\u200b\u2010-\u2014\u2018\u2019\u201c\u201d\u2022\u2026\u2122]/g, (char) => PDF_CHAR_MAP[char] ?? char);

const splitLongWord = (word: string, font: PDFFont, size: number, maxWidth: number) => {
  const segments: string[] = [];
  let remaining = word;

  while (remaining.length > 0) {
    let sliceLength = remaining.length;

    while (sliceLength > 0) {
      const slice = remaining.slice(0, sliceLength);
      if (font.widthOfTextAtSize(slice, size) <= maxWidth || sliceLength === 1) {
        segments.push(slice);
        remaining = remaining.slice(sliceLength);
        break;
      }
      sliceLength -= 1;
    }

    if (sliceLength === 0) {
      break;
    }
  }

  return segments.filter(Boolean);
};

const wrapText = (text: string, font: PDFFont, size: number, maxWidth: number) => {
  const lines: string[] = [];
  const sanitizedText = normalizeForPdf(text);
  const paragraphs = sanitizedText.split(/\r?\n/);

  paragraphs.forEach((paragraph, index) => {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = "";

    if (words.length === 0) {
      lines.push("");
    }

    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      const candidateWidth = font.widthOfTextAtSize(candidate, size);

      if (candidateWidth <= maxWidth) {
        line = candidate;
        return;
      }

      if (line) {
        lines.push(line);
        line = "";
      }

      const segments = splitLongWord(word, font, size, maxWidth);

      if (segments.length === 0) {
        return;
      }

      segments.forEach((segment, segmentIndex) => {
        if (segmentIndex === segments.length - 1) {
          line = segment;
        } else {
          lines.push(segment);
        }
      });
    });

    if (line) {
      lines.push(line);
    }

    if (index < paragraphs.length - 1) {
      lines.push("");
    }
  });

  return lines;
};

const ensureSpace = (context: DrawContext, requiredHeight: number) => {
  if (context.y - requiredHeight >= PAGE_MARGIN) {
    return;
  }
  const newPage = context.pdfDoc.addPage();
  context.setPage(newPage);
  context.setY(newPage.getSize().height - PAGE_MARGIN);
};

const drawLines = (
  textLines: string[],
  options: {
    context: DrawContext;
    font: PDFFont;
    size: number;
    color?: RGB;
    x?: number;
    lineGap?: number;
    afterGap?: number;
  },
) => {
  const { context, font, size } = options;
  const color = options.color ?? rgb(0, 0, 0);
  const lineGap = options.lineGap ?? lineHeightFor(size);
  const x = options.x ?? PAGE_MARGIN;

  textLines.forEach((lineText) => {
    ensureSpace(context, lineGap);

    const safeLine = normalizeForPdf(lineText);

    context.page.drawText(safeLine, {
      x,
      y: context.y,
      size,
      font,
      color,
    });

    context.setY(context.y - lineGap);
  });

  if (options.afterGap) {
    context.setY(context.y - options.afterGap);
  }
};

const drawHeading = (context: DrawContext, font: PDFFont, title: string) => {
  drawLines([normalizeForPdf(title)], {
    context,
    font,
    size: TITLE_FONT_SIZE,
    lineGap: lineHeightFor(TITLE_FONT_SIZE),
    afterGap: 12,
  });
};

const drawSubtitle = (context: DrawContext, font: PDFFont, subtitle: string) => {
  drawLines([normalizeForPdf(subtitle)], {
    context,
    font,
    size: SUBTITLE_FONT_SIZE,
    color: rgb(0.3, 0.3, 0.3),
    lineGap: lineHeightFor(SUBTITLE_FONT_SIZE),
    afterGap: 16,
  });
};

const drawSectionTitle = (context: DrawContext, font: PDFFont, title: string) => {
  drawLines([normalizeForPdf(title)], {
    context,
    font,
    size: SECTION_TITLE_SIZE,
    color: rgb(0.1, 0.2, 0.5),
    lineGap: lineHeightFor(SECTION_TITLE_SIZE),
    afterGap: 8,
  });
};

const drawParagraph = (context: DrawContext, font: PDFFont, text: string) => {
  if (!text) {
    return;
  }

  const pageWidth = context.page.getSize().width;
  const maxWidth = pageWidth - PAGE_MARGIN * 2;
  const lines = wrapText(text, font, BODY_FONT_SIZE, maxWidth);

  drawLines(lines, {
    context,
    font,
    size: BODY_FONT_SIZE,
    lineGap: lineHeightFor(BODY_FONT_SIZE),
    afterGap: 12,
  });
};

const drawBulletList = (context: DrawContext, font: PDFFont, items: string[]) => {
  if (!items.length) {
    return;
  }

  const pageWidth = context.page.getSize().width;
  const bulletIndent = PAGE_MARGIN + 14;
  const maxWidth = pageWidth - bulletIndent - PAGE_MARGIN;
  const lineGap = lineHeightFor(BODY_FONT_SIZE);

  items.forEach((item) => {
    const lines = wrapText(item, font, BODY_FONT_SIZE, maxWidth);

    lines.forEach((lineText, index) => {
      ensureSpace(context, lineGap);
      const marker = normalizeForPdf("•");
      if (index === 0) {
        context.page.drawText(marker, {
          x: PAGE_MARGIN,
          y: context.y,
          size: BODY_FONT_SIZE,
          font,
        });
      }
      context.page.drawText(normalizeForPdf(lineText), {
        x: index === 0 ? bulletIndent : bulletIndent,
        y: context.y,
        size: BODY_FONT_SIZE,
        font,
      });
      context.setY(context.y - lineGap);
    });

    context.setY(context.y - BODY_FONT_SIZE * 0.3);
  });

  context.setY(context.y - 6);
};

const drawSpecs = (context: DrawContext, fonts: { regular: PDFFont; bold: PDFFont }, specs: ProductSpecKV[]) => {
  if (!specs.length) {
    return;
  }

  const lineGap = lineHeightFor(BODY_FONT_SIZE);
  const pageWidth = context.page.getSize().width;
  const labelMaxWidth = pageWidth - PAGE_MARGIN * 2;

  specs.forEach((spec) => {
    const labelText = normalizeForPdf(`${spec.label}: `);
    const labelWidth = fonts.bold.widthOfTextAtSize(labelText, BODY_FONT_SIZE);
    const valueMaxWidth = labelMaxWidth - labelWidth;
    const valueLines = wrapText(spec.value, fonts.regular, BODY_FONT_SIZE, valueMaxWidth);

    ensureSpace(context, lineGap);
    context.page.drawText(labelText, {
      x: PAGE_MARGIN,
      y: context.y,
      size: BODY_FONT_SIZE,
      font: fonts.bold,
    });

    const firstValueLine = valueLines.shift();

    if (firstValueLine) {
      context.page.drawText(normalizeForPdf(firstValueLine), {
        x: PAGE_MARGIN + labelWidth,
        y: context.y,
        size: BODY_FONT_SIZE,
        font: fonts.regular,
      });
    }

    context.setY(context.y - lineGap);

    valueLines.forEach((line) => {
      ensureSpace(context, lineGap);
      context.page.drawText(normalizeForPdf(line), {
        x: PAGE_MARGIN + labelWidth,
        y: context.y,
        size: BODY_FONT_SIZE,
        font: fonts.regular,
      });
      context.setY(context.y - lineGap);
    });

    context.setY(context.y - BODY_FONT_SIZE * 0.3);
  });
};

const drawHeroSection = (
  context: DrawContext,
  fonts: { regular: PDFFont; bold: PDFFont },
  product: Product,
  productImage: PDFImage | null,
  stats: string[],
) => {
  const heroHeight = 220;
  ensureSpace(context, heroHeight);

  const pageWidth = context.page.getSize().width;
  const heroTopY = context.y;
  const heroBottomY = heroTopY - heroHeight;
  const blockX = PAGE_MARGIN - 10;
  const blockWidth = pageWidth - (PAGE_MARGIN - 10) * 2;

  context.page.drawRectangle({
    x: blockX,
    y: heroBottomY,
    width: blockWidth,
    height: heroHeight,
    color: rgb(0.95, 0.98, 1),
    borderColor: rgb(0.7, 0.85, 0.98),
    borderWidth: 1,
  });

  let imageBoundaryX = blockX + blockWidth - 16;

  if (productImage) {
    const imageBoxMaxWidth = 200;
    const imageBoxMaxHeight = heroHeight - 60;
    const fitted = productImage.scaleToFit(imageBoxMaxWidth, imageBoxMaxHeight);
    const imageX = blockX + blockWidth - fitted.width - 24;
    const imageY = heroBottomY + (heroHeight - fitted.height) / 2;

    context.page.drawImage(productImage, {
      x: imageX,
      y: imageY,
      width: fitted.width,
      height: fitted.height,
    });

    imageBoundaryX = imageX - 12;
  }

  let textMaxWidth = imageBoundaryX - PAGE_MARGIN;
  if (textMaxWidth < 160) {
    textMaxWidth = blockWidth - 40;
  }

  const heroTitleSize = 24;
  let textY = heroTopY - heroTitleSize;

  context.page.drawText(normalizeForPdf(product.title), {
    x: PAGE_MARGIN,
    y: textY,
    size: heroTitleSize,
    font: fonts.bold,
    color: rgb(0.12, 0.2, 0.38),
  });

  textY -= lineHeightFor(SUBTITLE_FONT_SIZE);
  context.page.drawText(normalizeForPdf(product.category), {
    x: PAGE_MARGIN,
    y: textY,
    size: SUBTITLE_FONT_SIZE,
    font: fonts.bold,
    color: rgb(0.32, 0.48, 0.76),
  });

  textY -= 10;

  const summaryLines = wrapText(product.description ?? "", fonts.regular, BODY_FONT_SIZE, textMaxWidth).slice(0, 3);

  summaryLines.forEach((line) => {
    context.page.drawText(normalizeForPdf(line), {
      x: PAGE_MARGIN,
      y: textY,
      size: BODY_FONT_SIZE,
      font: fonts.regular,
      color: rgb(0.25, 0.25, 0.25),
    });
    textY -= lineHeightFor(BODY_FONT_SIZE);
  });

  if (summaryLines.length === 0) {
    textY -= 4;
  }

  const statSize = 10;
  stats.forEach((stat) => {
    if (textY <= heroBottomY + 24) {
      return;
    }

    context.page.drawText(normalizeForPdf(`• ${stat}`), {
      x: PAGE_MARGIN,
      y: textY,
      size: statSize,
      font: fonts.bold,
      color: rgb(0.32, 0.48, 0.76),
    });

    textY -= lineHeightFor(statSize);
  });

  context.page.drawRectangle({
    x: PAGE_MARGIN,
    y: heroBottomY - 12,
    width: pageWidth - PAGE_MARGIN * 2,
    height: 1,
    color: rgb(0.85, 0.9, 0.95),
  });

  context.setY(heroBottomY - 32);
};

export const createProductPdf = async (product: Product) => {
  if (typeof document === "undefined") {
    throw new Error("PDF generation is only available in the browser.");
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const context: DrawContext = {
    pdfDoc,
    page,
    y: page.getSize().height - PAGE_MARGIN,
    setPage: (newPage) => {
      context.page = newPage;
    },
    setY: (value: number) => {
      context.y = value;
    },
  };

  const featureCount = product.features?.length ?? 0;
  const specCount = product.specs.length;
  const galleryCount = product.gallery?.length ?? 0;
  const productImage = await loadProductImage(pdfDoc, product.image);

  const heroStats: string[] = [];
  if (featureCount) {
    heroStats.push(`${featureCount} key features`);
  }
  if (specCount) {
    heroStats.push(`${specCount} specification entries`);
  }
  if (galleryCount) {
    heroStats.push(`${galleryCount} gallery images`);
  }

  drawHeroSection(context, { regular: regularFont, bold: boldFont }, product, productImage, heroStats);
  drawSectionTitle(context, boldFont, "Overview");
  drawParagraph(context, regularFont, product.description ?? "");

  if (product.features?.length) {
    drawSectionTitle(context, boldFont, "Key Features");
    drawBulletList(context, regularFont, product.features);
  }

  if (product.specs.length) {
    drawSectionTitle(context, boldFont, "Specifications");
    drawSpecs(context, { regular: regularFont, bold: boldFont }, product.specs);
  }

  if (product.gallery?.length) {
    drawSectionTitle(context, boldFont, "Gallery");

    for (const galleryImageUrl of product.gallery) {
      const galleryImage = await loadProductImage(pdfDoc, galleryImageUrl);

      if (galleryImage) {
        const maxImageWidth = context.page.getSize().width - PAGE_MARGIN * 2;
        const maxImageHeight = 250;
        const fitted = galleryImage.scaleToFit(maxImageWidth, maxImageHeight);

        ensureSpace(context, fitted.height + 20);

        context.page.drawImage(galleryImage, {
          x: PAGE_MARGIN,
          y: context.y - fitted.height,
          width: fitted.width,
          height: fitted.height,
        });

        context.setY(context.y - fitted.height - 16);
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  const arrayBuffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });
  const fileName = `${sanitizeFileName(product.title)}.pdf`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.style.position = "absolute";
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
