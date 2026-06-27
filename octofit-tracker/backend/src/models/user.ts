import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    profileImageUrl: { type: String, default: '' },
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export const User = model('User', userSchema)