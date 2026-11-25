export function showCommandsUseCase() {
  return [
    '/start — show a greeting',
    '/convert <amount> <from> <to> — convert currencies (e.g. /convert 10 USD EUR)',
    '/weather — get weather information (coming soon)',
    '/joke [category] — get a safe joke',
    '/help — show this help message',
  ].join('\n');
}
