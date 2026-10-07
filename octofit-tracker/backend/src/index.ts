import app, { baseUrl } from './server.js';
import { connectDatabase } from './config/database.js';

// asdadsad

const port = Number(process.env.PORT ?? 8000);

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${baseUrl}`);
  });
}

void startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exitCode = 1;
});
