import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('JSCODE API')
    .setDescription('JSCODE API Description')
    .setVersion('1.0')
    .addTag('board')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 이러면  http://localhost/api  로 가면 swagger 볼 수 있다.

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
