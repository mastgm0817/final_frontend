"use client"
import React from "react";
import useWeather from "../hooks/useWeather";
import Image from "next/image";
import "../public/css/weather.css";

export default function Weather() {
  const weatherIconAPI = "https://openweathermap.org/img/wn";
  const currentWeather = useWeather();

  return (
    <div className={`weather-container flex items-center justify-center`}>
      {currentWeather && (
        <div className="flex items-center">
          <Image
            alt={currentWeather.weather[0].description}
            src={`${weatherIconAPI}/${currentWeather.weather[0].icon}@2x.png`}
            width={100}
            height={100}
            className={`weather-icon mr-2`}
          />
          <div className="text-left">
            <span className="text-pink">{currentWeather.weather[0].description}</span>
          </div>
        </div>
      )}
    </div>
  );
}
