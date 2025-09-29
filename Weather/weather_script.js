const apiKey = "7ec41c3671e084aad44c221cc57b74a2"; // replace with your OpenWeather API key
const effectsContainer = document.getElementById("weatherEffects");

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = `🌡️ Temp: ${data.main.temp} °C`;
    document.getElementById("wind").textContent = `💨 Wind: ${data.wind.speed} m/s`;

    // Set icon dynamically
    const mainWeather = data.weather[0].main.toLowerCase();
    let icon = "☀️"; 
    let bgClass = "clear"; 

    if (mainWeather.includes("cloud")) { icon = "☁️"; bgClass = "clouds"; }
    if (mainWeather.includes("rain")) { icon = "🌧️"; bgClass = "rain"; }
    if (mainWeather.includes("snow")) { icon = "❄️"; bgClass = "snow"; }
    if (mainWeather.includes("clear")) { icon = "☀️"; bgClass = "clear"; }
    if (mainWeather.includes("thunderstorm")) { icon = "⛈️"; bgClass = "thunderstorm"; }

    document.getElementById("weatherIcon").textContent = icon;

    // Time-based check (day/night)
    const currentHour = new Date().getHours();
    if (currentHour >= 19 || currentHour < 6) {
      bgClass = "night";
    }

    // Update background
    document.body.className = ""; 
    document.body.classList.add(bgClass);

    // Apply effects
    applyWeatherEffects(bgClass);

  } catch (error) {
    alert("❌ Error: " + error.message);
  }
}

function applyWeatherEffects(condition) {
  effectsContainer.innerHTML = ""; // clear old effects

  if (condition === "rain") {
    for (let i = 0; i < 50; i++) {
      let drop = document.createElement("div");
      drop.classList.add("raindrop");
      drop.style.left = Math.random() * 100 + "vw";
      drop.style.animationDuration = (0.5 + Math.random()) + "s";
      effectsContainer.appendChild(drop);
    }
  }

  if (condition === "snow") {
    for (let i = 0; i < 30; i++) {
      let flake = document.createElement("div");
      flake.classList.add("snowflake");
      flake.textContent = "❄";
      flake.style.left = Math.random() * 100 + "vw";
      flake.style.fontSize = 12 + Math.random() * 20 + "px";
      flake.style.animationDuration = (3 + Math.random() * 3) + "s";
      effectsContainer.appendChild(flake);
    }
  }

  if (condition === "night") {
    for (let i = 0; i < 50; i++) {
      let star = document.createElement("div");
      star.classList.add("star");
      star.style.left = Math.random() * 100 + "vw";
      star.style.top = Math.random() * 100 + "vh";
      effectsContainer.appendChild(star);
    }
  }
}
