import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const prisma = new PrismaClient();
  /*const cat = await prisma.category.create(
  {
  	data: {
  		name: 'hazimunka',
  		createdAt: new Date(),
  		updatedAt: new Date()
  	}
  }
  );*/
}
bootstrap();
