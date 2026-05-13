// audioMemory.js
// نظام تدريب الذاكرة السمعي - نسخة معدلة لصفحة index.html الحالية

(function() {
    // ========================================
    // 1. تعريف المسارات الصوتية لكل قسم
    // ========================================
    const audioPaths = {
        "lesen1": {
            basePath: "audio/lesen1/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        "lesen2": {
            basePath: "audio/lesen2/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        },
        "horen1": {
            basePath: "audio/horen1/",
            exams: {
                "exam1": "exam1.mp3",
                "exam2": "exam2.mp3"
            }
        }
    };
    
    // ========================================
    // 2. متغيرات التحكم
    // ========================================
    let currentAudio = null;
    let currentButton = null;
    
    // ========================================
    // 3. التنسيقات
    // ========================================
    const styles = `
        <style id="audio-memory-style">
            .audio-memory-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: #2a2a2a;
                border: 1px solid #3d3d3d;
                border-radius: 30px;
                padding: 8px 20px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                color: #cccccc;
                transition: all 0.2s ease;
                margin: 10px auto;
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
    
    const playIcon = `<svg class="icon-play" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>`;
    const stopIcon = `<svg class="icon-stop" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" fill="currentColor"/></svg>`;
    
    // ========================================
    // 4. إنشاء الزر
    // ========================================
    function createButton(sectionId, examId) {
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
    // 5. تشغيل / إيقاف
    // ========================================
    function toggleAudio(sectionId, examId, button) {
        if (currentButton === button && currentAudio && !currentAudio.paused) {
            stopAudio();
            return;
        }
        
        if (currentAudio && !currentAudio.paused) {
            stopAudio();
        }
        
        playAudio(sectionId, examId, button);
    }
    
    function playAudio(sectionId, examId, button) {
        const section = audioPaths[sectionId];
        
        if (!section) {
            showMessage('⚠️ القسم غير معروف');
            return;
        }
        
        const audioFile = section.exams[examId];
        
        if (!audioFile) {
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
            showMessage('❌ الملف الصوتي غير موجود');
            stopAudio();
        };
        
        currentAudio.play().catch(function(err) {
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
        `;
        document.body.appendChild(div);
        setTimeout(function() {
            div.style.opacity = '0';
            setTimeout(function() { div.remove(); }, 300);
        }, 2000);
    }
    
    // ========================================
    // 6. الحصول على القسم الحالي من العنوان
    // ========================================
    function getCurrentSection() {
        const titleElem = document.getElementById('examTitle');
        if (!titleElem) return null;
        
        const title = titleElem.innerText;
        
        if (title.includes('Lesen Teil 1')) return 'lesen1';
        if (title.includes('Lesen Teil 2')) return 'lesen2';
        if (title.includes('Hören Teil 1') || title.includes('Horen Teil 1')) return 'horen1';
        
        return null;
    }
    
    function getCurrentExam() {
        const titleElem = document.getElementById('examTitle');
        if (!titleElem) return 'exam1';
        
        const title = titleElem.innerText;
        
        if (title.includes('Exam 2') || title.includes('Jugend Forscher')) return 'exam2';
        if (title.includes('Exam 1')) return 'exam1';
        
        return 'exam1';
    }
    
    // ========================================
    // 7. إضافة الزر إلى الصفحة
    // ========================================
    function addButtonToPage() {
        // أضف التنسيقات مرة واحدة
        if (!document.getElementById('audio-memory-style')) {
            document.head.insertAdjacentHTML('beforeend', styles);
        }
        
        // ابحث عن مكان مناسب للزر
        const examBox = document.querySelector('.exam-box');
        if (!examBox) return;
        
        // تجنب إضافة الزر مرتين
        if (examBox.querySelector('.audio-memory-btn')) return;
        
        const sectionId = getCurrentSection();
        const examId = getCurrentExam();
        
        if (!sectionId || !audioPaths[sectionId]) {
            console.log('لا يوجد صوت لهذا القسم:', sectionId);
            return;
        }
        
        const button = createButton(sectionId, examId);
        
        // ضع الزر تحت عنوان الامتحان
        const titleElem = document.getElementById('examTitle');
        if (titleElem && titleElem.parentElement) {
            titleElem.parentElement.insertAdjacentElement('afterend', button);
        } else {
            examBox.insertBefore(button, examBox.firstChild);
        }
        
        console.log('✅ زر الصوت تمت إضافته للقسم:', sectionId, 'الامتحان:', examId);
    }
    
    // ========================================
    // 8. مراقبة تغيير الصفحة (عند النقر على امتحان جديد)
    // ========================================
    let lastTitle = '';
    
    function checkForChanges() {
        const titleElem = document.getElementById('examTitle');
        if (titleElem && titleElem.innerText !== lastTitle) {
            lastTitle = titleElem.innerText;
            setTimeout(addButtonToPage, 100);
        }
    }
    
    // ========================================
    // 9. بدء النظام
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addButtonToPage();
            setInterval(checkForChanges, 500);
        });
    } else {
        addButtonToPage();
        setInterval(checkForChanges, 500);
    }
})();
