import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: { type: String, default: '' },
  },
  { timestamps: true },
);

export default model('User', userSchema);