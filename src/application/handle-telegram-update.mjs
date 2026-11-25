export function createTelegramUpdateHandler({ botCommands, sendMessage }) {
  return async function handleTelegramUpdate(update) {
    const message = update.message;
    const text = message?.text?.trim();

    if (!message?.chat?.id || !text) {
      return;
    }

    const [commandToken] = text.split(/\s+/, 1);
    const command = commandToken.split('@', 1)[0].toLowerCase();
    const commandHandlers = {
      '/start': botCommands.start,
      '/convert': botCommands.convert,
      '/weather': botCommands.weather,
      '/joke': botCommands.joke,
      '/help': botCommands.help,
      '/commands': botCommands.help,
    };
    const handler = commandHandlers[command];

    if (!handler) {
      return;
    }

    const argument = commandToken && text.slice(commandToken.length).trim();
    const result = command === '/convert'
      ? await handler(...(argument ?? '').split(/\s+/))
      : await handler(['/joke', '/weather'].includes(command) ? argument : undefined);
    const reply = typeof result === 'string' ? result : result.message;
    await sendMessage(message.chat.id, reply);
  };
}
