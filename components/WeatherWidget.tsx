import { Card } from '@/components/Card';
import { useWeather } from '@/hooks/useWeather';
import { StyleSheet, Text, View } from 'react-native';

export function WeatherWidget() {
  const { weather, loading, error } = useWeather();

  if (loading) return <Text>Loading weather...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <Card>
    <View style={styles.container}>
      <Text style={styles.temp}>{Math.round(weather.temperature)}°C</Text>
      <Text style={styles.wind}>Wind: {weather.windspeed} km/h</Text>
    </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  temp: {
    fontSize: 36,
    fontWeight: '600',
  },
  wind: {
    fontSize: 16,
    opacity: 0.6,
  },
});