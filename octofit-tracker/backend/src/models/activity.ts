import mongoose, { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    seedKey: { type: String, index: true, sparse: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKilometers: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Activity || model('Activity', activitySchema);
