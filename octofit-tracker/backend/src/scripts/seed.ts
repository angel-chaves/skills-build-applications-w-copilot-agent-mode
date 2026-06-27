import { connectDatabase, disconnectDatabase } from '../database'
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models'

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await connectDatabase()

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const [maya, jordan, priya, theo] = await User.insertMany([
    {
      username: 'maya-rivera',
      email: 'maya.rivera@example.com',
      profileImageUrl: 'https://i.pravatar.cc/160?img=47',
      totalPoints: 1420,
    },
    {
      username: 'jordan-lee',
      email: 'jordan.lee@example.com',
      profileImageUrl: 'https://i.pravatar.cc/160?img=12',
      totalPoints: 1285,
    },
    {
      username: 'priya-shah',
      email: 'priya.shah@example.com',
      profileImageUrl: 'https://i.pravatar.cc/160?img=32',
      totalPoints: 1170,
    },
    {
      username: 'theo-martin',
      email: 'theo.martin@example.com',
      profileImageUrl: 'https://i.pravatar.cc/160?img=68',
      totalPoints: 980,
    },
  ])

  const [morningEngine, coreControl, trailTempo, recoveryFlow] =
    await Workout.insertMany([
      {
        title: 'Morning Engine Builder',
        category: 'cardio',
        difficulty: 'intermediate',
        targetMinutes: 35,
      },
      {
        title: 'Core Control Circuit',
        category: 'strength',
        difficulty: 'beginner',
        targetMinutes: 25,
      },
      {
        title: 'Trail Tempo Intervals',
        category: 'endurance',
        difficulty: 'advanced',
        targetMinutes: 45,
      },
      {
        title: 'Recovery Mobility Flow',
        category: 'mobility',
        difficulty: 'beginner',
        targetMinutes: 20,
      },
    ])

  const [summitSquad, metroMovers] = await Team.insertMany([
    {
      name: 'Summit Squad',
      description: 'Climbers and runners stacking consistent weekly points.',
      memberIds: [maya._id, priya._id],
    },
    {
      name: 'Metro Movers',
      description: 'City athletes building strength before the workday starts.',
      memberIds: [jordan._id, theo._id],
    },
  ])

  await Activity.insertMany([
    {
      userId: maya._id,
      workoutId: trailTempo._id,
      durationMinutes: 47,
      caloriesBurned: 520,
      completedAt: new Date('2026-06-24T13:15:00.000Z'),
    },
    {
      userId: jordan._id,
      workoutId: morningEngine._id,
      durationMinutes: 34,
      caloriesBurned: 410,
      completedAt: new Date('2026-06-25T11:30:00.000Z'),
    },
    {
      userId: priya._id,
      workoutId: coreControl._id,
      durationMinutes: 28,
      caloriesBurned: 260,
      completedAt: new Date('2026-06-26T18:45:00.000Z'),
    },
    {
      userId: theo._id,
      workoutId: recoveryFlow._id,
      durationMinutes: 22,
      caloriesBurned: 150,
      completedAt: new Date('2026-06-27T09:10:00.000Z'),
    },
  ])

  await LeaderboardEntry.insertMany([
    { userId: maya._id, teamId: summitSquad._id, score: 1420, rank: 1 },
    { userId: jordan._id, teamId: metroMovers._id, score: 1285, rank: 2 },
    { userId: priya._id, teamId: summitSquad._id, score: 1170, rank: 3 },
    { userId: theo._id, teamId: metroMovers._id, score: 980, rank: 4 },
  ])

  console.log('Seeded users, teams, activities, leaderboard, and workouts.')
}

seed()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await disconnectDatabase()
  })