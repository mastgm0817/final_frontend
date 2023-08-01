import styled from '@emotion/styled';
import React from 'react';
import useWeather from "../hooks/useWeather";


export default function Weather(){
    const weatherIconAPI = 'https://openweathermap.org/img/wn';
    const currentWeather = useWeather();

    return (
        <>
        <p>오늘 데이트 할 날씨는요 🤔</p>
        {
            currentWeather
            && <WeatherIcon
                alt={currentWeather.weather[0].description}
                src={`${weatherIconAPI}/${currentWeather.weather[0].icon}@2x.png`} />
        }
        </>
    )
}

const WeatherIcon = styled.img`
  width: auto;
  height: 100px;
`;