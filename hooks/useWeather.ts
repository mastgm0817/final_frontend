import { useEffect, useState } from "react";
import axios from "axios";
import WeatherData from "../types/weather";

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=kr`
        );
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    });
  }, [API_KEY]);

  return weather;
}