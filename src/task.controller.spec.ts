import { Test, TestingModule } from '@nestjs/testing'
import { TaskController } from './tasks/task.controller'
import { TaskService } from './tasks/task.service'

describe('AppController', () => {
  let appController: TaskController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile()

    appController = app.get<TaskController>(TaskController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
