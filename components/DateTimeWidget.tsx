import { useDateTime } from '@/hooks/useDateTime';
import { Image, StyleSheet, Text, View } from 'react-native';


export function DateTimeWidget() {
  const { time, weekday, day, month, year } = useDateTime();

  return (
    <View style={styles.row}>
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.weekday}>{weekday}</Text>
      <Text style={styles.date}>{month} {day}, {year}</Text>
    </View>
     <Image source={require('@/assets/images/sun_image.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    paddingRight: 16,
  },
  time: {
    fontFamily: 'Inter_500Medium',
    fontSize: 58,
    opacity: 0.75,
    lineHeight: 58,
    color: '#a75836',
    letterSpacing: 1,
  },
  weekday: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 38,
    opacity: 0.7,
    marginTop: 2,
    marginBottom: 4,
    letterSpacing: 2,
  },
  date: {
    fontFamily: 'Inter_300Light',
    fontSize: 20,
    letterSpacing: 1,
    opacity: 0.7,
    color: '#a75836',
  },
row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
   image: {
    width: 140,
    height: 120,
    borderRadius: 8,
  },
});