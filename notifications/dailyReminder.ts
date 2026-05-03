import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function setupNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-reminder', {
      name: 'Daily Reminder',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

export async function scheduleDailyMorningNotification() {
  // cancel old ones first
  await Notifications.cancelAllScheduledNotificationsAsync();
 
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Good morning ☀️',
    body: 'Tap here to check your day',
  },
  trigger: {

    // these interval ones are for testing, uncomment the actual time below when needed

      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
      repeats: false,
    // type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    // hour: 6,
    // minute: 0,
    // repeats: true,
  },
});
}