import assert from "node:assert/strict";

import { PRODUCTS } from "@/data/products";
import { createProductPdf } from "@/lib/create-product-pdf";

const product = PRODUCTS[0];

let appendCount = 0;
let removeCount = 0;
const anchors: Array<{
  href: string;
  download: string;
  style: Record<string, unknown>;
  clickCalled: boolean;
}> = [];
let createdUrl: string | null = null;
let revokedUrl: string | null = null;

(globalThis as unknown as { document: Document }).document = {
  createElement: (tagName: string) => {
    assert.equal(tagName, "a");
    const anchor = {
      href: "",
      download: "",
      style: {} as Record<string, unknown>,
      clickCalled: false,
      click() {
        this.clickCalled = true;
      },
    };
    anchors.push(anchor);
    return anchor;
  },
  body: {
    appendChild: (node: unknown) => {
      appendCount += 1;
      assert.equal(node, anchors.at(-1));
    },
    removeChild: (node: unknown) => {
      removeCount += 1;
      assert.equal(node, anchors.at(-1));
    },
  },
} as unknown as Document;

(globalThis.URL as unknown) = {
  createObjectURL: (blob: Blob) => {
    assert.ok(blob instanceof Blob);
    assert.ok(blob.size > 0);
    createdUrl = "blob:mock-url";
    return createdUrl;
  },
  revokeObjectURL: (url: string) => {
    revokedUrl = url;
  },
};

(globalThis.window as unknown) = {
  alert: (_message: string) => {
    throw new Error("window.alert should not be called during successful PDF creation");
  },
};

const run = async () => {
  await createProductPdf(product);

  assert.equal(anchors.length, 1, "Should create one anchor element");
  const anchor = anchors[0];
  assert.equal(appendCount, 1, "Anchor should be appended to document.body");
  assert.equal(removeCount, 1, "Anchor should be removed from document.body");
  assert.equal(anchor.download, "ap-led.pdf", "Download filename should be slugified product title");
  assert.equal(anchor.clickCalled, true, "Anchor click should be triggered");
  assert.equal(anchor.href, createdUrl, "Anchor href should match object URL");
  assert.equal(revokedUrl, createdUrl, "Object URL should be revoked after download");
  console.log("PDF generation check passed for", product.title);
};

run().catch((error) => {
  console.error("PDF generation check failed:", error);
  process.exit(1);
});
