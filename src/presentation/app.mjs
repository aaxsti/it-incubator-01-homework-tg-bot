import { Hono } from 'hono';

export function createApp({ botCommands, handleTelegramUpdate, webhookSecret }) {
  const app = new Hono();

  app.get('/', (context) => context.json({ name: 'telegram-bot-backend' }));
  app.get('/start', (context) => context.json({ message: botCommands.start() }));
  app.get('/convert', async (context) => {
    const result = await botCommands.convert(
      context.req.query('amount'),
      context.req.query('from'),
      context.req.query('to'),
    );
    return context.json({ message: result.message });
  });
  app.get('/weather', async (context) => {
    const result = await botCommands.weather(context.req.query('city'));
    return context.json({ message: result.message });
  });
  app.get('/joke', async (context) => {
    const result = await botCommands.joke(context.req.query('category') ?? 'Any');
    return context.json({ message: result.message });
  });

  app.post('/telegram/webhook', async (context) => {
    if (context.req.header('x-telegram-bot-api-secret-token') !== webhookSecret) {
      return context.json({ error: 'Unauthorized' }, 401);
    }

    await handleTelegramUpdate(await context.req.json());
    return context.json({ ok: true });
  });

  return app;
}
