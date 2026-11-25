const weatherDescriptions = new Map([
  [0, 'Clear sky'], [1, 'Mainly clear'], [2, 'Partly cloudy'], [3, 'Overcast'],
  [45, 'Fog'], [48, 'Depositing rime fog'], [51, 'Light drizzle'], [53, 'Moderate drizzle'], [55, 'Dense drizzle'],
  [56, 'Light freezing drizzle'], [57, 'Dense freezing drizzle'], [61, 'Slight rain'], [63, 'Moderate rain'], [65, 'Heavy rain'],
  [66, 'Light freezing rain'], [67, 'Heavy freezing rain'], [71, 'Slight snow'], [73, 'Moderate snow'], [75, 'Heavy snow'],
  [77, 'Snow grains'], [80, 'Slight rain showers'], [81, 'Moderate rain showers'], [82, 'Violent rain showers'],
  [85, 'Slight snow showers'], [86, 'Heavy snow showers'], [95, 'Thunderstorm'], [96, 'Thunderstorm with slight hail'],
  [99, 'Thunderstorm with heavy hail'],
]);

function getWeatherEmoji(code) {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2 || code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 86) return '❄️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}

export function createShowWeatherUseCase({ fetchWeather }) {
  return async function showWeather(cityInput) {
    const city = String(cityInput ?? '').trim();
    if (!city) {
      return { message: '⚠️ Usage: /weather <city> (e.g. /weather Istanbul).', isUserError: true };
    }

    try {
      const result = await fetchWeather(city);
      if (!result) {
        return { message: `📍 I could not find a city named "${city}".`, isUserError: true };
      }

      const { location, current, units } = result;
      const description = weatherDescriptions.get(current.weather_code) ?? 'Unknown conditions';
      const place = [location.name, location.country].filter(Boolean).join(', ');
      return {
        message: `${getWeatherEmoji(current.weather_code)} Current weather in ${place}\n${description}\n🌡️ Temperature: ${current.temperature_2m}${units.temperature_2m} (feels like ${current.apparent_temperature}${units.apparent_temperature})\n💧 Humidity: ${current.relative_humidity_2m}${units.relative_humidity_2m}\n💨 Wind: ${current.wind_speed_10m} ${units.wind_speed_10m}`,
        isUserError: false,
      };
    } catch {
      return { message: '⚠️ Sorry, I could not fetch the weather right now. Please try again later.', isUserError: true };
    }
  };
}
