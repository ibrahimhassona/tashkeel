import { initWasm, getWasm } from './wasm-loader';
import { forbiddenWords } from "./forbiddenWords";

let wasmInitialized = false;

export async function tashkeel(text) {
  if (!wasmInitialized) {
    await initWasm();
    wasmInitialized = true;
  }

  const wasm = getWasm();
  if (!wasm) {
    console.error('WebAssembly module not loaded');
    return text; // Return original text if WebAssembly is not loaded
  }

  const tam_Eltashkeel = wasm.do_tashkeel(text);
  return tam_Eltashkeel;
}

function normalizeArabic(text) {
  return text
    .replace(/[آأإا]/g, 'ا')
    .replace(/[ىي]/g, 'ي')
    .replace(/[ؤو]/g, 'و')
    .replace(/ة/g, 'ه')
    .replace(/[ًٌٍَُِّْ]/g, '');
}

export function censorWords(text) {
  // Split the text into lines
  const lines = text.split(/\r?\n/);
  
  const censoredLines = lines.map(line => {
    const words = line.split(/\s+/);
    const censoredWords = words.map(word => {
      const normalizedWord = normalizeArabic(word.trim());
      
      if (forbiddenWords.some(forbidden => 
        normalizeArabic(forbidden).toLowerCase() === normalizedWord.toLowerCase() ||
        normalizedWord.toLowerCase().includes(normalizeArabic(forbidden).toLowerCase())
      )) {
        const mid = Math.floor(word.length / 2);
        return word.slice(0, mid) + 'ـ ـ' + word.slice(mid);
      }
      return word;
    });
    
    return censoredWords.join(' ');
  });
  
  // Join the lines back together, preserving new lines
  return censoredLines.join('\n');
}