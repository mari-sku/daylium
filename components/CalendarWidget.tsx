import { Card } from '@/components/Card';
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
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>Today&apos;s events</Text>

        {events.length === 0 ? (
          <Text style={styles.empty}>No events today ✨</Text>
        ) : (
          events.slice(0, 5).map((event, index) => (
            <View key={event.id} style={styles.eventRow}>
              <View style={styles.timeline}>
                <View style={styles.dot} />
                <View style={styles.line} />
              </View>

              <View style={styles.eventContent}>
                <View style={styles.timeColumn}>
                  <Text style={styles.time}>{formatTime(event.startDate)}</Text>
                  <Text style={styles.timeEnd}>{formatTime(event.endDate)}</Text>
                </View>

                <Text style={styles.name}>{event.title}</Text>
              </View>

              {index !== events.slice(0, 5).length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: 'CormorantGaramond_600SemiBold',
    opacity: 0.75,
  },

  eventRow: {
    marginBottom: 12,
  },

  timeline: {
    position: 'absolute',
    left: 6,
    top: 6,
    bottom: 6,
    alignItems: 'center',
    
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgb(201, 112, 44)',
  },

  line: {
    flex: 1,
    width: 1,
    backgroundColor: 'rgb(239, 170, 116)',
    marginVertical: 4,
  },


  eventContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },

  timeColumn: {
    width: 70,
    justifyContent: 'center',
  },

  time: {
    opacity: 0.6,
    marginBottom: 10,
  },

  timeEnd: {
    opacity: 0.4,
  },

  name: {
    flex: 1,
  },

  empty: {
    opacity: 0.6,
    fontFamily: 'Inter_400Regular',
  },

  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginVertical: 10,
    marginLeft: 20,
  },
});