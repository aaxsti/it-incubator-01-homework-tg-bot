import { serve } from '@hono/node-server';
import { createApp } from './presentation/app.mjs';
import { createBotCommands } from './application/bot-commands.mjs';
import { createGetJokeUseCase } from './application/show-joke-use-case.mjs';
import { fetchJoke } from './adapters/joke-api-client.mjs';
import { fetchExchangeRate } from './adapters/frankfurter-api-client.mjs';
import { createConvertCurrencyUseCase } from './application/convert-currency-use-case.mjs';
import { fetchWeather } from './adapters/weather-api-client.mjs';
import { createShowWeatherUseCase } from './application/show-weather-use-case.mjs';
import { createTelegramApiClient } from './adapters/telegram-api-client.mjs';
import { createTelegramUpdateHandler } from './application/handle-telegram-update.mjs';
import { TELEGRAM_BOT_TOKEN } from '../token.mjs';
import { randomBytes } from 'node:crypto';

const publicBaseUrl = process.env.TELEGRAM_WEBHOOK_URL ?? 'https://desktop-7m4fs3b.tail7506bd.ts.net';
const webhookUrl = new URL('/telegram/webhook', publicBaseUrl).toString();
const webhookSecret = randomBytes(32).toString('hex');

const getJoke = createGetJokeUseCase({ fetchJoke });
const convertCurrency = createConvertCurrencyUseCase({ fetchExchangeRate });
const showWeather = createShowWeatherUseCase({ fetchWeather });
const botCommands = createBotCommands({ getJoke, convertCurrency, showWeather });
const telegram = createTelegramApiClient({ token: TELEGRAM_BOT_TOKEN });
const handleTelegramUpdate = createTelegramUpdateHandler({
  botCommands,
  sendMessage: telegram.sendMessage,
});
const app = createApp({ botCommands, handleTelegramUpdate, webhookSecret });
const port = Number(process.env.PORT ?? 3002);

serve({ fetch: app.fetch, port }, async (info) => {
  console.log(`Server listening on http://localhost:${info.port}`);
  try {
    await telegram.setWebhook(webhookUrl, webhookSecret);
    console.log(`Telegram webhook registered at ${webhookUrl}`);
  } catch (error) {
    console.error('Could not register Telegram webhook:', error.message);
  }
});
