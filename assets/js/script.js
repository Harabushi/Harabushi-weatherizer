
function getCityCoords(cityName) {
  let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=19559b0b8287907b95d6fa90ee3b3663";

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data[0].lat, data[0].lon);
        getCityWeather(data[0].lat, data[0].lon);
      });
    }
    // else {
    //   alert("Error: City Not Found");
    // }
  });
}

function getCityWeather(lat, lon) {
  let cityApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=19559b0b8287907b95d6fa90ee3b3663";

  fetch(cityApiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      // console.log(data.current.clouds);
      // console.log(data.current.temp);
      // console.log(data.current.wind_speed);
      // console.log(data.current.humidity);
      // console.log(data.current.uvi);
      // console.log(data.daily[1].clouds);
      // console.log(data.daily[1].temp.day);
      // console.log(data.daily[1].wind_speed);
      // console.log(data.daily[1].humidity);
    })
  })
}