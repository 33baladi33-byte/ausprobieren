// audioMemory.js
// نظام تدريب الذاكرة السمعي - لجميع أجزاء الامتحان

(function() {
    // ========================================
    // 1. تعريف المسارات الصوتية لكل قسم
    // ========================================
    const audioPaths = {
        // Lesen Teil 1
        "lesen1": {
            basePath: "audio/lesen1/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3",
                "exam3": "exam3.mp3"
            }
        },
        // Lesen Teil 2
        "lesen2": {
            basePath: "audio/lesen2/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        // Lesen Teil 3
        "lesen3": {
            basePath: "audio/lesen3/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        // Hören Teil 1
        "horen1": {
            basePath: "audio/horen1/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        // Hören Teil 2
        "horen2": {
            basePath: "audio/horen2/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        // Hören Teil 3
        "horen3": {
            basePath: "audio/horen3/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        // Sprachbausteine Teil 1
        "sprachbausteine1": {
            basePath: "audio/sprachbausteine1/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        // Sprachbausteine Teil 2
        "sprachbausteine2": {
            basePath: "audio/sprachbausteine2/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        // Schreiben
        "schreiben": {
            basePath: "audio/schreiben/",
            exams: {
                "training": "training.mp3"
            }
        },
        // Mündlich
        "mundlich": {
            basePath: "audio/mundlich/",
            exams: {
                "training": "training.mp3"
            }
        },
        // Tips
        "tips": {
            basePath: "audio/tips/",
            exams: {
                "tips": "tips.mp3"
            }
        }
    };
    
    // ========================================
    // 2. متغيرات التحكم في الصوت
    // ========================================
    let currentAudio = null;
    let currentButton = null;
    
    // ========================================
    // 3. التنسيقات البصرية للزر
    // ========================================
    const styles = `
        <style id="audio-memory-style">
            .audio-memory-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: #2a2a2a;
                border: 1px solid #3d3d3d;
                border-radius: 6px;
                padding: 6px 14px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                color: #cccccc;
                transition: all 0.2s ease;
                margin: 8px 0;
            }
            
            .audio-memory-btn:hover {
                background: #333333;
                border-color: #4a90e2;
                color: #4a90e2;
            }
            
            .audio-memory-btn.playing {
                background: #1a2a3a;
                border-color: #4a90e2;
                color: #4a90e2;
            }
            
            .audio-memory-btn svg {
                width: 14px;
                height: 14px;
                fill: currentColor;
            }
            
            .audio-memory-btn .icon-play,
            .audio-memory-btn .icon-stop {
                display: none;
            }
            
            .audio-memory-btn:not(.playing) .icon-play {
                display: inline;
            }
            
            .audio-memory-btn.playing .icon-stop {
                display: inline;
            }
        </style>
    `;
    
    // أيقونات
    const playIcon = `<svg class="icon-play" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>`;
    const stopIcon = `<svg class="icon-stop" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" fill="currentColor"/></svg>`;
    
    // ========================================
    // 4. إنشاء الزر
    // ========================================
    function createButton(sectionId, examId, examName) {
        const button = document.createElement('button');
        button.className = 'audio-memory-btn';
        button.setAttribute('data-section', sectionId);
        button.setAttribute('data-exam', examId);
        button.innerHTML = `${playIcon}${stopIcon}<span>🎧 تدريب الذاكرة السمعي</span>`;
        
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleAudio(sectionId, examId, button);
        });
        
        return button;
    }
    
    // ========================================
    // 5. تشغيل / إيقاف الصوت
    // ========================================
    function toggleAudio(sectionId, examId, button) {
        // إذا كان نفس الزر يعمل
        if (currentButton === button && currentAudio && !currentAudio.paused) {
            stopAudio();
            return;
        }
        
        // إيقاف أي صوت آخر
        if (currentAudio && !currentAudio.paused) {
            stopAudio();
        }
        
        // تشغيل الصوت الجديد
        playAudio(sectionId, examId, button);
    }
    
    function playAudio(sectionId, examId, button) {
        const section = audioPaths[sectionId];
        
        if (!section) {
            console.warn('القسم غير موجود:', sectionId);
            showMessage('⚠️ القسم غير معروف');
            return;
        }
        
        const audioFile = section.exams[examId];
        
        if (!audioFile) {
            console.warn('الملف الصوتي غير موجود:', sectionId, examId);
            showMessage('⚠️ الملف الصوتي غير متاح');
            return;
        }
        
        const audioUrl = section.basePath + audioFile;
        
        currentAudio = new Audio(audioUrl);
        
        currentAudio.onplay = function() {
            currentButton = button;
            button.classList.add('playing');
        };
        
        currentAudio.onended = function() {
            stopAudio();
        };
        
        currentAudio.onerror = function() {
            console.error('خطأ في التشغيل:', audioUrl);
            showMessage('❌ الملف الصوتي غير موجود');
            stopAudio();
        };
        
        currentAudio.play().catch(function(err) {
            console.error('فشل التشغيل:', err);
            showMessage('❌ لا يمكن تشغيل الصوت');
            stopAudio();
        });
    }
    
    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        
        if (currentButton) {
            currentButton.classList.remove('playing');
            currentButton = null;
        }
    }
    
    function showMessage(msg) {
        const div = document.createElement('div');
        div.textContent = msg;
        div.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1e1e1e;
            color: #4a90e2;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 12px;
            border-left: 3px solid #4a90e2;
            z-index: 10000;
            opacity: 0.9;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(div);
        setTimeout(function() {
            div.style.opacity = '0';
            setTimeout(function() { div.remove(); }, 300);
        }, 2000);
    }
    
    // ========================================
    // 6. التعرف على القسم والامتحان الحالي
    // ========================================
    function detectCurrentSection() {
        // من عنوان الصفحة أو URL
        const url = window.location.href;
        const title = document.title;
        const bodyText = document.body.innerText || '';
        
        // قائمة الأقسام الممكنة
        const sections = [
            { id: "lesen1", keywords: ["Lesen Teil 1", "Lesen 1", "Reading Part 1"] },
            { id: "lesen2", keywords: ["Lesen Teil 2", "Lesen 2", "Reading Part 2"] },
            { id: "lesen3", keywords: ["Lesen Teil 3", "Lesen 3", "Reading Part 3"] },
            { id: "horen1", keywords: ["Hören Teil 1", "Hören 1", "Horen 1", "Listening Part 1"] },
            { id: "horen2", keywords: ["Hören Teil 2", "Hören 2", "Horen 2", "Listening Part 2"] },
            { id: "horen3", keywords: ["Hören Teil 3", "Hören 3", "Horen 3", "Listening Part 3"] },
            { id: "sprachbausteine1", keywords: ["Sprachbausteine Teil 1", "Sprachbausteine 1"] },
            { id: "sprachbausteine2", keywords: ["Sprachbausteine Teil 2", "Sprachbausteine 2"] },
            { id: "schreiben", keywords: ["Schreiben", "Writing"] },
            { id: "mundlich", keywords: ["Mündlich", "Speaking", "Mundlich"] },
            { id: "tips", keywords: ["Tips", "Tipps"] }
        ];
        
        for (let section of sections) {
            for (let keyword of section.keywords) {
                if (title.includes(keyword) || bodyText.includes(keyword) || url.includes(keyword.toLowerCase().replace(/ /g, ''))) {
                    return section.id;
                }
            }
        }
        
        return null;
    }
    
    function detectCurrentExam() {
        // من عنوان الصفحة أو المحتوى
        const title = document.title;
        const bodyText = document.body.innerText || '';
        
        if (title.includes("Exam 1") || bodyText.includes("Exam 1") || bodyText.includes("Jugend Forscher")) {
            return "exam1";
        }
        if (title.includes("Exam 2") || bodyText.includes("Exam 2") || bodyText.includes("sport ist gesund")) {
            return "exam2";
        }
        if (title.includes("Exam 3") || bodyText.includes("Exam 3")) {
            return "exam3";
        }
        
        // للأقسام التي ليس لها امتحانات متعددة
        const section = detectCurrentSection();
        if (section === "schreiben") return "training";
        if (section === "mundlich") return "training";
        if (section === "tips") return "tips";
        
        return "exam1"; // افتراضي
    }
    
    // ========================================
    // 7. إضافة الزر إلى الصفحة
    // ========================================
    function addButtonToPage() {
        // أضف التنسيقات
        if (!document.getElementById('audio-memory-style')) {
            document.head.insertAdjacentHTML('beforeend', styles);
        }
        
        // تجنب إضافة الزر مرتين
        if (document.querySelector('.audio-memory-btn')) {
            return;
        }
        
        const sectionId = detectCurrentSection();
        const examId = detectCurrentExam();
        
        if (!sectionId || !audioPaths[sectionId]) {
            console.log('لا يوجد صوت لهذا القسم:', sectionId);
            return;
        }
        
        // تأكد من وجود الملف الصوتي
        const section = audioPaths[sectionId];
        if (!section.exams[examId]) {
            console.log('لا يوجد ملف صوتي لهذا الامتحان:', sectionId, examId);
            return;
        }
        
        // ابحث عن مكان مناسب لوضع الزر
        const button = createButton(sectionId, examId, examId);
        
        // حاول وضع الزر بعد العنوان الرئيسي
        const titleElements = document.querySelector('h1, h2, .page-title, .section-title, .exam-title');
        
        if (titleElements) {
            titleElements.insertAdjacentElement('afterend', button);
        } else {
            // ضع الزر في بداية المحتوى الرئيسي
            const container = document.querySelector('main, .container, .content, body');
            if (container) {
                container.insertBefore(button, container.firstChild);
            }
        }
    }
    
    // ========================================
    // 8. تشغيل النظام
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addButtonToPage);
    } else {
        addButtonToPage();
    }
})();