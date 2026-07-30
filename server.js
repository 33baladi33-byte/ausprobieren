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
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '';
const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY || '';
const PORT = process.env.PORT || 3000;

// ============================================================
// 📋 قائمة نماذج OpenRouter المجانية (18 نموذجاً)
// ============================================================
const OPENROUTER_MODELS = [
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "inclusionai/ling-3.0-flash:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "cohere/north-mini-code:free",
    "poolside/laguna-s-2.1:free",
    "poolside/laguna-xs-2.1:free",
    "nvidia/nemotron-3-nano-30b-a3b:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    "nvidia/nemotron-nano-9b-v2:free",
    "google/gemma-4-26b-a4b-it:free",
    "nvidia/nemotron-nano-12b-v2-vl:free",
    "openai/gpt-oss-20b:free",
    "nvidia/llama-nemotron-embed-vl-1b-v2:free",
    "nvidia/nemotron-3-embed-1b:free",
    "google/gemma-4-31b-it:free",
    "nvidia/nemotron-3.5-content-safety:free",
    "openrouter/free"
];

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
// 🔄 2. دالة استدعاء OpenRouter مع نظام Fallback (18 نموذجاً)
// ============================================================
async function callOpenRouter(prompt, question) {
    if (!OPENROUTER_API_KEY) return null;
    for (let i = 0; i < OPENROUTER_MODELS.length; i++) {
        const model = OPENROUTER_MODELS[i];
        console.log(`🔄 محاولة OpenRouter (${i+1}/${OPENROUTER_MODELS.length}): ${model}`);
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
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
            if (response.ok && data.choices && data.choices.length > 0) {
                const reply = data.choices[0].message.content;
                console.log(`✅ OpenRouter نجح (${model})`);
                return { reply, provider: 'openrouter', model };
            }
            const status = response.status;
            const errorMsg = data.error?.message || '';
            if (status === 429 || status === 503 || status === 404 || status === 502 ||
                errorMsg.includes('model unavailable') ||
                errorMsg.includes('No endpoints') ||
                errorMsg.includes('rate limit') ||
                errorMsg.includes('quota') ||
                errorMsg.includes('overloaded')) {
                console.warn(`❌ فشل ${model}: ${status} - ${errorMsg || 'بدون سبب'}`);
                continue;
            }
            console.warn(`❌ فشل ${model}: ${status} - ${errorMsg || 'خطأ غير معروف'}`);
            continue;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn(`❌ مهلة النموذج ${model}`);
            } else {
                console.warn(`❌ استثناء مع ${model}: ${error.message}`);
            }
            continue;
        }
    }
    console.error('❌ جميع نماذج OpenRouter فشلت');
    return null;
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
    // ❌ تم تعطيل Cloudflare لأنه يحتاج إلى Account ID
    // إذا أردت تفعيله، استبدل YOUR_ACCOUNT_ID بالمعرف الفعلي من Cloudflare
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
        openrouter: OPENROUTER_API_KEY ? '✅ موجود' : '❌ مفقود',
        huggingface: HUGGINGFACE_API_KEY ? '✅ موجود' : '❌ مفقود',
        cloudflare: CLOUDFLARE_API_KEY ? '✅ موجود (لكن معطل)' : '❌ مفقود',
        models_count: OPENROUTER_MODELS.length
    });
});

app.listen(PORT, () => {
    console.log(`🚀 الخادم شغال على http://localhost:${PORT}`);
    console.log(`📊 Gemini: ${GEMINI_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
    console.log(`📊 OpenRouter: ${OPENROUTER_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
    console.log(`📊 HuggingFace: ${HUGGINGFACE_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
    console.log(`📊 Cloudflare: ${CLOUDFLARE_API_KEY ? '✅ موجود (معطل)' : '❌ مفقود'}`);
    console.log(`📋 عدد نماذج OpenRouter: ${OPENROUTER_MODELS.length}`);
});
