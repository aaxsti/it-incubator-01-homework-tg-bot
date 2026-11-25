export function showCommandsUseCase() {
  return [
    '👋 /start — show a greeting',
    '💱 /convert <amount> <from> <to> — convert currencies (e.g. /convert 10 USD EUR)',
    '🌤️ /weather <city> — get current weather (e.g. /weather Istanbul)',
    '😂 /joke [category] — get a safe joke',
    '🐶 /dog — get a random dog photo',
    'ℹ️ /help — show this help message',
  ].join('\n');
}
