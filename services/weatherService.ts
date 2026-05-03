export async function fetchWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true` +
    `&hourly=temperature_2m,weathercode` +
    `&daily=precipitation_probability_max` +
    `&timezone=auto` +
    `&forecast_days=1`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch weather');
  }

  const data = await res.json();

  const forecastHours = [8, 10, 12, 14, 16, 18, 20, 22];
  const forecast = forecastHours.map((hour) => {
    const index = data.hourly.time.findIndex((t: string) =>
      t.endsWith(`T${String(hour).padStart(2, '0')}:00`)
    );
    return {
      hour,
      temperature: Math.round(data.hourly.temperature_2m[index]),
      weatherCode: data.hourly.weathercode[index],
    };
  });

  return {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    weatherCode: data.current_weather.weathercode,
    precipitationProbability: data.daily?.precipitation_probability_max?.[0] ?? 0,
    forecast,
  };
}