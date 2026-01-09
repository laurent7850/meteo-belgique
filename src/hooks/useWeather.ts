import { useState, useEffect, useCallback } from 'react';
import type { City, WeatherData, OpenMeteoResponse } from '../types';
import { getWeatherInfo, getWindDirection } from '../utils/weatherCodes';
import { loadCities } from '../utils/cities';

interface UseWeatherReturn {
  weatherData: WeatherData[];
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refresh: () => Promise<void>;
}

const fetchWeatherForCity = async (city: City): Promise<WeatherData> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&timezone=Europe/Brussels`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Erreur API');

  const data: OpenMeteoResponse = await response.json();
  const weatherInfo = getWeatherInfo(data.current.weather_code);

  return {
    ...city,
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    weatherCode: data.current.weather_code,
    weatherDescription: weatherInfo.description,
    weatherIcon: weatherInfo.icon,
    windSpeed: Math.round(data.current.wind_speed_10m),
    windDirection: getWindDirection(data.current.wind_direction_10m)
  };
};

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchAllWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cities = loadCities();
      const weatherPromises = cities.map(city => fetchWeatherForCity(city));
      const data = await Promise.all(weatherPromises);
      setWeatherData(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Impossible de charger les données météo.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllWeather();

    const interval = setInterval(fetchAllWeather, 600000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'meteoCities') {
        fetchAllWeather();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchAllWeather]);

  return { weatherData, loading, error, lastUpdate, refresh: fetchAllWeather };
};
