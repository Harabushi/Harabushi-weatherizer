let currentWeatherEl = document.querySelector("#current");
let forecastWeatherEl = document.querySelector("#forecast-cards");
let userFormEl = document.querySelector("#form-input");
let cityNameEl = document.querySelector("#city-name");
let previousSearchEl = document.querySelector("#searches");
let previousSearches = [];


function getCityCoords(cityName) {
  let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=19559b0b8287907b95d6fa90ee3b3663";

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        getCityWeather(data[0].lat, data[0].lon, cityName);
      });
    }
    // this doesn't work, we get an empty response
    // else {
    //   alert("Error: City Not Found");
    // }
  }).catch(function (error) {
    console.log(error);
  });
};

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
      if (previousSearches.includes(cityName)){
        console.log("already in array")
      }
      else {
        previousSearches.unshift(cityName);
        saveSearch();
      }
    })
  });
};

function displayCurrent(data, cityName) {
  currentWeatherEl.textContent = "";

  // let text = cityName;
  // text = text.toLowerCase()
  //   .split(' ')
  //   .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  //   .join(' ');

  // console.log(data);
  // get current date
  let today = new Date(data.dt * 1000);
  let formattedDate = today.toLocaleDateString();

  // print current title
  let currentTitle = document.createElement("h2");
  currentTitle.textContent = cityName + " " + formattedDate; 
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
  forecastWeatherEl.textContent = "";
  for ( i = 1; i < 6; i++) {
    let forecastCard = document.createElement("div");
    forecastCard.classList = "forecast-card";
    
    // forecast date
    let forecastDate = new Date(data[i].dt * 1000);
    let formattedDate = forecastDate.toLocaleDateString();
    let dateEl = document.createElement("h4");
    dateEl.textContent = formattedDate;

    // forecast weather icon
    let iconId = data[i].weather[0].icon;
    let iconEl = document.createElement("img");
    iconEl.src = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";

    // forecast temp
    let forecastTemp = data[i].temp.day;
    let tempEl = document.createElement("div");
    tempEl.textContent = "Temp: " + forecastTemp + "\u00B0F";

    // forecast wind
    let forecastWind= data[i].wind_speed;
    let windEl = document.createElement("div");
    windEl.textContent = "Wind: " + forecastWind + " MPH";

    // print current humidity
    let forecastHumidity = data[i].humidity;
    let humidityEl = document.createElement("div");
    humidityEl.textContent = "Humidity: " + forecastHumidity + " %";
  

    // test shortening if I have time
    forecastCard.appendChild(dateEl);
    forecastCard.appendChild(iconEl);
    forecastCard.appendChild(tempEl);
    forecastCard.appendChild(windEl);
    forecastCard.appendChild(humidityEl);

    forecastWeatherEl.appendChild(forecastCard);

  }
};

function displayPreviouseSearches (searches) {
  previousSearchEl.textContent = "";

  for ( i = 0; i < searches.length; i++ ) {
    let searchName = searches[i];

    // create button container
    let searchButtonEl = document.createElement("button");
    searchButtonEl.classList = "btn";
    searchButtonEl.setAttribute("id", searchName);
    searchButtonEl.textContent = searchName;

    previousSearchEl.appendChild(searchButtonEl);
    
  }
};

function saveSearch () {
  localStorage.setItem("previoussearches", JSON.stringify(previousSearches));
};

function loadSearches () {
  // local storage check
  if (localStorage.getItem("previoussearches")) {
    previousSearches = JSON.parse(localStorage.getItem("previoussearches"));
    console.log(previousSearches);
    displayPreviouseSearches (previousSearches);
  }
  else {
    previousSearches = [];
  }
};

function formSubmitHandler (event) {
  event.preventDefault();
  // debugger;

  // get value from city search, replace method found online to remove extra spaces in between words
  let cityName = cityNameEl.value.replace(/\s+/g, ' ').trim();
  cityName = cityName.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  if (cityName) {    
    // pass new list of 'previous' searches
    loadSearches();

    getCityCoords(cityName);

    cityNameEl.value = "";
  }
  else {
    alert("Please enter a city name")
  }
};

function previousSearchHandler (event) {
  let previousCity = event.target.getAttribute("id");
  getCityCoords(previousCity);
}

userFormEl.addEventListener("submit", formSubmitHandler);
previousSearchEl.addEventListener("click", previousSearchHandler);

loadSearches();