export async function fetchWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true` +
    `&daily=precipitation_probability_max` +
    `&timezone=auto`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch weather');
  }

  const data = await res.json();

  return {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    weatherCode: data.current_weather.weathercode,

    precipitationProbability:
      data.daily?.precipitation_probability_max?.[0] ?? 0,
  };
}