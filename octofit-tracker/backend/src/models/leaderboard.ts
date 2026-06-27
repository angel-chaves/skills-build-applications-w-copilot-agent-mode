import { Schema, model } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
)

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema)