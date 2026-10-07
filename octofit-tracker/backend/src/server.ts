import cors from 'cors';
import express, { type Request, type Response, type NextFunction } from 'express';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;

function listRoute<T>(find: () => Promise<T[]>) {
  return async (_request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      response.json(await find());
    } catch (error) {
      next(error);
    }
  };
}

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/', (_request, response) => {
  response.json({ service: 'octofit-tracker-api', status: 'ok' });
});

app.get('/api/users/', listRoute(() => User.find().populate('team').lean()));

app.get('/api/teams/', listRoute(() => Team.find().populate('members').lean()));

app.get('/api/activities/', listRoute(() => Activity.find().populate('user team').lean()));

app.get('/api/leaderboard/', listRoute(() =>
  Leaderboard.find().sort({ score: -1 }).populate('user team').lean(),
));

app.get('/api/workouts/', listRoute(() => Workout.find().sort({ title: 1 }).lean()));

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

export default app;
