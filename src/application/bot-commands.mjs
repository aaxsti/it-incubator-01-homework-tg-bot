import { showCommandsUseCase } from './show-commands-use-case.mjs';

export function createBotCommands({ getJoke, convertCurrency }) {
  return {
    start: () => 'Hello! I can help with currency conversion, weather or tell a joke. Type /help to see the list of available commands.',
    convert: convertCurrency,
    weather: () => 'Weather information is coming soon.',
    joke: getJoke,
    help: showCommandsUseCase,
  };
}
