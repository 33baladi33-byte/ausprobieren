const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
// 🔑 مفاتيح API من متغيرات البيئة (.env)
// ============================================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '';
const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY || '';
const PORT = process.env.PORT || 3000;

// ============================================================
// 🔑 قائمة مفاتيح OpenRouter (6 مفاتيح من .env)
// ============================================================
const OPENROUTER_KEYS = [
    process.env.OPENROUTER_API_KEY_1 || '',
    process.env.OPENROUTER_API_KEY_2 || '',
    process.env.OPENROUTER_API_KEY_3 || '',
    process.env.OPENROUTER_API_KEY_4 || '',
    process.env.OPENROUTER_API_KEY_5 || '',
    process.env.OPENROUTER_API_KEY_6 || ''
].filter(key => key !== '');

// إذا لم توجد مفاتيح، استخدم المفتاح القديم للتوافق
if (OPENROUTER_KEYS.length === 0 && process.env.OPENROUTER_API_KEY) {
    OPENROUTER_KEYS.push(process.env.OPENROUTER_API_KEY);
}

// ============================================================
// 📋 قائمة نماذج OpenRouter المجانية (مرتبة حسب الجودة)
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
// 🧠 متغيرات حفظ آخر مفتاح ونموذج ناجحين
// ============================================================
let LAST_WORKING_KEY = null;
let LAST_WORKING_MODEL = null;

// ============================================================
// 📚 معرفة الموقع (تُستخدم في السياق)
// ============================================================
const SITE_KNOWLEDGE = `
منصة Zertiva B2: امتحانات Goethe B2 (Lesen, Hören, Sprachbausteine, Schreiben, Mündlich).
مميزات: تصحيح تلقائي، تلوين ذكي، لعبة سريعة، Memory Trainer.
`;

// ============================================================
// 💾 Cache بسيط (في الذاكرة) مع تنظيف تلقائي
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
// 🧠 بناء رسالة النظام (محسّنة حسب نوع السؤال)
// ============================================================
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
// 🌟 1. دالة استدعاء Gemini API
// ============================================================
async function callGemini(prompt, question) {
    if (!GEMINI_API_KEY) return null;
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;
        const payload = {
            contents: [{
                parts: [{ text: `${getSystemPrompt(question)}\n\n${prompt}` }]
            }],
            generationConfig: {
                maxOutputTokens: 150,
                temperature: 0.3
            }
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            const text = data.candidates[0].content.parts[0].text;
            console.log('✅ Gemini نجح:', text.substring(0, 50) + '...');
            return { reply: text, provider: 'gemini' };
        } else {
            console.warn('⚠️ Gemini فشل:', data);
            return null;
        }
    } catch (error) {
        console.warn('⚠️ Gemini استثناء:', error.message);
        return null;
    }
}

// ============================================================
// 🔄 2. دالة استدعاء OpenRouter مع نظام Fallback متعدد المفاتيح
// ============================================================
async function callOpenRouter(prompt, question) {
    if (!OPENROUTER_KEYS || OPENROUTER_KEYS.length === 0) return null;

    // إذا كان هناك مفتاح ونموذج ناجحين سابقاً، جرّبهما أولاً
    if (LAST_WORKING_KEY && LAST_WORKING_MODEL) {
        console.log(`🔄 محاولة النموذج المحفوظ (${LAST_WORKING_MODEL}) بالمفتاح المحفوظ...`);
        const result = await tryModelWithKey(LAST_WORKING_MODEL, LAST_WORKING_KEY, prompt, question);
        if (result) {
            return result;
        } else {
            console.warn(`⚠️ المفتاح أو النموذج المحفوظ فشل، سنبحث عن بديل...`);
            LAST_WORKING_KEY = null;
            LAST_WORKING_MODEL = null;
        }
    }

    // تجربة جميع المفاتيح والنماذج
    for (let keyIndex = 0; keyIndex < OPENROUTER_KEYS.length; keyIndex++) {
        const key = OPENROUTER_KEYS[keyIndex];
        for (let modelIndex = 0; modelIndex < OPENROUTER_MODELS.length; modelIndex++) {
            const model = OPENROUTER_MODELS[modelIndex];
            console.log(`🔄 محاولة (مفتاح ${keyIndex+1}/${OPENROUTER_KEYS.length}, نموذج ${modelIndex+1}/${OPENROUTER_MODELS.length}): ${model}`);

            const result = await tryModelWithKey(model, key, prompt, question);
            if (result) {
                // نجاح: حفظ المفتاح والنموذج للاستخدام القادم
                LAST_WORKING_KEY = key;
                LAST_WORKING_MODEL = model;
                return result;
            }
            // فشل، نستمر
        }
        // بعد تجربة كل النماذج مع هذا المفتاح، ننتقل للمفتاح التالي
        console.log(`⏭️ انتهى المفتاح ${keyIndex+1}، ننتقل إلى التالي...`);
    }

    console.error('❌ جميع المفاتيح والنماذج فشلت في OpenRouter');
    return null;
}

// ============================================================
// 🧪 دالة مساعدة لتجربة نموذج مع مفتاح محدد
// ============================================================
async function tryModelWithKey(model, key, prompt, question) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://zertivab2.online/',
                'X-Title': 'Zertiva B2'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: getSystemPrompt(question) },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                temperature: 0.3
            }),
            signal: controller.signal
        });

        clearTimeout(timeout);
        const data = await response.json();

        // ✅ نجاح
        if (response.ok && data.choices && data.choices.length > 0) {
            const reply = data.choices[0].message.content;
            console.log(`✅ نجح المفتاح والنموذج: ${model}`);
            return { reply, provider: 'openrouter', model };
        }

        // ❌ فشل: تحليل الأخطاء
        const status = response.status;
        const errorMsg = data.error?.message || '';

        // الأخطاء التي تستدعي تغيير المفتاح أو النموذج
        if (status === 401 || status === 403 || status === 429 ||
            errorMsg.includes('quota exceeded') ||
            errorMsg.includes('credits exceeded') ||
            errorMsg.includes('rate limit') ||
            errorMsg.includes('insufficient_quota')) {
            console.warn(`⛔ فشل المفتاح أو النموذج: ${status} - ${errorMsg}`);
            return null; // فشل هذا المفتاح/النموذج
        }

        // أخطاء أخرى قد تكون مؤقتة (503, 404, 502, إلخ) → نعتبرها فشل وننتقل
        if (status === 503 || status === 404 || status === 502 ||
            errorMsg.includes('model unavailable') ||
            errorMsg.includes('No endpoints') ||
            errorMsg.includes('overloaded')) {
            console.warn(`❌ فشل النموذج ${model}: ${status} - ${errorMsg || 'بدون سبب'}`);
            return null;
        }

        // أي خطأ آخر
        console.warn(`❌ فشل غير متوقع: ${status} - ${errorMsg}`);
        return null;

    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn(`❌ مهلة النموذج ${model} (تجاوز 10 ثواني)`);
        } else {
            console.warn(`❌ استثناء مع ${model}: ${error.message}`);
        }
        return null;
    }
}

// ============================================================
// 🤗 3. دالة استدعاء HuggingFace
// ============================================================
async function callHuggingFace(prompt, question) {
    if (!HUGGINGFACE_API_KEY) return null;
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: `${getSystemPrompt(question)}\n\n${prompt}`,
                parameters: {
                    max_new_tokens: 150,
                    temperature: 0.3
                }
            })
        });
        const data = await response.json();
        if (data && data.generated_text) {
            const reply = data.generated_text;
            console.log('✅ HuggingFace نجح:', reply.substring(0, 50) + '...');
            return { reply, provider: 'huggingface' };
        } else {
            console.warn('⚠️ HuggingFace فشل:', data);
            return null;
        }
    } catch (e) {
        console.warn('⚠️ HuggingFace استثناء:', e.message);
        return null;
    }
}

// ============================================================
// ☁️ 4. دالة استدعاء Cloudflare AI (معطل)
// ============================================================
async function callCloudflare(prompt, question) {
    return null;
}

// ============================================================
// 🚀 نقطة النهاية الرئيسية /ask
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

    console.log('🔄 محاولة Gemini أولاً...');
    let result = await callGemini(prompt, question);

    if (!result) {
        console.log('🔄 Gemini فشل، محاولة OpenRouter...');
        result = await callOpenRouter(prompt, question);
    }

    if (!result) {
        console.log('🔄 OpenRouter فشل، محاولة HuggingFace...');
        result = await callHuggingFace(prompt, question);
    }

    if (!result) {
        console.log('🔄 HuggingFace فشل، محاولة Cloudflare...');
        result = await callCloudflare(prompt, question);
    }

    if (!result) {
        console.error('❌ جميع المزودات فشلت.');
        return res.status(503).json({
            reply: 'تعذر الحصول على الرد حالياً. يرجى المحاولة مرة أخرى بعد قليل.',
            provider: 'none'
        });
    }

    cache.set(cacheKey, {
        reply: result.reply,
        provider: result.provider,
        timestamp: Date.now()
    });

    res.json({ reply: result.reply, provider: result.provider });
});

// ============================================================
// 🏥 نقطة نهاية للصحة (Health Check)
// ============================================================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        gemini: GEMINI_API_KEY ? '✅ موجود' : '❌ مفقود',
        openrouter_keys: OPENROUTER_KEYS.length,
        huggingface: HUGGINGFACE_API_KEY ? '✅ موجود' : '❌ مفقود',
        cloudflare: CLOUDFLARE_API_KEY ? '✅ موجود (معطل)' : '❌ مفقود',
        models_count: OPENROUTER_MODELS.length
    });
});

app.listen(PORT, () => {
    console.log(`🚀 الخادم شغال على http://localhost:${PORT}`);
    console.log(`📊 Gemini: ${GEMINI_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
    console.log(`📊 OpenRouter: ${OPENROUTER_KEYS.length} مفاتيح`);
    console.log(`📊 HuggingFace: ${HUGGINGFACE_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
    console.log(`📊 Cloudflare: ${CLOUDFLARE_API_KEY ? '✅ موجود (معطل)' : '❌ مفقود'}`);
    console.log(`📋 عدد نماذج OpenRouter: ${OPENROUTER_MODELS.length}`);
});
