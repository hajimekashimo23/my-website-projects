let countdown;
let timerDisplay = document.getElementById("timer");
let egg = document.getElementById("egg");

// add yolk inside egg
let yolk = document.createElement("div");
yolk.classList.add("yolk");
egg.appendChild(yolk);

function startTimer(minutes) {
  clearInterval(countdown);

  let time = minutes * 60; // convert to seconds
  displayTime(time);
  resetEgg();

  countdown = setInterval(() => {
    time--;
    displayTime(time);

    if (time <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "✅ Done!";
      timerDisplay.style.animation = "flash 1s infinite";
      crackEgg();
    }
  }, 1000);
}

function displayTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  timerDisplay.textContent = `⏱ ${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function crackEgg() {
  egg.classList.add("cracked");
}

function resetEgg() {
  egg.classList.remove("cracked");
  timerDisplay.style.animation = "none";
}
document.getElementById("soft").addEventListener("click", () => startTimer(3));
document.getElementById("medium").addEventListener("click", () => startTimer(5));
document.getElementById("hard").addEventListener("click", () => startTimer(8)); 
document.getElementById("reset").addEventListener("click", () => {
  clearInterval(countdown);
  timerDisplay.textContent = "⏱ 0:00";
  resetEgg();
}); 

// Initialize display
displayTime(0);
resetEgg();
