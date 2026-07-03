// ============================================
// engine.js - محرك الامتحانات المتكامل (النسخة النهائية الشغالة)
// يدعم: Matching + True/False + Teil 2 + Teil 3 + Sprachbausteine Teil 1 + Sprachbausteine Teil 2 + Schreiben + تلوين ذكي
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
  // إخفاء Situationen بالكامل في الهاتف
if (window.innerWidth <= 768) {
    rightColumn.style.display = "none";
}
  
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
                      alert(` كلمة "${w}" تم استخدامها بالفعل!`);
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
                    newCard.classList.add('selected-for-link');
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
              alert(` كلمة "${word}" تم استخدامها بالفعل!`);
              sprach2SelectedWordForLinking = null;
              clearSprach2WordSelection();
              return;
            }
            sprach2UserAnswers[qId] = word;
            btn.textContent = word;
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
      wordCard.style.backgroundColor = "#d4edda";
      wordCard.style.border = "2px solid #28a745";
      wordCard.style.color = "#155724";
      wordCard.style.cursor = "default";
      wordCard.style.opacity = "0.85";
    } else {
      wordCard.style.backgroundColor = "#ffffff";
      wordCard.style.border = "1px solid #7c6ce6";
      wordCard.style.color = "#4a4a4a";
      wordCard.style.cursor = "pointer";
      wordCard.style.opacity = "1";
      
      wordCard.onclick = (function(w) {
        return function() {
          if (sprach2SelectedQuestionId) {
            if (isSprach2WordUsed(w)) {
              alert(`كلمة "${w}" تم استخدامها بالفعل!`);
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
        btn.style.backgroundColor = "#d4edda";
        btn.style.border = "2px solid #28a745";
        btn.style.color = "#155724";
        btn.style.opacity = "0.85";
      }
    } else {
      if (btn) {
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
  
  const usedWords = Object.values(sprach2UserAnswers);
  document.querySelectorAll('.sprach2-word-card').forEach(card => {
    const word = card.textContent;
    if (usedWords.includes(word)) {
      card.style.backgroundColor = "#d4edda";
      card.style.border = "2px solid #28a745";
      card.style.color = "#155724";
      card.style.opacity = "0.85";
    } else {
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
  
  // ✅ حفظ النتيجة مع examId الصحيح
  if (typeof window.saveExamResultGlobal === "function") {
    const examId = currentSprach2Data.id || window.currentExamId || 1;
    window.saveExamResultGlobal("sprach2", examId, parseFloat(finalScore));
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
  
  // ✅ حفظ النتيجة مع examId الصحيح
  if (typeof window.saveExamResultGlobal === "function") {
    const examId = currentSprach1Data.id || window.currentExamId || 1;
    window.saveExamResultGlobal("sprach1", examId, parseFloat(finalScore));
  }
}

// ========== نظام True/False (Hören Teil 1,2,3) ==========
window.buildTrueFalseExam = function(container, questions, note) {
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    console.error("❌ خطأ: لا توجد أسئلة في هذا الامتحان");
    if (container) {
      container.innerHTML = '<div style="text-align:center; color:#ff6b6b; padding:30px; background:#fff; border-radius:12px;"> حدث خطأ في تحميل الامتحان. يرجى المحاولة مرة أخرى.</div>';
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
    let resultDiv = container.querySelector('#truefalseResult');
    if (!resultDiv) {
      resultDiv = document.createElement('div');
      resultDiv.id = 'truefalseResult';
      resultDiv.className = 'result-box';
      container.appendChild(resultDiv);
    }
    resultDiv.innerHTML = " لا توجد أسئلة في هذا الامتحان";
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
  
  if (typeof window.saveExamResultGlobal === "function") {
    const skill = container.id || "hoeren";
    const examId = window.currentExamId || 1;
    window.saveExamResultGlobal(skill, examId, parseFloat(finalScore));
  }
  
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

      const selectElem = card.querySelector('select');

      if (isCorrect && userAnswer) {
        score++;
        card.classList.add("correct-answer-card");
        if (selectElem) {
          selectElem.style.backgroundColor = "#d4edda";
          selectElem.style.border = "2px solid #28a745";
          selectElem.style.color = "#155724";
        }
      } else {
        card.classList.add("wrong-answer-card");
        if (selectElem) {
          selectElem.style.backgroundColor = "#fef0e0";
          selectElem.style.border = "2px solid #e67e22";
          selectElem.style.color = "#155724";
          
          selectElem.value = correctAnswer;
          for (let j = 0; j < selectElem.options.length; j++) {
            if (selectElem.options[j].value === correctAnswer) {
              const originalText = selectElem.options[j].textContent;
              const cleanText = originalText.replace(/^✅\s*/, '');
              selectElem.options[j].textContent = `✅ ${cleanText}`;
              selectElem.options[j].selected = true;
              break;
            }
          }
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

  // ✅ حفظ النتيجة مع examId الصحيح
  if (typeof window.saveExamResultGlobal === "function") {
    const examId = currentMatchingExamData.id || window.currentExamId || 1;
    window.saveExamResultGlobal("lesen1", examId, parseFloat(finalScore));
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
  
  // ✅ حفظ النتيجة مع examId الصحيح
  if (typeof window.saveExamResultGlobal === "function") {
    const examId = currentTeil2Data.id || window.currentExamId || 1;
    window.saveExamResultGlobal("lesen2", examId, parseFloat(finalScore));
  }
}

// ========== نظام Teil 3 (Lesen Teil 3) ==========
let currentTeil3Data = null;
let teil3UserAnswers = {};
let teil3SelectedItem = null;
let teil3SelectedSit = null;

window.loadTeil3Exam = function(examData) {
  console.log("🟢 loadTeil3Exam", examData.title);
  currentTeil3Data = examData;
  teil3UserAnswers = {};
  teil3SelectedItem = null;
  teil3SelectedSit = null;
  renderTeil3Exam();
};

function updateTeil3SelectOptions() {
  const items = currentTeil3Data.items;
  const situations = currentTeil3Data.situations;
  
  const usedSituations = new Set();
  for (let key in teil3UserAnswers) {
    const val = teil3UserAnswers[key];
    if (val !== undefined && val !== null && val !== "" && val !== "none") {
      usedSituations.add(val);
    }
  }
  
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
    noTitleOption.textContent = "✧ بدون عنوان ✧";
    select.appendChild(noTitleOption);
    
    for (let s = 0; s < situations.length; s++) {
      if (usedSituations.has(s) && currentAnswer !== s) {
        continue;
      }
      const option = document.createElement("option");
      option.value = s;
      option.textContent = `${String.fromCharCode(97+s)}. ${situations[s]}`;
      select.appendChild(option);
    }
    
    if (isNoneAnswer) {
      select.value = "none";
    } else if (currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== "") {
      if (!usedSituations.has(currentAnswer) || currentAnswer !== undefined) {
        select.value = currentAnswer;
      }
    }
  }
}

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
      sitDiv.style.backgroundColor = "#e9ecef";
      sitDiv.style.border = "1px solid #adb5bd";
      sitDiv.style.color = "#212529";
      sitDiv.classList.add('used');
    } else {
      if (teil3SelectedSit !== i) {
        sitDiv.style.backgroundColor = "white";
        sitDiv.style.border = "1px solid #ddd";
        sitDiv.style.color = "#212529";
        sitDiv.classList.remove('used');
      }
    }
  }
}

function updateTeil3CardStyle(idx) {
  const card = document.getElementById(`teil3_card_${idx}`);
  const answer = teil3UserAnswers[idx];
  
  if (answer !== undefined && answer !== null && answer !== "") {
    card.style.backgroundColor = "#e9ecef";
    card.style.border = "1px solid #adb5bd";
  } else if (teil3SelectedItem === idx) {
    card.style.backgroundColor = "#e0f2fe";
    card.style.border = "1px solid #7dd3fc";
  } else {
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
    
    const select = document.createElement("select");
    select.className = "teil3-original-select";
    select.style.width = "100%";
    select.style.padding = "8px";
    select.style.marginTop = "10px";
    select.style.borderRadius = "8px";
    select.style.border = "1px solid #ccc";
    select.id = `teil3_select_${i}`;
    
    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- اختر العنوان --";
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    
    const noTitleOption = document.createElement("option");
    noTitleOption.value = "none";
    noTitleOption.textContent = "✧ بدون عنوان ✧";
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
        
        updateTeil3SelectOptions();
        updateTeil3RightSideColors();
        updateTeil3CardStyle(idx);
        
        clearTeil3ItemSelection();
        clearTeil3SituationSelection();
      };
    })(i);
    
    card.appendChild(select);
    
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
        
        if (teil3SelectedItem !== null) {
          teil3UserAnswers[teil3SelectedItem] = sitIdx;
          
          const selectElem = document.getElementById(`teil3_select_${teil3SelectedItem}`);
          if (selectElem) selectElem.value = sitIdx;
          
          updateTeil3SelectOptions();
          updateTeil3RightSideColors();
          updateTeil3CardStyle(teil3SelectedItem);
          
          clearTeil3ItemSelection();
          return;
        }
        
        if (teil3SelectedSit !== null && teil3SelectedSit !== sitIdx) {
          const prevSitDiv = document.getElementById(`teil3_sit_${teil3SelectedSit}`);
          if (prevSitDiv && !prevSitDiv.classList.contains('used')) {
            prevSitDiv.style.backgroundColor = "white";
            prevSitDiv.style.border = "1px solid #ddd";
          }
        }
        
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
    
    for (let i = 0; i < items.length; i++) {
      const select = document.getElementById(`teil3_select_${i}`);
      if (select) select.selectedIndex = 0;
      updateTeil3CardStyle(i);
    }
    
    updateTeil3SelectOptions();
    updateTeil3RightSideColors();
    
    document.querySelectorAll('#teil3 .correct-message').forEach(msg => msg.remove());
    
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
  
  updateTeil3SelectOptions();
  updateTeil3RightSideColors();
}

function checkTeil3Exam() {
  const items = currentTeil3Data.items;
  let score = 0;
  let total = items.length;

  document.querySelectorAll('#teil3 .correct-message').forEach(msg => msg.remove());

  for (let i = 0; i < total; i++) {
    const card = document.getElementById(`teil3_card_${i}`);
    const userAnswer = teil3UserAnswers[i];
    const correctIndex = items[i].correct;
    let isCorrect = false;
    let correctText = "";
    let correctValue = null;

    // تحديد الإجابة الصحيحة (نص وقيمة)
    if (correctIndex === null || correctIndex === undefined) {
      correctText = "✧ بدون عنوان ✧";
      correctValue = "none";
      // التحقق من صحة الإجابة
      isCorrect = (userAnswer === "none" || userAnswer === null || userAnswer === undefined || userAnswer === "");
    } else {
      correctText = `${String.fromCharCode(97 + correctIndex)}. ${currentTeil3Data.situations[correctIndex]}`;
      correctValue = correctIndex;
      isCorrect = (userAnswer === correctIndex);
    }

    if (card) {
      card.classList.remove("correct-answer-card", "wrong-answer-card");
      const selectElem = card.querySelector('select');

      if (isCorrect && userAnswer !== undefined && userAnswer !== null && userAnswer !== "") {
        // ✅ إجابة صحيحة
        score++;
        card.classList.add("correct-answer-card");
        card.style.backgroundColor = "#d4edda";
        card.style.border = "2px solid #28a745";
        if (selectElem) {
          selectElem.style.backgroundColor = "#d4edda";
          selectElem.style.border = "2px solid #28a745";
          selectElem.style.color = "#155724";
        }
      } else {
        // ❌ إجابة خاطئة أو لم يجب
        card.classList.add("wrong-answer-card");
        card.style.backgroundColor = "#fef0e0";
        card.style.border = "2px solid #e67e22";
        if (selectElem) {
          selectElem.style.backgroundColor = "#fef0e0";
          selectElem.style.border = "2px solid #e67e22";
          selectElem.style.color = "#155724";
          
          selectElem.value = correctValue;
          
          for (let j = 0; j < selectElem.options.length; j++) {
            const optValue = selectElem.options[j].value;
            if (optValue === correctValue || 
                (correctValue === "none" && optValue === "none") ||
                (correctValue !== null && correctValue !== undefined && parseInt(optValue) === correctValue)) {
              const originalText = selectElem.options[j].textContent;
              const cleanText = originalText.replace(/^✅\s*/, '');
              selectElem.options[j].textContent = `✅ ${cleanText}`;
              selectElem.options[j].selected = true;
              break;
            }
          }
        }
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

  // ✅ حفظ النتيجة مع examId الصحيح
  if (typeof window.saveExamResultGlobal === "function") {
    const examId = currentTeil3Data.id || window.currentExamId || 1;
    window.saveExamResultGlobal("lesen3", examId, parseFloat(finalScore));
  }
}

// ============================================
// 🎨 نظام التلوين الذكي - highlightData.js
// ============================================

const HIGHLIGHT_COLORS = [
    { color: '#2F6FE4', bg: 'rgba(79,142,247,0.14)' },
    { color: '#2F8C5C', bg: 'rgba(59,170,114,0.14)' },
    { color: '#6A4B9A', bg: 'rgba(138,99,210,0.14)' },
    { color: '#C77A2A', bg: 'rgba(230,154,59,0.14)' },
    { color: '#2A8F9E', bg: 'rgba(57,175,192,0.14)' },
    { color: '#B84A7A', bg: 'rgba(217,108,154,0.14)' },
    { color: '#9A7A3A', bg: 'rgba(184,135,70,0.14)' },
    { color: '#4A5A6A', bg: 'rgba(95,114,133,0.14)' }
];

let highlightEnabled = true;

// تحميل الحالة من localStorage
try {
    const saved = localStorage.getItem('highlightEnabled');
    if (saved !== null) {
        highlightEnabled = saved === 'true';
    }
} catch(e) {}

// تلوين النص
function applyHighlightToText(element, textToHighlight, colorIndex) {
    if (!element || !textToHighlight || !highlightEnabled) return;
    
    const color = HIGHLIGHT_COLORS[colorIndex % HIGHLIGHT_COLORS.length];
    if (!color) return;
    
    const escapedText = textToHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedText})`, 'g');
    
    element.innerHTML = element.innerHTML.replace(regex, (match) => {
        return `<span data-highlight="${match}" style="color:${color.color};background:${color.bg};border-radius:4px;padding:1px 3px;font-weight:600;">${match}</span>`;
    });
}

// تطبيق التلوين على الامتحان
function applyHighlights() {
    if (!highlightEnabled) {
        removeAllHighlights();
        return;
    }
    
    const skill = getCurrentSkill();
    const examId = window.currentExamId || 1;
    
    if (!skill) return;
    
    const container = document.getElementById(skill);
    if (!container) return;
    
    // البحث عن بيانات التلوين
    const prefix = `${skill}_exam${examId}`;
    let foundData = false;
    
    // التحقق من وجود HIGHLIGHT_DATA
    if (typeof HIGHLIGHT_DATA === 'undefined') {
        console.log('⚠️ highlightData.js لم يتم تحميله');
        return;
    }
    
    for (let key in HIGHLIGHT_DATA) {
        if (key.startsWith(prefix)) {
            const data = HIGHLIGHT_DATA[key];
            
            // تلوين حسب نوع البيانات
            if (data.text) {
                // Hören أو Lesen 2
                const cards = container.querySelectorAll('.question-card');
                cards.forEach(card => {
                    const textEl = card.querySelector('.question-text');
                    if (textEl) {
                        applyHighlightToText(textEl, data.text, data.color);
                    }
                });
                // البحث في النص الطويل أيضاً
                const textContent = container.querySelector('div[style*="line-height"]');
                if (textContent) {
                    applyHighlightToText(textContent, data.text, data.color);
                }
                foundData = true;
            }
            
            if (data.paragraph && data.title) {
                // Lesen 1 أو 3
                const cards = container.querySelectorAll('.question-card');
                cards.forEach(card => {
                    const textEl = card.querySelector('.question-text');
                    if (textEl) {
                        applyHighlightToText(textEl, data.paragraph, data.color);
                        applyHighlightToText(textEl, data.title, data.color);
                    }
                });
                foundData = true;
            }
            
            if (data.before && data.answer && data.after) {
                // Sprachbausteine
                const textElements = container.querySelectorAll('div[style*="line-height"], div[style*="text-align"]');
                textElements.forEach(el => {
                    applyHighlightToText(el, data.before, data.color);
                    applyHighlightToText(el, data.answer, data.color);
                    applyHighlightToText(el, data.after, data.color);
                });
                foundData = true;
            }
        }
    }
    
    if (!foundData) {
        console.log(`ℹ️ لا توجد بيانات تلوين للامتحان: ${prefix}`);
    }
}

// إزالة جميع التلوينات
function removeAllHighlights() {
    document.querySelectorAll('[data-highlight]').forEach(el => {
        const parent = el.parentNode;
        if (parent) {
            const text = document.createTextNode(el.textContent);
            parent.replaceChild(text, el);
            parent.normalize();
        }
    });
}

// تبديل حالة التلوين
function toggleHighlights() {
    highlightEnabled = !highlightEnabled;
    try {
        localStorage.setItem('highlightEnabled', highlightEnabled.toString());
    } catch(e) {}
    
    if (highlightEnabled) {
        applyHighlights();
    } else {
        removeAllHighlights();
    }
    
    updateHighlightButton();
}

// تحديث زر التلوين
function updateHighlightButton() {
    const btn = document.getElementById('highlightToggleBtn');
    if (!btn) return;
    
    if (highlightEnabled) {
        btn.textContent = '👁️';
        btn.title = 'إخفاء الألوان';
        btn.style.opacity = '1';
        btn.style.borderColor = '#38bdf8';
    } else {
        btn.textContent = '👁️';
        btn.title = 'إظهار الألوان';
        btn.style.opacity = '0.4';
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
    }
}

// إضافة زر التلوين
function addHighlightButton() {
    if (document.getElementById('highlightToggleBtn')) return;
    
    const nav = document.getElementById('examNavButtons');
    if (!nav) return;
    
    const btn = document.createElement('button');
    btn.id = 'highlightToggleBtn';
    btn.textContent = '👁️';
    btn.title = highlightEnabled ? 'إخفاء الألوان' : 'إظهار الألوان';
    btn.style.cssText = `
        background: transparent;
        border: 1px solid ${highlightEnabled ? '#38bdf8' : 'rgba(255,255,255,0.1)'};
        border-radius: 50%;
        width: 32px;
        height: 32px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: ${highlightEnabled ? '#38bdf8' : '#94a3b8'};
        opacity: ${highlightEnabled ? '1' : '0.4'};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin-left: 8px;
    `;
    
    btn.onmouseenter = () => {
        btn.style.transform = 'scale(1.1)';
        btn.style.borderColor = '#38bdf8';
    };
    btn.onmouseleave = () => {
        btn.style.transform = 'scale(1)';
        if (!highlightEnabled) {
            btn.style.borderColor = 'rgba(255,255,255,0.1)';
        } else {
            btn.style.borderColor = '#38bdf8';
        }
    };
    
    btn.onclick = (e) => {
        e.stopPropagation();
        toggleHighlights();
    };
    
    nav.insertBefore(btn, nav.firstChild);
}

// الحصول على نوع المهارة الحالي (دالة مساعدة للتلوين)
function getCurrentSkill() {
    if (document.getElementById('hoeren1')?.style.display === 'block') return 'hoeren1';
    if (document.getElementById('hoeren2')?.style.display === 'block') return 'hoeren2';
    if (document.getElementById('hoeren3')?.style.display === 'block') return 'hoeren3';
    if (document.getElementById('teil1')?.style.display === 'block') return 'lesen1';
    if (document.getElementById('teil2')?.style.display === 'block') return 'lesen2';
    if (document.getElementById('teil3')?.style.display === 'block') return 'lesen3';
    if (document.getElementById('sprach1')?.style.display === 'block') return 'sprach1';
    if (document.getElementById('sprach2')?.style.display === 'block') return 'sprach2';
    return 'hoeren1';
}

// تهيئة النظام
function initHighlightSystem() {
    addHighlightButton();
    setTimeout(() => {
        if (highlightEnabled) {
            applyHighlights();
        }
    }, 300);
}

// مراقبة تغيير الامتحان
const originalShowTeil = window.showTeil;
if (originalShowTeil) {
    window.showTeil = function(teilNumber) {
        originalShowTeil(teilNumber);
        setTimeout(() => {
            if (highlightEnabled) {
                applyHighlights();
            }
        }, 200);
    };
}

// ============================================
// التعديلات الخاصة بالهواتف - فقط تصحيح الشكل
// ============================================

function applyMobileStylesToEngine() {
  if (window.innerWidth <= 768) {
    const allQuestionCards = document.querySelectorAll('.question-card');
    allQuestionCards.forEach(card => {
      card.style.padding = '10px';
      card.style.marginBottom = '12px';
      card.style.borderRadius = '10px';
    });
    
    const allQuestionTexts = document.querySelectorAll('.question-text');
    allQuestionTexts.forEach(text => {
      text.style.fontSize = '0.75rem';
      text.style.marginBottom = '8px';
    });
    
    const allOptionLabels = document.querySelectorAll('.option-label');
    allOptionLabels.forEach(label => {
      label.style.padding = '6px 8px';
      label.style.fontSize = '0.7rem';
      label.style.marginBottom = '5px';
    });
    
    const allCheckBtns = document.querySelectorAll('.check-btn');
    allCheckBtns.forEach(btn => {
      btn.style.padding = '8px 16px';
      btn.style.fontSize = '0.75rem';
    });
    
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent === '↺') {
        btn.style.padding = '6px 10px';
        btn.style.fontSize = '14px';
      }
    });
    
    const allResultBoxes = document.querySelectorAll('.result-box');
    allResultBoxes.forEach(box => {
      box.style.padding = '6px 12px';
      box.style.fontSize = '11px';
      box.style.bottom = '15px';
    });
    
   // تحسين Teil 3 للهاتف - Grid 2x2 وتصغير الحجم
const teil3Container = document.getElementById('teil3');
if (teil3Container) {
    // البحث عن grid container
    let itemsGrid = teil3Container.querySelector('[style*="grid-template-columns: 1fr 1fr"]');
    if (!itemsGrid) {
        // إذا لم يوجد، ابحث عن العنصر الذي يحتوي على Anzeigen
        itemsGrid = teil3Container.querySelector('.items-grid, [class*="grid"]');
    }
    if (itemsGrid) {
        itemsGrid.style.display = 'grid';
        itemsGrid.style.gridTemplateColumns = '1fr 1fr';
        itemsGrid.style.gap = '4px';
        itemsGrid.style.width = '100%';
    }
    
    // تأكد من أن كل بطاقة تأخذ العرض المناسب
    const cards = teil3Container.querySelectorAll('.question-card');
    cards.forEach(card => {
        card.style.padding = '6px';
        card.style.marginBottom = '0';
        card.style.borderRadius = '8px';
        card.style.width = '100%';
        card.style.boxSizing = 'border-box';
        card.style.overflow = 'hidden';
        
        const title = card.querySelector('div[style*="font-weight: bold"]');
        if (title) title.style.fontSize = '0.6rem';
        
        const text = card.querySelector('div[style*="font-size: 13px"]');
        if (text) text.style.fontSize = '0.55rem';
        
        const select = card.querySelector('select');
        if (select) {
            select.style.fontSize = '0.5rem';
            select.style.padding = '4px';
        }
    });
    
    // إخفاء عنوان Situationen
    const situationTitle = teil3Container.querySelector('h3');
    if (situationTitle && situationTitle.textContent.includes('Situationen')) {
        situationTitle.style.display = 'none';
    }
    
    // إخفاء العمود الأيمن بالكامل (Situationen)
    const rightColumn = teil3Container.querySelector('div[style*="flex: 1"]:last-child, div[style*="min-width: 250px"]');
    if (rightColumn) rightColumn.style.display = 'none';
    
    // تعديل العمود الأيسر ليملأ العرض
    const leftColumn = teil3Container.querySelector('div[style*="flex: 2"]:first-child, div[style*="min-width: 500px"]');
    if (leftColumn) {
        leftColumn.style.width = '100%';
        leftColumn.style.maxWidth = '100%';
        leftColumn.style.flex = 'none';
    }
}
      
      const cards = teil3Container.querySelectorAll('.question-card');
      cards.forEach(card => {
        card.style.padding = '8px';
        card.style.marginBottom = '0';
        card.style.borderRadius = '10px';
        
        const title = card.querySelector('div[style*="font-weight: bold"]');
        if (title) title.style.fontSize = '0.65rem';
        
        const text = card.querySelector('div[style*="font-size: 13px"]');
        if (text) text.style.fontSize = '0.6rem';
      });
      
      // ✅ إخفاء عنوان "Situationen"
      const situationTitle = teil3Container.querySelector('h3');
      if (situationTitle && situationTitle.textContent.includes('Situationen')) {
        situationTitle.style.display = 'none';
      }
      
      // ✅ إخفاء العمود الأيمن بالكامل (Situationen)
      const rightColumn = teil3Container.querySelector('div[style*="flex: 1"]:last-child, div[style*="min-width: 250px"]');
      if (rightColumn) rightColumn.style.display = 'none';
      
      // ✅ تعديل العمود الأيسر ليملأ العرض
      const leftColumn = teil3Container.querySelector('div[style*="flex: 2"]:first-child, div[style*="min-width: 500px"]');
      if (leftColumn) {
        leftColumn.style.width = '100%';
        leftColumn.style.maxWidth = '100%';
      }
    }
  }

document.addEventListener('DOMContentLoaded', function() {
  applyMobileStylesToEngine();
});

const originalOpenExamGlobal = window.openExam;
if (originalOpenExamGlobal) {
  window.openExam = async function(examId, examTitle, skill) {
    await originalOpenExamGlobal(examId, examTitle, skill);
    setTimeout(applyMobileStylesToEngine, 100);
  };
}

// إعادة تحميل التنسيقات عند تغيير الحجم
window.addEventListener('resize', function() {
  setTimeout(applyMobileStylesToEngine, 100);
});

// ============================================
// تحديث ألوان التصحيح للهاتف بعد التصحيح مباشرة
// ============================================

// دالة تطبيق ألوان التصحيح على Select في Teil 1 (للهاتف)
function applyTeil1CorrectionColors() {
    if (window.innerWidth > 768) return;
    
    const selects = document.querySelectorAll('#teil1 select');
    selects.forEach(select => {
        const card = select.closest('.question-card');
        if (!card) return;
        
        const isCorrect = card.classList.contains('correct-answer-card');
        const isWrong = card.classList.contains('wrong-answer-card');
        
        if (isCorrect) {
            select.style.setProperty('background-color', '#d4edda', 'important');
            select.style.setProperty('border', '2px solid #28a745', 'important');
            select.style.setProperty('color', '#155724', 'important');
        } else if (isWrong) {
            select.style.setProperty('background-color', '#fef0e0', 'important');
            select.style.setProperty('border', '2px solid #e67e22', 'important');
            select.style.setProperty('color', '#155724', 'important');
        }
    });
}

// دالة تطبيق ألوان التصحيح على Select في Teil 3 (للهاتف)
function applyTeil3CorrectionColors() {
    if (window.innerWidth > 768) return;
    
    const selects = document.querySelectorAll('#teil3 select');
    selects.forEach(select => {
        const card = select.closest('.question-card');
        if (!card) return;
        
        const isCorrect = card.classList.contains('correct-answer-card');
        const isWrong = card.classList.contains('wrong-answer-card');
        
        if (isCorrect) {
            select.style.setProperty('background-color', '#d4edda', 'important');
            select.style.setProperty('border', '2px solid #28a745', 'important');
            select.style.setProperty('color', '#155724', 'important');
        } else if (isWrong) {
            select.style.setProperty('background-color', '#fef0e0', 'important');
            select.style.setProperty('border', '2px solid #e67e22', 'important');
            select.style.setProperty('color', '#155724', 'important');
        }
    });
}

// ============================================
// استدعاء دوال الهاتف بعد التصحيح مباشرة
// ============================================

// استدعاء دوال Teil 1 بعد التصحيح
if (typeof checkMatchingExam === 'function') {
    const originalCheckMatching = checkMatchingExam;
    window.checkMatchingExam = function() {
        originalCheckMatching();
        setTimeout(function() {
            applyTeil1CorrectionColors();
        }, 50);
    };
}

// استدعاء دوال Teil 3 بعد التصحيح
if (typeof checkTeil3Exam === 'function') {
    const originalCheckTeil3 = checkTeil3Exam;
    window.checkTeil3Exam = function() {
        originalCheckTeil3();
        setTimeout(function() {
            applyTeil3CorrectionColors();
        }, 50);
    };
}

// تشغيل نظام التلوين
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighlightSystem);
} else {
    initHighlightSystem();
}

// جعل الدوال متاحة عالمياً
window.toggleHighlights = toggleHighlights;
window.applyHighlights = applyHighlights;
window.removeAllHighlights = removeAllHighlights;
window.HIGHLIGHT_COLORS = HIGHLIGHT_COLORS;
// ============================================
// 🚀 تشغيل نظام التلوين
// ============================================


console.log('✅ ألوان التصحيح للهاتف (Teil 1 & Teil 3) تم تحميلها');
console.log("✅ engine.js تم تحميله بالكامل");
// ============================================
// 🚀 تشغيل نظام التلوين
// ============================================

// دالة للحصول على المهارة الحالية
function getCurrentSkill() {
    if (document.getElementById('hoeren1')?.style.display === 'block') return 'hoeren1';
    if (document.getElementById('hoeren2')?.style.display === 'block') return 'hoeren2';
    if (document.getElementById('hoeren3')?.style.display === 'block') return 'hoeren3';
    if (document.getElementById('teil1')?.style.display === 'block') return 'lesen1';
    if (document.getElementById('teil2')?.style.display === 'block') return 'lesen2';
    if (document.getElementById('teil3')?.style.display === 'block') return 'lesen3';
    if (document.getElementById('sprach1')?.style.display === 'block') return 'sprach1';
    if (document.getElementById('sprach2')?.style.display === 'block') return 'sprach2';
    return 'hoeren1';
}

// تهيئة نظام التلوين
function initHighlightSystem() {
    console.log('🎨 تهيئة نظام التلوين...');
    addHighlightButton();
    
    // انتظر قليلاً ثم طبق التلوين
    setTimeout(() => {
        if (highlightEnabled) {
            console.log('✅ تطبيق التلوين...');
            applyHighlights();
        } else {
            console.log('⏸️ التلوين معطل');
        }
    }, 500);
}

// تشغيل التلوين عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighlightSystem);
} else {
    initHighlightSystem();
}

// تشغيل التلوين عند فتح امتحان جديد
const originalOpenExam = window.openExam;
if (originalOpenExam) {
    window.openExam = async function(examId, examTitle, skill) {
        await originalOpenExam(examId, examTitle, skill);
        setTimeout(() => {
            if (highlightEnabled) {
                console.log('🔄 إعادة تطبيق التلوين بعد تغيير الامتحان');
                applyHighlights();
            }
        }, 400);
    };
}

// جعل الدوال متاحة عالمياً
window.toggleHighlights = toggleHighlights;
window.applyHighlights = applyHighlights;
window.removeAllHighlights = removeAllHighlights;
window.getCurrentSkill = getCurrentSkill;

console.log('✅ نظام التلوين جاهز!');
console.log(`🎨 حالة التلوين: ${highlightEnabled ? 'مفعل' : 'معطل'}`);
// ============================================
// 🎨 نظام التلوين الذكي (المطور حسب رؤيتك)
// ============================================

// ألوان هادئة وجميلة
const HIGHLIGHT_COLORS = [
    { bg: '#E8F1FF', color: '#1456A0' },  // أزرق فاتح
    { bg: '#EAF8EF', color: '#1F7A46' },  // أخضر فاتح
    { bg: '#FFF5E5', color: '#A86400' },  // برتقالي فاتح
    { bg: '#F7ECFF', color: '#6A3FA0' },  // بنفسجي فاتح
    { bg: '#FFECEC', color: '#B33A3A' },  // أحمر فاتح
    { bg: '#EAF7F7', color: '#0D7377' }   // تركواز فاتح
];

let highlightEnabled = true;

// تحميل حالة التلوين من localStorage
try {
    const saved = localStorage.getItem('zertiva_highlight');
    if (saved !== null) {
        highlightEnabled = saved === 'true';
    }
} catch(e) {}

// دالة تلوين النص
function applyHighlightToText(element, textToHighlight, colorIndex) {
    if (!element || !textToHighlight || !highlightEnabled) return;
    
    const color = HIGHLIGHT_COLORS[colorIndex % HIGHLIGHT_COLORS.length];
    if (!color) return;
    
    const escapedText = textToHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedText})`, 'g');
    
    element.innerHTML = element.innerHTML.replace(regex, (match) => {
        return `<span class="hl" style="background:${color.bg};color:${color.color};border-radius:4px;padding:2px 4px;font-weight:600;">${match}</span>`;
    });
}

// تطبيق التلوين على الامتحان
function applyHighlights() {
    // إزالة التلوين القديم أولاً
    removeAllHighlights();
    
    if (!highlightEnabled) return;
    
    const skill = getCurrentSkill();
    const examId = window.currentExamId || 1;
    
    if (!skill) return;
    
    // البحث عن بيانات التلوين في الامتحان الحالي
    let highlightData = null;
    
    // 1. التحقق من وجود highlightData في الامتحان المحمل
    if (window.currentExamData && window.currentExamData.highlightData) {
        highlightData = window.currentExamData.highlightData;
    }
    
    // 2. التحقق من HIGHLIGHT_DATA (للتوافق مع النظام القديم)
    if (!highlightData && typeof HIGHLIGHT_DATA !== 'undefined') {
        const prefix = `${skill}_exam${examId}`;
        for (let key in HIGHLIGHT_DATA) {
            if (key.startsWith(prefix)) {
                highlightData = HIGHLIGHT_DATA[key];
                break;
            }
        }
    }
    
    if (!highlightData) {
        console.log(`ℹ️ لا توجد بيانات تلوين للامتحان: ${skill}_exam${examId}`);
        return;
    }
    
    const container = document.getElementById(skill);
    if (!container) return;
    
    let colorIndex = 0;
    
    // تلوين حسب نوع البيانات
    if (highlightData.text) {
        // Hören أو Lesen Teil 2
        const cards = container.querySelectorAll('.question-card');
        cards.forEach(card => {
            const textEl = card.querySelector('.question-text, .text-content, div[style*="line-height"]');
            if (textEl) {
                applyHighlightToText(textEl, highlightData.text, colorIndex);
                colorIndex++;
            }
        });
    }
    
    if (highlightData.paragraph && highlightData.title) {
        // Lesen Teil 1 أو 3
        const cards = container.querySelectorAll('.question-card');
        cards.forEach(card => {
            const textEl = card.querySelector('.question-text, .text-content, div[style*="line-height"]');
            if (textEl) {
                applyHighlightToText(textEl, highlightData.paragraph, colorIndex);
                colorIndex++;
                applyHighlightToText(textEl, highlightData.title, colorIndex);
                colorIndex++;
            }
        });
    }
    
    if (highlightData.before || highlightData.answer || highlightData.after) {
        // Sprachbausteine
        const textElements = container.querySelectorAll('div[style*="line-height"], div[style*="text-align"]');
        textElements.forEach(el => {
            if (highlightData.before) {
                applyHighlightToText(el, highlightData.before, colorIndex);
                colorIndex++;
            }
            if (highlightData.answer) {
                applyHighlightToText(el, highlightData.answer, colorIndex);
                colorIndex++;
            }
            if (highlightData.after) {
                applyHighlightToText(el, highlightData.after, colorIndex);
                colorIndex++;
            }
        });
    }
    
    console.log('✅ تم تطبيق التلوين بنجاح');
}

// إزالة جميع التلوينات
function removeAllHighlights() {
    document.querySelectorAll('.hl').forEach(el => {
        const parent = el.parentNode;
        if (parent) {
            const text = document.createTextNode(el.textContent);
            parent.replaceChild(text, el);
            parent.normalize();
        }
    });
}

// تبديل حالة التلوين
function toggleHighlights() {
    highlightEnabled = !highlightEnabled;
    try {
        localStorage.setItem('zertiva_highlight', highlightEnabled.toString());
    } catch(e) {}
    
    if (highlightEnabled) {
        applyHighlights();
    } else {
        removeAllHighlights();
    }
    
    updateHighlightButton();
}

// تحديث زر التلوين
function updateHighlightButton() {
    const btn = document.getElementById('highlightToggleBtn');
    if (!btn) return;
    
    if (highlightEnabled) {
        btn.innerHTML = '🎨';
        btn.title = 'إخفاء الألوان';
        btn.style.opacity = '1';
        btn.style.borderColor = '#38bdf8';
    } else {
        btn.innerHTML = '🎨';
        btn.title = 'إظهار الألوان';
        btn.style.opacity = '0.4';
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
    }
}

// إضافة زر التلوين
function addHighlightButton() {
    // إزالة الزر القديم إن وجد
    const oldBtn = document.getElementById('highlightToggleBtn');
    if (oldBtn) oldBtn.remove();
    
    // العثور على حاوية الأزرار
    const nav = document.getElementById('examNavButtons');
    if (!nav) {
        // إنشاء حاوية إذا لم توجد
        const container = document.querySelector('.top-bar .right-side');
        if (!container) return;
        
        const newNav = document.createElement('div');
        newNav.id = 'examNavButtons';
        newNav.style.display = 'flex';
        newNav.style.alignItems = 'center';
        newNav.style.gap = '10px';
        container.appendChild(newNav);
    }
    
    const navElement = document.getElementById('examNavButtons');
    if (!navElement) return;
    
    const btn = document.createElement('button');
    btn.id = 'highlightToggleBtn';
    btn.innerHTML = '🎨';
    btn.title = highlightEnabled ? 'إخفاء الألوان' : 'إظهار الألوان';
    btn.style.cssText = `
        background: transparent;
        border: 1px solid ${highlightEnabled ? '#38bdf8' : 'rgba(255,255,255,0.1)'};
        border-radius: 50%;
        width: 36px;
        height: 36px;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: ${highlightEnabled ? '#38bdf8' : '#94a3b8'};
        opacity: ${highlightEnabled ? '1' : '0.4'};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    `;
    
    btn.onmouseenter = () => {
        btn.style.transform = 'scale(1.1)';
        btn.style.borderColor = '#38bdf8';
    };
    btn.onmouseleave = () => {
        btn.style.transform = 'scale(1)';
        if (!highlightEnabled) {
            btn.style.borderColor = 'rgba(255,255,255,0.1)';
        } else {
            btn.style.borderColor = '#38bdf8';
        }
    };
    
    btn.onclick = (e) => {
        e.stopPropagation();
        toggleHighlights();
    };
    
    navElement.appendChild(btn);
}

// الحصول على نوع المهارة الحالي
function getCurrentSkill() {
    if (document.getElementById('hoeren1')?.style.display === 'block') return 'hoeren1';
    if (document.getElementById('hoeren2')?.style.display === 'block') return 'hoeren2';
    if (document.getElementById('hoeren3')?.style.display === 'block') return 'hoeren3';
    if (document.getElementById('teil1')?.style.display === 'block') return 'lesen1';
    if (document.getElementById('teil2')?.style.display === 'block') return 'lesen2';
    if (document.getElementById('teil3')?.style.display === 'block') return 'lesen3';
    if (document.getElementById('sprach1')?.style.display === 'block') return 'sprach1';
    if (document.getElementById('sprach2')?.style.display === 'block') return 'sprach2';
    if (document.getElementById('schreiben')?.style.display === 'block') return 'schreiben';
    return null;
}

// تهيئة النظام
function initHighlightSystem() {
    console.log('🎨 تهيئة نظام التلوين...');
    addHighlightButton();
    
    // انتظر قليلاً ثم طبق التلوين
    setTimeout(() => {
        if (highlightEnabled) {
            console.log('✅ تطبيق التلوين...');
            applyHighlights();
        } else {
            console.log('⏸️ التلوين معطل');
        }
    }, 500);
}

// مراقبة تغيير الامتحان
const originalLoadExam = window.loadExamFromFile;
if (originalLoadExam) {
    window.loadExamFromFile = async function(skill, examId) {
        const result = await originalLoadExam(skill, examId);
        if (result) {
            window.currentExamData = result;
            window.currentExamId = examId;
            setTimeout(() => {
                if (highlightEnabled) {
                    applyHighlights();
                }
            }, 300);
        }
        return result;
    };
}

// تشغيل التلوين عند تغيير الأجزاء
const originalShowTeil = window.showTeil;
if (originalShowTeil) {
    window.showTeil = function(teilNumber) {
        originalShowTeil(teilNumber);
        setTimeout(() => {
            if (highlightEnabled) {
                applyHighlights();
            }
        }, 300);
    };
}

// تشغيل التلوين عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighlightSystem);
} else {
    initHighlightSystem();
}

// جعل الدوال متاحة عالمياً
window.toggleHighlights = toggleHighlights;
window.applyHighlights = applyHighlights;
window.removeAllHighlights = removeAllHighlights;
window.getCurrentSkill = getCurrentSkill;

console.log('✅ نظام التلوين الذكي جاهز!');
console.log(`🎨 حالة التلوين: ${highlightEnabled ? 'مفعل' : 'معطل'}`);
// ============================================
// 🎨 نظام التلوين الذكي
// ============================================

// ألوان هادئة
const HIGHLIGHT_COLORS = [
    { bg: '#E8F1FF', color: '#1456A0' },
    { bg: '#EAF8EF', color: '#1F7A46' },
    { bg: '#FFF5E5', color: '#A86400' },
    { bg: '#F7ECFF', color: '#6A3FA0' },
    { bg: '#FFECEC', color: '#B33A3A' },
    { bg: '#EAF7F7', color: '#0D7377' }
];

let highlightEnabled = true;

// تحميل الحالة من localStorage
try {
    const saved = localStorage.getItem('zertiva_highlight');
    if (saved !== null) {
        highlightEnabled = saved === 'true';
    }
} catch(e) {}

// دالة تلوين النص
function applyHighlightToText(element, textToHighlight, colorIndex) {
    if (!element || !textToHighlight || !highlightEnabled) return;
    
    const color = HIGHLIGHT_COLORS[colorIndex % HIGHLIGHT_COLORS.length];
    if (!color) return;
    
    const escapedText = textToHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedText})`, 'g');
    
    element.innerHTML = element.innerHTML.replace(regex, (match) => {
        return `<span class="hl" style="background:${color.bg};color:${color.color};border-radius:4px;padding:2px 4px;font-weight:600;">${match}</span>`;
    });
}

// تطبيق التلوين على الامتحان
function applyHighlights() {
    removeAllHighlights();
    if (!highlightEnabled) return;
    
    const container = document.querySelector('.page.active');
    if (!container) return;
    
    // البحث عن بيانات التلوين في الامتحان
    if (window.currentExamData && window.currentExamData.highlightData) {
        const data = window.currentExamData.highlightData;
        let colorIndex = 0;
        
        if (data.text) {
            const cards = container.querySelectorAll('.question-card');
            cards.forEach(card => {
                const textEl = card.querySelector('.question-text, .text-content');
                if (textEl) {
                    applyHighlightToText(textEl, data.text, colorIndex);
                    colorIndex++;
                }
            });
        }
    }
}

// إزالة جميع التلوينات
function removeAllHighlights() {
    document.querySelectorAll('.hl').forEach(el => {
        const parent = el.parentNode;
        if (parent) {
            const text = document.createTextNode(el.textContent);
            parent.replaceChild(text, el);
            parent.normalize();
        }
    });
}

// تبديل حالة التلوين
function toggleHighlights() {
    highlightEnabled = !highlightEnabled;
    try {
        localStorage.setItem('zertiva_highlight', highlightEnabled.toString());
    } catch(e) {}
    
    if (highlightEnabled) {
        applyHighlights();
    } else {
        removeAllHighlights();
    }
    
    updateHighlightButton();
}

// تحديث زر التلوين
function updateHighlightButton() {
    const btn = document.getElementById('highlightToggleBtn');
    if (!btn) return;
    
    btn.innerHTML = '🎨';
    btn.title = highlightEnabled ? 'إخفاء الألوان' : 'إظهار الألوان';
    btn.style.opacity = highlightEnabled ? '1' : '0.4';
}

// إضافة زر التلوين
function addHighlightButton() {
    const nav = document.getElementById('examNavButtons');
    if (!nav) return;
    
    const btn = document.createElement('button');
    btn.id = 'highlightToggleBtn';
    btn.innerHTML = '🎨';
    btn.title = highlightEnabled ? 'إخفاء الألوان' : 'إظهار الألوان';
    btn.style.cssText = `
        background: transparent;
        border: 1px solid ${highlightEnabled ? '#38bdf8' : 'rgba(255,255,255,0.1)'};
        border-radius: 50%;
        width: 36px;
        height: 36px;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: ${highlightEnabled ? '#38bdf8' : '#94a3b8'};
        opacity: ${highlightEnabled ? '1' : '0.4'};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    `;
    
    btn.onclick = toggleHighlights;
    nav.appendChild(btn);
}

// دالة للحصول على المهارة الحالية
function getCurrentSkill() {
    const active = document.querySelector('.page.active');
    if (!active) return null;
    return active.id;
}

// تهيئة النظام
function initHighlightSystem() {
    addHighlightButton();
    setTimeout(() => {
        if (highlightEnabled) applyHighlights();
    }, 500);
}

// تشغيل عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighlightSystem);
} else {
    initHighlightSystem();
}

// جعل الدوال متاحة عالمياً
window.toggleHighlights = toggleHighlights;
window.applyHighlights = applyHighlights;
window.removeAllHighlights = removeAllHighlights;
window.getCurrentSkill = getCurrentSkill;

console.log('🎨 نظام التلوين الذكي جاهز!');
