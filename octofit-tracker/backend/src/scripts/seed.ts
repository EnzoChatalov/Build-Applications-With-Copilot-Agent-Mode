import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const seedKeys = ['octofit-demo'];
    await Activity.deleteMany({ seedKey: { $in: seedKeys } });
    await Leaderboard.deleteMany({ seedKey: { $in: seedKeys } });
    await User.deleteMany({ seedKey: { $in: seedKeys } });
    await Team.deleteMany({ seedKey: { $in: seedKeys } });
    await Workout.deleteMany({ seedKey: { $in: seedKeys } });

    const [paceSetters, trailBlazers] = await Team.insertMany([
      {
        seedKey: 'octofit-demo',
        name: 'Pace Setters',
        description: 'A supportive crew focused on steady progress and daily movement.',
      },
      {
        seedKey: 'octofit-demo',
        name: 'Trail Blazers',
        description: 'Outdoor enthusiasts who take their workouts beyond the gym.',
      },
    ]);

    const [alex, jordan, sam, taylor] = await User.insertMany([
      {
        seedKey: 'octofit-demo',
        username: 'alex_runs',
        email: 'alex@example.com',
        displayName: 'Alex Rivera',
        bio: 'Weekend runner training for a first half marathon.',
        team: paceSetters._id,
      },
      {
        seedKey: 'octofit-demo',
        username: 'jordan_lifts',
        email: 'jordan@example.com',
        displayName: 'Jordan Lee',
        bio: 'Strength training fan who loves a measurable goal.',
        team: paceSetters._id,
      },
      {
        seedKey: 'octofit-demo',
        username: 'sam_trails',
        email: 'sam@example.com',
        displayName: 'Sam Okafor',
        bio: 'Hiker and trail runner exploring a new route each week.',
        team: trailBlazers._id,
      },
      {
        seedKey: 'octofit-demo',
        username: 'taylor_yoga',
        email: 'taylor@example.com',
        displayName: 'Taylor Chen',
        bio: 'Building a balanced routine with yoga and cycling.',
        team: trailBlazers._id,
      },
    ]);

    await Promise.all([
      Team.updateOne({ _id: paceSetters._id }, { $set: { members: [alex._id, jordan._id] } }),
      Team.updateOne({ _id: trailBlazers._id }, { $set: { members: [sam._id, taylor._id] } }),
    ]);

    await Activity.insertMany([
      {
        seedKey: 'octofit-demo',
        user: alex._id,
        team: paceSetters._id,
        activityType: 'run',
        durationMinutes: 38,
        distanceKilometers: 6.2,
        caloriesBurned: 410,
        completedAt: new Date('2026-10-05T07:30:00.000Z'),
      },
      {
        seedKey: 'octofit-demo',
        user: jordan._id,
        team: paceSetters._id,
        activityType: 'strength training',
        durationMinutes: 50,
        caloriesBurned: 320,
        completedAt: new Date('2026-10-05T18:00:00.000Z'),
      },
      {
        seedKey: 'octofit-demo',
        user: sam._id,
        team: trailBlazers._id,
        activityType: 'hike',
        durationMinutes: 95,
        distanceKilometers: 8.4,
        caloriesBurned: 630,
        completedAt: new Date('2026-10-04T09:00:00.000Z'),
      },
      {
        seedKey: 'octofit-demo',
        user: taylor._id,
        team: trailBlazers._id,
        activityType: 'cycling',
        durationMinutes: 42,
        distanceKilometers: 14.5,
        caloriesBurned: 360,
        completedAt: new Date('2026-10-04T16:15:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        seedKey: 'octofit-demo',
        user: sam._id,
        team: trailBlazers._id,
        period: '2026-10',
        score: 420,
        activitiesCompleted: 8,
      },
      {
        seedKey: 'octofit-demo',
        user: alex._id,
        team: paceSetters._id,
        period: '2026-10',
        score: 365,
        activitiesCompleted: 7,
      },
      {
        seedKey: 'octofit-demo',
        user: jordan._id,
        team: paceSetters._id,
        period: '2026-10',
        score: 310,
        activitiesCompleted: 6,
      },
      {
        seedKey: 'octofit-demo',
        user: taylor._id,
        team: trailBlazers._id,
        period: '2026-10',
        score: 285,
        activitiesCompleted: 5,
      },
    ]);

    await Workout.insertMany([
      {
        seedKey: 'octofit-demo',
        title: 'Beginner Cardio Builder',
        description: 'A low-impact session to build a consistent cardio habit.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: [
          { name: 'Brisk walk', durationSeconds: 600 },
          { name: 'Easy jog', durationSeconds: 600 },
          { name: 'Cool-down walk', durationSeconds: 300 },
        ],
      },
      {
        seedKey: 'octofit-demo',
        title: 'Full-Body Strength',
        description: 'A balanced strength circuit using simple bodyweight movements.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: [
          { name: 'Squats', sets: 3, repetitions: 12 },
          { name: 'Push-ups', sets: 3, repetitions: 10 },
          { name: 'Reverse lunges', sets: 3, repetitions: 10 },
          { name: 'Plank', sets: 3, durationSeconds: 30 },
        ],
      },
      {
        seedKey: 'octofit-demo',
        title: 'Mobility Reset',
        description: 'A gentle movement sequence for flexibility and recovery.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: [
          { name: 'Cat-cow stretch', durationSeconds: 120 },
          { name: 'Hip flexor stretch', durationSeconds: 180 },
          { name: 'Thoracic rotations', repetitions: 10 },
        ],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
