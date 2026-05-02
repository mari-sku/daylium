
export function getWeatherIcon(code: number) {
  switch (code) {
    case 0:
      return { name: 'weather-sunny', color: '#FDB813' };

    case 1:
    case 2:
    case 3:
      return { name: 'weather-partly-cloudy', color: '#A0AEC0' };

    case 45:
    case 48:
      return { name: 'weather-fog', color: '#CBD5E0' };

    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
      return { name: 'weather-rainy', color: '#4299E1' };

    case 71:
    case 73:
    case 75:
      return { name: 'weather-snowy', color: '#90CDF4' };

    case 95:
    case 96:
    case 99:
      return { name: 'weather-lightning-rainy', color: '#805AD5' };

    default:
      return { name: 'weather-cloudy', color: '#A0AEC0' };
  }
}