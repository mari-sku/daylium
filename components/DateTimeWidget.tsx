import { useDateTime } from '@/hooks/useDateTime';
import { StyleSheet, Text, View } from 'react-native';


export function DateTimeWidget() {
  const { time, weekday, day, month, year } = useDateTime();

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>

      <Text style={styles.weekday}>{weekday}</Text>

      <Text style={styles.date}>
        {month} {day}, {year}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32
  },

  time: {
    fontFamily: 'Inter_500Medium',
    fontSize: 50,
    opacity: 0.75,
    lineHeight: 80,
    color: '#cd6b41'
  },

  weekday: {
    fontFamily: 'CormorantGaramond_400Regular',
    fontSize: 45,
    opacity: 0.75,
    marginTop: 2,
    marginBottom: 10,
    letterSpacing: 1
  },

  date: {
    fontFamily: 'Inter_300Light',
    fontSize: 20,
    letterSpacing: -0.5
  },
});