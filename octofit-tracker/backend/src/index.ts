import express from 'express';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/', (_request, response) => {
  response.json({ service: 'octofit-tracker-api', status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});
