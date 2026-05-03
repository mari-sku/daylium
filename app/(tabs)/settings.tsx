import { Card } from '@/components/Card';
import { scheduleDailyMorningNotification, setupNotifications } from '@/notifications/dailyReminder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = 'notification_time';

export default function SettingsScreen() {
  const [time, setTime] = useState(new Date());
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((val) => {
      if (val) {
        const { h, m, on } = JSON.parse(val);
        const date = new Date();
        date.setHours(h, m, 0, 0);
        setTime(date);
        setEnabled(on);
      }
    });
  }, []);

  async function save() {
    const h = time.getHours();
    const m = time.getMinutes();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ h, m, on: enabled }));
    if (enabled) {
      await setupNotifications();
      await scheduleDailyMorningNotification(h, m);
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    Alert.alert('Saved', enabled ? `Daily reminder set for ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` : 'Daily reminder turned off');
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Card>
        <View style={styles.section}>
          <Text style={styles.label}>Daily notification</Text>
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{ true: '#cd6b41' }}
            thumbColor='#f7eae0'
          />
        </View>

        {enabled && (
          <>
            <View style={styles.separator} />
            <View style={styles.section}>
              <Text style={styles.label}>Notification time</Text>
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                onChange={(_, selected) => selected && setTime(selected)}
              />
            </View>
          </>
        )}
      </Card>

      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
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
    backgroundColor: '#f5dbc3',
    minHeight: '100%',
  },
  title: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 38,
    opacity: 0.7,
    letterSpacing: 2,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    opacity: 0.7,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  saveButton: {
    backgroundColor: '#cd6b41',
    marginHorizontal: 10,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#f7eae0',
    fontSize: 16,
  },
});