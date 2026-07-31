// ============================================================
// 🔑 جميع مفاتيح API – لا تطبع في Console أبداً
// ============================================================

// ---------- Gemini ----------
export const GEMINI_KEYS = [
  'AQ.Ab8RN6IEpyTQ2rXEDHOLgbIY84Q3nVH_ApbAosh2CLfjvSvWCQ',
  'AQ.Ab8RN6JvGQBQQnUp9DMNdL8rk0PKqm-f9GaT6yLGHjqc8MXFGw',
  'AQ.Ab8RN6KNZ6d32-pXvfue95-_UfptNLdN-5kfF-wYDAQ1rTVvdQ',
  'AQ.Ab8RN6Jy7LA6Am3EGq53Nw9g7U9fn93yD7D5Eba6MPpDmamXsA'
];

// ---------- Groq ----------
export const GROQ_KEYS = [
  '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',
  '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',
  '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',
  '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',
  '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',
  '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'
];

// ---------- Cerebras ----------
export const CEREBRAS_KEYS = [
  'csk-xfkw8djtw3eexwwerxkefyw6dnv364jmpkxhvvwf98ym44wd',
  'csk-mw9ntxxc6vmdr4k6mjnrchj9eecm3cepwe5kwyxr3pfxf6td',
  'csk-96v983y9md9pp3kpt246wxyv8re2w3dnmh2nywnyxehpyhet',
  'csk-n32yr2revhk999wjrd5e3e9pkhrywd49hvx388yv44xwm89v',
  'csk-vfm2xhtrd4mcxfydy6y4txh9m5cxjh34pred39xj8mr9f4e4',
  'csk-53jd4p4n8dpppmj8jpdk62v422d25ep4hp3e2x346x8n2kj2'
];

// ---------- SambaNova ----------
export const SAMBANOVA_KEYS = [
  '88aa271a-3254-44cf-8f61-070d7771a3ed',
  '048687a1-df97-4135-b446-af580887206e',
  'd047e95c-2da4-451d-83e0-97c0b209fa39'
];

// ---------- Together AI ----------
export const TOGETHER_KEYS = [
  'key_CdZKM6Puk4TKFkMJ2PW8Q',
  'key_CdZKb8qszpjHqzoGAxBPT'
];

// ---------- OpenRouter (من .env) ----------
// سيتم استيرادها من متغيرات البيئة في server.js،
// لكن نضع مصفوفة فارغة هنا وسيتم تعبئتها لاحقاً
export let OPENROUTER_KEYS = [];

// دالة لتعيين مفاتيح OpenRouter من .env
export function setOpenRouterKeys(keys) {
  OPENROUTER_KEYS = keys.filter(k => k && k.trim() !== '');
}
