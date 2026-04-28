export async function fetchWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch weather');
  }

  const data = await res.json();
  return data.current_weather;
}