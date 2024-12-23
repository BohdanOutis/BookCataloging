import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Book Cataloging System API')  // Set the title of your API
    .setDescription('API for managing books, users, ratings, comments, and more')  // API description
    .setVersion('1.0')  // Version of the API
    .addBearerAuth()  // Add JWT Authorization (if applicable)
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // Swagger UI will be available at /api endpoint

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
