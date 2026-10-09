import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const users = await Promise.all([
      User.findOneAndUpdate(
        { email: 'maya.chen@example.com' },
        { name: 'Maya Chen', email: 'maya.chen@example.com', profile: 'Runner focused on endurance.' },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'leo.martinez@example.com' },
        { name: 'Leo Martinez', email: 'leo.martinez@example.com', profile: 'Cyclist building strength.' },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'priya.shah@example.com' },
        { name: 'Priya Shah', email: 'priya.shah@example.com', profile: 'Enjoys strength and mobility training.' },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ]);

    const teams = await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Morning Miles' },
        { name: 'Morning Miles', members: [users[0]._id, users[1]._id] },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      Team.findOneAndUpdate(
        { name: 'Weekend Warriors' },
        { name: 'Weekend Warriors', members: [users[1]._id, users[2]._id] },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ]);

    const activities = [
      { user: users[0]._id, type: 'Run', duration: 35, points: 70, recordedAt: new Date('2026-10-06T07:00:00.000Z') },
      { user: users[1]._id, type: 'Cycling', duration: 50, points: 100, recordedAt: new Date('2026-10-07T17:30:00.000Z') },
      { user: users[2]._id, type: 'Strength training', duration: 40, points: 80, recordedAt: new Date('2026-10-08T12:00:00.000Z') },
    ];
    const seededActivities = await Promise.all(
      activities.map(({ user, type, ...activity }) =>
        Activity.findOneAndUpdate(
          { user, type, recordedAt: activity.recordedAt },
          { user, type, ...activity },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );

    const leaderboardEntries = [
      { name: 'October Individual League - Maya Chen', user: users[0]._id, points: 240 },
      { name: 'October Individual League - Leo Martinez', user: users[1]._id, points: 310 },
      { name: 'October Individual League - Priya Shah', user: users[2]._id, points: 195 },
      { name: 'October Team League - Morning Miles', team: teams[0]._id, points: 550 },
      { name: 'October Team League - Weekend Warriors', team: teams[1]._id, points: 505 },
    ];
    const seededLeaderboard = await Promise.all(
      leaderboardEntries.map((entry) =>
        Leaderboard.findOneAndUpdate(
          { name: entry.name },
          entry,
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );

    const workouts = [
      { name: 'Steady 5K Run', description: 'Comfortable-paced distance run.', difficulty: 'beginner', duration: 30, target: 'endurance' },
      { name: 'Tempo Ride', description: 'Sustained cycling intervals with recovery.', difficulty: 'intermediate', duration: 45, target: 'cardio' },
      { name: 'Full-Body Strength', description: 'Compound movements for balanced strength.', difficulty: 'intermediate', duration: 40, target: 'strength' },
    ];
    const seededWorkouts = await Promise.all(
      workouts.map((workout) =>
        Workout.findOneAndUpdate(
          { name: workout.name },
          workout,
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );

    console.log('Database seeding complete', {
      users: users.length,
      teams: teams.length,
      activities: seededActivities.length,
      leaderboard: seededLeaderboard.length,
      workouts: seededWorkouts.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
