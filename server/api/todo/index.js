import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  if (event.req.method === 'GET') {
    return prisma.todo.findMany();
  }
  else if (event.req.method === 'POST'){
    const body = await readBody(event)
    return prisma.todo.create({
      data: {
        title: body.title,
        content: body.content,
        typeId: body.typeId
      }
    })
  }
})
