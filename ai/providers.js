// ============================================================
// 📡 تعريف المزودات (Providers)
// ============================================================

import {
  GEMINI_KEYS,
  GROQ_KEYS,
  OPENROUTER_KEYS,
  CEREBRAS_KEYS,
  SAMBANOVA_KEYS,
  TOGETHER_KEYS
} from './keys.js';

export const PROVIDERS = [
  {
    id: 'gemini',
    name: 'Gemini',
    keys: GEMINI_KEYS,
    // Gemini يضع المفتاح في الرابط، وليس في Header
    buildRequest: (prompt, systemMsg) => ({
      contents: [{ parts: [{ text: `${systemMsg}\n\n${prompt}` }] }],
      generationConfig: { maxOutputTokens: 150, temperature: 0.3 }
    }),
    getEndpoint: (key) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    getHeaders: () => ({ 'Content-Type': 'application/json' }),
    parseResponse: (data) => data.candidates?.[0]?.content?.parts?.[0]?.text || null,
    useBearer: false
  },
  {
    id: 'groq',
    name: 'Groq',
    keys: GROQ_KEYS,
    buildRequest: (prompt, systemMsg) => ({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 150
    }),
    getEndpoint: () => 'https://api.groq.com/openai/v1/chat/completions',
    getHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content || null,
    useBearer: true
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    keys: OPENROUTER_KEYS,
    buildRequest: (prompt, systemMsg, model = 'nvidia/nemotron-3-ultra-550b-a55b:free') => ({
      model: model,
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.3
    }),
    getEndpoint: () => 'https://openrouter.ai/api/v1/chat/completions',
    getHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': 'https://zertivab2.online/'
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content || null,
    useBearer: true,
    // OpenRouter يحتوي على نماذج متعددة
    models: [
      'nvidia/nemotron-3-ultra-550b-a55b:free',
      'nvidia/nemotron-3-super-120b-a12b:free',
      'poolside/laguna-xs-2.1:free',
      'poolside/laguna-s-2.1:free',
      'google/gemma-4-31b-it:free',
      'google/gemma-4-26b-a4b-it:free',
      'openai/gpt-oss-20b:free',
      'cohere/north-mini-code:free',
      'inclusionai/ling-3.0-flash:free',
      'nvidia/nemotron-nano-9b-v2:free',
      'nvidia/nemotron-3-nano-30b-a3b:free',
      'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free'
    ]
  },
  {
    id: 'cerebras',
    name: 'Cerebras',
    keys: CEREBRAS_KEYS,
    buildRequest: (prompt, systemMsg) => ({
      model: 'llama3.1-8b',
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 150
    }),
    getEndpoint: () => 'https://api.cerebras.ai/v1/chat/completions',
    getHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content || null,
    useBearer: true
  },
  {
    id: 'sambanova',
    name: 'SambaNova',
    keys: SAMBANOVA_KEYS,
    buildRequest: (prompt, systemMsg) => ({
      model: 'Meta-Llama-3.1-8B-Instruct',
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 150
    }),
    getEndpoint: () => 'https://api.sambanova.ai/v1/chat/completions',
    getHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content || null,
    useBearer: true
  },
  {
    id: 'together',
    name: 'Together AI',
    keys: TOGETHER_KEYS,
    buildRequest: (prompt, systemMsg) => ({
      model: 'meta-llama/Llama-3.2-3B-Instruct-Turbo',
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 150
    }),
    getEndpoint: () => 'https://api.together.xyz/v1/chat/completions',
    getHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content || null,
    useBearer: true
  }
];

// تصدير دالة للحصول على المزودات النشطة (التي لديها مفاتيح)
export function getActiveProviders() {
  return PROVIDERS.filter(p => p.keys && p.keys.length > 0);
}