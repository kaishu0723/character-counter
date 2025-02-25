"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry"; // Web Worker を適用

const PdfTextExtractor = () => {
  const [text, setText] = useState<string>("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      if (!reader.result) return;

      const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
      }

      setText(extractedText);
    };
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <textarea value={text} readOnly rows={10} style={{ width: "100%" }} />
    </div>
  );
};

export default PdfTextExtractor;
