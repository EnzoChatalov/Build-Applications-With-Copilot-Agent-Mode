import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    seedKey: { type: String, index: true, sparse: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    bio: { type: String, default: '' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export default mongoose.models.User || model('User', userSchema);
