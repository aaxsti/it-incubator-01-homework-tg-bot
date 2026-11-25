const API_BASE_URL = 'https://api.frankfurter.dev/v2';

export async function fetchExchangeRate(from, to) {
  const response = await fetch(`${API_BASE_URL}/rate/${encodeURIComponent(from)}/${encodeURIComponent(to)}`);

  if (!response.ok) {
    throw new Error(`Frankfurter API returned ${response.status}`);
  }

  return response.json();
}
