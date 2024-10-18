let wasm;

   export function __wbg_set_wasm(val) {
     wasm = val;
   }

   export async function initWasm() {
     if (wasm) return;
     
     try {
       const wasmModule = await import('libtashkeel-wasm/libtashkeel_wasm_bg.wasm');
       __wbg_set_wasm(wasmModule);
     } catch (err) {
       console.error('Failed to load WebAssembly module:', err);
     }
   }

   export function getWasm() {
     return wasm;
   }