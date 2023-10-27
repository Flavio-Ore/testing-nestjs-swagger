import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'

import { ApiTags } from '@nestjs/swagger'
import { Task } from '@prisma/client'
import { TaskService } from './task.service'

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor (private readonly taskService: TaskService) {}

  @Get()
  async getHello () {
    return await this.taskService.getAllTasks()
  }
  @Post()
  async createTask (@Body() data: Task) {
    try {
      return await this.taskService.createTask(data)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Get(':id')
  async getTaskById (@Param('id') id: string) {
    const taskFound = await this.taskService.getTaskById(Number(id))
    if (!taskFound) throw new NotFoundException('Task does not exist!')
    return taskFound
  }

  @Delete(':id')
  async deleteTask (@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(Number(id))
    } catch (error) {
      throw new NotFoundException(error.message || 'Task does not exist!')
    }
  }

  @Put(':id')
  async updateTask (@Param('id') id: string, @Body() data: Task) {
    try {
      return await this.taskService.updateTask(Number(id), data)
    } catch (error) {
      throw new NotFoundException(error.message || 'Task does not exist!')
    }
  }
}
