// audioMemory.js - نسخة معدلة بالكامل
(function() {
    console.log("🎧 نظام الصوت بدأ التشغيل");
    
    let currentAudio = null;
    let currentButton = null;
    
    // ========================================
    // الأصوات المتاحة (عدل هنا حسب أسمائك)
    // ========================================
    const audioFiles = {
        "lesen1_exam1": "audio/lesen1/exam1.mp3",
        "lesen1_exam2": "audio/lesen1/exam2.mp3"
    };
    
    // ========================================
    // معرفة الامتحان الحالي
    // ========================================
    function getCurrentExamKey() {
        const titleElem = document.getElementById('examTitle');
        if (!titleElem) return null;
        
        const title = titleElem.innerText;
        console.log("عنوان الامتحان:", title);
        
        // Lesen Teil 1 - Exam 1
        if (title.includes("Lesen Teil 1") && (title.includes("Exam 1") || title.includes("Jugend Forscher"))) {
            return "lesen1_exam1";
        }
        
        // Lesen Teil 1 - Exam 2
        if (title.includes("Lesen Teil 1") && (title.includes("Exam 2") || title.includes("sport ist gesund"))) {
            return "lesen1_exam2";
        }
        
        return null;
    }
    
    // ========================================
    // التحقق من وجود الملف الصوتي
    // ========================================
    function checkAudioExists(url, callback) {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    callback(true);
                } else {
                    callback(false);
                }
            })
            .catch(() => callback(false));
    }
    
    // ========================================
    // تشغيل الصوت
    // ========================================
    function playAudio(url, button) {
        // أوقف أي صوت يشغل حالياً
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        
        if (currentButton) {
            currentButton.classList.remove('playing');
            currentButton = null;
        }
        
        currentAudio = new Audio(url);
        
        currentAudio.onplay = function() {
            currentButton = button;
            button.classList.add('playing');
            button.innerHTML = '⏹️ جاري التشغيل...';
            console.log("تشغيل:", url);
        };
        
        currentAudio.onended = function() {
            resetButton(button);
        };
        
        currentAudio.onerror = function() {
            showMessage('❌ الملف الصوتي غير موجود: ' + url);
            resetButton(button);
        };
        
        currentAudio.play().catch(function(err) {
            showMessage('❌ لا يمكن تشغيل الصوت: ' + err.message);
            resetButton(button);
        });
    }
    
    function resetButton(button) {
        if (button) {
            button.classList.remove('playing');
            button.innerHTML = '🎧 تدريب الذاكرة السمعي';
        }
        currentAudio = null;
        currentButton = null;
    }
    
    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        if (currentButton) {
            resetButton(currentButton);
        }
    }
    
    function showMessage(msg) {
        console.log(msg);
        const div = document.createElement('div');
        div.textContent = msg;
        div.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1e1e1e;
            color: #4a90e2;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 13px;
            border-left: 3px solid #4a90e2;
            z-index: 10000;
            font-family: sans-serif;
        `;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    }
    
    // ========================================
    // إنشاء الزر
    // ========================================
    function createButton(examKey, audioUrl) {
        const button = document.createElement('button');
        button.className = 'audio-memory-btn';
        button.innerHTML = '🎧 تدريب الذاكرة السمعي';
        button.style.cssText = `
            display: block;
            background: #2a2a2a;
            border: 1px solid #4a90e2;
            border-radius: 30px;
            padding: 10px 24px;
            margin: 15px auto;
            cursor: pointer;
            font-size: 14px;
            color: #4a90e2;
            font-weight: 600;
            font-family: inherit;
            transition: all 0.2s ease;
        `;
        
        button.onmouseenter = () => {
            button.style.background = '#333';
            button.style.borderColor = '#6aacee';
        };
        button.onmouseleave = () => {
            if (!button.classList.contains('playing')) {
                button.style.background = '#2a2a2a';
            }
            button.style.borderColor = '#4a90e2';
        };
        
        // جرب تشغيل الصوت
        button.onclick = function(e) {
            e.stopPropagation();
            
            // إذا كان الصوت يعمل حالياً، أوقفه
            if (currentButton === button && currentAudio && !currentAudio.paused) {
                stopAudio();
                return;
            }
            
            // وإلا شغل الصوت الجديد
            playAudio(audioUrl, button);
        };
        
        // تحقق من وجود الملف
        checkAudioExists(audioUrl, function(exists) {
            if (!exists) {
                button.style.opacity = '0.5';
                button.style.borderColor = '#aa4444';
                button.style.color = '#aa4444';
                button.title = 'الملف الصوتي غير موجود: ' + audioUrl;
                console.warn("⚠️ الملف غير موجود:", audioUrl);
            } else {
                console.log("✅ الملف موجود:", audioUrl);
            }
        });
        
        return button;
    }
    
    // ========================================
    // إضافة الزر إلى الصفحة
    // ========================================
    function addButtonToExam() {
        // تأكد أننا في صفحة الامتحان
        const examPage = document.getElementById('exam');
        if (!examPage || examPage.style.display === 'none') {
            console.log("لست في صفحة الامتحان");
            return;
        }
        
        // تجنب إضافة الزر مرتين
        if (document.querySelector('.audio-memory-btn')) {
            console.log("الزر موجود بالفعل");
            return;
        }
        
        const examKey = getCurrentExamKey();
        if (!examKey) {
            console.log("لا يمكن تحديد الامتحان الحالي");
            return;
        }
        
        const audioUrl = audioFiles[examKey];
        if (!audioUrl) {
            console.log("لا يوجد ملف صوتي لهذا الامتحان:", examKey);
            return;
        }
        
        const button = createButton(examKey, audioUrl);
        
        // ضع الزر تحت عنوان الامتحان
        const titleContainer = document.querySelector('#exam .exam-box > div:first-child');
        if (titleContainer) {
            titleContainer.insertAdjacentElement('afterend', button);
        } else {
            const examBox = document.querySelector('.exam-box');
            if (examBox) {
                examBox.insertBefore(button, examBox.firstChild);
            }
        }
        
        console.log("✅ زر الصوت تمت إضافته للامتحان:", examKey, "المسار:", audioUrl);
    }
    
    // ========================================
    // مراقبة تغيير الامتحان
    // ========================================
    let lastExamKey = null;
    
    function checkForChanges() {
        const examPage = document.getElementById('exam');
        if (!examPage || examPage.style.display === 'none') {
            // إذا خرجنا من صفحة الامتحان، نظف
            if (document.querySelector('.audio-memory-btn')) {
                const btn = document.querySelector('.audio-memory-btn');
                if (btn) btn.remove();
            }
            return;
        }
        
        const currentKey = getCurrentExamKey();
        if (currentKey !== lastExamKey) {
            lastExamKey = currentKey;
            // احذف الزر القديم
            const oldBtn = document.querySelector('.audio-memory-btn');
            if (oldBtn) oldBtn.remove();
            // أضف زر جديد
            setTimeout(addButtonToExam, 200);
        }
    }
    
    // ========================================
    // بدء النظام
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setInterval(checkForChanges, 500);
        });
    } else {
        setInterval(checkForChanges, 500);
    }
    
    console.log("🎧 نظام الصوت جاهز - انتظر حتى تفتح امتحاناً");
})();
