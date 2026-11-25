export function createShowDogUseCase({ fetchRandomDogImage }) {
  return async function showDog() {
    try {
      const photoUrl = await fetchRandomDogImage();
      return { photoUrl, caption: '🐶 Here is a random dog for you!' };
    } catch {
      return { message: '⚠️ Sorry, I could not fetch a dog photo right now. Please try again later.' };
    }
  };
}
