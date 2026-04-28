import { useDateTime } from '@/hooks/useDateTime';
import { StyleSheet, Text, View } from 'react-native';

export function DateTimeWidget() {
  const { time, weekday, day, month, year } = useDateTime();

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}, {weekday}</Text>
      <Text style={styles.date}>{day} of {month}, {year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  time: {
    fontSize: 40,
    fontWeight: '400',
    opacity: 0.6,
    marginBottom: 4,
  },
  date: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
});