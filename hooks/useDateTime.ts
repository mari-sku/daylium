import { useEffect, useState } from 'react';

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function useDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    weekday: now.toLocaleDateString('en-US', { weekday: 'long' }),
    day: getOrdinal(now.getDate()),
    month: now.toLocaleDateString('en-US', { month: 'long' }),
    year: now.getFullYear(),
  };
}