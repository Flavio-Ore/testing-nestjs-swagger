import { Injectable } from '@nestjs/common'
import { Task } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TaskService {
  constructor (private prisma: PrismaService) {}
  getAllTasks (): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  getTaskById (id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { id },
    })
  }

  createTask (data: Task): Promise<Task> {
    return this.prisma.task.create({ data })
  }

  updateTask (id: number, data: Task): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    })
  }

  deleteTask (id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } })
  }
}
