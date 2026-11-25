const TELEGRAM_API_BASE_URL = 'https://api.telegram.org';

export function createTelegramApiClient({ token }) {
  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is required');
  }

  async function call(method, body) {
    const response = await fetch(`${TELEGRAM_API_BASE_URL}/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(`Telegram API ${method} failed: ${result.description ?? response.statusText}`);
    }

    return result.result;
  }

  return {
    sendMessage: (chatId, text) => call('sendMessage', { chat_id: chatId, text }),
    setWebhook: (url, secretToken) => call('setWebhook', {
      url,
      secret_token: secretToken,
      allowed_updates: ['message'],
    }),
  };
}
