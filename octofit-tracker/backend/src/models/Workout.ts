import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    duration: { type: Number, min: 0 },
    target: { type: String, default: '' },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);