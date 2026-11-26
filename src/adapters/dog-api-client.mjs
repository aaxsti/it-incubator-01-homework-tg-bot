export const dogApiClient = {
  async fetchRandomImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!response.ok) throw new Error(`Dog CEO API returned ${response.status}`);

    const result = await response.json();
    if (result.status !== 'success' || typeof result.message !== 'string') {
      throw new Error('Dog CEO API returned an invalid response');
    }
    return result.message;
  },
};
