import { botCommands } from './bot-commands.mjs';
import { telegramApiClient } from '../adapters/telegram-api-client.mjs';

export const telegramUpdateHandler = {
  commandHandlers: {
    '/start': botCommands.start,
    '/convert': botCommands.convert,
    '/weather': botCommands.weather,
    '/joke': botCommands.joke,
    '/dog': botCommands.dog,
    '/help': botCommands.help,
  },
  async handle(update) {
    const message = update.message;
    const text = message?.text?.trim();
    if (!message?.chat?.id || !text) return;

    const [commandToken] = text.split(/\s+/, 1);
    const command = commandToken.split('@', 1)[0].toLowerCase();
    const handler = telegramUpdateHandler.commandHandlers[command];
    if (!handler) {
      await telegramApiClient.sendMessage(
        message.chat.id,
        '❓ Unknown command. Use /help to see the list of available commands.',
      );
      return;
    }

    const argument = text.slice(commandToken.length).trim();
    const result = command === '/convert'
      ? await handler(...argument.split(/\s+/))
      : await handler(['/joke', '/weather'].includes(command) ? argument : undefined);
    if (command === '/dog' && result.photoUrl) {
      await telegramApiClient.sendPhoto(message.chat.id, result.photoUrl, result.caption);
      return;
    }
    await telegramApiClient.sendMessage(message.chat.id, typeof result === 'string' ? result : result.message);
  },
};
