export const weatherApiClient = {
  async fetchJson(url, serviceName) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${serviceName} returned ${response.status}`);
    return response.json();
  },
  async fetchWeather(city) {
    const geocodingUrl = new URL('https://geocoding-api.open-meteo.com/v1/search');
    geocodingUrl.search = new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' });
    const geocoding = await weatherApiClient.fetchJson(geocodingUrl, 'Open-Meteo Geocoding API');
    const location = geocoding.results?.[0];
    if (!location) return null;

    const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast');
    forecastUrl.search = new URLSearchParams({
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      timezone: 'auto',
    });
    const forecast = await weatherApiClient.fetchJson(forecastUrl, 'Open-Meteo Forecast API');
    return { location, current: forecast.current, units: forecast.current_units };
  },
};
