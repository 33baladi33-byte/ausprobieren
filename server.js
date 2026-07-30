const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== مفاتيح API =====
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6IEpyTQ2rXEDHOLgbIY84Q3nVH_ApbAosh2CLfjvSvWCQ';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const PORT = process.env.PORT || 3000;

// ===== قائمة النماذج الاحتياطية (OpenRouter) =====
const FALLBACK_MODELS = [
    'google/gemma-4-26b-a4b-it:free',
    'google/gemma-3-27b-it:free',
    'google/gemma-3-12b-it:free',
    'meta-llama/llama-3.2-3b-instruct:free',
];

// ===== معرفة الموقع (مختصرة جداً) =====
const SITE_KNOWLEDGE = `
منصة Zertiva B2: امتحانات Goethe B2 (Lesen, Hören, Sprachbausteine, Schreiben, Mündlich).
مميزات: تصحيح تلقائي، تلوين ذكي، لعبة سريعة، Memory Trainer.
`;

// ===== Cache بسيط (في الذاكرة) مع تنظيف تلقائي =====
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

// ===== بناء رسالة النظام (محسّنة) =====
function getSystemPrompt(question) {
    let base = 'أنت مساعد Zertiva B2. مختصر جداً.';
    
    const siteKeywords = ['موقع', 'منصة', 'المميزات', 'مميزات', 'امتحانات', 'المهارات', 'Goethe', 'B2'];
    const isSiteQuestion = siteKeywords.some(keyword => question.includes(keyword));
    
    if (isSiteQuestion) {
        base += ` معرفتك بالموقع: ${SITE_KNOWLEDGE}`;
    }
    return base + ' أجب بجملة أو جملتين كحد أقصى.';
}

// ===== 1. دالة استدعاء Gemini API =====
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

// ===== 2. دالة استدعاء OpenRouter (احتياطي) =====
async function callOpenRouter(prompt, question) {
    for (let i = 0; i < FALLBACK_MODELS.length; i++) {
        const model = FALLBACK_MODELS[i];
        console.log(`🔄 محاولة النموذج ${i+1}/${FALLBACK_MODELS.length}: ${model}`);

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://33baladi33-byte.github.io/ausprobieren/',
                    'X-OpenRouter-Title': 'Zertiva B2'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: getSystemPrompt(question) },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 120,
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

            if (response.ok && data.choices?.length > 0) {
                const reply = data.choices[0].message.content;
                console.log(`✅ نجاح مع النموذج: ${model}`);
                return { reply, model };
            } else {
                console.warn(`⚠️ فشل ${model}:`, data.error?.message || 'خطأ غير معروف');
            }
        } catch (error) {
            console.warn(`⚠️ استثناء مع ${model}:`, error.message);
        }
    }
    return null;
}

// ===== نقطة النهاية الرئيسية =====
app.post('/ask', async (req, res) => {
    const { question, context } = req.body;
    if (!question) return res.status(400).json({ error: 'السؤال مطلوب' });

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

    const prompt = `
السياق (الفقرة الحالية): "${context || 'لا يوجد سياق'}"

سؤال الطالب: "${question}"

تعليمات: أجب باختصار شديد (جملة إلى جملتين).
`;

    console.log('🔄 محاولة Gemini أولاً...');
    let result = await callGeminiAPI(prompt, question);

    if (!result) {
        console.log('🔄 Gemini فشل، محاولة OpenRouter...');
        result = await callOpenRouter(prompt, question);
    }

    if (!result) {
        console.error('❌ جميع المزودات فشلت.');
        return res.status(503).json({
            reply: 'تعذر الحصول على الرد حالياً. يرجى المحاولة مرة أخرى بعد قليل.',
            model: 'none'
        });
    }

    cache.set(cacheKey, { 
        reply: result.reply, 
        model: result.model, 
        timestamp: Date.now() 
    });

    res.json({ reply: result.reply, model: result.model });
});

// ===== نقطة نهاية للصحة (Health Check) =====
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        gemini_key: GEMINI_API_KEY ? '✅ موجود' : '❌ مفقود',
        openrouter_key: OPENROUTER_API_KEY ? '✅ موجود' : '❌ مفقود'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 الخادم شغال على http://localhost:${PORT}`);
    console.log(`📊 Gemini API: ${GEMINI_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
    console.log(`📊 OpenRouter API: ${OPENROUTER_API_KEY ? '✅ جاهز' : '❌ مفقود'}`);
});
