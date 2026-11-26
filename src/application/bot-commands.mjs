import { convertCurrencyUseCase } from './convert-currency-use-case.mjs';
import { showDogUseCase } from './show-dog-use-case.mjs';
import { showJokeUseCase } from './show-joke-use-case.mjs';
import { showWeatherUseCase } from './show-weather-use-case.mjs';
import { showCommandsUseCase } from './show-commands-use-case.mjs';

export const botCommands = {
  start() {
    return '👋 Hello! I can help you convert currencies 💱, check the weather 🌤️, or tell a joke 😂. Type /help to see the available commands.';
  },
  convert(...args) { return convertCurrencyUseCase.execute(...args); },
  weather(city) { return showWeatherUseCase.execute(city); },
  joke(category) { return showJokeUseCase.execute(category); },
  dog() { return showDogUseCase.execute(); },
  help() { return showCommandsUseCase.execute(); },
};
