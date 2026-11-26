export const jokeApiClient = {
  async fetchJoke(category = 'Any') {
    const url = new URL(`https://v2.jokeapi.dev/joke/${encodeURIComponent(category)}`);
    url.searchParams.set('safe-mode', '');
    const response = await fetch(url);
    if (!response.ok) throw new Error(`JokeAPI request failed with status ${response.status}`);

    const joke = await response.json();
    if (joke.error) throw new Error(`JokeAPI returned an error: ${joke.message ?? 'Unknown error'}`);
    if (joke.type !== 'single' && joke.type !== 'twopart') {
      throw new Error('JokeAPI returned an unsupported joke format');
    }
    return joke;
  },
};
