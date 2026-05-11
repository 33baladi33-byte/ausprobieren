// ============================================
// engine.js - محرك الامتحانات المتكامل (النسخة النهائية الشغالة)
// يدعم: Matching + True/False + Teil 2 + Teil 3 + Sprachbausteine Teil 1 + Sprachbausteine Teil 2 + Schreiben
// ============================================

console.log("✅ engine.js تم تحميله (النسخة النهائية الشغالة)");

window.loadExamFromFile = async function(skill, examId) {
  try {
    const response = await fetch(`data/${skill}/exam${examId}.json`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch(e) {
    console.error("خطأ:", e);
    return null;
  }
};

// ========== نظام Schreiben ==========
let currentSchreibenData = null;

window.loadSchreibenExam = function(examData) {
  console.log("🟢 loadSchreibenExam", examData.title);
  currentSchreibenData = examData;
  renderSchreibenExam();
};

function renderSchreibenExam() {
  const container = document.getElementById("schreiben");
  if (!container) return;
  container.innerHTML = "";
  
  const data = currentSchreibenData;
  
  const twoColumns = document.createElement("div");
  twoColumns.style.display = "flex";
  twoColumns.style.gap = "30px";
  twoColumns.style.flexWrap = "wrap";
  
  const leftColumn = document.createElement("div");
  leftColumn.style.flex = "1";
  leftColumn.style.minWidth = "350px";
  leftColumn.style.backgroundColor = "#f9f9f9";
  leftColumn.style.padding = "20px";
  leftColumn.style.borderRadius = "12px";
  leftColumn.style.border = "1px solid #ddd";
  leftColumn.style.maxHeight = "80vh";
  leftColumn.style.overflowY = "auto";

  const situationTitle = document.createElement("h3");
  situationTitle.innerHTML = "📌 SITUATION";
  situationTitle.style.color = "#2c3e66";
  situationTitle.style.marginTop = "0";
  situationTitle.style.borderBottom = "2px solid #2c3e66";
  situationTitle.style.paddingBottom = "8px";
  leftColumn.appendChild(situationTitle);
  
  const situationDiv = document.createElement("div");
  situationDiv.style.backgroundColor = "white";
  situationDiv.style.padding = "15px";
  situationDiv.style.borderRadius = "8px";
  situationDiv.style.border = "1px solid #e0e0e0";
  situationDiv.style.marginBottom = "20px";
  
  const situationText = document.createElement("div");
  situationText.innerHTML = `<strong style="font-size:16px; color:#007bff;">${data.situation.title}</strong><br><br>${data.situation.text.replace(/\n/g, '<br>')}`;
  situationText.style.fontSize = "14px";
  situationText.style.lineHeight = "1.6";
  situationDiv.appendChild(situationText);
  leftColumn.appendChild(situationDiv);
  
  const aufgabeTitle = document.createElement("h3");
  aufgabeTitle.innerHTML = "📝 AUFGABE";
  aufgabeTitle.style.color = "#2c3e66";
  aufgabeTitle.style.marginTop = "15px";
  aufgabeTitle.style.borderBottom = "2px solid #2c3e66";
  aufgabeTitle.style.paddingBottom = "8px";
  leftColumn.appendChild(aufgabeTitle);
  
  const aufgabeDiv = document.createElement("div");
  aufgabeDiv.style.backgroundColor = "white";
  aufgabeDiv.style.padding = "15px";
  aufgabeDiv.style.borderRadius = "8px";
  aufgabeDiv.style.border = "1px solid #e0e0e0";
  
  const wordCount = document.createElement("div");
  wordCount.innerHTML = `<strong>✏️ ${data.aufgabe.wordCount}</strong>`;
  wordCount.style.marginBottom = "15px";
  wordCount.style.color = "#e67e22";
  wordCount.style.fontSize = "16px";
  aufgabeDiv.appendChild(wordCount);
  
  const description = document.createElement("div");
  description.innerHTML = data.aufgabe.description;
  description.style.marginBottom = "15px";
  description.style.fontSize = "14px";
  description.style.lineHeight = "1.6";
  aufgabeDiv.appendChild(description);
  
  const pointsTitle = document.createElement("div");
  pointsTitle.innerHTML = "<strong>▸ Bitte beachten Sie:</strong>";
  pointsTitle.style.marginBottom = "10px";
  pointsTitle.style.marginTop = "10px";
  aufgabeDiv.appendChild(pointsTitle);
  
  const pointsList = document.createElement("ul");
  pointsList.style.margin = "0";
  pointsList.style.paddingLeft = "20px";
  for (let i = 0; i < data.aufgabe.points.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = data.aufgabe.points[i];
    li.style.marginBottom = "8px";
    li.style.fontSize = "14px";
    pointsList.appendChild(li);
  }
  aufgabeDiv.appendChild(pointsList);
  
  leftColumn.appendChild(aufgabeDiv);
  
  const rightColumn = document.createElement("div");
  rightColumn.style.flex = "1";
  rightColumn.style.minWidth = "350px";
  rightColumn.style.backgroundColor = "#f0f8ff";
  rightColumn.style.padding = "20px";
  rightColumn.style.borderRadius = "12px";
  rightColumn.style.border = "1px solid #d0e0ff";
  rightColumn.style.maxHeight = "80vh";
  rightColumn.style.overflowY = "auto";
  
  
  const templateTitle = document.createElement("div");
  let cleanTitle = data.template.title;
  cleanTitle = cleanTitle.replace(/✦/g, '').trim();
  templateTitle.innerHTML = `✦ ${cleanTitle}`;
  templateTitle.style.backgroundColor = "#e3f2fd";
  templateTitle.style.padding = "10px";
  templateTitle.style.borderRadius = "8px";
  templateTitle.style.marginBottom = "15px";
  templateTitle.style.fontSize = "13px";
  templateTitle.style.color = "#0d47a1";
  templateTitle.style.fontWeight = "bold";
  rightColumn.appendChild(templateTitle);
  
  const templateBox = document.createElement("div");
  templateBox.style.backgroundColor = "white";
  templateBox.style.padding = "20px";
  templateBox.style.borderRadius = "12px";
  templateBox.style.border = "1px solid #ccc";
  templateBox.style.fontFamily = "monospace";
  templateBox.style.fontSize = "13px";
  templateBox.style.lineHeight = "1.6";
  templateBox.style.whiteSpace = "pre-wrap";
  
  let templateText = data.template.text;
  const bluePoints = data.template.colors.blue_points || [];
  
  let htmlText = templateText.replace(/\n/g, '<br>');
  for (let i = 0; i < bluePoints.length; i++) {
    const point = bluePoints[i];
    const regex = new RegExp(`(${point.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g');
    htmlText = htmlText.replace(regex, `<span style="color: ${data.template.colors.blue}; font-weight: bold;">$1</span>`);
  }
  
  templateBox.innerHTML = htmlText;
  rightColumn.appendChild(templateBox);
  
  twoColumns.appendChild(leftColumn);
  twoColumns.appendChild(rightColumn);
  container.appendChild(twoColumns);
}
// ========== نظام Sprachbausteine Teil 2 ==========
let currentSprach2Data = null;
let sprach2UserAnswers = {};
let sprach2SelectedQuestionId = null;
let sprach2SelectedWordForLinking = null;

window.loadSprach2Exam = function(examData) {
  console.log("🟢 loadSprach2Exam", examData.title);
  currentSprach2Data = examData;
  sprach2UserAnswers = {};
  sprach2SelectedQuestionId = null;
  sprach2SelectedWordForLinking = null;
  renderSprach2Exam();
};

function isSprach2WordUsed(word) {
  for (let key in sprach2UserAnswers) {
    if (sprach2UserAnswers[key] === word) {
      return true;
    }
  }
  return false;
}

function clearSprach2WordSelection() {
  document.querySelectorAll('.sprach2-word-card').forEach(card => {
    // إذا كانت الكلمة مستخدمة، تبقى بلونها الأخضر الفاتح
    if (isSprach2WordUsed(card.textContent)) {
      card.style.backgroundColor = "#d4edda";
      card.style.border = "2px solid #28a745";
      card.style.opacity = "0.85";
    } else {
      card.style.backgroundColor = "#ffffff";
      card.style.border = "1px solid #7c6ce6";
      card.style.opacity = "1";
    }
    card.classList.remove('selected-for-link');
  });
}

function clearSprach2ButtonSelection() {
  document.querySelectorAll('.sprach2-gap-btn').forEach(btn => {
    btn.classList.remove('selected-for-link');
    btn.style.border = "none";
    // إذا كان الزر يحتوي على إجابة صحيحة محفوظة، لا نغير لونه
    const btnId = btn.id;
    const match = btnId.match(/sprach2_btn_(\d+)/);
    if (match) {
      const qId = parseInt(match[1]);
      if (sprach2UserAnswers[qId]) {
        btn.style.backgroundColor = "#d4edda";
        btn.style.border = "2px solid #28a745";
      }
    }
  });
}

function renderSprach2Exam() {
  const container = document.getElementById("sprach2");
  if (!container) return;
  container.innerHTML = "";
  
  const text = currentSprach2Data.text;
  const options = currentSprach2Data.options;
  const allOptions = currentSprach2Data.allOptions;
  
  const twoColumns = document.createElement("div");
  twoColumns.style.display = "flex";
  twoColumns.style.gap = "30px";
  twoColumns.style.flexWrap = "wrap";
  
  const leftColumn = document.createElement("div");
  leftColumn.style.flex = "1.5";
  leftColumn.style.minWidth = "400px";
  leftColumn.style.backgroundColor = "#f9f9f9";
  leftColumn.style.padding = "20px";
  leftColumn.style.borderRadius = "12px";
  leftColumn.style.border = "1px solid #ddd";
  leftColumn.style.maxHeight = "600px";
  leftColumn.style.overflowY = "auto";
  
  const leftTitle = document.createElement("h3");
  leftTitle.innerHTML = "📝 Text";
  leftTitle.style.marginTop = "0";
  leftTitle.style.color = "#2c3e66";
  leftColumn.appendChild(leftTitle);
  
  let htmlText = text;
  for (let i = 1; i <= options.length; i++) {
    const btnId = `sprach2_btn_${i}`;
    const currentAnswer = sprach2UserAnswers[i];
    const btnText = currentAnswer || `__( ${i} )__`;
    let btnStyle = "background-color: #e0e0e0; border: none; padding: 4px 12px; border-radius: 20px; cursor: pointer; font-size: 14px; font-weight: bold; margin: 0 2px;";
    
    // إذا كان هناك إجابة محفوظة، نعطيها لونًا مختلفًا
    if (currentAnswer) {
      btnStyle = "background-color: #d4edda; border: 2px solid #28a745; padding: 4px 12px; border-radius: 20px; cursor: pointer; font-size: 14px; font-weight: bold; margin: 0 2px; color: #155724;";
    }
    
    const btnHtml = `<button id="${btnId}" class="sprach2-gap-btn" data-qid="${i}" style="${btnStyle}">${btnText}</button>`;
    htmlText = htmlText.replace(`__( ${i} )__`, btnHtml);
    htmlText = htmlText.replace(`......(${i})......`, btnHtml);
    htmlText = htmlText.replace(`......(${i})`, btnHtml);
    htmlText = htmlText.replace(`.....( ${i} ).....`, btnHtml);
  }
  
  const textDiv = document.createElement("div");
  textDiv.innerHTML = htmlText;
  textDiv.style.lineHeight = "1.8";
  textDiv.style.fontSize = "14px";
  textDiv.style.textAlign = "justify";
  
  for (let i = 1; i <= options.length; i++) {
    const btn = textDiv.querySelector(`#sprach2_btn_${i}`);
    if (btn) {
      btn.addEventListener('click', (function(qId) {
        return function(e) {
          e.stopPropagation();
          
          if (sprach2UserAnswers[qId]) {
            const oldWord = sprach2UserAnswers[qId];
            delete sprach2UserAnswers[qId];
            
            const wordCard = document.getElementById(`sprach2_word_${oldWord}`);
            if (wordCard) {
              // ✅ تغيير اللون إلى الأزرق الفاتح (غير مستخدم، يمكن اختياره مرة أخرى)
              wordCard.style.backgroundColor = "#e0f2fe";
              wordCard.style.border = "1px solid #7dd3fc";
              wordCard.style.color = "#4a4a4a";
              wordCard.style.cursor = "pointer";
              wordCard.style.opacity = "1";
              wordCard.classList.remove('selected-for-link');
              
              const newCard = wordCard.cloneNode(true);
              wordCard.parentNode.replaceChild(newCard, wordCard);
              
              newCard.onclick = (function(w) {
                return function() {
                  if (sprach2SelectedQuestionId) {
                    if (isSprach2WordUsed(w)) {
                      alert(`⚠️ كلمة "${w}" تم استخدامها بالفعل!`);
                      sprach2SelectedQuestionId = null;
                      clearSprach2ButtonSelection();
                      return;
                    }
                    sprach2UserAnswers[sprach2SelectedQuestionId] = w;
                    const targetBtn = document.getElementById(`sprach2_btn_${sprach2SelectedQuestionId}`);
                    if (targetBtn) {
                      targetBtn.textContent = w;
                      // ✅ بعد الربط: لون أخضر فاتح مع border أخضر
                      targetBtn.style.backgroundColor = "#d4edda";
                      targetBtn.style.border = "2px solid #28a745";
                      targetBtn.style.color = "#155724";
                    }
                    const cardEl = document.getElementById(`sprach2_word_${w}`);
                    if (cardEl) {
                      // ✅ الكلمة المستخدمة: لون أخضر فاتح مع border أخضر
                      cardEl.style.backgroundColor = "#d4edda";
                      cardEl.style.border = "2px solid #28a745";
                      cardEl.style.color = "#155724";
                      cardEl.style.cursor = "default";
                      cardEl.style.opacity = "0.85";
                    }
                    sprach2SelectedQuestionId = null;
                    clearSprach2ButtonSelection();
                  } else {
                    clearSprach2WordSelection();
                    newCard.classList.add('selected-for-link');
                    // ✅ العنصر المحدد حاليًا: أزرق فاتح
                    newCard.style.backgroundColor = "#e0f2fe";
                    newCard.style.border = "2px solid #7dd3fc";
                    sprach2SelectedWordForLinking = w;
                  }
                };
              })(oldWord);
              
              newCard.onmouseenter = function() {
                if (!this.classList.contains('selected-for-link') && !isSprach2WordUsed(this.textContent)) {
                  this.style.backgroundColor = "#f0f9ff";
                  this.style.transform = "scale(1.02)";
                }
              };
              newCard.onmouseleave = function() {
                if (!this.classList.contains('selected-for-link') && !isSprach2WordUsed(this.textContent)) {
                  this.style.backgroundColor = "#e0f2fe";
                  this.style.transform = "scale(1)";
                }
              };
            }
            
            btn.textContent = `__( ${qId} )__`;
            btn.style.backgroundColor = "#e0e0e0";
            btn.style.color = "#333";
            btn.classList.remove('selected-for-link');
            btn.style.border = "none";
            
            const parentDiv = btn.parentElement;
            const existingMsg = parentDiv.querySelector('.correct-answer-hint');
            if (existingMsg) existingMsg.remove();
            return;
          }
          
          if (sprach2SelectedWordForLinking) {
            const word = sprach2SelectedWordForLinking;
            if (isSprach2WordUsed(word)) {
              alert(`⚠️ كلمة "${word}" تم استخدامها بالفعل!`);
              sprach2SelectedWordForLinking = null;
              clearSprach2WordSelection();
              return;
            }
            sprach2UserAnswers[qId] = word;
            btn.textContent = word;
            // ✅ بعد الربط: لون أخضر فاتح
            btn.style.backgroundColor = "#d4edda";
            btn.style.border = "2px solid #28a745";
            btn.style.color = "#155724";
            
            const wordCard = document.getElementById(`sprach2_word_${word}`);
            if (wordCard) {
              wordCard.style.backgroundColor = "#d4edda";
              wordCard.style.border = "2px solid #28a745";
              wordCard.style.color = "#155724";
              wordCard.style.cursor = "default";
              wordCard.style.opacity = "0.85";
            }
            sprach2SelectedWordForLinking = null;
            clearSprach2WordSelection();
          } else {
            clearSprach2ButtonSelection();
            btn.classList.add('selected-for-link');
            // ✅ العنصر المحدد حاليًا: أزرق فاتح
            btn.style.border = "2px solid #7dd3fc";
            btn.style.backgroundColor = "#e0f2fe";
            sprach2SelectedQuestionId = qId;
          }
        };
      })(i));
    }
  }
  
  leftColumn.appendChild(textDiv);
  
  const rightColumn = document.createElement("div");
  rightColumn.style.flex = "0.8";
  rightColumn.style.minWidth = "250px";
  rightColumn.style.backgroundColor = "#f0f8ff";
  rightColumn.style.padding = "20px";
  rightColumn.style.borderRadius = "12px";
  rightColumn.style.border = "1px solid #d0e0ff";
  rightColumn.style.maxHeight = "600px";
  rightColumn.style.overflowY = "auto";
  
  const rightTitle = document.createElement("h3");
  rightTitle.innerHTML = "📋 Wörter";
  rightTitle.style.marginTop = "0";
  rightTitle.style.color = "#2c3e66";
  rightColumn.appendChild(rightTitle);
  
  const wordsGrid = document.createElement("div");
  wordsGrid.style.display = "grid";
  wordsGrid.style.gridTemplateColumns = "repeat(3, 1fr)";
  wordsGrid.style.gap = "12px";
  
  const sortedOptions = [...allOptions].sort();
  
  for (let i = 0; i < sortedOptions.length; i++) {
    const word = sortedOptions[i];
    const wordCard = document.createElement("div");
    wordCard.className = "sprach2-word-card";
    wordCard.id = `sprach2_word_${word}`;
    wordCard.textContent = word;
    wordCard.style.borderRadius = "8px";
    wordCard.style.padding = "8px 12px";
    wordCard.style.textAlign = "center";
    wordCard.style.transition = "all 0.2s";
    wordCard.style.fontWeight = "500";
    
    if (isSprach2WordUsed(word)) {
      // ✅ الكلمة المستخدمة: لون أخضر فاتح مع border أخضر
      wordCard.style.backgroundColor = "#d4edda";
      wordCard.style.border = "2px solid #28a745";
      wordCard.style.color = "#155724";
      wordCard.style.cursor = "default";
      wordCard.style.opacity = "0.85";
    } else {
      // ✅ الكلمة غير المستخدمة: لون أبيض مع border أرجواني فاتح
      wordCard.style.backgroundColor = "#ffffff";
      wordCard.style.border = "1px solid #7c6ce6";
      wordCard.style.color = "#4a4a4a";
      wordCard.style.cursor = "pointer";
      wordCard.style.opacity = "1";
      
      wordCard.onclick = (function(w) {
        return function() {
          if (sprach2SelectedQuestionId) {
            if (isSprach2WordUsed(w)) {
              alert(`⚠️ كلمة "${w}" تم استخدامها بالفعل!`);
              sprach2SelectedQuestionId = null;
              clearSprach2ButtonSelection();
              return;
            }
            sprach2UserAnswers[sprach2SelectedQuestionId] = w;
            const targetBtn = document.getElementById(`sprach2_btn_${sprach2SelectedQuestionId}`);
            if (targetBtn) {
              targetBtn.textContent = w;
              targetBtn.style.backgroundColor = "#d4edda";
              targetBtn.style.border = "2px solid #28a745";
              targetBtn.style.color = "#155724";
            }
            const cardEl = document.getElementById(`sprach2_word_${w}`);
            if (cardEl) {
              cardEl.style.backgroundColor = "#d4edda";
              cardEl.style.border = "2px solid #28a745";
              cardEl.style.color = "#155724";
              cardEl.style.cursor = "default";
              cardEl.style.opacity = "0.85";
            }
            sprach2SelectedQuestionId = null;
            clearSprach2ButtonSelection();
          } else {
            clearSprach2WordSelection();
            wordCard.classList.add('selected-for-link');
            // ✅ العنصر المحدد حاليًا: أزرق فاتح
            wordCard.style.backgroundColor = "#e0f2fe";
            wordCard.style.border = "2px solid #7dd3fc";
            sprach2SelectedWordForLinking = w;
          }
        };
      })(word);
      
      wordCard.onmouseenter = function() {
        if (!this.classList.contains('selected-for-link') && !isSprach2WordUsed(this.textContent)) {
          this.style.backgroundColor = "#f0f9ff";
          this.style.transform = "scale(1.02)";
        }
      };
      wordCard.onmouseleave = function() {
        if (!this.classList.contains('selected-for-link') && !isSprach2WordUsed(this.textContent)) {
          this.style.backgroundColor = "#ffffff";
          this.style.transform = "scale(1)";
        }
      };
    }
    
    wordsGrid.appendChild(wordCard);
  }
  
  rightColumn.appendChild(wordsGrid);
  
  twoColumns.appendChild(leftColumn);
  twoColumns.appendChild(rightColumn);
  container.appendChild(twoColumns);
  
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "15px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "25px";
  
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✅ تصحيح";
  checkBtn.className = "check-btn";
  checkBtn.style.padding = "12px 24px";
  checkBtn.style.backgroundColor = "#2c3e66";
  checkBtn.style.color = "white";
  checkBtn.style.border = "none";
  checkBtn.style.borderRadius = "8px";
  checkBtn.style.cursor = "pointer";
  checkBtn.style.fontSize = "16px";
  checkBtn.onclick = checkSprach2Exam;
  buttonContainer.appendChild(checkBtn);
  
  const resetBtn = document.createElement("button");
  resetBtn.innerText = "↺";
  resetBtn.style.padding = "8px 12px";
  resetBtn.style.backgroundColor = "#6c757d";
  resetBtn.style.color = "white";
  resetBtn.style.border = "none";
  resetBtn.style.borderRadius = "6px";
  resetBtn.style.cursor = "pointer";
  resetBtn.style.fontSize = "16px";
  resetBtn.style.fontWeight = "bold";
  resetBtn.onclick = resetSprach2Exam;
  buttonContainer.appendChild(resetBtn);
  
  container.appendChild(buttonContainer);
  
  const resultDiv = document.createElement("div");
  resultDiv.id = "sprach2Result";
  resultDiv.className = "result-box";
  resultDiv.style.display = "none";
  resultDiv.style.marginTop = "20px";
  resultDiv.style.padding = "15px";
  resultDiv.style.borderRadius = "8px";
  resultDiv.style.textAlign = "center";
  resultDiv.style.fontWeight = "bold";
  container.appendChild(resultDiv);
}

function resetSprach2Exam() {
  sprach2UserAnswers = {};
  sprach2SelectedQuestionId = null;
  sprach2SelectedWordForLinking = null;
  
  for (let i = 1; i <= currentSprach2Data.options.length; i++) {
    const btn = document.getElementById(`sprach2_btn_${i}`);
    if (btn) {
      btn.textContent = `__( ${i} )__`;
      btn.style.backgroundColor = "#e0e0e0";
      btn.style.color = "#333";
      btn.classList.remove('selected-for-link');
      btn.style.border = "none";
    }
  }
  
  const allWords = document.querySelectorAll('.sprach2-word-card');
  allWords.forEach(card => {
    card.style.backgroundColor = "#ffffff";
    card.style.border = "1px solid #7c6ce6";
    card.style.color = "#4a4a4a";
    card.style.cursor = "pointer";
    card.style.opacity = "1";
    card.classList.remove('selected-for-link');
  });
  
  const resultDiv = document.getElementById("sprach2Result");
  if (resultDiv) resultDiv.style.display = "none";
  
  console.log("✅ تم إعادة تعيين Sprachbausteine Teil 2");
}

// دالة checkSprach2Exam المعدلة مع تحسين الألوان
function checkSprach2Exam() {
  const options = currentSprach2Data.options;
  let score = 0;
  const total = options.length;
  const pointsPerQuestion = 25 / total;
  
  document.querySelectorAll('.correct-answer-hint').forEach(el => el.remove());
  
  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const userAnswer = sprach2UserAnswers[opt.id];
    const isCorrect = (userAnswer === opt.correct);
    const btn = document.getElementById(`sprach2_btn_${opt.id}`);
    
    if (isCorrect) {
      score++;
      if (btn) {
        btn.textContent = opt.correct;
        // ✅ الإجابة الصحيحة: لون أخضر فاتح مع border أخضر
        btn.style.backgroundColor = "#d4edda";
        btn.style.border = "2px solid #28a745";
        btn.style.color = "#155724";
        btn.style.opacity = "0.85";
      }
    } else {
      if (btn) {
        // ✅ الإجابة الخاطئة: لون أحمر فاتح
        btn.style.backgroundColor = "#fee2e2";
        btn.style.color = "#dc2626";
        btn.style.border = "1px solid #dc2626";
        btn.textContent = opt.correct;
        btn.style.opacity = "0.85";
        if (userAnswer) {
          btn.title = `إجابتك: ${userAnswer}`;
        } else {
          btn.title = "لم تجب على هذا السؤال";
        }
      }
    }
  }
  
  // تحديث ألوان الكلمات المستخدمة
  const usedWords = Object.values(sprach2UserAnswers);
  document.querySelectorAll('.sprach2-word-card').forEach(card => {
    const word = card.textContent;
    if (usedWords.includes(word)) {
      // ✅ الكلمة المستخدمة: لون أخضر فاتح
      card.style.backgroundColor = "#d4edda";
      card.style.border = "2px solid #28a745";
      card.style.color = "#155724";
      card.style.opacity = "0.85";
    } else {
      // ✅ الكلمة غير المستخدمة: لون أبيض مع border أرجواني
      card.style.backgroundColor = "#ffffff";
      card.style.border = "1px solid #7c6ce6";
      card.style.color = "#4a4a4a";
      card.style.opacity = "1";
    }
  });
  
  const finalScore = (score * pointsPerQuestion).toFixed(2);
  const resultDiv = document.getElementById("sprach2Result");
  if (resultDiv) {
    resultDiv.innerHTML = `النتيجة: ${finalScore} / 25`;
    resultDiv.style.display = "block";
  }
  
  if (finalScore >= 20) {
    resultDiv.style.backgroundColor = "#d4edda";
    resultDiv.style.color = "#155724";
  } else if (finalScore >= 15) {
    resultDiv.style.backgroundColor = "#fff3cd";
    resultDiv.style.color = "#856404";
  } else {
    resultDiv.style.backgroundColor = "#f8d7da";
    resultDiv.style.color = "#721c24";
  }
  
  // حفظ النتيجة
  if (typeof window.saveExamResultGlobal === "function") {
    window.saveExamResultGlobal(currentSprach2Data.skill || "sprach2", currentSprach2Data.id || 1, parseFloat(finalScore));
  }
}

// ========== نظام Sprachbausteine Teil 1 ==========
let currentSprach1Data = null;
let sprach1UserAnswers = {};

window.loadSprach1Exam = function(examData) {
  console.log("🟢 loadSprach1Exam", examData.title);
  currentSprach1Data = examData;
  sprach1UserAnswers = {};
  renderSprach1Exam();
};

function renderSprach1Exam() {
  const container = document.getElementById("sprach1");
  if (!container) return;
  container.innerHTML = "";
  
  const text = currentSprach1Data.text;
  const options = currentSprach1Data.options;
  
  const twoColumns = document.createElement("div");
  twoColumns.style.display = "flex";
  twoColumns.style.gap = "30px";
  twoColumns.style.flexWrap = "wrap";
  
  const leftColumn = document.createElement("div");
  leftColumn.style.flex = "1.5";
  leftColumn.style.minWidth = "400px";
  leftColumn.style.backgroundColor = "#f9f9f9";
  leftColumn.style.padding = "20px";
  leftColumn.style.borderRadius = "12px";
  leftColumn.style.border = "1px solid #ddd";
  leftColumn.style.maxHeight = "600px";
  leftColumn.style.overflowY = "auto";
  
  const leftTitle = document.createElement("h3");
  leftTitle.innerHTML = "📝 Text";
  leftTitle.style.marginTop = "0";
  leftTitle.style.color = "#2c3e66";
  leftColumn.appendChild(leftTitle);
  
  let htmlText = text;
  for (let i = 1; i <= options.length; i++) {
    const btnId = `sprach1_btn_${i}`;
    const currentAnswer = sprach1UserAnswers[i];
    const btnText = currentAnswer || `__(${i})__`;
    const btnHtml = `<button id="${btnId}" class="sprach1-gap-btn" style="background-color: #e0e0e0; border: none; padding: 4px 12px; border-radius: 20px; cursor: pointer; font-size: 14px; font-weight: bold; margin: 0 2px;">${btnText}</button>`;
    htmlText = htmlText.replace(`⌄ __ (${i}) __ ⌄`, btnHtml);
  }
  
  const textDiv = document.createElement("div");
  textDiv.innerHTML = htmlText;
  textDiv.style.lineHeight = "1.8";
  textDiv.style.fontSize = "14px";
  textDiv.style.textAlign = "justify";
  
  for (let i = 1; i <= options.length; i++) {
    const btn = textDiv.querySelector(`#sprach1_btn_${i}`);
    if (btn) {
      btn.onclick = (function(qId) {
        return function() { openSprach1Dropdown(qId); };
      })(i);
    }
  }
  
  leftColumn.appendChild(textDiv);
  
  const rightColumn = document.createElement("div");
  rightColumn.style.flex = "0.8";
  rightColumn.style.minWidth = "250px";
  rightColumn.style.backgroundColor = "#f0f8ff";
  rightColumn.style.padding = "20px";
  rightColumn.style.borderRadius = "12px";
  rightColumn.style.border = "1px solid #d0e0ff";
  rightColumn.style.maxHeight = "600px";
  rightColumn.style.overflowY = "auto";
  
  const rightTitle = document.createElement("h3");
  rightTitle.innerHTML = "📋 Optionen";
  rightTitle.style.marginTop = "0";
  rightTitle.style.color = "#2c3e66";
  rightColumn.appendChild(rightTitle);
  
  const optionsContainer = document.createElement("div");
  optionsContainer.id = "sprach1_options_container";
  
  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const optDiv = document.createElement("div");
    optDiv.className = "sprach1-option-group";
    optDiv.id = `sprach1_opt_group_${opt.id}`;
    optDiv.style.marginBottom = "20px";
    optDiv.style.padding = "10px";
    optDiv.style.backgroundColor = "white";
    optDiv.style.borderRadius = "8px";
    optDiv.style.border = "1px solid #ddd";
    
    const optTitle = document.createElement("div");
    optTitle.innerHTML = `<strong>${opt.id} Optionen</strong>`;
    optTitle.style.marginBottom = "10px";
    optTitle.style.color = "#7c6ce6";
    optDiv.appendChild(optTitle);
    
    const optList = document.createElement("div");
    optList.style.display = "flex";
    optList.style.flexWrap = "wrap";
    optList.style.gap = "15px";
    
    for (let j = 0; j < opt.options.length; j++) {
      const optionLabel = document.createElement("label");
      optionLabel.style.display = "inline-flex";
      optionLabel.style.alignItems = "center";
      optionLabel.style.gap = "5px";
      optionLabel.style.cursor = "pointer";
      optionLabel.style.padding = "5px 10px";
      optionLabel.style.borderRadius = "5px";
      optionLabel.style.backgroundColor = "#f8f9fa";
      optionLabel.style.border = "1px solid #ccc";
      
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `sprach1_q${opt.id}`;
      radio.value = opt.options[j];
      radio.id = `sprach1_opt_${opt.id}_${j}`;
      
      if (sprach1UserAnswers[opt.id] === opt.options[j]) {
        radio.checked = true;
      }
      
      radio.onchange = (function(qId, selectedValue) {
        return function() {
          selectSprach1Option(qId, selectedValue);
        };
      })(opt.id, opt.options[j]);
      
      const optionText = document.createElement("span");
      optionText.textContent = opt.options[j];
      optionText.style.fontSize = "13px";
      
      optionLabel.appendChild(radio);
      optionLabel.appendChild(optionText);
      optList.appendChild(optionLabel);
    }
    
    optDiv.appendChild(optList);
    optionsContainer.appendChild(optDiv);
  }
  
  rightColumn.appendChild(optionsContainer);
  
  twoColumns.appendChild(leftColumn);
  twoColumns.appendChild(rightColumn);
  container.appendChild(twoColumns);
  
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "15px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "25px";
  
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✅ تصحيح";
  checkBtn.className = "check-btn";
  checkBtn.style.padding = "12px 24px";
  checkBtn.style.backgroundColor = "#2c3e66";
  checkBtn.style.color = "white";
  checkBtn.style.border = "none";
  checkBtn.style.borderRadius = "8px";
  checkBtn.style.cursor = "pointer";
  checkBtn.style.fontSize = "16px";
  checkBtn.onclick = checkSprach1Exam;
  buttonContainer.appendChild(checkBtn);
  
  const resetBtn = document.createElement("button");
  resetBtn.innerText = "↺";
  resetBtn.style.padding = "8px 12px";
  resetBtn.style.backgroundColor = "#6c757d";
  resetBtn.style.color = "white";
  resetBtn.style.border = "none";
  resetBtn.style.borderRadius = "6px";
  resetBtn.style.cursor = "pointer";
  resetBtn.style.fontSize = "16px";
  resetBtn.style.fontWeight = "bold";
  resetBtn.onclick = resetSprach1Exam;
  buttonContainer.appendChild(resetBtn);
  
  container.appendChild(buttonContainer);
  
  const resultDiv = document.createElement("div");
  resultDiv.id = "sprach1Result";
  resultDiv.className = "result-box";
  resultDiv.style.display = "none";
  container.appendChild(resultDiv);
}

let sprach1OpenDropdownId = null;

function openSprach1Dropdown(questionId) {
  if (sprach1OpenDropdownId) {
    const oldList = document.getElementById(`sprach1_dropdown_list_${sprach1OpenDropdownId}`);
    if (oldList) oldList.remove();
  }
  
  const btn = document.getElementById(`sprach1_btn_${questionId}`);
  if (!btn) return;
  
  const oldList = document.getElementById(`sprach1_dropdown_list_${questionId}`);
  if (oldList) oldList.remove();
  
  const dropdownList = document.createElement("div");
  dropdownList.id = `sprach1_dropdown_list_${questionId}`;
  dropdownList.style.position = "absolute";
  dropdownList.style.backgroundColor = "white";
  dropdownList.style.border = "1px solid #ccc";
  dropdownList.style.borderRadius = "8px";
  dropdownList.style.padding = "5px 0";
  dropdownList.style.zIndex = "1000";
  dropdownList.style.minWidth = "150px";
  dropdownList.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  
  const optionItem = currentSprach1Data.options.find(opt => opt.id === questionId);
  if (optionItem) {
    for (let i = 0; i < optionItem.options.length; i++) {
      const opt = optionItem.options[i];
      const optDiv = document.createElement("div");
      optDiv.textContent = opt;
      optDiv.style.padding = "8px 12px";
      optDiv.style.cursor = "pointer";
      optDiv.style.transition = "background 0.2s";
      
      optDiv.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "#e8e4ff";
      });
      optDiv.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "white";
      });
      
      optDiv.addEventListener("click", (function(qId, selectedValue) {
        return function() {
          selectSprach1Option(qId, selectedValue);
          dropdownList.remove();
          sprach1OpenDropdownId = null;
        };
      })(questionId, opt));
      
      dropdownList.appendChild(optDiv);
    }
  }
  
  const rect = btn.getBoundingClientRect();
  dropdownList.style.position = "fixed";
  dropdownList.style.top = `${rect.bottom + 5}px`;
  dropdownList.style.left = `${rect.left}px`;
  
  document.body.appendChild(dropdownList);
  sprach1OpenDropdownId = questionId;
  
  setTimeout(() => {
    document.addEventListener("click", function closeDropdown(e) {
      if (!dropdownList.contains(e.target) && e.target !== btn) {
        dropdownList.remove();
        document.removeEventListener("click", closeDropdown);
        sprach1OpenDropdownId = null;
      }
    });
  }, 0);
}

function selectSprach1Option(questionId, selectedValue) {
  sprach1UserAnswers[questionId] = selectedValue;
  
  const btn = document.getElementById(`sprach1_btn_${questionId}`);
  if (btn) {
    btn.textContent = selectedValue;
    btn.style.backgroundColor = "#d4edda";
    btn.style.color = "#155724";
  }
  
  for (let i = 0; i < currentSprach1Data.options.length; i++) {
    const opt = currentSprach1Data.options[i];
    if (opt.id === questionId) {
      for (let j = 0; j < opt.options.length; j++) {
        const radio = document.getElementById(`sprach1_opt_${questionId}_${j}`);
        if (radio && radio.value === selectedValue) {
          radio.checked = true;
        }
      }
      break;
    }
  }
}

function resetSprach1Exam() {
  sprach1UserAnswers = {};
  
  for (let i = 1; i <= currentSprach1Data.options.length; i++) {
    const btn = document.getElementById(`sprach1_btn_${i}`);
    if (btn) {
      btn.textContent = `__(${i})__`;
      btn.style.backgroundColor = "#e0e0e0";
      btn.style.color = "#333";
    }
    
    for (let j = 0; j < currentSprach1Data.options.length; j++) {
      const opt = currentSprach1Data.options[j];
      if (opt.id === i) {
        for (let k = 0; k < opt.options.length; k++) {
          const radio = document.getElementById(`sprach1_opt_${i}_${k}`);
          if (radio) radio.checked = false;
        }
        break;
      }
    }
  }
  
  const resultDiv = document.getElementById("sprach1Result");
  if (resultDiv) resultDiv.style.display = "none";
  
  console.log("✅ تم إعادة تعيين Sprachbausteine Teil 1");
}

function checkSprach1Exam() {
  const options = currentSprach1Data.options;
  let score = 0;
  const total = options.length;
  const pointsPerQuestion = 25 / total;
  
  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const userAnswer = sprach1UserAnswers[opt.id];
    const isCorrect = (userAnswer === opt.options[opt.correct]);
    
    if (isCorrect) {
      score++;
    }
    
    const btn = document.getElementById(`sprach1_btn_${opt.id}`);
    if (btn) {
      if (isCorrect) {
        btn.style.backgroundColor = "#28a745";
        btn.style.color = "white";
      } else {
        btn.style.backgroundColor = "#fef0e0";
        btn.style.color = "#e67e22";
      }
    }
    
    const optGroup = document.getElementById(`sprach1_opt_group_${opt.id}`);
    if (optGroup) {
      if (isCorrect) {
        optGroup.style.backgroundColor = "#d4edda";
        optGroup.style.border = "2px solid #28a745";
      } else {
        optGroup.style.backgroundColor = "#fef0e0";
        optGroup.style.border = "2px solid #e67e22";
      }
    }
    
    const correctAnswer = opt.options[opt.correct];
    const correctIndex = opt.options.indexOf(correctAnswer);
    const correctRadio = document.getElementById(`sprach1_opt_${opt.id}_${correctIndex}`);
    if (correctRadio) {
      const parentLabel = correctRadio.parentElement;
      if (parentLabel && !isCorrect) {
        parentLabel.style.backgroundColor = "#d4edda";
        parentLabel.style.border = "2px solid #28a745";
      }
    }
  }
  
  const finalScore = (score * pointsPerQuestion).toFixed(2);
  const resultDiv = document.getElementById("sprach1Result");
  if (resultDiv) {
    resultDiv.innerHTML = `النتيجة: ${finalScore} / 25`;
    resultDiv.style.display = "block";
  }
  
  if (finalScore >= 20) {
    resultDiv.style.backgroundColor = "#d4edda";
    resultDiv.style.color = "#155724";
  } else if (finalScore >= 15) {
    resultDiv.style.backgroundColor = "#fff3cd";
    resultDiv.style.color = "#856404";
  } else {
    resultDiv.style.backgroundColor = "#f8d7da";
    resultDiv.style.color = "#721c24";
  }
  
  // حفظ النتيجة
  if (typeof window.saveExamResultGlobal === "function") {
    window.saveExamResultGlobal(currentSprach1Data.skill || "sprach1", currentSprach1Data.id || 1, parseFloat(finalScore));
  }
}

// ========== نظام True/False (Hören Teil 1,2,3) ==========
window.buildTrueFalseExam = function(container, questions, note) {
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    console.error("❌ خطأ: لا توجد أسئلة في هذا الامتحان");
    if (container) {
      container.innerHTML = '<div style="text-align:center; color:#ff6b6b; padding:30px; background:#fff; border-radius:12px;">⚠️ حدث خطأ في تحميل الامتحان. يرجى المحاولة مرة أخرى.</div>';
    }
    return;
  }
  
  container.innerHTML = '';
  
  if (window._trueFalseUserAnswers) {
    delete window._trueFalseUserAnswers;
  }
  window._trueFalseUserAnswers = {};
  
  if (note) {
    const noteDiv = document.createElement('div');
    noteDiv.style.backgroundColor = '#fff3cd';
    noteDiv.style.color = '#856404';
    noteDiv.style.padding = '12px 15px';
    noteDiv.style.borderRadius = '8px';
    noteDiv.style.marginBottom = '20px';
    noteDiv.style.border = '1px solid #ffeeba';
    noteDiv.style.fontSize = '14px';
    noteDiv.style.fontWeight = 'bold';
    noteDiv.innerHTML = `📌 <strong>ملاحظة:</strong> ${note}`;
    container.appendChild(noteDiv);
  }
  
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const div = document.createElement('div');
    div.className = 'question-card';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '15px';
    div.style.marginBottom = '12px';
    div.style.flexWrap = 'wrap';
    div.style.padding = '12px';
    div.style.border = '1px solid #ddd';
    div.style.borderRadius = '10px';
    div.style.backgroundColor = '#f9f9f9';
    div.id = `truefalse_card_${i}`;
    
    const labelTrue = document.createElement('label');
    labelTrue.className = 'option-label';
    labelTrue.style.display = 'inline-flex';
    labelTrue.style.alignItems = 'center';
    labelTrue.style.gap = '5px';
    labelTrue.style.cursor = 'pointer';
    labelTrue.style.marginRight = '15px';
    labelTrue.style.padding = '5px 10px';
    labelTrue.style.border = '1px solid #ccc';
    labelTrue.style.borderRadius = '5px';
    labelTrue.style.backgroundColor = 'white';
    
    const radioTrue = document.createElement('input');
    radioTrue.type = 'radio';
    radioTrue.name = `q${i}`;
    radioTrue.value = 'true';
    radioTrue.id = `q${i}_true`;
    
    radioTrue.onchange = (function(idx) {
      return function() {
        window._trueFalseUserAnswers[idx] = true;
      };
    })(i);
    
    labelTrue.appendChild(radioTrue);
    labelTrue.appendChild(document.createTextNode(' Richtig'));
    
    const labelFalse = document.createElement('label');
    labelFalse.className = 'option-label';
    labelFalse.style.display = 'inline-flex';
    labelFalse.style.alignItems = 'center';
    labelFalse.style.gap = '5px';
    labelFalse.style.cursor = 'pointer';
    labelFalse.style.padding = '5px 10px';
    labelFalse.style.border = '1px solid #ccc';
    labelFalse.style.borderRadius = '5px';
    labelFalse.style.backgroundColor = 'white';
    
    const radioFalse = document.createElement('input');
    radioFalse.type = 'radio';
    radioFalse.name = `q${i}`;
    radioFalse.value = 'false';
    radioFalse.id = `q${i}_false`;
    
    radioFalse.onchange = (function(idx) {
      return function() {
        window._trueFalseUserAnswers[idx] = false;
      };
    })(i);
    
    labelFalse.appendChild(radioFalse);
    labelFalse.appendChild(document.createTextNode(' Falsch'));
    
    const textSpan = document.createElement('span');
    textSpan.innerHTML = `<strong>${i + 1}</strong> ${q.text}`;
    textSpan.style.flex = '1';
    textSpan.style.minWidth = '200px';
    
    div.appendChild(labelTrue);
    div.appendChild(labelFalse);
    div.appendChild(textSpan);
    
    container.appendChild(div);
  }
  
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "15px";
  buttonContainer.style.justifyContent = "space-between";
  buttonContainer.style.alignItems = "center";
  buttonContainer.style.marginTop = "25px";
  
  const correctNumbersContainer = document.createElement('div');
  correctNumbersContainer.id = "truefalseCorrectNumbers";
  correctNumbersContainer.style.backgroundColor = "#e3f2fd";
  correctNumbersContainer.style.color = "#0d47a1";
  correctNumbersContainer.style.padding = "10px 15px";
  correctNumbersContainer.style.borderRadius = "8px";
  correctNumbersContainer.style.fontWeight = "bold";
  correctNumbersContainer.style.fontSize = "14px";
  correctNumbersContainer.style.border = "1px solid #90caf9";
  correctNumbersContainer.style.display = "none";
  correctNumbersContainer.innerHTML = '▸ : ';
  
  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.display = 'flex';
  buttonsDiv.style.gap = '15px';
  
  const checkBtn = document.createElement('button');
  checkBtn.innerText = '📝 Prüfen';
  checkBtn.className = 'check-btn';
  checkBtn.style.padding = '12px 24px';
  checkBtn.style.backgroundColor = '#2c3e66';
  checkBtn.style.color = 'white';
  checkBtn.style.border = 'none';
  checkBtn.style.borderRadius = '8px';
  checkBtn.style.cursor = 'pointer';
  checkBtn.style.fontSize = '16px';
  
  checkBtn.onclick = () => {
    checkTrueFalseExam(container, questions, window._trueFalseUserAnswers, correctNumbersContainer);
  };
  
  const resetBtn = document.createElement('button');
  resetBtn.innerText = '↺';
  resetBtn.style.padding = '8px 12px';
  resetBtn.style.backgroundColor = '#6c757d';
  resetBtn.style.color = 'white';
  resetBtn.style.border = 'none';
  resetBtn.style.borderRadius = '6px';
  resetBtn.style.cursor = 'pointer';
  resetBtn.style.fontSize = '16px';
  resetBtn.style.fontWeight = 'bold';
  
  resetBtn.onclick = function() {
    for (let key in window._trueFalseUserAnswers) {
      delete window._trueFalseUserAnswers[key];
    }
    
    const allRadios = container.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
      radio.checked = false;
    });
    
    const cards = container.querySelectorAll('.question-card');
    cards.forEach(card => {
      card.classList.remove('correct-answer-card', 'wrong-answer-card');
    });
    
    const allMessages = container.querySelectorAll('.correct-message');
    allMessages.forEach(msg => msg.remove());
    
    const optionLabels = container.querySelectorAll('.option-label');
    optionLabels.forEach(label => {
      label.style.backgroundColor = 'white';
      label.style.border = '1px solid #ccc';
    });
    
    correctNumbersContainer.style.display = 'none';
    
    const resultDiv = document.getElementById('truefalseResult');
    if (resultDiv) {
      resultDiv.style.display = 'none';
      resultDiv.innerHTML = '';
    }
  };
  
  buttonsDiv.appendChild(checkBtn);
  buttonsDiv.appendChild(resetBtn);
  
  buttonContainer.appendChild(correctNumbersContainer);
  buttonContainer.appendChild(buttonsDiv);
  container.appendChild(buttonContainer);
  
  // ✅ إنشاء resultDiv بشكل صحيح قبل التصحيح
  let resultDiv = document.getElementById('truefalseResult');
  if (!resultDiv) {
    resultDiv = document.createElement('div');
    resultDiv.id = 'truefalseResult';
    resultDiv.className = 'result-box';
    resultDiv.style.display = 'none';
    container.appendChild(resultDiv);
  }
};
function checkTrueFalseExam(container, questions, answers, correctNumbersContainer) {
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    console.error("❌ خطأ: لا توجد أسئلة للتصحيح");
    // ✅ البحث عن resultDiv داخل container بدلاً من document
    let resultDiv = container.querySelector('#truefalseResult');
    if (!resultDiv) {
      resultDiv = document.createElement('div');
      resultDiv.id = 'truefalseResult';
      resultDiv.className = 'result-box';
      container.appendChild(resultDiv);
    }
    resultDiv.innerHTML = "⚠️ لا توجد أسئلة في هذا الامتحان";
    resultDiv.style.display = 'block';
    return;
  }
  
  let score = 0;
  const total = questions.length;
  const pointsPerQuestion = 25 / total;
  
  const cards = container.querySelectorAll('.question-card');
  
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const card = cards[i];
    const userAnswer = answers[i];
    const isCorrect = (userAnswer === q.correct);
    
    if (!card) continue;
    
    card.classList.remove('correct-answer-card', 'wrong-answer-card');
    const oldMsg = card.querySelector('.correct-message');
    if (oldMsg) oldMsg.remove();
    
    if (isCorrect && userAnswer !== undefined) {
      score++;
      card.classList.add('correct-answer-card');
    } else {
      card.classList.add('wrong-answer-card');
      
      const correctMsg = document.createElement('div');
      correctMsg.className = 'correct-message';
      correctMsg.style.marginTop = '10px';
      correctMsg.style.fontSize = '14px';
      correctMsg.style.fontWeight = 'bold';
      correctMsg.style.color = '#28a745';
      correctMsg.innerHTML = `✅ : ${q.correct ? 'Richtig' : 'Falsch'}`;
      card.appendChild(correctMsg);
    }
    
    const radios = card.querySelectorAll('input[type="radio"]');
    for (let r = 0; r < radios.length; r++) {
      const radio = radios[r];
      const radioValue = radio.value === 'true';
      const parentLabel = radio.parentElement;
      
      if (isCorrect && userAnswer !== undefined) {
        if (radio.checked) {
          parentLabel.style.backgroundColor = '#d4edda';
          parentLabel.style.border = '2px solid #28a745';
        }
      } else {
        if (radio.checked) {
          parentLabel.style.backgroundColor = '#fef0e0';
          parentLabel.style.border = '2px solid #e67e22';
        }
        if (radioValue === q.correct) {
          parentLabel.style.backgroundColor = '#d4edda';
          parentLabel.style.border = '2px solid #28a745';
        }
      }
    }
  }
  
  if (correctNumbersContainer) {
    correctNumbersContainer.style.display = 'block';
    let originalCorrectIndices = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correct === true) {
        originalCorrectIndices.push(i + 1);
      }
    }
    if (originalCorrectIndices.length > 0) {
      correctNumbersContainer.innerHTML = `▸ الإجابات الصحيحة في الامتحان: ${originalCorrectIndices.join(" - ")}`;
    } else {
      correctNumbersContainer.innerHTML = "▸ لا توجد إجابات صحيحة في هذا الامتحان";
    }
  }
  
  const finalScore = (score * pointsPerQuestion).toFixed(2);
  
  // ✅ البحث عن resultDiv داخل container فقط
  let resultDiv = container.querySelector('#truefalseResult');
  if (!resultDiv) {
    resultDiv = document.createElement('div');
    resultDiv.id = 'truefalseResult';
    resultDiv.className = 'result-box';
    container.appendChild(resultDiv);
  }
  
  resultDiv.innerHTML = `النتيجة: ${finalScore} / 25`;
  resultDiv.style.display = 'block';
  resultDiv.style.visibility = 'visible';
  resultDiv.style.opacity = '1';
  
  if (finalScore >= 20) {
    resultDiv.style.backgroundColor = '#28a745';
    resultDiv.style.color = 'white';
  } else if (finalScore >= 15) {
    resultDiv.style.backgroundColor = '#ffc107';
    resultDiv.style.color = '#333';
  } else {
    resultDiv.style.backgroundColor = '#dc3545';
    resultDiv.style.color = 'white';
  }
  
  // حفظ النتيجة
  if (typeof window.saveExamResultGlobal === "function") {
    const skill = container.id || "hoeren";
    const examId = window.currentExamId || 1;
    window.saveExamResultGlobal(skill, examId, parseFloat(finalScore));
  }
  
  // التمرير إلى النتيجة
  setTimeout(() => {
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ========== نظام Teil 1 (Lesen Teil 1 - Matching) ==========
let currentMatchingExamData = null;
let matchingSelectedAnswers = {};
let matchingAvailableOptions = [];

window.loadMatchingExam = function(examData) {
  console.log("🟢 loadMatchingExam", examData.title);
  currentMatchingExamData = examData;
  matchingSelectedAnswers = {};
  matchingAvailableOptions = [...examData.sharedOptions];
  renderMatchingQuestions();
};

function renderMatchingQuestions() {
  const container = document.getElementById("teil1");
  if (!container) return;
  container.innerHTML = "";
  
  const questions = currentMatchingExamData.questions;
  
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `matching_q_${i}`;
    
    const questionText = document.createElement("div");
    questionText.className = "question-text";
    questionText.innerHTML = `<strong>${i+1}. ${q.text}</strong>`;
    card.appendChild(questionText);
    
    const select = document.createElement("select");
    select.style.width = "100%";
    select.style.padding = "8px";
    select.style.marginTop = "10px";
    select.style.borderRadius = "8px";
    select.style.border = "1px solid #ccc";
    
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- اختر الإجابة --";
    select.appendChild(defaultOption);
    
    for (let j = 0; j < matchingAvailableOptions.length; j++) {
      const option = document.createElement("option");
      option.value = matchingAvailableOptions[j];
      option.textContent = matchingAvailableOptions[j];
      select.appendChild(option);
    }
    
    select.onchange = (function(idx) {
      return function() {
        const oldVal = matchingSelectedAnswers[idx];
        if (oldVal) matchingAvailableOptions.push(oldVal);
        const newVal = select.value;
        if (newVal) {
          const index = matchingAvailableOptions.indexOf(newVal);
          if (index !== -1) matchingAvailableOptions.splice(index, 1);
          matchingSelectedAnswers[idx] = newVal;
        } else {
          delete matchingSelectedAnswers[idx];
        }
        // تحديث كل القوائم
        document.querySelectorAll('#teil1 select').forEach((sel, sidx) => {
          const currentVal = sel.value;
          sel.innerHTML = "";
          const optDefault = document.createElement("option");
          optDefault.value = "";
          optDefault.textContent = "-- اختر الإجابة --";
          sel.appendChild(optDefault);
          for (let k = 0; k < matchingAvailableOptions.length; k++) {
            const opt = document.createElement("option");
            opt.value = matchingAvailableOptions[k];
            opt.textContent = matchingAvailableOptions[k];
            if (currentVal === matchingAvailableOptions[k]) opt.selected = true;
            sel.appendChild(opt);
          }
          if (currentVal && !matchingAvailableOptions.includes(currentVal)) {
            const hiddenOpt = document.createElement("option");
            hiddenOpt.value = currentVal;
            hiddenOpt.textContent = currentVal;
            hiddenOpt.selected = true;
            sel.appendChild(hiddenOpt);
          }
        });
      };
    })(i);
    
    card.appendChild(select);
    container.appendChild(card);
  }
  
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "15px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "20px";
  
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✅ تصحيح";
  checkBtn.className = "check-btn";
  checkBtn.style.padding = "12px 24px";
  checkBtn.style.backgroundColor = "#2c3e66";
  checkBtn.style.color = "white";
  checkBtn.style.border = "none";
  checkBtn.style.borderRadius = "8px";
  checkBtn.style.fontSize = "16px";
  checkBtn.onclick = () => {
    checkMatchingExam();
  };
  buttonContainer.appendChild(checkBtn);
  
  const resetBtn = document.createElement("button");
  resetBtn.innerText = "↺";
  resetBtn.style.padding = "8px 12px";
  resetBtn.style.backgroundColor = "#6c757d";
  resetBtn.style.color = "white";
  resetBtn.style.border = "none";
  resetBtn.style.borderRadius = "6px";
  resetBtn.style.fontSize = "16px";
  resetBtn.style.fontWeight = "bold";
  resetBtn.onclick = () => {
    matchingSelectedAnswers = {};
    matchingAvailableOptions = [...currentMatchingExamData.sharedOptions];
    renderMatchingQuestions();
  };
  buttonContainer.appendChild(resetBtn);
  
  container.appendChild(buttonContainer);
  
  const resultDiv = document.createElement("div");
  resultDiv.id = "matchingResult";
  resultDiv.className = "result-box";
  resultDiv.style.display = "none";
  container.appendChild(resultDiv);
}

function checkMatchingExam() {
  const questions = currentMatchingExamData.questions;
  let score = 0;
  const total = questions.length;
  const pointsPerQuestion = 25 / total;
  
  for (let i = 0; i < questions.length; i++) {
    const card = document.getElementById(`matching_q_${i}`);
    const userAnswer = matchingSelectedAnswers[i];
    const correctAnswer = currentMatchingExamData.sharedOptions[questions[i].correct];
    const isCorrect = (userAnswer === correctAnswer);
    
    if (card) {
      card.classList.remove("correct-answer-card", "wrong-answer-card");
      const oldMsg = card.querySelector(".correct-message");
      if (oldMsg) oldMsg.remove();
      
      if (isCorrect && userAnswer) {
        score++;
        card.classList.add("correct-answer-card");
      } else {
        card.classList.add("wrong-answer-card");
        
        const correctMsg = document.createElement("div");
        correctMsg.className = "correct-message";
        correctMsg.style.marginTop = "10px";
        correctMsg.style.fontSize = "13px";
        correctMsg.style.color = "#28a745";
        correctMsg.innerHTML = `✅ : ${correctAnswer}`;
        card.appendChild(correctMsg);
      }
      
      const selectElem = card.querySelector('select');
      if (selectElem) {
        if (isCorrect && userAnswer) {
          selectElem.style.backgroundColor = "#d4edda";
          selectElem.style.border = "2px solid #28a745";
        } else if (userAnswer) {
          selectElem.style.backgroundColor = "#fef0e0";
          selectElem.style.border = "2px solid #e67e22";
        } else {
          selectElem.style.backgroundColor = "#fef0e0";
          selectElem.style.border = "2px solid #e67e22";
        }
      }
    }
  }
  
  const finalScore = (score * pointsPerQuestion).toFixed(2);
  const resultDiv = document.getElementById("matchingResult");
  if (resultDiv) {
    resultDiv.innerHTML = `النتيجة: ${finalScore} / 25`;
    resultDiv.style.display = "block";
  }
  
  if (finalScore >= 20) {
    resultDiv.style.backgroundColor = "#d4edda";
    resultDiv.style.color = "#155724";
  } else if (finalScore >= 15) {
    resultDiv.style.backgroundColor = "#fff3cd";
    resultDiv.style.color = "#856404";
  } else {
    resultDiv.style.backgroundColor = "#f8d7da";
    resultDiv.style.color = "#721c24";
  }
  
  // حفظ النتيجة
  if (typeof window.saveExamResultGlobal === "function") {
    window.saveExamResultGlobal("lesen1", currentMatchingExamData.id || 1, parseFloat(finalScore));
  }
}

// ========== نظام Teil 2 (Lesen Teil 2) ==========
let currentTeil2Data = null;
let teil2UserAnswers = {};

window.loadTeil2Exam = function(examData) {
  console.log("🟢 loadTeil2Exam", examData.title);
  currentTeil2Data = examData;
  teil2UserAnswers = {};
  renderTeil2Exam();
};

function renderTeil2Exam() {
  const container = document.getElementById("teil2");
  if (!container) return;
  container.innerHTML = "";
  
  const twoColumns = document.createElement("div");
  twoColumns.style.display = "flex";
  twoColumns.style.gap = "30px";
  twoColumns.style.flexWrap = "wrap";
  
  const textColumn = document.createElement("div");
  textColumn.style.flex = "1";
  textColumn.style.minWidth = "300px";
  textColumn.style.backgroundColor = "#f9f9f9";
  textColumn.style.padding = "20px";
  textColumn.style.borderRadius = "12px";
  textColumn.style.border = "1px solid #ddd";
  textColumn.style.maxHeight = "600px";
  textColumn.style.overflowY = "auto";
  
  const textTitle = document.createElement("h3");
  textTitle.innerHTML = "Text";
  textTitle.style.marginTop = "0";
  textTitle.style.color = "#2c3e66";
  textColumn.appendChild(textTitle);
  
  const textContent = document.createElement("div");
  textContent.innerHTML = currentTeil2Data.text;
  textContent.style.lineHeight = "1.7";
  textContent.style.fontSize = "14px";
  textContent.style.textAlign = "justify";
  textColumn.appendChild(textContent);
  
  const questionsColumn = document.createElement("div");
  questionsColumn.style.flex = "1";
  questionsColumn.style.minWidth = "300px";
  questionsColumn.style.backgroundColor = "#fff";
  questionsColumn.style.padding = "20px";
  questionsColumn.style.borderRadius = "12px";
  questionsColumn.style.border = "1px solid #ddd";
  
  const questionsTitle = document.createElement("h3");
  questionsTitle.innerHTML = "Fragen";
  questionsTitle.style.marginTop = "0";
  questionsTitle.style.color = "#2c3e66";
  questionsColumn.appendChild(questionsTitle);
  
  const questionsContainer = document.createElement("div");
  questionsContainer.id = "teil2_questions_container";
  
  const questions = currentTeil2Data.questions;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = "teil2_q_" + i;
    card.style.marginBottom = "20px";
    card.style.padding = "15px";
    card.style.border = "1px solid #e0e0e0";
    card.style.borderRadius = "10px";
    card.style.backgroundColor = "#fafafa";
    
    const questionText = document.createElement("div");
    questionText.className = "question-text";
    questionText.innerHTML = `<strong>${i+1}. ${q.text}</strong>`;
    questionText.style.marginBottom = "12px";
    card.appendChild(questionText);
    
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options-container";
    optionsDiv.style.display = "flex";
    optionsDiv.style.flexDirection = "column";
    optionsDiv.style.gap = "8px";
    
    for (let j = 0; j < q.options.length; j++) {
      const label = document.createElement("label");
      label.className = "option-label";
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "10px";
      label.style.cursor = "pointer";
      label.style.padding = "8px 12px";
      label.style.borderRadius = "8px";
      
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `teil2_q${i}`;
      radio.value = j;
      radio.style.cursor = "pointer";
      radio.onchange = (function(qIdx, ansIdx) { 
        return function() { 
          teil2UserAnswers[qIdx] = ansIdx; 
          const cardElem = document.getElementById(`teil2_q_${qIdx}`);
          if (cardElem) cardElem.classList.remove("correct-answer-card", "wrong-answer-card");
        }; 
      })(i, j);
      
      const optionText = document.createElement("span");
      optionText.innerHTML = q.options[j];
      
      label.appendChild(radio);
      label.appendChild(optionText);
      optionsDiv.appendChild(label);
    }
    card.appendChild(optionsDiv);
    questionsContainer.appendChild(card);
  }
  
  questionsColumn.appendChild(questionsContainer);
  
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "15px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "20px";
  
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✅ تصحيح";
  checkBtn.className = "check-btn";
  checkBtn.style.padding = "12px 24px";
  checkBtn.style.backgroundColor = "#2c3e66";
  checkBtn.style.color = "white";
  checkBtn.style.border = "none";
  checkBtn.style.borderRadius = "8px";
  checkBtn.style.fontSize = "16px";
  checkBtn.onclick = checkTeil2Exam;
  buttonContainer.appendChild(checkBtn);
  
  const resetBtn = document.createElement("button");
  resetBtn.innerText = "↺";
  resetBtn.style.padding = "8px 12px";
  resetBtn.style.backgroundColor = "#6c757d";
  resetBtn.style.color = "white";
  resetBtn.style.border = "none";
  resetBtn.style.borderRadius = "6px";
  resetBtn.style.fontSize = "16px";
  resetBtn.style.fontWeight = "bold";
  resetBtn.onclick = function() {
    teil2UserAnswers = {};
    questionsColumn.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    for (let i = 0; i < questions.length; i++) {
      const card = document.getElementById(`teil2_q_${i}`);
      if (card) {
        card.classList.remove("correct-answer-card", "wrong-answer-card");
        card.style.backgroundColor = "#fafafa";
        card.style.border = "1px solid #e0e0e0";
      }
      const oldMsg = document.querySelector(`#teil2_q_${i} .correct-message`);
      if (oldMsg) oldMsg.remove();
      const optionLabels = document.querySelectorAll(`#teil2_q_${i} .option-label`);
      optionLabels.forEach(label => {
        label.style.backgroundColor = "";
        label.style.border = "";
      });
    }
    const resultDiv = document.getElementById("teil2Result");
    if (resultDiv) {
      resultDiv.style.display = "none";
      resultDiv.innerHTML = "";
    }
  };
  buttonContainer.appendChild(resetBtn);
  
  questionsColumn.appendChild(buttonContainer);
  
  const resultDiv = document.createElement("div");
  resultDiv.id = "teil2Result";
  resultDiv.className = "result-box";
  resultDiv.style.display = "none";
  questionsColumn.appendChild(resultDiv);
  
  twoColumns.appendChild(textColumn);
  twoColumns.appendChild(questionsColumn);
  container.appendChild(twoColumns);
}

function checkTeil2Exam() {
  const questions = currentTeil2Data.questions;
  let score = 0;
  const total = questions.length;
  const pointsPerQuestion = 25 / total;
  
  for (let i = 0; i < total; i++) {
    const q = questions[i];
    const card = document.getElementById(`teil2_q_${i}`);
    const userAnswer = teil2UserAnswers[i];
    const isCorrect = (userAnswer === q.correct);
    
    if (card) {
      card.classList.remove("correct-answer-card", "wrong-answer-card");
      const oldMsg = card.querySelector(".correct-message");
      if (oldMsg) oldMsg.remove();
      
      if (isCorrect && userAnswer !== undefined) {
        score++;
        card.classList.add("correct-answer-card");
      } else {
        card.classList.add("wrong-answer-card");
        const correctMsg = document.createElement("div");
        correctMsg.className = "correct-message";
        correctMsg.style.color = "#28a745";
        correctMsg.style.marginTop = "10px";
        correctMsg.style.fontSize = "13px";
        correctMsg.innerHTML = `✅ : ${q.options[q.correct]}`;
        card.appendChild(correctMsg);
      }
      
      const radios = card.querySelectorAll('.option-label');
      for (let r = 0; r < radios.length; r++) {
        const radioInput = radios[r].querySelector('input');
        if (radioInput) {
          const radioValue = parseInt(radioInput.value);
          if (isCorrect && userAnswer !== undefined) {
            if (radioInput.checked) {
              radios[r].style.backgroundColor = "#d4edda";
              radios[r].style.border = "2px solid #28a745";
            }
          } else {
            if (radioInput.checked) {
              radios[r].style.backgroundColor = "#fef0e0";
              radios[r].style.border = "2px solid #e67e22";
            }
            if (radioValue === q.correct) {
              radios[r].style.backgroundColor = "#d4edda";
              radios[r].style.border = "2px solid #28a745";
            }
          }
        }
      }
    }
  }
  
  const finalScore = (score * pointsPerQuestion).toFixed(2);
  const resultDiv = document.getElementById("teil2Result");
  if (resultDiv) {
    resultDiv.innerHTML = `النتيجة: ${finalScore} / 25`;
    resultDiv.style.display = "block";
  }
  
  if (finalScore >= 20) {
    resultDiv.style.backgroundColor = "#d4edda";
    resultDiv.style.color = "#155724";
  } else if (finalScore >= 15) {
    resultDiv.style.backgroundColor = "#fff3cd";
    resultDiv.style.color = "#856404";
  } else {
    resultDiv.style.backgroundColor = "#f8d7da";
    resultDiv.style.color = "#721c24";
  }
  
  // حفظ النتيجة
  if (typeof window.saveExamResultGlobal === "function") {
    window.saveExamResultGlobal("lesen2", currentTeil2Data.id || 1, parseFloat(finalScore));
  }
}

// ========== نظام Teil 3 (Lesen Teil 3) - الطريقتان معًا ==========
let currentTeil3Data = null;
let teil3UserAnswers = {};      // { itemIndex: situationIndex }
let teil3SelectedItem = null;   // للربط: الفقرة المختارة أولاً
let teil3SelectedSit = null;    // للربط: العنوان المختار أولاً

window.loadTeil3Exam = function(examData) {
  console.log("🟢 loadTeil3Exam", examData.title);
  currentTeil3Data = examData;
  teil3UserAnswers = {};
  teil3SelectedItem = null;
  teil3SelectedSit = null;
  renderTeil3Exam();
};

// دالة تحديث قائمة الـ select options بناءً على الإجابات المستخدمة
function updateTeil3SelectOptions() {
  const items = currentTeil3Data.items;
  const situations = currentTeil3Data.situations;
  
  // جمع العناوين المستخدمة (فقط التي لها إجابة حقيقية، وليست none)
  const usedSituations = new Set();
  for (let key in teil3UserAnswers) {
    const val = teil3UserAnswers[key];
    if (val !== undefined && val !== null && val !== "" && val !== "none") {
      usedSituations.add(val);
    }
  }
  
  // تحديث كل select
  for (let i = 0; i < items.length; i++) {
    const select = document.getElementById(`teil3_select_${i}`);
    if (!select) continue;
    
    const currentAnswer = teil3UserAnswers[i];
    const isNoneAnswer = (currentAnswer === "none");
    
    select.innerHTML = "";
    
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- اختر العنوان --";
    select.appendChild(defaultOption);
    
    const noTitleOption = document.createElement("option");
    noTitleOption.value = "none";
    noTitleOption.textContent = "⚠️ هذه الفقرة لا يوجد لها عنوان";
    select.appendChild(noTitleOption);
    
    for (let s = 0; s < situations.length; s++) {
      // إذا كان العنوان مستخدمًا بواسطة فقرة أخرى، لا نضيفه للخيارات
      if (usedSituations.has(s) && currentAnswer !== s) {
        continue;
      }
      const option = document.createElement("option");
      option.value = s;
      option.textContent = `${String.fromCharCode(97+s)}. ${situations[s]}`;
      select.appendChild(option);
    }
    
    // استعادة القيمة الحالية
    if (isNoneAnswer) {
      select.value = "none";
    } else if (currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== "") {
      if (!usedSituations.has(currentAnswer) || currentAnswer !== undefined) {
        select.value = currentAnswer;
      }
    }
  }
}

// دالة تحديث ألوان القائمة اليمنى (العناوين) - لون رمادي فاتح بعد الربط
function updateTeil3RightSideColors() {
  const items = currentTeil3Data.items;
  const situations = currentTeil3Data.situations;
  
  for (let i = 0; i < situations.length; i++) {
    const sitDiv = document.getElementById(`teil3_sit_${i}`);
    if (!sitDiv) continue;
    
    let isUsed = false;
    for (let j = 0; j < items.length; j++) {
      const answer = teil3UserAnswers[j];
      if (answer !== undefined && answer !== null && answer !== "" && answer !== "none" && answer === i) {
        isUsed = true;
        break;
      }
    }
    
    if (isUsed) {
      // بعد الربط: رمادي فاتح جدًا
      sitDiv.style.backgroundColor = "#e9ecef";
      sitDiv.style.border = "1px solid #adb5bd";
      sitDiv.style.color = "#212529";
      sitDiv.classList.add('used');
    } else {
      // غير مستخدم
      if (teil3SelectedSit !== i) {
        sitDiv.style.backgroundColor = "white";
        sitDiv.style.border = "1px solid #ddd";
        sitDiv.style.color = "#212529";
        sitDiv.classList.remove('used');
      }
    }
  }
}

// دالة تحديث حالة الفقرة (الألوان) - نفس لون العنوان بعد الربط
function updateTeil3CardStyle(idx) {
  const card = document.getElementById(`teil3_card_${idx}`);
  const answer = teil3UserAnswers[idx];
  
  if (answer !== undefined && answer !== null && answer !== "") {
    // بعد الربط: نفس لون العنوان (رمادي فاتح)
    card.style.backgroundColor = "#e9ecef";
    card.style.border = "1px solid #adb5bd";
  } else if (teil3SelectedItem === idx) {
    // ✅ محددة حاليًا: أزرق فاتح جدًا (مريح للعين)
    card.style.backgroundColor = "#e0f2fe";
    card.style.border = "1px solid #7dd3fc";
  } else {
    // افتراضي
    card.style.backgroundColor = "#fafafa";
    card.style.border = "1px solid #e0e0e0";
  }
}

function clearTeil3ItemSelection() {
  if (teil3SelectedItem !== null) {
    updateTeil3CardStyle(teil3SelectedItem);
    teil3SelectedItem = null;
  }
}

function clearTeil3SituationSelection() {
  if (teil3SelectedSit !== null) {
    const sitDiv = document.getElementById(`teil3_sit_${teil3SelectedSit}`);
    if (sitDiv && !sitDiv.classList.contains('used')) {
      sitDiv.style.backgroundColor = "white";
      sitDiv.style.border = "1px solid #ddd";
    }
    teil3SelectedSit = null;
  }
}

function renderTeil3Exam() {
  const container = document.getElementById("teil3");
  if (!container) return;
  container.innerHTML = "";
  
  const items = currentTeil3Data.items;
  const situations = currentTeil3Data.situations;
  
  const twoColumns = document.createElement("div");
  twoColumns.style.display = "flex";
  twoColumns.style.gap = "30px";
  twoColumns.style.flexWrap = "wrap";
  
  const leftColumn = document.createElement("div");
  leftColumn.style.flex = "2";
  leftColumn.style.minWidth = "500px";
  
  const leftTitle = document.createElement("h3");
  leftTitle.innerHTML = "Anzeigen";
  leftTitle.style.marginTop = "0";
  leftTitle.style.color = "#2c3e66";
  leftTitle.style.marginBottom = "15px";
  leftColumn.appendChild(leftTitle);
  
  const itemsGrid = document.createElement("div");
  itemsGrid.style.display = "grid";
  itemsGrid.style.gridTemplateColumns = "1fr 1fr";
  itemsGrid.style.gap = "20px";
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `teil3_card_${i}`;
    card.style.padding = "15px";
    card.style.border = "1px solid #e0e0e0";
    card.style.borderRadius = "12px";
    card.style.backgroundColor = "#fafafa";
    card.style.transition = "all 0.2s";
    card.style.cursor = "pointer";
    card.setAttribute("data-item-index", i);
    
    const itemTitle = document.createElement("div");
    itemTitle.style.fontWeight = "bold";
    itemTitle.style.fontSize = "16px";
    itemTitle.style.color = "#2c3e66";
    itemTitle.style.marginBottom = "10px";
    itemTitle.innerHTML = `Anzeige ${String.fromCharCode(65+i)}`;
    card.appendChild(itemTitle);
    
    const itemText = document.createElement("div");
    itemText.style.fontSize = "13px";
    itemText.style.lineHeight = "1.5";
    itemText.style.marginBottom = "12px";
    itemText.style.color = "#555";
    itemText.innerHTML = item.text;
    card.appendChild(itemText);
    
    // ✅ الطريقة الأصلية: Select dropdown
    const select = document.createElement("select");
    select.className = "teil3-original-select";
    select.style.width = "100%";
    select.style.padding = "8px";
    select.style.marginTop = "10px";
    select.style.borderRadius = "8px";
    select.style.border = "1px solid #ccc";
    select.id = `teil3_select_${i}`;
    
    // ✅ بداية فارغة تمامًا - لا اختيار مسبق
    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- اختر العنوان --";
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    
    const noTitleOption = document.createElement("option");
    noTitleOption.value = "none";
    noTitleOption.textContent = "⚠️ هذه الفقرة لا يوجد لها عنوان";
    select.appendChild(noTitleOption);
    
    for (let s = 0; s < situations.length; s++) {
      const option = document.createElement("option");
      option.value = s;
      option.textContent = `${String.fromCharCode(97+s)}. ${situations[s]}`;
      select.appendChild(option);
    }
    
    select.onchange = (function(idx) {
      return function() {
        let val = select.value;
        
        if (val === "none") {
          teil3UserAnswers[idx] = "none";
        } else if (val !== "") {
          teil3UserAnswers[idx] = parseInt(val);
        } else {
          delete teil3UserAnswers[idx];
        }
        
        // تحديث القوائم والألوان
        updateTeil3SelectOptions();
        updateTeil3RightSideColors();
        updateTeil3CardStyle(idx);
        
        // إلغاء أي تحديدات نشطة
        clearTeil3ItemSelection();
        clearTeil3SituationSelection();
      };
    })(i);
    
    card.appendChild(select);
    
    // ✅ الطريقة الجديدة: النقر على الفقرة
    card.onclick = (function(idx) {
      return function(e) {
        e.stopPropagation();
        if (e.target.tagName === 'SELECT') return;
        
        const currentAnswer = teil3UserAnswers[idx];
        
        // إذا كانت الفقرة مرتبطة بالفعل (بأي إجابة بما فيها "none")، قم بإلغاء الربط
        if (currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== "") {
          delete teil3UserAnswers[idx];
          
          // تحديث الـ select
          const selectElem = document.getElementById(`teil3_select_${idx}`);
          if (selectElem) selectElem.selectedIndex = 0;
          
          // تحديث القوائم والألوان
          updateTeil3SelectOptions();
          updateTeil3RightSideColors();
          updateTeil3CardStyle(idx);
          
          // إلغاء التحديدات النشطة
          clearTeil3ItemSelection();
          clearTeil3SituationSelection();
          return;
        }
        
        // إذا كان هناك عنوان مختار مسبقًا
        if (teil3SelectedSit !== null) {
          teil3UserAnswers[idx] = teil3SelectedSit;
          
          // تحديث الـ select
          const selectElem = document.getElementById(`teil3_select_${idx}`);
          if (selectElem) selectElem.value = teil3SelectedSit;
          
          // تحديث القوائم والألوان
          updateTeil3SelectOptions();
          updateTeil3RightSideColors();
          updateTeil3CardStyle(idx);
          
          // إلغاء التحديدات
          clearTeil3SituationSelection();
          return;
        }
        
        // ✅ إذا كان هناك فقرة أخرى مختارة مسبقًا، قم بإلغاء تحديدها first
        if (teil3SelectedItem !== null && teil3SelectedItem !== idx) {
          // إزالة التحديد من الفقرة السابقة
          const prevCard = document.getElementById(`teil3_card_${teil3SelectedItem}`);
          if (prevCard) {
            const prevAnswer = teil3UserAnswers[teil3SelectedItem];
            if (prevAnswer !== undefined && prevAnswer !== null && prevAnswer !== "") {
              prevCard.style.backgroundColor = "#e9ecef";
              prevCard.style.border = "1px solid #adb5bd";
            } else {
              prevCard.style.backgroundColor = "#fafafa";
              prevCard.style.border = "1px solid #e0e0e0";
            }
          }
        }
        
        // تحديد الفقرة الحالية
        if (teil3SelectedItem === idx) {
          clearTeil3ItemSelection();
        } else {
          teil3SelectedItem = idx;
          updateTeil3CardStyle(idx);
        }
      };
    })(i);
    
    itemsGrid.appendChild(card);
  }
  
  leftColumn.appendChild(itemsGrid);
  
  const rightColumn = document.createElement("div");
  rightColumn.style.flex = "1";
  rightColumn.style.minWidth = "250px";
  rightColumn.style.backgroundColor = "#f0f8ff";
  rightColumn.style.padding = "20px";
  rightColumn.style.borderRadius = "12px";
  rightColumn.style.border = "1px solid #d0e0ff";
  rightColumn.style.maxHeight = "600px";
  rightColumn.style.overflowY = "auto";
  
  const rightTitle = document.createElement("h3");
  rightTitle.innerHTML = "Situationen";
  rightTitle.style.marginTop = "0";
  rightTitle.style.color = "#2c3e66";
  rightTitle.style.marginBottom = "15px";
  rightColumn.appendChild(rightTitle);
  
  const situationsList = document.createElement("div");
  situationsList.id = "teil3_situations_list";
  
  for (let i = 0; i < situations.length; i++) {
    const sitDiv = document.createElement("div");
    sitDiv.className = "teil3-situation-item";
    sitDiv.id = `teil3_sit_${i}`;
    sitDiv.setAttribute("data-sit-index", i);
    sitDiv.style.padding = "10px 12px";
    sitDiv.style.marginBottom = "8px";
    sitDiv.style.backgroundColor = "white";
    sitDiv.style.borderRadius = "6px";
    sitDiv.style.border = "1px solid #ddd";
    sitDiv.style.fontSize = "13px";
    sitDiv.style.cursor = "pointer";
    sitDiv.style.transition = "all 0.2s";
    sitDiv.innerHTML = `${String.fromCharCode(97+i)}. ${situations[i]}`;
    
    sitDiv.onclick = (function(sitIdx) {
      return function(e) {
        e.stopPropagation();
        
        // التحقق إذا كان العنوان مستخدمًا بالفعل
        let isUsed = false;
        let usedByItem = null;
        for (let j = 0; j < items.length; j++) {
          const answer = teil3UserAnswers[j];
          if (answer !== undefined && answer !== null && answer !== "" && answer !== "none" && answer === sitIdx) {
            isUsed = true;
            usedByItem = j;
            break;
          }
        }
        
        // إذا كان العنوان مستخدمًا، قم بإلغاء ربطه
        if (isUsed && usedByItem !== null) {
          delete teil3UserAnswers[usedByItem];
          const selectElem = document.getElementById(`teil3_select_${usedByItem}`);
          if (selectElem) selectElem.selectedIndex = 0;
          updateTeil3CardStyle(usedByItem);
          updateTeil3SelectOptions();
          updateTeil3RightSideColors();
          clearTeil3SituationSelection();
          return;
        }
        
        // إذا كان هناك فقرة مختارة مسبقًا
        if (teil3SelectedItem !== null) {
          teil3UserAnswers[teil3SelectedItem] = sitIdx;
          
          // تحديث الـ select
          const selectElem = document.getElementById(`teil3_select_${teil3SelectedItem}`);
          if (selectElem) selectElem.value = sitIdx;
          
          // تحديث القوائم والألوان
          updateTeil3SelectOptions();
          updateTeil3RightSideColors();
          updateTeil3CardStyle(teil3SelectedItem);
          
          // إلغاء التحديدات
          clearTeil3ItemSelection();
          return;
        }
        
        // ✅ إذا كان هناك عنوان آخر مختار مسبقًا، قم بإلغاء تحديده
        if (teil3SelectedSit !== null && teil3SelectedSit !== sitIdx) {
          const prevSitDiv = document.getElementById(`teil3_sit_${teil3SelectedSit}`);
          if (prevSitDiv && !prevSitDiv.classList.contains('used')) {
            prevSitDiv.style.backgroundColor = "white";
            prevSitDiv.style.border = "1px solid #ddd";
          }
        }
        
        // تحديد العنوان الحالي
        if (teil3SelectedSit === sitIdx) {
          clearTeil3SituationSelection();
        } else {
          teil3SelectedSit = sitIdx;
          sitDiv.style.backgroundColor = "#e0f2fe";
          sitDiv.style.border = "1px solid #7dd3fc";
        }
      };
    })(i);
    
    sitDiv.onmouseenter = function() {
      if (!this.classList.contains('used') && this.style.backgroundColor !== "#e0f2fe") {
        this.style.backgroundColor = "#f0f9ff";
      }
    };
    sitDiv.onmouseleave = function() {
      if (!this.classList.contains('used') && this.style.backgroundColor !== "#e0f2fe") {
        this.style.backgroundColor = "white";
      }
    };
    
    situationsList.appendChild(sitDiv);
  }
  
  rightColumn.appendChild(situationsList);
  
  twoColumns.appendChild(leftColumn);
  twoColumns.appendChild(rightColumn);
  container.appendChild(twoColumns);
  
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "15px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "25px";
  
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✅ تصحيح";
  checkBtn.className = "check-btn";
  checkBtn.style.padding = "12px 24px";
  checkBtn.style.backgroundColor = "#2c3e66";
  checkBtn.style.color = "white";
  checkBtn.style.border = "none";
  checkBtn.style.borderRadius = "8px";
  checkBtn.style.fontSize = "16px";
  checkBtn.onclick = checkTeil3Exam;
  buttonContainer.appendChild(checkBtn);
  
  const resetBtn = document.createElement("button");
  resetBtn.innerText = "↺";
  resetBtn.style.padding = "8px 12px";
  resetBtn.style.backgroundColor = "#6c757d";
  resetBtn.style.color = "white";
  resetBtn.style.border = "none";
  resetBtn.style.borderRadius = "6px";
  resetBtn.style.fontSize = "16px";
  resetBtn.style.fontWeight = "bold";
  resetBtn.onclick = function() {
    teil3UserAnswers = {};
    teil3SelectedItem = null;
    teil3SelectedSit = null;
    
    // إعادة تعيين الـ selects إلى "-- اختر العنوان --"
    for (let i = 0; i < items.length; i++) {
      const select = document.getElementById(`teil3_select_${i}`);
      if (select) select.selectedIndex = 0;
      updateTeil3CardStyle(i);
    }
    
    // تحديث القوائم والألوان
    updateTeil3SelectOptions();
    updateTeil3RightSideColors();
    
    // حذف جميع رسائل التصحيح
    document.querySelectorAll('#teil3 .correct-message').forEach(msg => msg.remove());
    
    // إخفاء نتيجة التصحيح
    const resultDiv = document.getElementById("teil3Result");
    if (resultDiv) {
      resultDiv.style.display = "none";
      resultDiv.innerHTML = "";
    }
  };
  buttonContainer.appendChild(resetBtn);
  
  container.appendChild(buttonContainer);
  
  const resultDiv = document.createElement("div");
  resultDiv.id = "teil3Result";
  resultDiv.className = "result-box";
  resultDiv.style.display = "none";
  container.appendChild(resultDiv);
  
  // تحديث القوائم والألوان أول مرة
  updateTeil3SelectOptions();
  updateTeil3RightSideColors();
}

function checkTeil3Exam() {
  const items = currentTeil3Data.items;
  let score = 0;
  let total = items.length;
  
  // حذف رسائل التصحيح القديمة
  document.querySelectorAll('#teil3 .correct-message').forEach(msg => msg.remove());
  
  for (let i = 0; i < total; i++) {
    const card = document.getElementById(`teil3_card_${i}`);
    const userAnswer = teil3UserAnswers[i];
    const correctIndex = items[i].correct;
    let isCorrect = false;
    let correctText = "";
    
    // معالجة حالة "لا يوجد عنوان"
    if (correctIndex === null || correctIndex === undefined) {
      correctText = "⚠️ هذه الفقرة لا يوجد لها عنوان";
      isCorrect = (userAnswer === "none" || userAnswer === null || userAnswer === undefined || userAnswer === "");
    } else {
      correctText = `${String.fromCharCode(97 + correctIndex)}. ${currentTeil3Data.situations[correctIndex]}`;
      isCorrect = (userAnswer === correctIndex);
    }
    
    if (card) {
      card.classList.remove("correct-answer-card", "wrong-answer-card");
      
      if (isCorrect && userAnswer !== undefined && userAnswer !== null && userAnswer !== "") {
        score++;
        card.classList.add("correct-answer-card");
        card.style.backgroundColor = "#d4edda";
        card.style.border = "2px solid #28a745";
      } else if (userAnswer !== undefined && userAnswer !== null && userAnswer !== "") {
        card.classList.add("wrong-answer-card");
        card.style.backgroundColor = "#fef0e0";
        card.style.border = "2px solid #e67e22";
        
        const correctMsg = document.createElement("div");
        correctMsg.className = "correct-message";
        correctMsg.style.marginTop = "10px";
        correctMsg.style.fontSize = "13px";
        correctMsg.style.fontWeight = "bold";
        correctMsg.style.color = "#28a745";
        correctMsg.innerHTML = `✅ : ${correctText}`;
        card.appendChild(correctMsg);
      } else {
        // لم يجب المستخدم
        card.style.backgroundColor = "#fef0e0";
        card.style.border = "2px solid #e67e22";
        
        const correctMsg = document.createElement("div");
        correctMsg.className = "correct-message";
        correctMsg.style.marginTop = "10px";
        correctMsg.style.fontSize = "13px";
        correctMsg.style.fontWeight = "bold";
        correctMsg.style.color = "#28a745";
        correctMsg.innerHTML = `✅ : ${correctText}`;
        card.appendChild(correctMsg);
      }
    }
  }
  
  const finalScore = (score * 25 / total).toFixed(2);
  const resultDiv = document.getElementById("teil3Result");
  if (resultDiv) {
    resultDiv.innerHTML = `النتيجة: ${finalScore} / 25`;
    resultDiv.style.display = "block";
  }
  
  if (finalScore >= 20) {
    resultDiv.style.backgroundColor = "#d4edda";
    resultDiv.style.color = "#155724";
  } else if (finalScore >= 15) {
    resultDiv.style.backgroundColor = "#fff3cd";
    resultDiv.style.color = "#856404";
  } else {
    resultDiv.style.backgroundColor = "#f8d7da";
    resultDiv.style.color = "#721c24";
  }
  
  // حفظ النتيجة
  if (typeof window.saveExamResultGlobal === "function") {
    window.saveExamResultGlobal("lesen3", currentTeil3Data.id || 1, parseFloat(finalScore));
  }
}

// ========== نهاية الملف ==========
console.log("✅ engine.js تم تحميله بالكامل");