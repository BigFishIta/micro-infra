// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule }   from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// 3️⃣ importa PinoLogger
import { Logger as PinoLogger }            from 'nestjs-pino';

async function bootstrap() {
  // NON disabilitare il logger built-in, così vedi subito il banner di Nest
  const app = await NestFactory.create(AppModule);

  // 4️⃣ recupero e imposto il logger Pino come logger di default
  const pino = app.get(PinoLogger);
  app.useLogger(pino);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Template Service')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  // log di conferma che il server è davvero UP
  console.log('✅ Server listening on http://localhost:3000');
  console.log('✅ Swagger docs at     http://localhost:3000/docs');
  console.log('✅ Metrics exposed at   http://localhost:3000/metrics');
}

bootstrap();
