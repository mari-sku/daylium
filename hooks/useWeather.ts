import { fetchWeather } from '@/services/weatherService';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export interface ForecastHour {
  hour: number;
  temperature: number;
  weatherCode: number;
}

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weatherCode: number;
  precipitationProbability: number;
  forecast: ForecastHour[];
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission denied');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const data = await fetchWeather(loc.coords.latitude, loc.coords.longitude);
        setWeather(data);
      } catch (err) {
        setError('Failed to load weather');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { weather, loading, error };
}