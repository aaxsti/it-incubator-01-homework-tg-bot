import { serve } from '@hono/node-server';
import { telegramApiClient } from './adapters/telegram-api-client.mjs';
import { telegramBotApp } from './presentation/app.mjs';
import { telegramMessageRouter } from './presentation/telegram-message-router.mjs';

export const telegramBotServer = {
  start() {
    const publicBaseUrl = process.env.PUBLIC_BASE_URL ?? 'https://desktop-7m4fs3b.tail7506bd.ts.net';
    const webhookUrl = new URL('/telegram/webhook', publicBaseUrl).toString();
    const port = Number(process.env.PORT ?? 3002);

    serve({ fetch: (request) => telegramBotApp.hono.fetch(request), port }, async (info) => {
      console.log(`Server listening on http://localhost:${info.port}`);
      try {
        await telegramApiClient.setWebhook(webhookUrl, telegramMessageRouter.webhookSecret);
        console.log(`Telegram webhook registered at ${webhookUrl}`);
      } catch (error) {
        console.error('Could not register Telegram webhook:', error.message);
      }
    });
  },
};

telegramBotServer.start();
