let currentWeatherEl = document.querySelector("#current")
let forecastWeatherEl = document.querySelector("#forecast")


function getCityCoords(cityName) {
  let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=19559b0b8287907b95d6fa90ee3b3663";

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        // console.log(data[0].lat, data[0].lon);
        getCityWeather(data[0].lat, data[0].lon, cityName);
      });
    }
    // this doesn't work, we get an empty response
    // else {
    //   alert("Error: City Not Found");
    // }
  });
}

function getCityWeather(lat, lon, cityName) {
  let cityApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=19559b0b8287907b95d6fa90ee3b3663";

  fetch(cityApiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      // console.log(data.current.weather[0].icon);
      // console.log(data.current.temp);
      // console.log(data.current.wind_speed);
      // console.log(data.current.humidity);
      // console.log(data.current.uvi);
      // console.log(data.daily[1].weather[0].icon);
      // console.log(data.daily[1].temp.day);
      // console.log(data.daily[1].wind_speed);
      // console.log(data.daily[1].humidity);

      displayCurrent(data.current, cityName);
      displayForecast(data.daily);
    })
  });
};

function displayCurrent(data, cityName) {
  currentWeatherEl.textContent = "";

  let text = cityName;
  text = text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  // console.log(data);
  // get current date
  let today = new Date(data.dt * 1000);
  let formattedDate = today.toLocaleDateString();

  // print current title
  let currentTitle = document.createElement("h2");
  currentTitle.textContent = text + " " + formattedDate; 
  let iconId = data.weather[0].icon;
  let iconEl = document.createElement("img");
  iconEl.src = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
  currentTitle.appendChild(iconEl);

  // print current temp
  let tempCurrent = data.temp;
  let tempEl = document.createElement("div");
  tempEl.textContent = "Temp: " + tempCurrent + "\u00B0F";

  // print current wind speed
  let windCurrent = data.wind_speed;
  let windEl = document.createElement("div");
  windEl.textContent = "Wind: " + windCurrent + " MPH";

  // print current humidity
  let humidityCurrent = data.humidity;
  let humidityEl = document.createElement("div");
  humidityEl.textContent = "Humidity: " + humidityCurrent + " %";

  // print current uvi
  let uviCurrent = data.uvi;
  let uviEl = document.createElement("div");
  uviEl.textContent = "UV Index: " + uviCurrent;


  currentWeatherEl.appendChild(currentTitle);
  currentWeatherEl.appendChild(tempEl);
  currentWeatherEl.appendChild(windEl);
  currentWeatherEl.appendChild(humidityEl);
  currentWeatherEl.appendChild(uviEl);
  // currentWeatherEl.appendChild(iconEl);
};

function displayForecast(data) {
  // console.log(data);
  for ( i = 1; i < 6; i++) {

  }
};

getCityCoords("minneapolis")