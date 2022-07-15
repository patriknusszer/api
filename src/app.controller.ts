import { Controller,
         Get,
         Param,
         Post,
         Body,
         Put,
         Delete
       } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient, Category, Todo, Prisma } from '@prisma/client';

class CatDTO {
  name: string;
}

class ToDTO {
  title: string;
  completed: boolean;
  categoryid: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('todo/create')
  async createTodo(@Body() to: ToDTO) {
    const prisma = new PrismaClient();
    return (await prisma.todo.create(
    {
      data: {
        title: to.title,
        completed: Boolean(to.completed),
        category: {
          connect: {
              id: Number(to.categoryid)
          }
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })).id;
  }

  @Put('category/todo/:id')
  async updateTodo(@Param('id') id: number, @Body() to: ToDTO) {
    await (new PrismaClient()).todo.update({
      where: { id: Number(id) },
      data: {
        title: to.title,
        completed: to.completed,
        updatedAt: new Date(),
        category: {
          connect: {
            id: Number(to.categoryid)
          }
        }
      },
    });
    return 'aha';
  }

  @Put('category/update/:id')
  async updateCategory(@Param('id') id: number, @Body() cat: CatDTO) {
    await (new PrismaClient()).category.update({
      where: { id: Number(id) },
      data: {
        name: cat.name,
        updatedAt: new Date()
      }
    });
    return 'aha';
  }

  @Post('category/create')
  async createCategory(@Body() cat: CatDTO) {
    const prisma = new PrismaClient();
    return (await prisma.category.create(
    {
      data: {
        name: cat.name,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })).id;
  }

  @Get('category/:id')
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    const prisma = new PrismaClient();
    return prisma.category.findUnique({
      where: { id: Number(id) }
    });
  }

  @Get('todo/:id')
  async getTodoById(@Param('id') id: number): Promise<Todo> {
    const prisma = new PrismaClient();
    return prisma.todo.findUnique({
      where: { id: Number(id) }
    });
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
