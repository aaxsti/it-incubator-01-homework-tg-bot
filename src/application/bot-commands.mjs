import { showCommandsUseCase } from './show-commands-use-case.mjs';

export function createBotCommands({ getJoke, convertCurrency, showWeather }) {
  return {
    start: () => 'Hello! I can help with currency conversion, weather or tell a joke. Type /help to see the list of available commands.',
    convert: convertCurrency,
    weather: showWeather,
    joke: getJoke,
    help: showCommandsUseCase,
  };
}
