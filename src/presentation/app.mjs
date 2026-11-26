import { Hono } from 'hono';
import { telegramMessageRouter } from './telegram-message-router.mjs';

export const telegramBotApp = {
  hono: new Hono(),
};

telegramBotApp.hono.get('/', (context) => context.json({ name: 'telegram-bot-backend' }));
telegramBotApp.hono.route('/', telegramMessageRouter.hono);
