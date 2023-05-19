import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('JSCODE API')
    .setDescription('JSCODE API Description')
    .setVersion('1.0')
    .addTag('board')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 이러면  http://localhost/api  로 가면 swagger 볼 수 있다.

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true, // 개발시에는 treu 그러면 어떤 프론트도 접근가능, 배포시 특정 url
    credentials: true, // 백과 프론트 모두에서 true로 해줘야한다.
  });
  app.useGlobalFilters(new HttpExceptionFilter()); //class vaildator랑 겹쳐서 우선 주석
  await app.listen(+process.env.MAINPORT);
}
bootstrap();
