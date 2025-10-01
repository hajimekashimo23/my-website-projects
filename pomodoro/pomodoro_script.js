let workMinutes = 25;
let breakMinutes = 5;

let mode = 'work';
let timeLeft = workMinutes * 60;
let timerInterval = null;
let sessionCount = 0;

const timerDisplay = document.getElementById('timerDisplay');
const modeLabel = document.getElementById('modeLabel');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const progressEl = document.getElementById('progress');
const sessionEl = document.getElementById('sessionCount');
const workMinInput = document.getElementById('workMin');
const breakMinInput = document.getElementById('breakMin');
const applyBtn = document.getElementById('applyBtn');

updateDisplay();
pauseBtn.disabled = true;

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
applyBtn.addEventListener('click', applyDurations);

function formatTime(s){
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}
function updateDisplay(){
  timerDisplay.textContent = formatTime(timeLeft);
  modeLabel.textContent = mode === 'work' ? 'Work' : 'Break';
  sessionEl.textContent = sessionCount;
  const total = (mode === 'work' ? workMinutes * 60 : breakMinutes * 60);
  const percent = ((total - timeLeft) / total) * 100;
  progressEl.style.width = `${Math.max(0, percent)}%`;
}
function tick(){
  if(timeLeft>0){ timeLeft--; updateDisplay(); }
  else {
    if(mode==='work'){ sessionCount++; mode='break'; timeLeft=breakMinutes*60; }
    else { mode='work'; timeLeft=workMinutes*60; }
    updateDisplay();
    flashCard();
  }
}
function startTimer(){
  if(timerInterval) return;
  timerInterval=setInterval(tick,1000);
  startBtn.disabled=true;
  pauseBtn.disabled=false;
  workMinInput.disabled=breakMinInput.disabled=true;
}
function pauseTimer(){
  clearInterval(timerInterval); timerInterval=null;
  startBtn.disabled=false; pauseBtn.disabled=true;
  workMinInput.disabled=breakMinInput.disabled=false;
}
function resetTimer(){
  pauseTimer();
  timeLeft=(mode==='work'?workMinutes*60:breakMinutes*60);
  updateDisplay();
}
function applyDurations(){
  const w=+workMinInput.value, b=+breakMinInput.value;
  if(w<1||b<1) return alert("Minutes must be ≥ 1");
  workMinutes=w; breakMinutes=b;
  pauseTimer(); mode='work'; sessionCount=0; timeLeft=workMinutes*60;
  updateDisplay();
}
function flashCard(){
  const card=document.querySelector('.card');
  card.style.transition='box-shadow 0.2s';
  card.style.boxShadow='0 0 0 6px rgba(255,107,107,0.18)';
  setTimeout(()=>{ card.style.boxShadow=''; },300);
}
/* End of Pomodoro-specific JS */