import React from "react";
import useWeather from "../hooks/useWeather";
import styled from "@emotion/styled";
import "../public/css/weather.css";

export default function Weather() {
  const weatherIconAPI = "https://openweathermap.org/img/wn";
  const currentWeather = useWeather();

  return (
    <div className="weather-container">
      <h3>오늘 데이트 할 날씨는요 🤔</h3>
      {currentWeather && (
        <WeatherIcon
          alt={currentWeather.weather[0].description}
          src={`${weatherIconAPI}/${currentWeather.weather[0].icon}@2x.png`}
          className="weather-icon"
        />
      )}
    </div>
  );
}

const WeatherIcon = styled.img`
  width: auto;
  height: 100px;
`;
