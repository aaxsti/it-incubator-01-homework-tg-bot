const jokeCategories = ['Any', 'Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];

export function createGetJokeUseCase({ fetchJoke }) {
  return async function getJoke(category = 'Any') {
    const normalizedCategory = category
      ? category[0].toUpperCase() + category.slice(1).toLowerCase()
      : 'Any';

    if (!jokeCategories.includes(normalizedCategory)) {
      return {
        message: `⚠️ Unknown category. Choose one of: ${jokeCategories.join(', ')}.`,
        isUserError: true,
      };
    }

    try {
      const joke = await fetchJoke(normalizedCategory);
      const jokeText = joke.type === 'twopart'
        ? `${joke.setup}\n${joke.delivery}`
        : joke.joke;
      const message = `😂 ${jokeText}`;

      return { message, isUserError: false };
    } catch {
      return {
        message: '⚠️ Sorry, I could not fetch a joke right now. Please try again later.',
        isUserError: true,
      };
    }
  };
}
