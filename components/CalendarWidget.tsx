import { useCalendar } from '@/hooks/useCalendar';
import { StyleSheet, Text, View } from 'react-native';

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function CalendarWidget() {
  const { events, loading, error } = useCalendar();

  if (loading) return <Text>Loading events...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>

      {events.length === 0 ? (
        <Text style={styles.empty}>No events today ✨</Text>
      ) : (
        events.slice(0, 5).map((event) => (
          <View key={event.id} style={styles.event}>
            <Text style={styles.time}>
              {formatTime(event.startDate)}
            </Text>
            <Text style={styles.name}>{event.title}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  event: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  time: {
    width: 60,
    opacity: 0.6,
  },
  name: {
    flex: 1,
  },
  empty: {
    opacity: 0.6,
  },
});