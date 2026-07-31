const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ============================================================
// 🔑 قراءة المفاتيح من .env لكل مزود
// ============================================================
function getKeys(prefix, count) {
    const keys = [];
    for (let i = 1; i <= count; i++) {
        const key = process.env[`${prefix}_${i}`];
        if (key && key.trim() !== '') keys.push(key);
    }
    return keys;
}

// Gemini (مفتاح واحد فقط)
const GEMINI_KEYS = process.env.GEMINI_API_KEY ? [process.env.GEMINI_API_KEY] : [];

// Groq (6 مفاتيح)
const GROQ_KEYS = getKeys('GROQ_API_KEY', 6);

// OpenRouter (6 مفاتيح)
const OPENROUTER_KEYS = getKeys('OPENROUTER_API_KEY', 6);

// Cerebras (6 مفاتيح)
const CEREBRAS_KEYS = getKeys('CEREBRAS_API_KEY', 6);

// SambaNova (3 مفاتيح)
const SAMBANOVA_KEYS = getKeys('SAMBANOVA_API_KEY', 3);

// Together AI (2 مفاتيح)
const TOGETHER_KEYS = getKeys('TOGETHER_API_KEY', 2);

// ============================================================
// 📋 نماذج OpenRouter المجانية
// ============================================================
const OPENROUTER_MODELS = [
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "poolside/laguna-xs-2.1:free",
    "poolside/laguna-s-2.1:free",
    "google/gemma-4-31b-it:free",
    "google/gemma-4-26b-a4b-it:free",
    "openai/gpt-oss-20b:free",
    "cohere/north-mini-code:free",
    "inclusionai/ling-3.0-flash:free",
    "nvidia/nemotron-nano-9b-v2:free",
    "nvidia/nemotron-3-nano-30b-a3b:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free"
];

// ============================================================
// 🧠 تذكر آخر مفتاح ناجح لكل مزود (في الذاكرة)
// ============================================================
const lastSuccess = {};

function getLastKey(providerId) {
    return lastSuccess[providerId] || 0;
}

function setLastKey(providerId, keyIndex) {
    lastSuccess[providerId] = keyIndex;
}

// ============================================================
// 📚 معرفة الموقع (سياق النظام)
// ============================================================
const SITE_KNOWLEDGE = `
منصة Zertiva B2: امتحانات Goethe B2 (Lesen, Hören, Sprachbausteine, Schreiben, Mündlich).
مميزات: تصحيح تلقائي، تلوين ذكي، لعبة سريعة، Memory Trainer.
`;

function getSystemPrompt(question) {
    let base = 'أنت مساعد Zertiva B2. مختصر جداً.';
    const siteKeywords = ['موقع', 'منصة', 'المميزات', 'امتحانات', 'المهارات', 'Goethe', 'B2'];
    const isSiteQuestion = siteKeywords.some(keyword => question.includes(keyword));
    if (isSiteQuestion) {
        base += ` معرفتك بالموقع: ${SITE_KNOWLEDGE}`;
    }
    return base + ' أجب بجملة أو جملتين كحد أقصى.';
}

// ============================================================
// 💾 نظام Cache بسيط
// ============================================================
const cache = new Map();
const CACHE_TTL = 3600000; // ساعة واحدة

setInterval(() => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
            cache.delete(key);
        }
    }
    console.log(`🧹 تم تنظيف الـ Cache. الحجم الحالي: ${cache.size}`);
}, 3600000);

// ============================================================
// ⚙️ دوال استدعاء كل مزود
// ============================================================

// 1. Gemini
async function callGemini(prompt, systemMsg, key, timeout = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `${systemMsg}\n\n${prompt}` }] }],
                generationConfig: { maxOutputTokens: 150, temperature: 0.3 }
            }),
            signal: controller.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        }
        throw new Error('Empty response');
    } catch (e) {
        clearTimeout(timer);
        throw e;
    }
}

// 2. Groq
async function callGroq(prompt, systemMsg, key, timeout = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                model: 'mixtral-8x7b-32768',
                messages: [
                    { role: 'system', content: systemMsg },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                temperature: 0.3
            }),
            signal: controller.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        }
        throw new Error('Empty response');
    } catch (e) {
        clearTimeout(timer);
        throw e;
    }
}

// 3. OpenRouter
async function callOpenRouter(prompt, systemMsg, key, model, timeout = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://zertivab2.online/'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: systemMsg },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                temperature: 0.3
            }),
            signal: controller.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        }
        throw new Error('Empty response');
    } catch (e) {
        clearTimeout(timer);
        throw e;
    }
}

// 4. Cerebras
async function callCerebras(prompt, systemMsg, key, timeout = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch('https://api.cerebras.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                model: 'gpt-oss-120b',   // ✅ النموذج الصحيح
                messages: [
                    { role: 'system', content: systemMsg },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                temperature: 0.3
            }),
            signal: controller.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        }
        throw new Error('Empty response');
    } catch (e) {
        clearTimeout(timer);
        throw e;
    }
}

// 5. SambaNova
async function callSambaNova(prompt, systemMsg, key, timeout = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch('https://api.sambanova.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                model: 'Meta-Llama-3.1-8B-Instruct',
                messages: [
                    { role: 'system', content: systemMsg },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                temperature: 0.3
            }),
            signal: controller.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        }
        throw new Error('Empty response');
    } catch (e) {
        clearTimeout(timer);
        throw e;
    }
}

// 6. Together AI
async function callTogether(prompt, systemMsg, key, timeout = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch('https://api.together.xyz/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                model: 'meta-llama/Llama-3.2-3B-Instruct-Turbo',
                messages: [
                    { role: 'system', content: systemMsg },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                temperature: 0.3
            }),
            signal: controller.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        }
        throw new Error('Empty response');
    } catch (e) {
        clearTimeout(timer);
        throw e;
    }
}

// ============================================================
// 🧠 تجميع المزودات في مصفوفة (مرتبة حسب الأولوية)
// ============================================================
const PROVIDERS = [
    {
        id: 'gemini',
        name: 'Gemini',
        keys: GEMINI_KEYS,
        call: callGemini,
        // لا حاجة لنموذج إضافي
    },
    {
        id: 'groq',
        name: 'Groq',
        keys: GROQ_KEYS,
        call: callGroq,
    },
    {
        id: 'openrouter',
        name: 'OpenRouter',
        keys: OPENROUTER_KEYS,
        call: callOpenRouter,
        models: OPENROUTER_MODELS,
    },
    {
        id: 'cerebras',
        name: 'Cerebras',
        keys: CEREBRAS_KEYS,
        call: callCerebras,
    },
    {
        id: 'sambanova',
        name: 'SambaNova',
        keys: SAMBANOVA_KEYS,
        call: callSambaNova,
    },
    {
        id: 'together',
        name: 'Together AI',
        keys: TOGETHER_KEYS,
        call: callTogether,
    }
];

// فلترة المزودات التي لديها مفاتيح
const activeProviders = PROVIDERS.filter(p => p.keys && p.keys.length > 0);

// ============================================================
// 🚀 دالة استدعاء AI مع التجاوز التلقائي وتذكر آخر مفتاح ناجح
// ============================================================
async function callAI(prompt, question) {
    const systemMsg = getSystemPrompt(question);
    let lastError = null;

    for (let pIdx = 0; pIdx < activeProviders.length; pIdx++) {
        const provider = activeProviders[pIdx];
        const keys = provider.keys;
        const startIndex = getLastKey(provider.id) % keys.length;

        for (let k = 0; k < keys.length; k++) {
            const keyIndex = (startIndex + k) % keys.length;
            const key = keys[keyIndex];

            try {
                console.log(`🔄 محاولة ${provider.name} Key ${keyIndex + 1}`);
                let reply;
                if (provider.id === 'openrouter') {
                    const model = provider.models ? provider.models[0] : 'nvidia/nemotron-3-ultra-550b-a55b:free';
                    reply = await provider.call(prompt, systemMsg, key, model);
                } else {
                    reply = await provider.call(prompt, systemMsg, key);
                }
                console.log(`✅ ${provider.name} Key ${keyIndex + 1} نجح`);
                setLastKey(provider.id, keyIndex);
                return { reply, provider: provider.name };
            } catch (error) {
                const msg = error.message || '';
                const lower = msg.toLowerCase();
                const isFailure = 
                    msg.includes('401') || msg.includes('403') || msg.includes('429') ||
                    msg.includes('quota') || msg.includes('rate limit') || msg.includes('credits') ||
                    msg.includes('expired') || msg.includes('timeout') || msg.includes('network') ||
                    msg.includes('503') || msg.includes('502') || msg.includes('500') ||
                    msg.includes('model unavailable') || msg.includes('overloaded') ||
                    msg.includes('no endpoints');

                if (isFailure) {
                    console.warn(`❌ ${provider.name} Key ${keyIndex + 1} فشل: ${error.message}`);
                } else {
                    console.warn(`⚠️ ${provider.name} Key ${keyIndex + 1} خطأ غير متوقع: ${error.message}`);
                }
                lastError = error;
                continue;
            }
        }
        console.warn(`⏭️ انتهت مفاتيح ${provider.name}، ننتقل إلى المزود التالي`);
    }

    throw new Error('جميع المزودات غير متاحة حالياً');
}

// ============================================================
// 🌐 نقطة النهاية /ask
// ============================================================
app.post('/ask', async (req, res) => {
    const { question, context } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'السؤال مطلوب' });
    }

    const cacheKey = question + (context || '');
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_TTL) {
            console.log('✅ رد من الـ Cache');
            return res.json({ reply: cached.reply, provider: cached.provider || 'cache' });
        } else {
            cache.delete(cacheKey);
        }
    }

    const prompt = `
السياق (الفقرة الحالية): "${context || 'لا يوجد سياق'}"
سؤال الطالب: "${question}"
تعليمات: أجب باختصار شديد (جملة إلى جملتين).
`;

    try {
        const result = await callAI(prompt, question);
        cache.set(cacheKey, {
            reply: result.reply,
            provider: result.provider,
            timestamp: Date.now()
        });
        res.json({ reply: result.reply, provider: result.provider });
    } catch (error) {
        console.error('❌ فشل جميع المزودات:', error.message);
        res.status(503).json({
            reply: 'تعذر الحصول على الرد حالياً. يرجى المحاولة مرة أخرى بعد قليل.',
            provider: 'none'
        });
    }
});

// ============================================================
// 🏥 نقطة نهاية للصحة
// ============================================================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        gemini: GEMINI_KEYS.length > 0 ? '✅' : '❌',
        groq: GROQ_KEYS.length,
        openrouter: OPENROUTER_KEYS.length,
        cerebras: CEREBRAS_KEYS.length,
        sambanova: SAMBANOVA_KEYS.length,
        together: TOGETHER_KEYS.length,
        models_count: OPENROUTER_MODELS.length,
        port: PORT
    });
});

app.listen(PORT, () => {
    console.log(`🚀 الخادم شغال على http://localhost:${PORT}`);
    console.log(`📊 Gemini: ${GEMINI_KEYS.length > 0 ? '✅' : '❌'}`);
    console.log(`📊 Groq: ${GROQ_KEYS.length} مفاتيح`);
    console.log(`📊 OpenRouter: ${OPENROUTER_KEYS.length} مفاتيح`);
    console.log(`📊 Cerebras: ${CEREBRAS_KEYS.length} مفاتيح`);
    console.log(`📊 SambaNova: ${SAMBANOVA_KEYS.length} مفاتيح`);
    console.log(`📊 Together AI: ${TOGETHER_KEYS.length} مفاتيح`);
});
