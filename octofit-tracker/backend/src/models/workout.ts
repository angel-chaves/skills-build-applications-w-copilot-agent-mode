import { Schema, model } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    targetMinutes: { type: Number, default: 30 },
  },
  { timestamps: true },
)

export const Workout = model('Workout', workoutSchema)