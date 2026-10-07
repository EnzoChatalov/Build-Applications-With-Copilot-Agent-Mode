import mongoose, { Schema, model } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 1 },
    repetitions: { type: Number, min: 1 },
    durationSeconds: { type: Number, min: 1 },
  },
  { _id: false },
);

const workoutSchema = new Schema(
  {
    seedKey: { type: String, index: true, sparse: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [exerciseSchema], required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Workout || model('Workout', workoutSchema);
