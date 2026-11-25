const JOKE_API_URL = 'https://v2.jokeapi.dev/joke';

export async function fetchJoke(category = 'Any') {
  const url = new URL(`${JOKE_API_URL}/${encodeURIComponent(category)}`);
  url.searchParams.set('safe-mode', '');
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`JokeAPI request failed with status ${response.status}`);
  }

  const joke = await response.json();

  if (joke.error) {
    throw new Error(`JokeAPI returned an error: ${joke.message ?? 'Unknown error'}`);
  }

  if (joke.type !== 'single' && joke.type !== 'twopart') {
    throw new Error('JokeAPI returned an unsupported joke format');
  }

  return joke;
}
