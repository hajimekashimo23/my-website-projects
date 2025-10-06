let hunger = 100;
let happiness = 100;
let energy = 100;
let level = 1;
let age = 0;
let pet = document.getElementById("pet");
let bg = document.getElementById("environment");
let bgMusic = document.getElementById("bgMusic");

// 🔈 Play background music automatically
bgMusic.volume = 0.3;
bgMusic.play().catch(() => {
  console.log("Autoplay blocked — user will need to interact first.");
});

// 🐾 Update stats and pet mood
function updateStats() {
  document.getElementById("hunger").textContent = hunger;
  document.getElementById("happiness").textContent = happiness;
  document.getElementById("energy").textContent = energy;
  document.getElementById("petLevel").textContent = level;
  document.getElementById("petAge").textContent = age;

  if (hunger < 30 || happiness < 30 || energy < 30) {
    pet.textContent = "😢";
  } else if (happiness > 80 && energy > 60) {
    pet.textContent = "😄";
  } else {
    pet.textContent = "🐶";
  }
}

// 🍗 Actions
function feedPet() {
  hunger = Math.min(100, hunger + 25);
  energy = Math.max(0, energy - 5);
  happiness = Math.min(100, happiness + 5);
  jumpPet();
}

function playWithPet() {
  happiness = Math.min(100, happiness + 20);
  energy = Math.max(0, energy - 10);
  hunger = Math.max(0, hunger - 10);
  jumpPet();
}

function sleepPet() {
  energy = Math.min(100, energy + 30);
  hunger = Math.max(0, hunger - 15);
  jumpPet();
}

// 🕹️ Pet Jump Animation
function jumpPet() {
  pet.classList.add("jump");
  setTimeout(() => pet.classList.remove("jump"), 300);
  updateStats();
}

// 🌙 Day/Night Cycle
let isDay = true;
setInterval(() => {
  isDay = !isDay;
  bg.style.background = isDay
    ? "url('day.jpg') center/cover no-repeat"
    : "url('night.jpeg') center/cover no-repeat";
  document.body.style.background = isDay
    ? "linear-gradient(to bottom, #87ceeb, #ffffff)"
    : "linear-gradient(to bottom, #00111a, #000)";
}, 20000); // every 20s

// 🧮 Stat decrease over time
setInterval(() => {
  hunger = Math.max(0, hunger - 3);
  happiness = Math.max(0, happiness - 2);
  energy = Math.max(0, energy - 1);

  // Aging + leveling
  if (Math.random() < 0.05) {
    age++;
    if (age % 5 === 0) level++;
  }

  // If dead
  if (hunger === 0 && happiness === 0 && energy === 0) {
    pet.textContent = "💀";
    clearInterval(this);
    alert("Your pet has passed away... 😢");
  }

  updateStats();
}, 3000);

updateStats();
