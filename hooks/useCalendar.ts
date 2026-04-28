import { getTodayEvents } from '@/services/calendarService';
import { useEffect, useState } from 'react';

export function useCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTodayEvents();

        data.sort(
          (a, b) =>
            new Date(a.startDate).getTime() -
            new Date(b.startDate).getTime()
        );

        setEvents(data);
      } catch (err) {
        setError('Could not load calendar');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { events, loading, error };
}