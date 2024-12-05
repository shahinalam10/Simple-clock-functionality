// Function to show the corresponding section based on the clicked link
function showSection(sectionId) {
// Hide all sections
const sections = document.querySelectorAll('.feature');
sections.forEach(section => {
  section.style.display = 'none';
});

// Show the selected section
const activeSection = document.getElementById(sectionId);
if (activeSection) {
  activeSection.style.display = 'block';
}
}

// Add event listeners to the navbar links
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
link.addEventListener('click', function(event) {
  // Prevent default anchor behavior
  event.preventDefault();

  // Get the target section ID from the href attribute
  const targetSection = link.getAttribute('href').substring(1); // Remove the # symbol
  showSection(targetSection);
});
});

// Initially show the "home" section
showSection('home');

  // Get clock hands
  const hourHand = document.getElementById('hour');
  const minuteHand = document.getElementById('minute');
  const secondHand = document.getElementById('second');

  // Function to update clock hands
  function updateClock() {
      const now = new Date();

      // Get the current time
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // Calculate angles for the clock hands
      const hourAngle = (360 / 12) * (hours % 12 + minutes / 60);
      const minuteAngle = (360 / 60) * minutes;
      const secondAngle = (360 / 60) * seconds;

      // Apply rotations to the hands
      hourHand.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
      minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
      secondHand.style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
  }

  // Update clock every second
  setInterval(updateClock, 1000);

  // Initialize clock
  updateClock();



    // Select all navbar links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Add click event listener to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });




    document.getElementById('clock-bg-color').addEventListener('input', function() {
        document.querySelector('.clock').style.backgroundColor = this.value;
      });
      
      document.getElementById('hour-hand-color').addEventListener('input', function() {
        document.querySelector('.hour').style.backgroundColor = this.value;
      });
      
      document.getElementById('minute-hand-color').addEventListener('input', function() {
        document.querySelector('.minute').style.backgroundColor = this.value;
      });
      
      document.getElementById('second-hand-color').addEventListener('input', function() {
        document.querySelector('.second').style.backgroundColor = this.value;
      });
      
      document.getElementById('font-size').addEventListener('input', function() {
        const fontSize = this.value + "px";
        document.querySelectorAll('.number').forEach(function(num) {
          num.style.fontSize = fontSize;
        });
      });

      
      function updateDigitalClock() {
        const timeElement = document.getElementById('time');
        const now = new Date();
        
        // Format the time to HH:MM:SS
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Display the time
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
      }
      
      // Update the clock every second
      setInterval(updateDigitalClock, 1000);
      
      // Initialize the digital clock when the page loads
      updateDigitalClock();
      
 
      
      let is24HourFormat = true;
      const timeDisplay = document.getElementById('time');
      const toggleButton = document.getElementById('toggle-format');
      
      // Function to update the time
      function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let ampm = '';
      
        // Convert to 12-hour format if needed
        if (!is24HourFormat) {
          ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12;
        }
      
        // Format minutes and seconds
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
      
        // Display the time
        timeDisplay.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
      }
      
      // Toggle between 12-hour and 24-hour formats
      toggleButton.addEventListener('click', () => {
        is24HourFormat = !is24HourFormat;
        updateTime(); // Update time display when format changes
      });
      
      // Initialize the clock
      updateTime();
      setInterval(updateTime, 1000); // Update every second


//Alarm Clock
let alarmTime = null;
let alarmInterval = null;
let alarmSound = new Audio();
let snoozeTime = 5; // Snooze for 5 minutes by default

document.getElementById("set-alarm").addEventListener("click", function() {
    const alarmInput = document.getElementById("alarm-time").value;
    const selectedRingtone = document.getElementById("ringtone-select").value;

    if (alarmInput) {
        alarmTime = alarmInput;
        alarmSound.src = selectedRingtone; // Set the ringtone
        document.getElementById("alarm-status").innerText = `Alarm set for: ${alarmTime}`;
        document.getElementById("alarm-status").classList.remove("text-muted");
        document.getElementById("alarm-status").classList.add("text-success");

        // Reset and start checking time
        if (alarmInterval) clearInterval(alarmInterval);
        alarmInterval = setInterval(checkAlarm, 1000); // Check every second
    } else {
        alert("Please set a valid alarm time.");
    }
});

function checkAlarm() {
    const currentTime = new Date();
    const currentHour = String(currentTime.getHours()).padStart(2, "0");
    const currentMinute = String(currentTime.getMinutes()).padStart(2, "0");
    const currentTimeString = `${currentHour}:${currentMinute}`;

    if (currentTimeString === alarmTime) {
        triggerAlarm();
    }
}

function triggerAlarm() {
    clearInterval(alarmInterval); // Stop checking time after alarm is triggered
    document.getElementById("alarm-message").classList.remove("d-none");
    alarmSound.play();
}

document.getElementById("snooze").addEventListener("click", function() {
    let snoozeTimeString = `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes() + snoozeTime).padStart(2, '0')}`;
    alarmTime = snoozeTimeString;  // Update alarm time to snooze time
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById("alarm-message").classList.add("d-none");
    document.getElementById("alarm-status").innerText = `Snooze for: ${snoozeTime} minutes.`;
    document.getElementById("alarm-status").classList.remove("text-muted");
    document.getElementById("alarm-status").classList.add("text-warning");
    alarmInterval = setInterval(checkAlarm, 1000); // Restart the alarm checking
});

document.getElementById("dismiss").addEventListener("click", function() {
    clearInterval(alarmInterval);
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById("alarm-message").classList.add("d-none");
    document.getElementById("alarm-status").innerText = "Alarm dismissed.";
    document.getElementById("alarm-status").classList.remove("text-success", "text-warning");
    document.getElementById("alarm-status").classList.add("text-muted");
});


//stopwatch
let stopwatchInterval;
let elapsedTime = 0; // Time in milliseconds
let running = false;
let laps = [];

const stopwatchTime = document.getElementById('stopwatch-time');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.querySelector('#laps .list-group');
const themeToggle = document.getElementById('theme-toggle');

// Format time to HH:MM:SS.MMM
function formatTime(ms) {
  const hrs = Math.floor(ms / 3600000).toString().padStart(2, '0');
  const mins = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
  const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  const millis = (ms % 1000).toString().padStart(3, '0');
  return `${hrs}:${mins}:${secs}.${millis}`;
}

// Update stopwatch display
function updateDisplay() {
  stopwatchTime.textContent = formatTime(elapsedTime);
}

// Start Stopwatch
startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;

    const startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
});

// Pause Stopwatch
pauseBtn.addEventListener('click', () => {
  if (running) {
    running = false;
    clearInterval(stopwatchInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
});

// Reset Stopwatch
resetBtn.addEventListener('click', () => {
  running = false;
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  laps = [];
  updateDisplay();
  lapsList.innerHTML = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
});

// Record Lap
lapBtn.addEventListener('click', () => {
  if (running) {
    laps.push(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.className = 'list-group-item';
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
    lapsList.appendChild(lapItem);
    lapsList.scrollTop = lapsList.scrollHeight; // Auto-scroll to the newest lap
  }
});

// Toggle Theme
themeToggle.addEventListener('click', () => {
  document.getElementById('stopwatch').classList.toggle('dark-mode');
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  switch (e.key.toLowerCase()) {
    case 's':
      startBtn.click();
      break;
    case 'p':
      pauseBtn.click();
      break;
    case 'r':
      resetBtn.click();
      break;
    case 'l':
      lapBtn.click();
      break;
  }
});

// Initialize Display
updateDisplay();


// weather
const apiKey = "79e8a19740f0687422c9011db452a193";
const weatherWidget = document.getElementById("weather-widget");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weather-icon");
const description = document.getElementById("description");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const forecastCards = document.getElementById("forecast-cards");
const citySearch = document.getElementById("city-search");
const searchBtn = document.getElementById("search-btn");

let isCelsius = true;
let isDarkMode = false;

// Fetch Weather Data
async function fetchWeather(city = "Dhaka") {
  try {
    const unit = isCelsius ? "metric" : "imperial";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
    );
    const data = await response.json();
    updateWeatherUI(data);
    fetchForecast(city);
  } catch (error) {
    alert("City not found. Please try another city.");
  }
}

// Fetch 2-Day Forecast Data
async function fetchForecast(city) {
  const unit = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
  );
  const data = await response.json();
  
  // Filter for today and tomorrow's forecast
  const today = new Date().getDate();
  const tomorrow = new Date();
  tomorrow.setDate(today + 1);
  const filteredForecast = data.list.filter((entry) => {
    const forecastDate = new Date(entry.dt_txt).getDate();
    return forecastDate === today || forecastDate === tomorrow.getDate();
  });

  updateForecastUI(filteredForecast);
}


// Update Weather UI
function updateWeatherUI(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°${isCelsius ? "C" : "F"}`;
  description.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  windSpeed.textContent = data.wind.speed;
  humidity.textContent = data.main.humidity;
}

// Update Forecast UI
function updateForecastUI(forecast) {
  forecastCards.innerHTML = ""; // Clear previous cards
  forecast
    .filter((_, index) => index % 8 === 0) // Show one forecast per day
    .forEach((day) => {
      const card = document.createElement("div");
      card.classList.add("forecast-card");
      card.innerHTML = `
        <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon" />
        <p>${Math.round(day.main.temp)}°${isCelsius ? "C" : "F"}</p>
        <p>${day.weather[0].description}</p>
      `;
      forecastCards.appendChild(card);
    });
}

// Toggle Temperature Unit
searchBtn.addEventListener("click", () => {
  const city = citySearch.value.trim();
  if (city) fetchWeather(city);
});



// Detect Location
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
  },
  () => fetchWeather()
);

async function fetchWeatherByCoords(lat, lon) {
  const unit = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
  );
  const data = await response.json();
  updateWeatherUI(data);
}




//smart calendar// app.js

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const suggestedTasks = [
    "Meeting with team at 10:00 AM",
    "Work on project X until 1:00 PM",
    "Lunch break at 1:00 PM",
    "Client call at 3:00 PM",
    "Reply to emails and organize files at 4:00 PM"
];

// Get elements
const calendarNav = document.querySelector(".calendar-nav");
const calendarMonthYear = document.querySelector(".calendar-month-year");
const calendarDays = document.getElementById("calendar-days");
const prevButton = document.querySelector(".calendar-nav-prev");
const nextButton = document.querySelector(".calendar-nav-next");
const taskList = document.getElementById("suggested-tasks");

let currentDate = new Date();

function updateCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Update header
    calendarMonthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

    // Clear previous days
    calendarDays.innerHTML = "";

    // Add empty spaces before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("empty-day");
        calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    for (let i = 1; i <= lastDate; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("day");
        dayBox.textContent = i;
        calendarDays.appendChild(dayBox);
    }
}

// Load task suggestions
function loadSuggestedTasks() {
    taskList.innerHTML = "";
    suggestedTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
    });
}

// Change month
prevButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
    loadSuggestedTasks();
});

nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
    loadSuggestedTasks();
});

// Initialize
updateCalendar();
loadSuggestedTasks();



//quotes
// Define quotes for different times of the day
const quotes = {
  morning: [
    "Good Morning! Start your day with a smile and a positive mindset.",
    "Rise and shine, it’s a brand new day!"
  ],
  afternoon: [
    "Keep going, you're doing great!",
    "The afternoon is a perfect time to reset and refocus."
  ],
  evening: [
    "Wind down and take pride in your achievements today.",
    "A calm evening leads to a peaceful night."
  ],
  night: [
    "Good night! Rest well and recharge for tomorrow.",
    "End your day with gratitude and peace of mind."
  ]
};

// Function to display the current time
function displayTime() {
  const timeElement = document.getElementById("current-time-display");
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  timeElement.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  // Fetch the appropriate quote based on time of day
  updateQuote(hours);
}

// Function to update the quote based on the current time
function updateQuote(hours) {
  let quoteText = '';
  if (hours >= 5 && hours < 12) {
    quoteText = getRandomQuote(quotes.morning);
  } else if (hours >= 12 && hours < 17) {
    quoteText = getRandomQuote(quotes.afternoon);
  } else if (hours >= 17 && hours < 21) {
    quoteText = getRandomQuote(quotes.evening);
  } else {
    quoteText = getRandomQuote(quotes.night);
  }

  const quoteDisplay = document.getElementById("current-quote");
  quoteDisplay.textContent = quoteText;

  // Show browser notification
  showNotification(quoteText);
}

// Get a random quote from a given array
function getRandomQuote(quoteArray) {
  return quoteArray[Math.floor(Math.random() * quoteArray.length)];
}

// Show browser notification
function showNotification(quoteText) {
  if (Notification.permission === 'granted') {
    new Notification('Motivational Quote', {
      body: quoteText,
      icon: 'https://via.placeholder.com/100'
    });
  }
}

// Ask for permission to show notifications
if (Notification.permission !== 'denied') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted');
    }
  });
}

// Modal Management (Add/Edit Quote)
const modal = document.getElementById("quote-modal");
const closeModal = document.getElementById("close-modal-btn");
const addQuoteBtn = document.getElementById("add-quote-btn");
const editQuoteBtn = document.getElementById("edit-quote-btn");
const saveQuoteBtn = document.getElementById("save-quote-btn");
const quoteInput = document.getElementById("quote-input");

addQuoteBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  quoteInput.value = '';
});

editQuoteBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  quoteInput.value = document.getElementById("current-quote").textContent;
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

saveQuoteBtn.addEventListener("click", () => {
  const newQuote = quoteInput.value;
  document.getElementById("current-quote").textContent = newQuote;
  modal.style.display = "none";
  alert("Quote saved!");
});

// Initialize the display
displayTime();
setInterval(displayTime, 60000); // Update every minute


