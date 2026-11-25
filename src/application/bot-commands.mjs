import { showCommandsUseCase } from './show-commands-use-case.mjs';

export function createBotCommands({ getJoke, convertCurrency, showWeather }) {
  return {
    start: () => '👋 Hello! I can help you convert currencies 💱, check the weather 🌤️, or tell a joke 😂. Type /help to see the available commands.',
    convert: convertCurrency,
    weather: showWeather,
    joke: getJoke,
    help: showCommandsUseCase,
  };
}
