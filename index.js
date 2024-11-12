function searchCity(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#city-search");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchElement.value;
  getWeatherData(searchElement.value);
}

function getWeatherData(city) {
  let apiKey = "6cef3c6b12ac03oa7c3c47900da5te44";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&untis=metric`;
  axios.get(apiUrl).then(displayWeatherData);
}
function displayWeatherData(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  let currentTempElement = document.querySelector("#current-temp-amount");
  let currentWeatherDescriptionElement = document.querySelector(
    "#current-weather-desription"
  );
  let currentWeatherDescription = response.data.condition.description;
  console.log(currentWeatherDescriptionElement);
  let city = response.data.city;
  let cityElement = document.querySelector("#current-city");
  let currentHumidity = response.data.temperature.humidity;
  let currentHumidityElement = document.querySelector("#current-humidity");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeedElement = document.querySelector("#current-wind-speed");
  let currentTempIcon = response.data.condition.icon_url;
  let currentTempIconElement = document.querySelector("#current-temp-icon");
  let currentDate = response.data.time;
  let currentDateElement = document.querySelector("#current-date");

  currentTempElement.innerHTML = currentTemp;
  currentWeatherDescriptionElement.innerHTML = currentWeatherDescription;
  cityElement.innerHTML = city;
  currentHumidityElement.innerHTML = `${currentHumidity}%`;
  currentWindSpeedElement.innerHTML = `${currentWindSpeed}km/h`;
  currentDateElement.innerHTML = getTime(currentDate);
  currentTempIconElement.innerHTML = `<img
                src="${currentTempIcon}"
                class="current-temp-icon"
              />`;
  getForcast(city);
}
function getTime(date) {
  time = new Date(date * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
  let hours = time.getHours();
  let minutes = time.getMinutes();
  console.log(minutes);
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${day} ${hours}:${minutes}`;
  return currentTime;
}
function getForcast(city) {
  let apiKey = "6cef3c6b12ac03oa7c3c47900da5te44";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function dispalyForecast(response) {
  let forecast = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast += `
  <div class="weather-forecast-daily">
            <div class="weather-forecast-day">${getForecastDay(
              day.time * 1000
            )}</div>
            <div >
             <img src="${
               response.data.daily[index].condition.icon_url
             }" class="weather-forecast-icon">
            </div>
            <div class="weather-forecast-temp">
              <div class="weather-forecast-temp-max">${Math.round(
                response.data.daily[index].temperature.maximum
              )}º</div>
              <div class="weather-forecast-temp-min">${Math.round(
                response.data.daily[index].temperature.minimum
              )}º</div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecast;
}
function getForecastDay(time) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(time);
  let WeekDay = days[date.getDay()];
  return WeekDay;
}

let formElement = document.querySelector("#submit-city-form");
formElement.addEventListener("submit", searchCity);
getWeatherData("Cape Town");

 
