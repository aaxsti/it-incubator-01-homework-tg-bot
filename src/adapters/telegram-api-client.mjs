import { TELEGRAM_BOT_TOKEN } from '../../token.mjs';

export const telegramApiClient = {
  async call(method, body) {
    if (!TELEGRAM_BOT_TOKEN) throw new Error('TELEGRAM_BOT_TOKEN is required');
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      throw new Error(`Telegram API ${method} failed: ${result.description ?? response.statusText}`);
    }
    return result.result;
  },
  sendMessage(chatId, text) {
    return telegramApiClient.call('sendMessage', { chat_id: chatId, text });
  },
  sendPhoto(chatId, photo, caption) {
    return telegramApiClient.call('sendPhoto', { chat_id: chatId, photo, caption });
  },
  setWebhook(url, secretToken) {
    return telegramApiClient.call('setWebhook', { url, secret_token: secretToken, allowed_updates: ['message'] });
  },
};
