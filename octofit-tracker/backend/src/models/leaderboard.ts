import mongoose, { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    seedKey: { type: String, index: true, sparse: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    period: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0 },
    activitiesCompleted: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Leaderboard || model('Leaderboard', leaderboardSchema);
