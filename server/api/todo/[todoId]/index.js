import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const todoId = Number(event.context.params.todoId)
  if (event.req.method === 'GET') {
    return prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
  }
  else{
    const body = await readBody(event)
    switch (event.req.method) {
      case 'POST':
        return prisma.todo.create({
          data: {
            title: body.title,
            content: body.content,
            typeId: body.typeId
          }
        })
      case 'PUT':
        return prisma.todo.update({
          data: {
            title: body.title,
            content: body.content,
            typeId: body.typeId
          },
          where: {
            id: todoId,
          }
        })
      case 'DELETE':
        return prisma.todo.delete({
          where: {
            id: todoId,
          }
        })
    }
  }

})
