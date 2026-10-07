import mongoose, { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    seedKey: { type: String, index: true, sparse: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default mongoose.models.Team || model('Team', teamSchema);
