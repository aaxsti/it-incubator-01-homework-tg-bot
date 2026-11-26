export const frankfurterApiClient = {
  async fetchExchangeRate(from, to) {
    const url = `https://api.frankfurter.dev/v2/rate/${encodeURIComponent(from)}/${encodeURIComponent(to)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Frankfurter API returned ${response.status}`);
    return response.json();
  },
};
