import { fetchWeather } from '@/services/weatherService';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

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
    const load = async (lat: number, lon: number) => {
      try {
        const data = await fetchWeather(lat, lon);
        setWeather(data);
      } catch (err) {
        setError('Failed to load weather');
      } finally {
        setLoading(false);
      }
    };

    const init = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      load(latitude, longitude);

      const subscription = AppState.addEventListener('change', (nextState) => {
        if (nextState === 'active') {
          load(latitude, longitude);
        }
      });

      return () => subscription.remove();
    };

    init();
  }, []);

  return { weather, loading, error };
}