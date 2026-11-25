const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

export async function fetchRandomDogImage() {
  const response = await fetch(DOG_API_URL);
  if (!response.ok) {
    throw new Error(`Dog CEO API returned ${response.status}`);
  }

  const result = await response.json();
  if (result.status !== 'success' || typeof result.message !== 'string') {
    throw new Error('Dog CEO API returned an invalid response');
  }

  return result.message;
}
