// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
// 1️⃣ importa LoggerModule da nestjs-pino
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PrometheusModule.register({ path: '/metrics', defaultMetrics: { enabled: true } }),
    // 2️⃣ registra LoggerModule per avere un logger JSON su stdout
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        // ometti prettifier per avere JSON puro
        transport: undefined,
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
