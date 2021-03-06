var apiKey = 'c4a1d2161527b3e5034c822be0331fe8'; // API key for OpenWeather API

$(document).ready(function() {
  // Obtains city and country codes
  $.getJSON("https://geoip.nekudo.com/api/en/", function(json) {
    var city = JSON.stringify(json.city);
    var countryCode = JSON.stringify(json.country.code);
    cityUnquote = city.substring(1, city.length - 1);
    $('#city').html(cityUnquote); //Removes quotes from city name


    // Obtains weather data and prints to page
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + city + ',' + countryCode + '&units=imperial&APPID=' + apiKey, function(json) {
      var tempF = json.main.temp;
      var tempC = (tempF - 32.0)*(5/9);
      tempC = tempC.toFixed(2);

      // Changed background image based on temperature
      if (tempF <= 32) {
        $('body').css({'background-image': 'url(images/cold.jpeg'});
      }
      else if (tempF > 32 && tempF <= 80) {
        $('body').css({'background-image': 'url(images/moderate.jpg'});
      }
      else {
        $('body').css({'background-image': 'url(images/hot.jpeg'});
      }

      var windSpeed = json.wind.speed;
      var weatherDesc = json.weather[0].main;

      $('#temp').html(tempF + ' &#176;F');
      $('#wind_speed').html(windSpeed);
      $('#desc').html(weatherDesc);

      // Conversion between F and C on click
      $('.tempToggle').click(function() {
        var degreeUnit = $('#temp').text();
        degreeUnit = degreeUnit.substring(degreeUnit.length - 1, degreeUnit.length);

        if (degreeUnit == 'F') {
          $("#temp").html(tempC + " &#176;C");
        }
        else {
          $("#temp").html(tempF + " &#176;F");
        }
      })
    });
  });
});
