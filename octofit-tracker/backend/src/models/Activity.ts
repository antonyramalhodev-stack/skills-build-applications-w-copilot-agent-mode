import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true, min: 0 },
    points: { type: Number, default: 0, min: 0 },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);