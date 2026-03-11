/* ─────────────────────────────────────────────
   ENIGMA Riddle Challenge — Shared Script
   Multi-page version
   ───────────────────────────────────────────── */

const RIDDLES = [
  { q: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", a: ["echo"], hint: "You hear me after you speak in a valley.", difficulty: "easy" },
  { q: "The more you take, the more you leave behind. What am I?", a: ["footsteps","steps","footprints"], hint: "Think about what happens when you walk.", difficulty: "easy" },
  { q: "I have cities, but no houses live there. I have mountains, but no trees grow there. I have water, but no fish swim there. What am I?", a: ["map","a map"], hint: "You might find me in a classroom or atlas.", difficulty: "easy" },
  { q: "I'm light as a feather, yet the strongest man can't hold me for much more than a minute. What am I?", a: ["breath","your breath","air"], hint: "You need me to live.", difficulty: "easy" },
  { q: "What has hands but can't clap?", a: ["clock","a clock","watch","a watch"], hint: "It tells you something very important every day.", difficulty: "easy" },
  { q: "The person who makes it, sells it. The person who buys it, never uses it. The person who uses it, never knows they're using it. What is it?", a: ["coffin","a coffin","casket"], hint: "It's used only once in a lifetime.", difficulty: "medium" },
  { q: "I have branches, but no fruit, trunk, or leaves. What am I?", a: ["bank","a bank"], hint: "You visit me when you need money.", difficulty: "medium" },
  { q: "What can you catch but not throw?", a: ["cold","a cold"], hint: "You might get one in winter.", difficulty: "easy" },
  { q: "I fly without wings. I can be caught but not thrown. I count everything and waste nothing. What am I?", a: ["time","a time"], hint: "Everyone has the same amount each day.", difficulty: "medium" },
  { q: "Forward I'm heavy, but backward I'm not. What am I?", a: ["ton","a ton"], hint: "It's a unit of weight — read it backwards.", difficulty: "medium" },
  { q: "I'm always in front of you but can't be seen. What am I?", a: ["future","the future"], hint: "Yesterday was before you, tomorrow is...", difficulty: "medium" },
  { q: "What has a head and a tail but no body?", a: ["coin","a coin","penny"], hint: "You might flip one to make a decision.", difficulty: "easy" },
  { q: "I'm not alive, but I can grow. I don't have lungs, but I need air. I don't have a mouth, but water kills me. What am I?", a: ["fire","a fire"], hint: "Handle me with care.", difficulty: "medium" },
  { q: "What comes once in a minute, twice in a moment, but never in a thousand years?", a: ["m","the letter m","letter m"], hint: "It's not about time at all.", difficulty: "hard" },
  { q: "The more you have of it, the less you see. What is it?", a: ["darkness","dark"], hint: "Turn off all the lights.", difficulty: "medium" },
  { q: "I have keys but no locks. I have space but no room. You can enter, but you can't go inside. What am I?", a: ["keyboard","a keyboard"], hint: "You're probably touching one right now.", difficulty: "easy" },
  { q: "What has a neck but no head?", a: ["bottle","a bottle"], hint: "You might drink from it.", difficulty: "easy" },
  { q: "I go all around the world but stay in a corner. What am I?", a: ["stamp","a stamp","postage stamp"], hint: "Letters can't travel without me.", difficulty: "medium" },
  { q: "I'm tall when I'm young and short when I'm old. What am I?", a: ["candle","a candle"], hint: "I give light as I shrink.", difficulty: "easy" },
  { q: "Poor people have it. Rich people need it. If you eat it, you'll die. What is it?", a: ["nothing"], hint: "Think about what is absent or void.", difficulty: "hard" },
  { q: "A man is pushing his car past a hotel when he suddenly goes bankrupt. What is he doing?", a: ["playing monopoly","monopoly"], hint: "It's a popular board game.", difficulty: "hard" },
  { q: "I have no life, but I can die. What am I?", a: ["battery","a battery"], hint: "Your phone needs me.", difficulty: "medium" },
  { q: "What invention lets you look right through a wall?", a: ["window","a window"], hint: "It lets light in and lets you see outside.", difficulty: "easy" },
  { q: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?", a: ["river","a river"], hint: "It flows downhill to the sea.", difficulty: "medium" },
  { q: "I'm always hungry and must always be fed. The finger I touch will soon turn red. What am I?", a: ["fire","a fire"], hint: "I burn.", difficulty: "medium" },
  { q: "What has many teeth but can't bite?", a: ["comb","a comb"], hint: "You use it to tidy your hair.", difficulty: "easy" },
  { q: "What gets sharper the more you use it?", a: ["brain","your brain","mind"], hint: "It's inside your skull.", difficulty: "hard" },
  { q: "You can see me in water, but I never get wet. What am I?", a: ["reflection","your reflection","shadow"], hint: "Look into a still pond.", difficulty: "medium" },
  { q: "I shrink every time you use me. Eventually I'll disappear. But I keep you clean. What am I?", a: ["soap","a bar of soap","bar of soap"], hint: "Found in a bathroom.", difficulty: "easy" },
  { q: "Two fathers and two sons sit down to eat eggs. They eat exactly three eggs, yet each person had exactly one egg. How?", a: ["grandfather father son","three generations","grandfather","they are grandfather father son"], hint: "Count the actual people, not the roles.", difficulty: "hard" }
];

const TOTAL_Q    = 10;
const TIMER_MAX  = 30;
const HINT_COST  = 10;
const BASE_SCORE = 100;
const TIME_BONUS = 2;

const ACHIEVEMENTS = [
  { id: 'first_win',        name: 'First Victory',    desc: 'Complete your first challenge',  icon: '🎖️', condition: s => s.totalGames >= 1 },
  { id: 'perfect_10',       name: 'Perfect Score',    desc: 'Get 10/10 correct answers',      icon: '💯', condition: s => s.perfectScores >= 1 },
  { id: 'speed_demon',      name: 'Speed Demon',      desc: 'Solve a riddle in under 5 secs', icon: '⚡', condition: s => s.fastestTime < 5 },
  { id: 'collector',        name: 'Hint Collector',   desc: 'Use 20 hints total',             icon: '💡', condition: s => s.hintsUsed >= 20 },
  { id: 'legend',           name: 'Rising Legend',    desc: 'Reach 5000+ total points',       icon: '👑', condition: s => s.totalScore >= 5000 },
  { id: 'streak_3',         name: 'On a Roll',        desc: 'Get 3 correct answers in a row', icon: '🔥', condition: s => s.maxStreak >= 3 },
  { id: 'hard_master',      name: 'Hard Master',      desc: 'Solve 5 hard riddles',           icon: '🧠', condition: s => s.hardSolved >= 5 },
  { id: 'knowledge_keeper', name: 'Knowledge Keeper', desc: 'Post 10 forum comments',         icon: '📚', condition: s => s.forumPosts >= 10 }
];

/* ─── PLAYER STATS ─── */
function getPlayerStats() {
  const defaults = {
    totalGames:0, totalScore:0, perfectScores:0, fastestTime:999,
    maxStreak:0, currentStreak:0, hintsUsed:0, hardSolved:0,
    mediumSolved:0, easySolved:0, forumPosts:0, unlockedAchievements:[]
  };
  try {
    return JSON.parse(localStorage.getItem('enigma_stats') || JSON.stringify(defaults));
  } catch(e) { return defaults; }
}

function savePlayerStats(stats) {
  localStorage.setItem('enigma_stats', JSON.stringify(stats));
}

function updateStats(gameScore, correct, totalQ, hintsUsed, difficulties, answerTime) {
  let s = getPlayerStats();
  s.totalGames++;
  s.totalScore += gameScore;
  s.hintsUsed  += hintsUsed;
  if (answerTime < s.fastestTime) s.fastestTime = answerTime;
  if (correct === totalQ) s.perfectScores++;
  if (correct > 0) s.currentStreak++;
  else s.currentStreak = 0;
  if (s.currentStreak > s.maxStreak) s.maxStreak = s.currentStreak;
  difficulties.forEach(d => {
    if (d === 'hard')   s.hardSolved++;
    if (d === 'medium') s.mediumSolved++;
    if (d === 'easy')   s.easySolved++;
  });
  savePlayerStats(s);
  checkAchievements(s);
}

function checkAchievements(stats) {
  const unlocked = stats.unlockedAchievements || [];
  ACHIEVEMENTS.forEach(a => {
    if (!unlocked.includes(a.id) && a.condition(stats)) {
      unlocked.push(a.id);
      showAchievementPopup(a);
    }
  });
  stats.unlockedAchievements = unlocked;
  savePlayerStats(stats);
}

function showAchievementPopup(achievement) {
  const popup = document.createElement('div');
  popup.className = 'achievement-popup';
  popup.innerHTML = `
    <div class="achievement-content">
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-info">
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-desc">${achievement.desc}</div>
      </div>
    </div>`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 3500);
}

/* ─── UTILITY ─── */
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function getEl(id) { return document.getElementById(id); }

/* ─── GAME STATE ─── */
let state = {
  queue: [], idx: 0, score: 0, correct: 0,
  timer: null, timeLeft: 0, hintUsed: false, answered: false
};

/* ═══════════════════════
   PLAY PAGE
   ═══════════════════════ */
function startGame() {
  state.queue   = shuffle(RIDDLES).slice(0, TOTAL_Q);
  state.idx     = 0;
  state.score   = 0;
  state.correct = 0;

  // Make sure play section is visible, results hidden
  const playSec    = getEl('play-section');
  const resultsSec = getEl('results-section');
  if (playSec)    playSec.style.display = 'block';
  if (resultsSec) { resultsSec.style.display = ''; resultsSec.classList.remove('active'); }

  loadQuestion();
}

function loadQuestion() {
  state.hintUsed = false;
  state.answered = false;

  const r = state.queue[state.idx];
  if (!r) { showResults(); return; }

  const progress = (state.idx / TOTAL_Q) * 100;

  const progressFill = getEl('progressFill');
  const riddleNum    = getEl('riddleNum');
  const riddleText   = getEl('riddleText');
  const hintText     = getEl('hintText');
  const questionNum  = getEl('questionNum');
  const badge        = getEl('diffBadge');
  const input        = getEl('answerInput');
  const hintArea     = getEl('hintArea');
  const hintBtn      = getEl('hintBtn');
  const hintCostMsg  = getEl('hintCostMsg');
  const feedbackMsg  = getEl('feedbackMsg');

  if (!riddleText || !input) { console.error('ENIGMA: play page elements not found'); return; }

  if (progressFill) progressFill.style.width = progress + '%';
  if (riddleNum)    riddleNum.textContent     = 'Riddle ' + String(state.idx + 1).padStart(2, '0');
  riddleText.textContent                      = r.q;
  if (hintText)     hintText.textContent      = r.hint;
  if (questionNum)  questionNum.textContent   = (state.idx + 1) + '/' + TOTAL_Q;

  if (badge) {
    badge.textContent = r.difficulty.charAt(0).toUpperCase() + r.difficulty.slice(1);
    badge.className   = 'difficulty-badge ' + r.difficulty;
  }

  input.value     = '';
  input.className = 'answer-input';
  input.disabled  = false;
  input.focus();

  if (hintArea)    hintArea.classList.remove('visible');
  if (hintBtn)     hintBtn.disabled     = false;
  if (hintCostMsg) hintCostMsg.innerHTML = `\u2212<span>${HINT_COST}pts</span>`;
  if (feedbackMsg) feedbackMsg.className = 'feedback-msg';

  startTimer();
}

function nextQuestion() {
  state.idx++;
  if (state.idx >= TOTAL_Q) showResults();
  else loadQuestion();
}

/* ─── TIMER ─── */
function startTimer() {
  clearInterval(state.timer);
  state.timeLeft = TIMER_MAX;
  updateTimer();
  state.timer = setInterval(() => {
    state.timeLeft--;
    updateTimer();
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      if (!state.answered) timeUp();
    }
  }, 1000);
}

function updateTimer() {
  const t   = state.timeLeft;
  const circumference = 188;
  const circle = getEl('timerCircle');
  if (!circle) return;
  getEl('timerNum').textContent      = t;
  circle.style.strokeDashoffset     = circumference * (1 - t / TIMER_MAX);
  circle.style.stroke = t > 15 ? 'var(--gold)' : t > 8 ? '#e0a852' : 'var(--red)';
}

function timeUp() {
  state.answered = true;
  const r = state.queue[state.idx];
  getEl('answerInput').disabled = true;
  showFeedback('wrong', `\u23f1 Time\u2019s up! The answer was: "${r.a[0]}"`);
  setTimeout(nextQuestion, 2000);
}

/* ─── ANSWER CHECK ─── */
function checkAnswer() {
  if (state.answered) return;
  const input   = getEl('answerInput');
  const userAns = input.value.trim().toLowerCase();
  if (!userAns) return;

  const r       = state.queue[state.idx];
  const correct = r.a.some(a => userAns === a || userAns.includes(a) || a.includes(userAns));

  state.answered = true;
  clearInterval(state.timer);
  input.disabled = true;

  if (correct) {
    const pts        = (state.hintUsed ? BASE_SCORE - HINT_COST : BASE_SCORE) + (state.timeLeft * TIME_BONUS);
    const diff_bonus = r.difficulty === 'hard' ? 50 : r.difficulty === 'medium' ? 25 : 0;
    const total      = pts + diff_bonus;
    state.score   += total;
    state.correct++;
    input.classList.add('correct');
    showFeedback('correct', `\u2713 Correct! +${total} points`);
    getEl('scoreVal').textContent     = state.score;
    getEl('correctCount').textContent = state.correct;
    setTimeout(nextQuestion, 1800);
  } else {
    input.classList.add('wrong');
    showFeedback('wrong', `\u2717 Not quite. The answer was: "${r.a[0]}"`);
    setTimeout(nextQuestion, 2200);
  }
}

function showFeedback(type, msg) {
  const el      = getEl('feedbackMsg');
  el.textContent = msg;
  el.className  = 'feedback-msg ' + type;
}

function revealHint() {
  if (state.hintUsed || state.answered) return;
  state.hintUsed = true;
  getEl('hintArea').classList.add('visible');
  getEl('hintBtn').disabled      = true;
  getEl('hintCostMsg').innerHTML = `\u2212<span>${HINT_COST}pts deducted</span>`;
}

function skipQuestion() {
  if (state.answered) return;
  clearInterval(state.timer);
  state.answered = true;
  const r = state.queue[state.idx];
  showFeedback('wrong', `Skipped. The answer was: "${r.a[0]}"`);
  setTimeout(nextQuestion, 1800);
}

/* ─── RESULTS ─── */
function showResults() {
  const accuracy     = Math.round((state.correct / TOTAL_Q) * 100);
  const difficulties = state.queue.map(q => q.difficulty);
  updateStats(state.score, state.correct, TOTAL_Q, 0, difficulties, TIMER_MAX - state.timeLeft);

  getEl('finalScore').textContent     = state.score;
  getEl('finalCorrect').textContent   = state.correct + '/' + TOTAL_Q;
  getEl('finalAccuracy').textContent  = accuracy + '%';

  let emoji = '\ud83d\ude24', title = 'Keep Trying!';
  if (accuracy >= 90)      { emoji = '\ud83c\udfc6'; title = 'Legendary!'; }
  else if (accuracy >= 70) { emoji = '\ud83c\udf1f'; title = 'Brilliant!'; }
  else if (accuracy >= 50) { emoji = '\ud83d\udc4d'; title = 'Not Bad!'; }

  getEl('resultsIcon').textContent     = emoji;
  getEl('resultsTitle').textContent    = title;
  getEl('resultsSubtitle').textContent = `${accuracy}% accuracy \u2014 ${state.correct} correct answers`;

  // Switch sections
  const playSec    = getEl('play-section');
  const resultsSec = getEl('results-section');
  if (playSec)    playSec.style.display = 'none';
  if (resultsSec) resultsSec.classList.add('active');
}

/* ─── LEADERBOARD SAVE ─── */
function saveScore() {
  const nameEl   = getEl('playerName');
  const name     = nameEl ? nameEl.value.trim() || 'Anonymous' : 'Anonymous';
  const accuracy = Math.round((state.correct / TOTAL_Q) * 100);
  const entry    = {
    name, score: state.score, correct: state.correct,
    accuracy, date: new Date().toLocaleDateString()
  };
  let lb = JSON.parse(localStorage.getItem('enigma_lb') || '[]');
  lb.push(entry);
  lb.sort((a, b) => b.score - a.score);
  lb = lb.slice(0, 20);
  localStorage.setItem('enigma_lb', JSON.stringify(lb));
  window.location.href = 'leaderboard.html';
}

/* ─── RENDER LEADERBOARD ─── */
function renderLeaderboard() {
  const body = getEl('lbBody');
  if (!body) return;
  const lb = JSON.parse(localStorage.getItem('enigma_lb') || '[]');

  if (!lb.length) {
    body.innerHTML = '<div class="lb-empty">No scores yet — play a game to claim the top spot!</div>';
    return;
  }
  body.innerHTML = lb.map((e, i) => `
    <div class="lb-row">
      <span class="lb-rank">${['\ud83e\udd47','\ud83e\udd48','\ud83e\udd49'][i] || (i + 1)}</span>
      <span class="lb-name">${e.name}</span>
      <span class="lb-cell">${e.correct}/10</span>
      <span class="lb-cell">${e.accuracy}%</span>
      <span class="lb-score">${e.score}</span>
    </div>`).join('');
}

/* ─── FORUM ─── */
function populateForumRiddles() {
  const sel = getEl('forumRiddle');
  if (!sel) return;
  sel.innerHTML = '<option value="">— Select a riddle —</option>' +
    RIDDLES.map((r, i) =>
      `<option value="${i}">${i + 1}. ${r.q.substring(0, 55)}...</option>`
    ).join('');
}

function postComment() {
  const nameEl    = getEl('forumName');
  const riddleEl  = getEl('forumRiddle');
  const commentEl = getEl('forumComment');
  if (!nameEl || !commentEl) return;

  const name      = nameEl.value.trim() || 'Anonymous';
  const riddleIdx = riddleEl ? riddleEl.value : '';
  const comment   = commentEl.value.trim();
  if (!comment) return;

  const entry = {
    name, riddleIdx, comment,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };
  let comments = JSON.parse(localStorage.getItem('enigma_forum') || '[]');
  comments.unshift(entry);
  localStorage.setItem('enigma_forum', JSON.stringify(comments));

  const stats = getPlayerStats();
  stats.forumPosts = (stats.forumPosts || 0) + 1;
  savePlayerStats(stats);
  checkAchievements(stats);

  commentEl.value = '';
  renderComments();
}

function renderComments() {
  const el = getEl('forumComments');
  if (!el) return;
  const comments = JSON.parse(localStorage.getItem('enigma_forum') || '[]');

  if (!comments.length) {
    el.innerHTML = '<div class="forum-empty">No discussions yet. Be the first to post!</div>';
    return;
  }
  el.innerHTML = comments.map(c => `
    <div class="comment-card">
      <div class="comment-header">
        <span class="comment-author">${c.name}</span>
        <span class="comment-meta">${c.date} \u00b7 ${c.time}</span>
      </div>
      ${c.riddleIdx !== '' ? `<div class="comment-riddle-ref">On: Riddle ${parseInt(c.riddleIdx) + 1}</div>` : ''}
      <p class="comment-text">${c.comment}</p>
    </div>`).join('');
}

/* ─── PRICING ─── */
function toggleBilling(period) {
  const isMonthly = period === 'monthly';
  const mBtn = getEl('monthlyToggle');
  const yBtn = getEl('yearlyToggle');
  if (mBtn) mBtn.classList.toggle('active', isMonthly);
  if (yBtn) yBtn.classList.toggle('active', !isMonthly);

  ['proPriceMonthly','properiodMonthly','elitePriceMonthly','eliteperiodMonthly'].forEach(id => {
    const e = getEl(id); if (e) e.style.display = isMonthly ? 'inline' : 'none';
  });
  ['proPriceYearly','properiodYearly','elitePriceYearly','eliteperiodYearly'].forEach(id => {
    const e = getEl(id); if (e) e.style.display = isMonthly ? 'none' : 'inline';
  });
  localStorage.setItem('billingPeriod', period);
}

function selectPlan(planName) {
  const mBtn  = getEl('monthlyToggle');
  const period = (mBtn && mBtn.classList.contains('active')) ? 'monthly' : 'yearly';
  const prices = { pro: { monthly: 99, yearly: 999 }, elite: { monthly: 999, yearly: 1999 } };
  const price  = prices[planName][period];
  showCheckoutModal(planName.toUpperCase(), price, period);
}

function showCheckoutModal(planName, price, period) {
  const modal = document.createElement('div');
  modal.className = 'checkout-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="this.closest('.checkout-modal').remove()">✕</button>
      <h2>Upgrade to ${planName}</h2>
      <p class="modal-subtitle">Instant access to all premium features</p>
      <div class="modal-summary">
        <div class="summary-row">
          <span>${planName} Plan (${period})</span>
          <span class="summary-price">₹${price}</span>
        </div>
        <div class="summary-row total">
          <span>Total Today</span>
          <span class="summary-price">₹${price}</span>
        </div>
      </div>
      <div class="payment-form">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Your name" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="4532 1234 5678 9010" maxlength="19" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Expiry</label>
            <input type="text" placeholder="MM/YY" maxlength="5" />
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input type="text" placeholder="123" maxlength="3" />
          </div>
        </div>
        <label class="checkbox-label">
          <input type="checkbox" checked />
          I agree to the terms and can cancel anytime
        </label>
        <button type="button" class="btn-checkout"
                onclick="processPayment('${planName}','${price}')">
          Complete Purchase — ₹${price}
        </button>
        <p class="modal-note">Secure & encrypted. 100% satisfaction guaranteed.</p>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function processPayment(planName, price) {
  const modal  = document.querySelector('.checkout-modal');
  const button = modal.querySelector('.btn-checkout');
  button.disabled    = true;
  button.textContent = 'Processing...';
  setTimeout(() => {
    localStorage.setItem('enigma_subscription', JSON.stringify({
      plan: planName, price: parseFloat(price),
      purchaseDate: new Date().toISOString(), active: true
    }));
    showSuccessNotification(`\u2713 Successfully subscribed to ${planName}!`);
    modal.remove();
  }, 1500);
}

function showSuccessNotification(message) {
  const n = document.createElement('div');
  n.className   = 'success-notification';
  n.textContent = message;
  document.body.appendChild(n);
  setTimeout(() => n.classList.add('show'), 100);
  setTimeout(() => {
    n.classList.remove('show');
    setTimeout(() => n.remove(), 300);
  }, 3500);
}

/* ─── FAQ ACCORDION ─── */
function toggleFaq(questionEl) {
  const item   = questionEl.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}