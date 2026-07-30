const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
// 🔑 مفاتيح API (تؤخذ من .env أو القيم الافتراضية)
// ============================================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6IEpyTQ2rXEDHOLgbIY84Q3nVH_ApbAosh2CLfjvSvWCQ';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const PORT = process.env.PORT || 3000;

// ============================================================
// 📋 قائمة النماذج المجانية (OpenRouter) - 18 نموذجاً
// ============================================================
const FALLBACK_MODELS = [
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "inclusionai/ling-3.0-flash:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "cohere/north-mini-code:free",
    "poolside/laguna-s-2.1:free",
    "poolside/laguna-xs-2.1:free",
    "nvidia/nemotron-3-nano-30b-a3b:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    "nvidia/llama-nemotron-rerank-vl-1b-v2:free",
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

// تنظيف الـ Cache كل ساعة
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
    
    const siteKeywords = ['موقع', 'منصة', 'المميزات', 'مميزات', 'امتحانات', 'المهارات', 'Goethe', 'B2'];
    const isSiteQuestion = siteKeywords.some(keyword => question.includes(keyword));
    
    if (isSiteQuestion) {
        base += ` معرفتك بالموقع: ${SITE_KNOWLEDGE}`;
    }
    return base + ' أجب بجملة أو جملتين كحد أقصى.';
}

// ============================================================
// 🌟 1. دالة استدعاء Gemini API (الأولوية الأولى)
// ============================================================
async function callGeminiAPI(prompt, question) {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
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
            return { reply: text, model: 'gemini-2.5-flash' };
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
    // نجرب كل نموذج بالترتيب من القائمة
    for (let i = 0; i < FALLBACK_MODELS.length; i++) {
        const model = FALLBACK_MODELS[i];
        console.log(`🔄 تجربة النموذج (${i+1}/${FALLBACK_MODELS.length}): ${model}`);

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000); // مهلة 10 ثواني

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://zertivab2.online/',
                    'X-OpenRouter-Title': 'Zertiva B2'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: getSystemPrompt(question) },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 150,
                    temperature: 0.3,
                    provider: {
                        allow_fallbacks: true,
                        sort: 'throughput'
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeout);

            const data = await response.json();

            // ✅ نجاح
            if (response.ok && data.choices && data.choices.length > 0) {
                const reply = data.choices[0].message.content;
                console.log(`✅ نجح النموذج: ${model}`);
                return { reply, model };
            }

            // ❌ حالات الفشل المتوقعة التي تستدعي الانتقال للنموذج التالي
            const status = response.status;
            const errorMsg = data.error?.message || '';

            if (status === 429 || status === 503 || status === 404 || status === 502 ||
                errorMsg.includes('model unavailable') ||
                errorMsg.includes('No endpoints') ||
                errorMsg.includes('rate limit') ||
                errorMsg.includes('quota') ||
                errorMsg.includes('overloaded')) {
                console.warn(`❌ فشل النموذج ${model}: ${status} - ${errorMsg || 'بدون سبب'}`);
                continue; // ننتقل للنموذج التالي
            }

            // أي خطأ آخر (مثلاً 400) نعتبره فشل ونواصل
            console.warn(`❌ فشل النموذج ${model}: ${status} - ${errorMsg || 'خطأ غير معروف'}`);
            continue;

        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn(`❌ مهلة النموذج ${model} (تجاوز 10 ثواني)`);
            } else {
                console.warn(`❌ استثناء مع ${model}: ${error.message}`);
            }
            continue;
        }
    }

    // إذا انتهت الحلقة دون نجاح
    console.error('❌ جميع النماذج (18) فشلت في OpenRouter');
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

    // التحقق من Cache
    const cacheKey = question + (context || '');
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_TTL) {
            console.log('✅ رد من الـ Cache');
            return res.json({ reply: cached.reply, model: cached.model || 'cache' });
        } else {
            cache.delete(cacheKey);
        }
    }

    // بناء الـ Prompt
    const prompt = `
السياق (الفقرة الحالية): "${context || 'لا يوجد سياق'}"

سؤال الطالب: "${question}"

تعليمات: أجب باختصار شديد (جملة إلى جملتين).
`;

    console.log('🔄 محاولة Gemini أولاً...');
    let result = await callGeminiAPI(prompt, question);

    if (!result) {
        console.log('🔄 Gemini فشل، محاولة OpenRouter (18 نموذجاً)...');
        result = await callOpenRouter(prompt, question);
    }

    if (!result) {
        console.error('❌ جميع المزودات (Gemini + OpenRouter) فشلت.');
        return res.status(503).json({
            reply: 'تعذر الحصول على الرد حالياً. يرجى المحاولة مرة أخرى بعد قليل.',
            model: 'none'
        });
    }

    // حفظ في Cache
    cache.set(cacheKey, {
        reply: result.reply,
        model: result.model,
        timestamp: Date.now()
    });

    res.json({ reply: result.reply, model: result.model });
});

// ============================================================
// 🏥 نقطة نهاية للصحة (Health Check)
// ============================================================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        gemini_key: GEMINI_API_KEY ? '✅ موجود' : '❌ مفقود',
        openrouter_key: OPENROUTER_API_KEY ? '✅ موجود' : '❌ مفقود',
        models_count: FALLBACK_MODELS.length
    });
});

// ============================================================
// 🚀 تشغيل الخادم
// ============================================================
app.listen(PORT, () => {
    console.log(`🚀 الخادم شغال على http://localhost:${PORT}`);
    console.log(`📊 Gemini API: ${GEMINI_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
    console.log(`📊 OpenRouter API: ${OPENROUTER_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
    console.log(`📋 عدد نماذج OpenRouter: ${FALLBACK_MODELS.length}`);
});
