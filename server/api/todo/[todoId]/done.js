import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const todoId = Number(event.context.params.todoId)
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  })
  return prisma.todo.update({
    where: {
      id: todoId
    },
    data: {
      done: !todo.done
    },

  })
})
