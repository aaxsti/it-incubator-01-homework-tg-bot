import { jokeApiClient } from '../adapters/joke-api-client.mjs';

export const showJokeUseCase = {
  categories: ['Any', 'Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'],
  async execute(category = 'Any') {
    const normalizedCategory = category ? category[0].toUpperCase() + category.slice(1).toLowerCase() : 'Any';
    if (!showJokeUseCase.categories.includes(normalizedCategory)) {
      return { message: `⚠️ Unknown category. Choose one of: ${showJokeUseCase.categories.join(', ')}.`, isUserError: true };
    }
    try {
      const joke = await jokeApiClient.fetchJoke(normalizedCategory);
      const jokeText = joke.type === 'twopart' ? `${joke.setup}\n${joke.delivery}` : joke.joke;
      return { message: `😂 ${jokeText}`, isUserError: false };
    } catch {
      return { message: '⚠️ Sorry, I could not fetch a joke right now. Please try again later.', isUserError: true };
    }
  },
};
