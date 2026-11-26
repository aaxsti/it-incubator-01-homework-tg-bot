import { randomBytes } from 'node:crypto';
import { Hono } from 'hono';
import { botCommands } from '../application/bot-commands.mjs';
import { telegramUpdateHandler } from '../application/handle-telegram-update.mjs';

export const telegramMessageRouter = {
  hono: new Hono(),
  webhookSecret: randomBytes(32).toString('hex'),
};

telegramMessageRouter.hono.get('/start', (context) => context.json({ message: botCommands.start() }));
telegramMessageRouter.hono.get('/convert', async (context) => {
  const result = await botCommands.convert(
    context.req.query('amount'), context.req.query('from'), context.req.query('to'),
  );
  return context.json({ message: result.message });
});
telegramMessageRouter.hono.get('/weather', async (context) => {
  const result = await botCommands.weather(context.req.query('city'));
  return context.json({ message: result.message });
});
telegramMessageRouter.hono.get('/joke', async (context) => {
  const result = await botCommands.joke(context.req.query('category') ?? 'Any');
  return context.json({ message: result.message });
});
telegramMessageRouter.hono.get('/dog', async (context) => {
  const result = await botCommands.dog();
  return context.json(result.photoUrl ? { imageUrl: result.photoUrl, caption: result.caption } : { message: result.message });
});
telegramMessageRouter.hono.post('/telegram/webhook', async (context) => {
  if (context.req.header('x-telegram-bot-api-secret-token') !== telegramMessageRouter.webhookSecret) {
    return context.json({ error: 'Unauthorized' }, 401);
  }
  await telegramUpdateHandler.handle(await context.req.json());
  return context.json({ ok: true });
});
