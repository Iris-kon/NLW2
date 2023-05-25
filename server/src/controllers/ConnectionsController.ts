import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'

export default class ConnectionController {
  async index(resquest: Request, response: Response) {
    const total = await prisma.connections.count()

    return response.json({ total })
  }
  async create(resquest: Request, response: Response) {
    const { user_id } = resquest.body

    await prisma.connections.create({
      data: {
        created_at: new Date(),
        users: {
          connect: {
            id: user_id,
          },
        },
      },
    })

    return response.status(201).send()
  }
}
