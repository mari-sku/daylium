import * as Calendar from 'expo-calendar';

export async function getTodayEvents() {
  // Ask permission
  const { status } = await Calendar.requestCalendarPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permission denied');
  }

  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );

  const calendarIds = calendars.map((cal) => cal.id);

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const events = await Calendar.getEventsAsync(
    calendarIds,
    start,
    end
  );

  return events;
}