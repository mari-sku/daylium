import { CalendarWidget } from '@/components/CalendarWidget';
import { DateTimeWidget } from '@/components/DateTimeWidget';
import { WeatherWidget } from '@/components/WeatherWidget';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <DateTimeWidget />
      <WeatherWidget />
      <CalendarWidget />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: '#f5dbc3'
  },
});