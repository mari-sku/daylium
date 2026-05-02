import { useEffect, useState } from 'react';

export function useDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    weekday: now.toLocaleDateString('en-US', { weekday: 'long' }),
     day: now.getDate(),
    month: now.toLocaleDateString('en-US', { month: 'long' }),
    year: now.getFullYear(),
  };
}