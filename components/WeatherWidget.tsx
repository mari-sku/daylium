import { Card } from '@/components/Card';
import { ForecastHour, useWeather } from '@/hooks/useWeather';
import { getWeatherIcon } from '@/utils/weatherIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

function formatHour(hour: number): string {
  return `${String(hour).padStart(2, '0')}:00`;
}

export function WeatherWidget() {
  const { weather, loading, error } = useWeather();

  if (loading) return <Text>Loading weather...</Text>;
  if (error) return <Text>{error}</Text>;
  if (!weather) return <Text>Weather couldn&apost;t be fetched</Text>;

  const icon = getWeatherIcon(weather.weatherCode);

  return (
    <Card>
      <View style={styles.container}>
        <MaterialCommunityIcons name={icon.name as any} size={36} color={icon.color} />
        <Text style={styles.temp}>{Math.round(weather.temperature)}°C</Text>
        <View style={styles.stats}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="weather-windy" size={16} color="#666" />
            <Text style={styles.text}>{weather.windspeed} km/h</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="water-outline" size={16} color="#666" />
            <Text style={styles.text}>{weather.precipitationProbability}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.forecast}>
        {weather.forecast.map((item: ForecastHour) => {
          const forecastIcon = getWeatherIcon(item.weatherCode);
          return (
            <View key={item.hour} style={styles.forecastItem}>
              <Text style={styles.forecastHour}>{formatHour(item.hour)}</Text>
              <MaterialCommunityIcons name={forecastIcon.name as any} size={20} color={forecastIcon.color} />
              <Text style={styles.forecastTemp}>{item.temperature}°</Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: {
    fontSize: 26,
    fontWeight: '600',
    marginHorizontal: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.70,
  },
  stats: {
    flexDirection: 'column',
    marginLeft: 40,
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
    fontSize: 13,
    marginLeft: 6,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  forecast: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  forecastItem: {
    alignItems: 'center',
    paddingVertical: 8,
    gap: 2,
    width: '12.5%',
  },
 forecastHour: {
  fontSize: 12, 
  opacity: 0.6,
  fontFamily: 'Inter_400Regular',
  paddingBottom: 10
},
forecastTemp: {
  fontSize: 16,
  fontWeight: '500',
  fontFamily: 'Inter_400Regular',
  paddingTop: 8
},
});