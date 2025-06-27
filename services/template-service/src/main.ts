// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule }      from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// 3️⃣ importa PinoLogger
import { Logger as PinoLogger }            from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // disabilito il logger built-in di Nest (opzionale)
    logger: false,
  });

  // 4️⃣ recupero e imposto il logger Pino come logger di default
  const logger = app.get(PinoLogger);
  app.useLogger(logger);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Template Service')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(3000);
  logger.log('Server listening on http://localhost:3000');
  logger.log('Swagger docs at     http://localhost:3000/docs');
  logger.log('Metrics exposed at   http://localhost:3000/metrics');
}
bootstrap();
