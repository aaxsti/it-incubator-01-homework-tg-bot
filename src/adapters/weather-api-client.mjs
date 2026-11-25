const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast';

async function fetchJson(url, serviceName) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${serviceName} returned ${response.status}`);
  }
  return response.json();
}

export async function fetchWeather(city) {
  const geocodingUrl = new URL(GEOCODING_API_URL);
  geocodingUrl.search = new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' });
  const geocoding = await fetchJson(geocodingUrl, 'Open-Meteo Geocoding API');
  const location = geocoding.results?.[0];

  if (!location) {
    return null;
  }

  const forecastUrl = new URL(FORECAST_API_URL);
  forecastUrl.search = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    timezone: 'auto',
  });
  const forecast = await fetchJson(forecastUrl, 'Open-Meteo Forecast API');

  return { location, current: forecast.current, units: forecast.current_units };
}
