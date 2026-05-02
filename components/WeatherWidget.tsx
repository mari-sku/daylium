import { Card } from '@/components/Card';
import { useWeather } from '@/hooks/useWeather';
import { getWeatherIcon } from '@/utils/weatherIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export function WeatherWidget() {
  const { weather, loading, error } = useWeather();

  if (loading) return <Text>Loading weather...</Text>;
  if (error) return <Text>{error}</Text>;

  const icon = getWeatherIcon(weather.weatherCode);

  return (
    <Card>
      <View style={styles.container}>

        <MaterialCommunityIcons
          name={icon.name as any}
          size={44}
          color={icon.color}
        />

        <Text style={styles.temp}>
          {Math.round(weather.temperature)}°C
        </Text>

        <View style={styles.stats}>

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={18}
              color="#666"
            />
            <Text style={styles.text}>
              {weather.windspeed} km/h
            </Text>
          </View>

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="water-outline"
              size={18}
              color="#666"
            />
            <Text style={styles.text}>
              {weather.precipitationProbability}%
            </Text>
          </View>

        </View>

      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  temp: {
    fontSize: 36,
    fontWeight: '600',
    marginHorizontal: 14,
  },

  stats: {
    flexDirection: 'column',
    marginLeft: 50,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },

  text: {
    fontSize: 14,
    opacity: 0.6,
    marginLeft: 6,
  },
});