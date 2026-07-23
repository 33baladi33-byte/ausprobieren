class MemoryTrainer{constructor(){this.questions=[],this.allQuestions=[],this.sharedOptions=[],this.trainingQueue=[],this.wrongQuestions=[],this.currentIndex=0,this.isActive=!1,this.isReviewMode=!1,this.isFromList=!1,this.examType="hoeren",this.currentCorrectText="",this.currentCorrectIndex=-1,this.currentOptions=[],this.currentQuestionIndex=0,this.currentExamId=1,this.currentQuestionObj=null,this.attempts=0,this.correctAttempts=0,this.totalQuestions=0,this.overlay=null,this.card=null,this.timer=null,this.isAnswered=!1,this.isCardReady=!1,this.TOTAL_OPTIONS=3,this.WRONG_OPTIONS=2,this.LEVELS_KEY="memory_levels",this.MAX_LEVEL=5,this.currentSkill="hoeren1",this.currentExamId=1}async getUserStatus(){try{return typeof window.getUserStatusGlobal=="function"?await window.getUserStatusGlobal():typeof window.getUserStatusForExam=="function"?await window.getUserStatusForExam():"free"}catch(t){return console.warn("⚠️ فشل جلب حالة المستخدم:",t),"free"}}start(t="single"){console.log(`🧠 بدء Memory Trainer V4 (المهارة: ${this.currentSkill}, الوضع: ${t})...`);let e=null;if(this.isFromList=!1,this.sharedOptions=[],t==="list"){const s=`_${this.currentSkill}_combinedData`;if(window[s])e=window[s],this.isFromList=!0,console.log(`📚 تدريب من قائمة ${this.currentSkill} (المرحلة ${e.currentStage||1})`),this.currentSkill==="lesen3"&&e.situations&&!this.sharedOptions.length?this.sharedOptions=e.situations:e.sharedOptions&&(this.sharedOptions=e.sharedOptions),this.examType=e.examType||"hoeren",this.currentSkill==="lesen1"||this.currentSkill==="lesen3"?this.examType="matching":this.currentSkill==="lesen2"?this.examType="multiple":this.currentSkill==="sprach1"?this.examType="sprach1":this.currentSkill==="sprach2"&&(this.examType="sprach2");else if(typeof window.loadStageExams=="function"){window.loadStageExams(this.currentSkill).then(()=>{window[s]?this.start(t):this.showNotAvailable(`لم يتم تحميل بيانات ${this.currentSkill} بعد`)});return}else{this.showNotAvailable(`لم يتم تحميل بيانات ${this.currentSkill} بعد`);return}}else if(e=window.currentExamData||window._currentExamData,e)this.currentSkill=window.currentSkill||"hoeren1",this.currentExamId=window.currentExamId||1,console.log(`📖 تدريب من امتحان فردي: ${this.currentSkill} exam${this.currentExamId}`),this.currentSkill==="lesen3"&&e.situations&&!this.sharedOptions.length?this.sharedOptions=e.situations:e.sharedOptions&&(this.sharedOptions=e.sharedOptions),this.examType=e.type||"hoeren",this.currentSkill==="lesen1"||this.currentSkill==="lesen3"?this.examType="matching":this.currentSkill==="lesen2"?this.examType="multiple":this.currentSkill==="sprach1"?this.examType="sprach1":this.currentSkill==="sprach2"&&(this.examType="sprach2");else{this.showNotAvailable("لا توجد بيانات امتحان");return}if(!e){this.showNotAvailable("لا توجد بيانات امتحان");return}let r=[];if(this.isFromList)r=e.allQuestions||[],this.currentSkill==="lesen1"||this.currentSkill==="lesen2"||this.currentSkill==="lesen3"||this.currentSkill==="sprach1"||this.currentSkill==="sprach2"?this.questions=r:this.questions=r.filter(s=>s.correct===!0);else{let s=[];this.currentSkill==="sprach1"||this.currentSkill==="sprach2"?(e.options&&Array.isArray(e.options)?s=e.options:e.questions&&Array.isArray(e.questions)?s=e.questions:s=[],s=s.filter(i=>i.memoryHighlight)):this.currentSkill==="lesen3"&&e.items?(s=e.items,e.situations&&!this.sharedOptions.length&&(this.sharedOptions=e.situations)):s=e.questions||[],r=s.map((i,o)=>{let n="",a="",d="",p=0;return(this.currentSkill==="sprach1"||this.currentSkill==="sprach2")&&i.memoryHighlight&&(n=i.memoryHighlight.before||"",d=i.memoryHighlight.connector||"",a=i.memoryHighlight.after||"",p=0),{text:i.text||"",correct:i.correct,options:i.options||[],examId:this.currentExamId,questionIndex:o,originalQuestion:i,memoryHighlight:i.memoryHighlight||null,id:i.id,before:n,connector:d,after:a,color:p}}),this.currentSkill==="lesen1"||this.currentSkill==="lesen2"||this.currentSkill==="lesen3"||this.currentSkill==="sprach1"||this.currentSkill==="sprach2"?this.questions=r:this.questions=r.filter(i=>i.correct===!0)}if(this.allQuestions=r,(this.currentSkill==="lesen1"||this.currentSkill==="lesen3")&&this.sharedOptions.length===0&&r.length>0&&console.warn(`⚠️ لم يتم العثور على sharedOptions لـ ${this.currentSkill}، قد لا تعمل الخيارات بشكل صحيح.`),this.currentSkill==="lesen3"&&this.sharedOptions.length>0){const s=this.questions.length;this.questions=this.questions.filter(o=>o.correct!==null&&o.correct!==void 0&&typeof o.correct=="number"&&o.correct>=0&&o.correct<this.sharedOptions.length);const i=this.questions.length;i<s&&console.log(`🔍 Lesen 3: تم استبعاد ${s-i} فقرة غير صالحة (correct == null أو خارج النطاق)، بقي ${i} فقرة للتدريب`)}if(this.questions.length===0){this.showNotAvailable("لا توجد فقرات صالحة للتدريب (تأكد من وجود عناوين صحيحة)");return}if(this.buildTrainingQueue(),this.trainingQueue.length===0){this.showNotAvailable("لا توجد جمل للتدريب");return}this.isActive=!0,this.isReviewMode=!1,this.currentIndex=0,this.attempts=0,this.correctAttempts=0,this.wrongQuestions=[],this.totalQuestions=this.trainingQueue.length,this.isCardReady=!1,this.createOverlay(),this.createCardStructure(),this.isFromList?this.showIntroCardList():this.showIntroCardSingle()}createOverlay(){this.overlay&&this.overlay.remove(),this.overlay=document.createElement("div"),this.overlay.className="memory-trainer-overlay",this.overlay.addEventListener("click",t=>{if(t.target===this.overlay){if(this.currentIndex>=this.trainingQueue.length&&this.isActive){this.wrongQuestions.length>0?this.showPhaseComplete():this.showResults();return}this.close()}}),document.body.appendChild(this.overlay)}createCardStructure(){this.overlay||(console.warn("⚠️ createCardStructure: overlay غير موجود، يتم إنشاؤه تلقائياً"),this.createOverlay());const t=this.overlay.querySelector(".memory-trainer-card-container");t&&t.remove(),this.card=document.createElement("div"),this.card.className="memory-trainer-card-container",this.card.style.cssText=`
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: memorySlideUp 0.15s ease;
        `,this.overlay.appendChild(this.card),this.isCardReady=!0}updateCard(t){(!this.isCardReady||!this.card)&&this.createCardStructure(),this.card.innerHTML=t}buildTrainingQueue(){const t=this.questions.map(i=>i),e=Math.ceil(t.length/2),r=this.shuffleArray([...t]),s=[];for(let i=0;i<Math.min(e,r.length);i++)s.push(r[i]);this.trainingQueue=this.shuffleArray([...t,...s]),console.log(`📊 قائمة التدريب: ${this.trainingQueue.length} جملة (${this.isFromList?"مرحلة":"امتحان فردي"})`)}buildSentenceId(t,e,r){return window.buildSentenceId?window.buildSentenceId(t,e,r):`${t}_exam${e}_${r}`}getSentenceLevel(t){const e=JSON.parse(localStorage.getItem(this.LEVELS_KEY)||"{}");return e[t]!==void 0?e[t]:0}setSentenceLevel(t,e){const r=JSON.parse(localStorage.getItem(this.LEVELS_KEY)||"{}");let s=Math.max(0,Math.min(this.MAX_LEVEL,e));r[t]=s,localStorage.setItem(this.LEVELS_KEY,JSON.stringify(r))}increaseLevel(t){const e=this.getSentenceLevel(t);if(e<this.MAX_LEVEL){const r=e+1;this.setSentenceLevel(t,r),console.log(`⬆️ زيادة مستوى ${t} -> ${r}`)}}decreaseLevel(t){const e=this.getSentenceLevel(t);if(e>0){const r=e-1;this.setSentenceLevel(t,r),console.log(`⬇️ إنقاص مستوى ${t} -> ${r}`)}}getExamProgress(t,e){if(window.getExamProgress)return window.getExamProgress(t,e);const r=`${t}_exam${e}_`,s=JSON.parse(localStorage.getItem(this.LEVELS_KEY)||"{}");let i=0,o=0;for(const n in s)n.startsWith(r)&&(i+=s[n],o++);return o===0?0:Math.min(100,Math.round(i/(o*this.MAX_LEVEL)*100))}getOverallProgressForSkill(t){return window.getOverallProgress?window.getOverallProgress.length===1?window.getOverallProgress(t):window.getOverallProgress():0}getStageProgressForSkill(t){return window.getStageProgress?window.getStageProgress(t):0}generateOptions(t,e){const r=[t];let s=0;if(this.examType==="matching"&&this.sharedOptions&&this.sharedOptions.length>0){const n=e.correct,a=this.sharedOptions[n],d=this.sharedOptions.filter((h,x)=>x!==n),l=this.shuffleArray([...d]).slice(0,2),c=[a,...l];for(;c.length<3;){const h=this.sharedOptions[Math.floor(Math.random()*this.sharedOptions.length)];c.includes(h)||c.push(h)}return this.shuffleArray(c)}const i=this.allQuestions.filter(n=>n.text!==t).map(n=>n.text);let o=this.shuffleArray([...i]);for(let n=0;n<o.length&&s<this.WRONG_OPTIONS;n++){const a=o[n];!r.includes(a)&&a.trim()!==""&&(r.push(a),s++)}for(;r.length<this.TOTAL_OPTIONS;)console.warn("⚠️ لم يتم العثور على جمل خاطئة كافية، نضيف جملة وهمية مؤقتة"),r.push(`جملة ${r.length+1}`);return this.shuffleArray(r)}showIntroCardSingle(){const t=this.getExamProgress(this.currentSkill,this.currentExamId);let e=`امتحان ${this.currentExamId}`;this.examType==="matching"?this.currentSkill==="lesen3"?e=`امتحان ${this.currentExamId} (Lesen 3)`:e=`امتحان ${this.currentExamId} (Lesen 1)`:this.examType==="multiple"?e=`امتحان ${this.currentExamId} (Lesen 2)`:this.examType==="sprach1"?e=`امتحان ${this.currentExamId} (Sprachbausteine 1)`:this.examType==="sprach2"&&(e=`امتحان ${this.currentExamId} (Sprachbausteine 2)`),this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧩</div>
                <h2>استدعاء ذكي</h2>
                <p style="font-size:14px;color:#334155;margin:6px 0 2px 0;">تدريب ${e}.</p>
                <p style="font-size:13px;color:#64748B;margin:2px 0 14px 0;">${this.examType==="multiple"?"سترى السؤال مرة واحدة، ثم سنطلب منك اختيار الجواب الصحيح.":this.examType==="sprach1"||this.examType==="sprach2"?"سترى الجملة مع الفراغ، ثم سنطلب منك اختيار الكلمة المناسبة.":"سترى النص مرة واحدة، ثم سنطلب منك اختيار العنوان المناسب."}</p>
                <div style="margin:4px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:4px 10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${t}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                        </div>
                        <span style="font-size:12px;font-weight:600;color:#1565C0;">${t}%</span>
                    </div>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">ابدأ</button>
            </div>
        `)}showIntroCardList(){this.getUserStatus().then(t=>{const e=t==="premium",r=this.getOverallProgressForSkill(this.currentSkill),s=this.trainingQueue.length;let i=1,o=1;window.getCurrentStage&&window.getTotalStages&&(i=window.getCurrentStage(this.currentSkill),o=window.getTotalStages(this.currentSkill));let n=this.currentSkill;this.examType==="matching"?this.currentSkill==="lesen3"?n="Lesen 3":n="Lesen 1":this.examType==="multiple"?n="Lesen 2":this.examType==="sprach1"?n="Sprachbausteine 1":this.examType==="sprach2"&&(n="Sprachbausteine 2");let a="";e?a='<button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">ابدأ التدريب</button>':a=`
                    <button class="memory-trainer-btn locked" onclick="window.location.href='subscribe.html'" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 12px;
                        background: #64748B;
                        color: #cbd5e1;
                        box-shadow: none;
                        display: inline-block;
                        width: auto;
                        opacity: 0.7;
                    "
                    onmouseover="this.style.opacity='0.9'"
                    onmouseout="this.style.opacity='0.7'"
                    >
                        🔒 متاح للحساب الكامل
                    </button>
                `,this.updateCard(`
                <div class="memory-trainer-intro">
                    <h2>استدعاء متقدم 🧩</h2>
                    <p style="font-size:14px;color:#334155;margin:4px 0 2px 0;">هاد الميزة غدي تخليك تتدرب على جميع أسئلة امتحانات المرحلة ${i} من ${n}.</p>
                    <p style="font-size:13px;color:#64748B;margin:2px 0 12px 0;">كلما تدربت أكثر، أصبح النظام أكثر ذكاءً في اختيار الأسئلة.</p>
                    <div style="margin:10px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;text-align:left;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:${r}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                            </div>
                            <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${r}%</span>
                        </div>
                    </div>
                    <p style="font-size:12px;color:#94A3B8;margin:4px 0 4px 0;">${s} نص للتدريب</p>
                    <p style="font-size:11px;color:#94A3B8;margin:0 0 12px 0;">المرحلة ${i} / ${o}</p>
                    ${a}
                </div>
            `)}).catch(()=>{this.updateCard(`
                <div class="memory-trainer-intro">
                    <h2>استدعاء متقدم 🧩</h2>
                    <p style="font-size:14px;color:#334155;margin:4px 0 2px 0;">هاد الميزة غدي تخليك تتدرب على جميع أسئلة امتحانات المرحلة.</p>
                    <p style="font-size:13px;color:#64748B;margin:2px 0 12px 0;">كلما تدربت أكثر، أصبح النظام أكثر ذكاءً في اختيار الأسئلة.</p>
                    <div style="margin:10px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;text-align:left;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:0%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                            </div>
                            <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">0%</span>
                        </div>
                    </div>
                    <p style="font-size:12px;color:#94A3B8;margin:4px 0 4px 0;">جاري التحميل...</p>
                    <button class="memory-trainer-btn locked" onclick="window.location.href='subscribe.html'" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;margin-top:12px;background:#64748B;color:#cbd5e1;opacity:0.7;">🔒 متاح للحساب الكامل</button>
                </div>
            `)})}showMemoryCard(){if(this.clearTimer(),this.isAnswered=!1,this.currentIndex>=this.trainingQueue.length){this.showPhaseComplete();return}const t=this.trainingQueue[this.currentIndex],e=t.text;this.currentCorrectText=e,this.currentExamId=t.examId,this.currentQuestionIndex=t.questionIndex,this.currentQuestionObj=t,this.currentCorrectIndex=t.correct;let r="",s="";if(this.examType==="matching"){const i=this.currentQuestionObj.correct,o=this.sharedOptions[i]||"",n=o.match(/^[a-zA-Z][\.\)]\s*/)?o.match(/^[a-zA-Z][\.\)]\s*/)[0]:"",a=o.replace(/^[a-zA-Z][\.\)]\s*/,"");r=`
                <div class="memory-trainer-card" style="
                    background: #FFFFFF;
                    border: 1px solid #E8EEF5;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    position: relative;
                ">
                    <div class="memory-trainer-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid #F1F5F9;
                    ">
                        <span class="memory-trainer-progress" style="
                            font-size: 12px;
                            color: #94A3B8;
                            font-weight: 500;
                        ">
                            ${this.currentIndex+1}/${this.trainingQueue.length}
                        </span>
                        <span class="memory-trainer-focus" style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #2D6A4F;
                        ">
                            🍃 خذ وقتك
                        </span>
                    </div>

                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint" style="
                            font-size: 14px;
                            color: #4A7C59;
                            margin-bottom: 8px;
                            text-align: center;
                        ">
                           🌿 اقرأ الفقرة جيداً، سأطلب منك اختيار الحالة المناسبة.
                        </p>

                        <!-- صندوق القراءة الخاص بـ Lesen 1 و Lesen 3 -->
                        <div class="memory-reading-box" style="
                            width: 100%;
                            height: 160px;
                            overflow-y: auto;
                            padding: 12px 16px;
                            background: #F8FAFC;
                            border: 1px solid #EDF2F7;
                            border-radius: 10px;
                            text-align: left;
                            direction: rtl;
                            font-size: 15px;
                            line-height: 1.8;
                            font-weight: 400;
                            color: #1a202c;
                            box-sizing: border-box;
                            margin: 8px 0 12px 0;
                        ">
                            ${e}
                        </div>

                        <!-- العنوان كسطر عادي -->
                        <div style="
                            text-align: right;
                            font-size: 15px;
                            font-weight: 500;
                            color: #1a5a1a;
                            padding: 2px 4px;
                            direction: rtl;
                            margin-top: 0;
                        ">
                            ✅ ${n}${a}
                        </div>
                    </div>

                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 10px;
                        background: #1565C0;
                        color: white;
                        box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                        display: inline-block;
                        width: auto;
                    ">
                        أنا جاهز
                    </button>
                </div>
            `}else if(this.examType==="multiple"){const i=this.currentQuestionObj.questionIndex!==void 0?this.currentQuestionObj.questionIndex+1:this.currentIndex+1;let n=this.currentQuestionObj.options&&this.currentQuestionObj.options.length>0?this.currentQuestionObj.options[this.currentQuestionObj.correct]:"";/^[a-zA-Z][\.\)]\s*/.test(n)&&(n=n.replace(/^[a-zA-Z][\.\)]\s*/,""));const a=`${i}:${e}:

         a. ${n}`;r=`
                <div class="memory-trainer-card" style="
                    background: #FFFFFF;
                    border: 1px solid #E8EEF5;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    position: relative;
                ">
                    <div class="memory-trainer-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid #F1F5F9;
                    ">
                        <span class="memory-trainer-progress" style="
                            font-size: 12px;
                            color: #94A3B8;
                            font-weight: 500;
                        ">
                            ${this.currentIndex+1}/${this.trainingQueue.length}
                        </span>
                        <span class="memory-trainer-focus" style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #2D6A4F;
                        ">
                            🍃 خذ وقتك
                        </span>
                    </div>

                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint" style="
                            font-size: 14px;
                            color: #4A7C59;
                            margin-bottom: 8px;
                            text-align: center;
                        ">
                            🌿 اقرأ السؤال جيداً، سأطلب منك اختيار الجواب الصحيح.
                        </p>

                       <div style="
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: #1a5a1a;
    padding: 6px 12px;
    padding-left: 30px;
    margin-top: 0;
    background: transparent;
    border-radius: 6px;
">
    ✅ ${n}
</div>
                    </div>

                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 10px;
                        background: #1565C0;
                        color: white;
                        box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                        display: inline-block;
                        width: auto;
                    ">
                        أنا جاهز
                    </button>
                </div>
            `}else if(this.examType==="sprach1"){const i=this.currentQuestionObj,o=i.memoryHighlight||{},n=i.id||this.currentQuestionIndex+1,a=o.before||"",d=o.connector||"",p=o.after||"";r=`
                <div class="memory-trainer-card" style="
                    background: #FFFFFF;
                    border: 1px solid #E8EEF5;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    position: relative;
                    transition: background 0.3s ease;
                ">
                    <div class="memory-trainer-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid rgba(0,0,0,0.06);
                    ">
                        <span class="memory-trainer-progress" style="
                            font-size: 12px;
                            color: #94A3B8;
                            font-weight: 500;
                        ">
                            ${this.currentIndex+1}/${this.trainingQueue.length}
                        </span>
                        <span class="memory-trainer-focus" style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #2D6A4F;
                        ">
                            🍃 خذ وقتك
                        </span>
                    </div>

                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint" style="
                            font-size: 14px;
                            color: #4A7C59;
                            margin-bottom: 12px;
                            text-align: center;
                        ">
                            🌿 اختر الكلمة المناسبة للفراغ.
                        </p>

                      <!-- صندوق القراءة الخاص بـ Sprachbausteine 1 -->
<div class="memory-reading-box" style="
    width: 100%;
    height: 80px;
    overflow-y: auto;
    padding: 12px 16px;
    background: #F8FAFC;
    border: 1px solid #EDF2F7;
    border-radius: 10px;
    text-align: left;
    direction: rtl;
    font-size: 17px;
    line-height: 1.8;
    font-weight: 400;
    color: #1a202c;
    box-sizing: border-box;
    margin: 8px 0 12px 0;
">
    ${a} <span style="font-weight:700;color:#1565C0;background:#E3F2FD;padding:0 6px;border-radius:4px;">[${n}]</span> ${p}
</div>

                        <!-- الإجابة الصحيحة -->
<div style="
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: #1a5a1a;
    padding: 6px 12px;
    padding-left: 20px;
    margin-top: 0;
    background: transparent;
    border-radius: 6px;
">
    ✅ ${d}
</div>
                    </div>

                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 12px;
                        background: #1565C0;
                        color: white;
                        box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                        display: inline-block;
                        width: auto;
                    ">
                        أنا جاهز
                    </button>
                </div>
            `}else if(this.examType==="sprach2"){const i=this.currentQuestionObj,o=i.memoryHighlight||{},n=i.id||this.currentQuestionIndex+1,a=o.before||"",d=o.connector||"",p=o.after||"";r=`
                <div class="memory-trainer-card" style="
                    background: #FFFFFF;
                    border: 1px solid #E8EEF5;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    position: relative;
                    transition: background 0.3s ease;
                ">
                    <div class="memory-trainer-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid rgba(0,0,0,0.06);
                    ">
                        <span class="memory-trainer-progress" style="
                            font-size: 12px;
                            color: #94A3B8;
                            font-weight: 500;
                        ">
                            ${this.currentIndex+1}/${this.trainingQueue.length}
                        </span>
                        <span class="memory-trainer-focus" style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #2D6A4F;
                        ">
                            🍃 خذ وقتك
                        </span>
                    </div>

                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint" style="
                            font-size: 14px;
                            color: #4A7C59;
                            margin-bottom: 12px;
                            text-align: center;
                        ">
                            🌿 اختر الكلمة المناسبة للفراغ.
                        </p>

                        <!-- صندوق القراءة الخاص بـ Sprachbausteine 2 -->
                        <div class="memory-reading-box" style="
                            width: 100%;
                            height: 80px;
                            overflow-y: auto;
                            padding: 12px 16px;
                            background: #F8FAFC;
                            border: 1px solid #EDF2F7;
                            border-radius: 10px;
                            text-align: left;
                            direction: rtl;
                            font-size: 17px;
                            line-height: 1.8;
                            font-weight: 400;
                            color: #1a202c;
                            box-sizing: border-box;
                            margin: 8px 0 12px 0;
                        ">
                            ${a} <span style="font-weight:700;color:#1565C0;background:#E3F2FD;padding:0 6px;border-radius:4px;">[${n}]</span> ${p}
                        </div>

                        <!-- الإجابة الصحيحة -->
                        <div style="
                            text-align: left;
                            font-size: 16px;
                            font-weight: 500;
                            color: #1a5a1a;
                            padding: 6px 12px;
                            padding-left: 20px;
                            margin-top: 0;
                            background: transparent;
                            border-radius: 6px;
                        ">
                            ✅ ${d}
                        </div>
                    </div>

                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 12px;
                        background: #1565C0;
                        color: white;
                        box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                        display: inline-block;
                        width: auto;
                    ">
                        أنا جاهز
                    </button>
                </div>
            `}else r=`
                <div class="memory-trainer-card">
                    <div class="memory-trainer-header">
                        <span class="memory-trainer-progress">${this.currentIndex+1}/${this.trainingQueue.length}</span>
                        <span class="memory-trainer-focus">🍃 خذ وقتك</span>
                    </div>
                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint">🌿 سأطلب منك هذه الجملة بعد قليل.</p>
                        <div class="memory-trainer-answer">
                            <span>${e}</span>
                        </div>
                    </div>
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()">أنا جاهز</button>
                </div>
            `;this.updateCard(r)}readyToRecall(){if(this.clearTimer(),this.examType==="matching"){const s=this.currentQuestionObj.correct,i=this.sharedOptions[s],o=this.sharedOptions.filter((n,a)=>a!==s).sort(()=>Math.random()-.5).slice(0,2);for(;o.length<2;){const n=this.sharedOptions[Math.floor(Math.random()*this.sharedOptions.length)];!o.includes(n)&&n!==i&&o.push(n)}this.currentOptions=this.shuffleArray([i,...o])}else if(this.examType==="multiple")this.currentOptions=this.currentQuestionObj.options||[],this.currentOptions.length===0&&(console.warn("⚠️ لا توجد خيارات في السؤال، نستخدم generateOptions كحل احتياطي"),this.currentOptions=this.generateOptions(this.currentCorrectText,this.currentQuestionObj));else if(this.examType==="sprach1")this.currentOptions=this.currentQuestionObj.options||[],this.currentOptions.length===0&&(console.warn("⚠️ لا توجد خيارات في السؤال، نستخدم generateOptions كحل احتياطي"),this.currentOptions=this.generateOptions(this.currentCorrectText,this.currentQuestionObj));else if(this.examType==="sprach2"){const s=this.currentQuestionObj.options||[],i=this.currentQuestionObj.connector||this.currentQuestionObj.correct,o=s.filter(n=>n!==i).sort(()=>Math.random()-.5).slice(0,2);this.currentOptions=this.shuffleArray([i,...o])}else this.currentOptions=this.generateOptions(this.currentCorrectText,this.currentQuestionObj);let t="",e="";if(this.examType==="matching")t=this.currentSkill==="lesen3"?"اختر الحالة المناسبة للفقرة التي قرأتها:":"اختر العنوان المناسب للنص الذي قرأته:";else if(this.examType==="multiple")t="ما الاختيار الصحيح؟",e=`
                <div style="font-size:17px; font-weight:500; text-align:left; padding:12px 0; color:#1a202c; margin-bottom:16px;">
                    ${this.currentQuestionObj.questionIndex!==void 0?this.currentQuestionObj.questionIndex+1:this.currentIndex+1}. ${this.currentCorrectText}:
                </div>
            `;else if(this.examType==="sprach1"){t="اختر الكلمة الصحيحة:";const s=this.currentQuestionObj,i=s.memoryHighlight||{},o=s.id||this.currentQuestionIndex+1,n=i.before||"",a=i.after||"";e=`
                <div style="
                    font-size: 18px;
                    font-weight: 500;
                    text-align: left;
                    padding: 16px 12px;
                    color: #1a202c;
                    margin: 4px 0 16px 0;
                    line-height: 1.8;
                    background: rgba(255,255,255,0.5);
                    border-radius: 8px;
                ">
                    ${n} <span style="font-weight:700;color:#1565C0;background:#E3F2FD;padding:0 6px;border-radius:4px;">[${o}]</span> ${a}
                </div>
            `}else if(this.examType==="sprach2"){t="اختر الكلمة الصحيحة:";const s=this.currentQuestionObj,i=s.memoryHighlight||{},o=s.id||this.currentQuestionIndex+1,n=i.before||"",a=i.after||"";e=`
                <div style="
                    font-size: 18px;
                    font-weight: 500;
                    text-align: left;
                    padding: 16px 12px;
                    color: #1a202c;
                    margin: 4px 0 16px 0;
                    line-height: 1.8;
                    background: rgba(255,255,255,0.5);
                    border-radius: 8px;
                ">
                    ${n} <span style="font-weight:700;color:#1565C0;background:#E3F2FD;padding:0 6px;border-radius:4px;">[${o}]</span> ${a}
                </div>
            `}else t="ما هي الجملة التي رأيتها قبل قليل؟";let r="";this.examType==="matching"&&(r=`
                <div class="memory-reading-box" style="
                    width: 100%;
                    max-height: 140px;
                    overflow-y: auto;
                    padding: 12px 16px;
                    background: #F8FAFC;
                    border: 1px solid #EDF2F7;
                    border-radius: 10px;
                    text-align: right;
                    direction: rtl;
                    font-size: 15px;
                    line-height: 1.8;
                    font-weight: 400;
                    color: #1a202c;
                    box-sizing: border-box;
                    margin: 8px 0 12px 0;
                ">
                    ${this.currentCorrectText}
                </div>
            `),this.updateCard(`
            <div class="memory-trainer-recall" style="
                background: #FFFFFF;
                border: 1px solid #E8EEF5;
                border-radius: 12px;
                padding: 20px 24px;
                max-width: 440px;
                width: 90%;
                text-align: center;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                position: relative;
            ">
                <div class="memory-trainer-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #F1F5F9;
                ">
                    <span class="memory-trainer-progress" style="
                        font-size: 12px;
                        color: #94A3B8;
                        font-weight: 500;
                    ">
                        ${this.currentIndex+1}/${this.trainingQueue.length}
                    </span>
                    <span class="memory-trainer-focus" style="
                        font-size: 13px;
                        font-weight: 600;
                        color: #2D6A4F;
                    ">
                        🍃 خذ وقتك
                    </span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-question" style="
                        font-size: 15px;
                        font-weight: 500;
                        color: #334155;
                        margin-bottom: 10px;
                    ">
                        ${t}
                    </p>
                    ${e}
                    ${r}
                    <div class="memory-trainer-options" style="
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                        margin: 8px 0;
                    ">
                       ${this.currentOptions.map((s,i)=>`
    <button class="memory-trainer-option" data-index="${i}" onclick="window.memoryTrainer.checkAnswer(${i})" style="
        background: #FFFFFF;
        border: 1.5px solid #E8EEF5;
        border-radius: 10px;
        padding: 9px 14px;
        font-size: 14px;
        font-weight: 500;
        color: #334155;
        cursor: pointer;
        text-align: left;
        transition: background-color 0.08s ease, border-color 0.08s ease, box-shadow 0.08s ease, transform 0.08s ease;
        transform: translateY(0);
        box-shadow: none;
    "
    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.08)'; this.style.borderColor='#2c3e66';"
    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='#E8EEF5';"
    >
        ${String.fromCharCode(65+i)}. ${s}
    </button>
`).join("")}
                    </div>
                </div>
                <div id="memory-trainer-feedback"></div>
            </div>
        `)}checkAnswer(t){if(this.isAnswered)return;this.isAnswered=!0,this.attempts++;const e=this.currentOptions[t];let r=!1,s="";if(this.examType==="matching"){const l=this.currentQuestionObj.correct,c=this.sharedOptions[l];r=e===c,s=c}else if(this.examType==="multiple"){const l=this.currentQuestionObj.correct,c=this.currentOptions[l];r=e===c,s=c}else if(this.examType==="sprach1"){const l=this.currentQuestionObj.connector||this.currentQuestionObj.correct;r=e===l,s=l}else if(this.examType==="sprach2"){const l=this.currentQuestionObj.connector||this.currentQuestionObj.correct;r=e===l,s=l}else r=e===this.currentCorrectText,s=this.currentCorrectText;const i=this.currentSkill,o=this.currentExamId,n=this.currentQuestionIndex,a=this.buildSentenceId(i,o,n),d=document.querySelectorAll(".memory-trainer-option"),p=document.getElementById("memory-trainer-feedback");d.forEach(l=>{l.disabled=!0,l.style.opacity="0.7",l.style.cursor="default"}),r?(this.correctAttempts++,this.increaseLevel(a),d[t].style.borderColor="#28a745",d[t].style.backgroundColor="#d4edda",p.innerHTML='<button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()" style="padding:6px 16px; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:#28a745; color:white;">التالي →</button>'):(this.decreaseLevel(a),this.wrongQuestions.includes(this.currentQuestionObj)||this.wrongQuestions.push(this.currentQuestionObj),d[t].style.borderColor="#e67e22",d[t].style.backgroundColor="#fef0e0",d.forEach((l,c)=>{this.currentOptions[c]===s&&(l.style.borderColor="#28a745",l.style.backgroundColor="#d4edda")}),p.innerHTML=`
                <div style="display:flex;gap:10px;justify-content:center;margin-top:8px;">
                    <button class="memory-trainer-btn secondary small" onclick="window.memoryTrainer.retryQuestion()" style="padding:6px 16px; border:2px solid #e67e22; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:white; color:#e67e22;">🔄 إعادة المحاولة</button>
                    <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()" style="padding:6px 16px; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:#1565C0; color:white;">التالي →</button>
                </div>
            `),this.isFromList&&this.updateProgressBar()}updateProgressBar(){const t=this.getOverallProgressForSkill(this.currentSkill),e=this.card?.querySelectorAll(".memory-progress-fill, .memory-trainer-progress-bar");e&&e.forEach(s=>{s.classList.contains("memory-progress-fill")&&(s.style.width=t+"%")});const r=this.card?.querySelector(".memory-progress-percent");r&&(r.textContent=t+"%")}retryQuestion(){this.isAnswered=!1,this.currentIndex--,this.nextQuestion()}nextQuestion(){this.currentIndex++,this.currentIndex<this.trainingQueue.length?this.showMemoryCard():this.showPhaseComplete()}showPhaseComplete(){this.clearTimer();const t=this.wrongQuestions.length,e=this.isFromList?this.getOverallProgressForSkill(this.currentSkill):0;if(t===0){this.showResults();return}this.updateCard(`
            <div class="memory-trainer-results phase-complete" style="
                background: #FFFDF5;
                border: 1px solid #FDE68A;
                border-radius: 12px;
                padding: 20px 24px;
                max-width: 440px;
                width: 90%;
                text-align: center;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
            ">
                <div class="memory-trainer-icon" style="font-size:26px; display:block; margin-bottom:4px;">🧠</div>
                <h2 style="color:#1565C0; font-size:17px; font-weight:600; margin-bottom:4px;">المرحلة الأولى انتهت</h2>
                <div style="margin:8px 0 12px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${e}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                        </div>
                        <span style="font-size:12px;font-weight:600;color:#1565C0;min-width:35px;text-align:right;">${e}%</span>
                    </div>
                </div>
                <div class="memory-trainer-stats" style="margin:6px 0 10px 0;padding:4px 0;display:flex;justify-content:space-around;border-top:1px solid #F1F5F9;border-bottom:1px solid #F1F5F9;">
                    <div class="stat-item" style="text-align:center;">
                        <span class="stat-label" style="display:block; font-size:10px; color:#94A3B8; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">المحاولات</span>
                        <span class="stat-value" style="display:block; font-size:18px; font-weight:700; color:#1565C0; margin-top:2px;">${this.attempts}</span>
                    </div>
                    <div class="stat-item" style="text-align:center;">
                        <span class="stat-label" style="display:block; font-size:10px; color:#94A3B8; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">الإجابات الصحيحة</span>
                        <span class="stat-value" style="display:block; font-size:18px; font-weight:700; color:#1565C0; margin-top:2px;">${this.correctAttempts}</span>
                    </div>
                </div>
                <p class="memory-trainer-hint" style="font-size:13px; color:#64748B; margin:8px 0 16px 0;">الآن سنعيد فقط الأسئلة التي لم تثبت بعد.</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.startReview()" style="padding:8px 20px; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; background:#1565C0; color:white; box-shadow:0 2px 6px rgba(21,101,192,0.15);">مراجعة ${t} سؤال →</button>
            </div>
        `)}startReview(){this.isReviewMode=!0,this.trainingQueue=[...this.wrongQuestions],this.currentIndex=0,this.totalQuestions=this.trainingQueue.length,this.wrongQuestions=[],this.showMemoryCard()}showResults(){const t=this.isFromList,e=this.currentSkill,r=this.currentExamId||1,s=this.getExamProgress(e,r),i=this.getOverallProgressForSkill(e),o=this.getStageProgressForSkill(e);let n="";if(t){let a=1,d=1,p=!1;if(window.getCurrentStage&&window.getTotalStages)a=window.getCurrentStage(e),d=window.getTotalStages(e),p=a>=d;else{const h=`_${e}_combinedData`;if(window[h]){const x=window[h];a=x.currentStage||1,d=x.totalStages||1,p=x.isLastStage||a>=d}}let l=this.totalQuestions||0;const c=`_${e}_combinedData`;window[c]&&(l=window[c].totalQuestions||l),p?n=`
                    <div class="memory-trainer-results final" style="
                        background: #F0FDF4;
                        border: 1px solid #86EFAC;
                        border-radius: 12px;
                        padding: 20px 24px;
                        max-width: 440px;
                        width: 90%;
                        text-align: center;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    ">
                        <div style="font-size:28px;text-align:center;margin-bottom:4px;">🏆</div>
                        <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">لقد أكملت ${e} بالكامل</h2>
                        <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">تهانينا! لقد أنهيت جميع المراحل بنجاح.</p>
                        <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${i}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${i}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">⬅ العودة للقائمة</button>
                    </div>
                `:n=`
                    <div class="memory-trainer-results final" style="
                        background: #F8FFFB;
                        border: 1px solid #B8E6B8;
                        border-radius: 12px;
                        padding: 20px 24px;
                        max-width: 440px;
                        width: 90%;
                        text-align: center;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    ">
                        <div style="font-size:28px;text-align:center;margin-bottom:4px;">🎉</div>
                        <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">أحسنت، لقد أنهيت المرحلة ${a}</h2>
                        <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">تم تثبيت ${l} نص.</p>
                        <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${o}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${o}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close(); if (typeof window.goToNextStage === 'function') window.goToNextStage('${e}');" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">➡ متابعة المرحلة ${a+1}</button>
                    </div>
                `}else{let a=`امتحان ${this.currentExamId}`;this.examType==="matching"?this.currentSkill==="lesen3"?a=`امتحان ${this.currentExamId} (Lesen 3)`:a=`امتحان ${this.currentExamId} (Lesen 1)`:this.examType==="multiple"?a=`امتحان ${this.currentExamId} (Lesen 2)`:this.examType==="sprach1"?a=`امتحان ${this.currentExamId} (Sprachbausteine 1)`:this.examType==="sprach2"&&(a=`امتحان ${this.currentExamId} (Sprachbausteine 2)`),n=`
                <div class="memory-trainer-results final" style="
                    background: #F8FFFB;
                    border: 1px solid #B8E6B8;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                ">
                    <div style="font-size:28px;text-align:center;margin-bottom:4px;">🧩</div>
                    <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">اكتمل الاستدعاء</h2>
                    <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">لقد أنهيت تدريب ${a}.</p>
                    <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:${s}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                            </div>
                            <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${s}%</span>
                        </div>
                    </div>
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">⬅ العودة للامتحان</button>
                </div>
            `}this.updateCard(n)}clearTimer(){this.timer&&(clearTimeout(this.timer),this.timer=null)}shuffleArray(t){for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t}showNotAvailable(t="هذه الميزة غير متوفرة لهذا الامتحان."){this.updateCard(`
            <div class="memory-trainer-intro" style="
                background: #FFFFFF;
                border: 1px solid #E8EEF5;
                border-radius: 12px;
                padding: 20px 24px;
                max-width: 440px;
                width: 90%;
                text-align: center;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
            ">
                <h2 style="color:#1565C0; font-size:17px; font-weight:600;">ℹ️ غير متوفرة</h2>
                <p style="color:#64748B; margin:12px 0;">${t}</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()" style="padding:8px 20px; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; background:#1565C0; color:white; box-shadow:0 2px 6px rgba(21,101,192,0.15);">فهمت</button>
            </div>
        `)}close(){this.clearTimer(),this.overlay&&(this.overlay.remove(),this.overlay=null),this.card=null,this.isCardReady=!1,this.questions=[],this.allQuestions=[],this.sharedOptions=[],this.trainingQueue=[],this.wrongQuestions=[],this.currentIndex=0,this.isActive=!1,this.isReviewMode=!1,this.isFromList=!1,this.attempts=0,this.correctAttempts=0,this.totalQuestions=0,this.currentExamId=1,this.examType="hoeren"}}window.memoryTrainer=new MemoryTrainer,window.startMemoryTrainerForExam=u=>{window.memoryTrainer&&(window.memoryTrainer.currentSkill=u||window.currentSkill||"hoeren1",window.memoryTrainer.currentExamId=window.currentExamId||1,window.memoryTrainer.start("single"))},window.startMemoryTrainerFromList=(u="hoeren1")=>{window.memoryTrainer&&(window.memoryTrainer.currentSkill=u,window.memoryTrainer.start("list"))},window.startMemoryTrainer=window.startMemoryTrainerForExam,console.log("🧠 Memory Trainer V4 (يدعم Hören, Lesen 1, Lesen 2, Lesen 3, Sprachbausteine 1 و Sprachbausteine 2) تم تحميله");
