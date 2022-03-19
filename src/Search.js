import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import "./Search.css"

export default function Search() {
  let [city, setCity] = useState();
  let [weatherData, setWeatherData] = useState({ ready: false });

  function getCityName(event) {
    setCity(event.target.value);
  }

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temp: response.data.main.temp,
      humidity: response.data.main.humidity,
      desc: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });
  }
  function getSearch(event) {
    event.preventDefault();

    if (city && city.length > 0 && city !== null) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=860125333e4516777dadc25699e05462&units=metric`;
      axios.get(url).then(handleResponse);
    } else {
      alert("Please enter the city");
    }
  }

  return (
    <div className="Search">
      <form onSubmit={getSearch}>
        <input
          type="text"
          placeholder="Please enter the city"
          onChange={getCityName}
        />

        <input type="submit" value="Search" />
      </form>

      {weatherData.ready ? (
        <div className="result">
          <ul>
            <li>Temp: {weatherData.temp}</li>
            <li>Humidity: {weatherData.humidity}</li>
            <li>Description: {weatherData.desc}</li>
            <li>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt=""
              />
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
