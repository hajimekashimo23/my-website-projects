let hunger = 100;
let happiness = 100;
let energy = 100;

function updateStats() {
  document.getElementById("hunger").textContent = hunger;
  document.getElementById("happiness").textContent = happiness;
  document.getElementById("energy").textContent = energy;
}

function feedPet() {
  hunger = Math.min(100, hunger + 20);
  energy = Math.max(0, energy - 5);
  updateStats();
}

function playWithPet() {
  happiness = Math.min(100, happiness + 20);
  energy = Math.max(0, energy - 10);
  hunger = Math.max(0, hunger - 10);
  updateStats();
}

function sleepPet() {
  energy = Math.min(100, energy + 30);
  hunger = Math.max(0, hunger - 15);
  updateStats();
}

updateStats();
