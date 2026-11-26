import { dogApiClient } from '../adapters/dog-api-client.mjs';

export const showDogUseCase = {
  async execute() {
    try {
      const photoUrl = await dogApiClient.fetchRandomImage();
      return { photoUrl, caption: '🐶 Here is a random dog for you!' };
    } catch {
      return { message: '⚠️ Sorry, I could not fetch a dog photo right now. Please try again later.' };
    }
  },
};
