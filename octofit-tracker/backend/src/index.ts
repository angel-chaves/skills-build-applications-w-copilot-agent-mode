import express from 'express'
import mongoose from 'mongoose'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.get('/api/health', async (_request, response) => {
  const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] =
    await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      LeaderboardEntry.countDocuments(),
      Workout.countDocuments(),
    ])

  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port,
    baseUrl,
    mongoUri,
    collections: {
      users: userCount,
      teams: teamCount,
      activities: activityCount,
      leaderboard: leaderboardCount,
      workouts: workoutCount,
    },
  })
})

async function start() {
  await mongoose.connect(mongoUri)
  app.listen(port, () => {
    console.log(`OctoFit backend listening on ${baseUrl}`)
  })
}

start().catch((error: unknown) => {
  console.error('Failed to start OctoFit backend', error)
  process.exit(1)
})