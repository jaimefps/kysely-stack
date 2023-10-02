import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const tasks = [
  {
    id: 1,
    title: "SeedTask_1",
    complete: true,
  },
]

const ANCHOR_DATE = "2023-09-30T00:00:00.000Z"
function getPastWeekDates() {
  let dates = []
  let baseDate = new Date(ANCHOR_DATE)

  for (let i = 6; i >= 0; i--) {
    let currentDate = new Date(baseDate)
    currentDate.setDate(baseDate.getDate() - i)
    dates.push(currentDate.toISOString())
  }

  return dates
}

const happenings = getPastWeekDates().map((time, idx) => ({
  id: idx + 1,
  title: "SeedHappening_" + (idx + 1),
  startTime: new Date(time),
}))

async function main() {
  const tasksSeed = tasks.map((t) =>
    prisma.task.upsert({
      create: t,
      update: {},
      where: {
        id: t.id,
      },
    })
  )
  const happeningSeed = happenings.map((h) =>
    prisma.happening.upsert({
      create: h,
      update: {},
      where: {
        id: h.id,
      },
    })
  )
  await Promise.all([...tasksSeed, ...happeningSeed])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
