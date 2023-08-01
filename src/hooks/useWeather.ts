import { useEffect, useState } from 'react';
import axios from 'axios';

function useWeather() {
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    });
  }, [API_KEY]);

  return weather;
}

export default useWeather;
