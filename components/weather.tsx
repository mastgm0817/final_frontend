import React from "react";
import useWeather from "../hooks/useWeather";
import styled from "@emotion/styled";
import Image from "next/image";
import "../public/css/weather.css";

export default function Weather() {
  const weatherIconAPI = "https://openweathermap.org/img/wn";
  const currentWeather = useWeather();

  return (
    <div className="text-center m-20 flex flex-col items-center" style={{ marginTop: "20px" }}>
      <h3 className="mb-4">오늘 데이트 할 날씨는요 🤔</h3>
      {currentWeather && (
        <div className="w-auto h-100">
          <Image
            alt={currentWeather.weather[0].description}
            src={`${weatherIconAPI}/${currentWeather.weather[0].icon}@2x.png`}
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
}