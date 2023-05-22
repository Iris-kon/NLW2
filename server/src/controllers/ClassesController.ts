import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import convertHourToMinutes from '../utils/convertHourtoMinutes'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

export default class ClassesController {
  async index(resquest: Request, response: Response) {
    const filters = resquest.query

    const subject = filters.subject as string
    const week_day = filters.week_day as string
    const time = filters.time as string

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filter to search classes',
      })
    }

    const timeInMinutes = convertHourToMinutes(time)

    const classes = await prisma.classes.findMany({
      where: {
        classSchedule: {
          some: {
            week_day: {
              in: [Number(week_day)],
            },
            from: {
              lt: timeInMinutes,
            },
            to: {
              gt: timeInMinutes,
            },
          },
        },
        subject: subject,
      },
      include: {
        users: true,
      },
    })

    return response.json(classes)
  }

  async create(resquest: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } =
      resquest.body

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        week_day: Number(scheduleItem.week_day),
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      }
    })

    try {
      await prisma.users.create({
        data: {
          name,
          avatar,
          whatsapp,
          bio,
          classes: {
            create: {
              subject,
              cost,
              classSchedule: {
                create: classSchedule,
              },
            },
          },
        },
      })

      return response.status(201).send()
    } catch (err) {
      return response.status(400).json({
        error: 'Unexpected error while creating new class',
      })
    }
  }
}
