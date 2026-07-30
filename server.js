const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ ضع مفتاحك الحقيقي هنا
const OPENROUTER_API_KEY = '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';

app.post('/ask', async (req, res) => {
    const userQuestion = req.body.question;
    const context = req.body.context || '';

    const prompt = `
أنت مدرس مساعد في منصة اختبارات Zertiva.
السياق (الفقرة الحالية في الامتحان): "${context}"

سؤال الطالب: "${userQuestion}"

قواعدك الصارمة:
1. لا تعطِ الإجابة النهائية أو الحرف الصحيح أبداً.
2. إذا طلب الجواب، قل: "لا أستطيع إعطاء الجواب مباشرة، لكن سأساعدك على فهم النص."
3. اشرح الكلمات الصعبة، واستخرج المفاتيح، واقترح استراتيجية للحل.
4. كن مشجعاً وبلغة عربية فصحى.
5. إذا كان السؤال عن كلمة معينة، اشرح معناها فقط.
`;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: [{ role: 'user', content: prompt }]
            })
        });
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'عذراً، لم أستطع معالجة طلبك.';
        res.json({ reply });
    } catch (error) {
        console.error('❌ خطأ في السيرفر:', error);
        res.status(500).json({ reply: 'عذراً، حدث عطل تقني. حاول مجدداً.' });
    }
});

app.listen(3000, () => console.log('🚀 الخادم شغال على http://localhost:3000'));
