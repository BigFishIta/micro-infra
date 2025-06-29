// services/template-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggerModule } from 'nestjs-pino';
import { PingController } from './ping.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController }     from './health/health.controller';

// ← qui il solo alias + cartella “email”
import { EmailModule } from '@common/email/email.module';
import { TestEmailController } from './test-email.controller';

@Module({
  imports: [
    EmailModule,
    TerminusModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrometheusModule.register({ path: '/metrics', defaultMetrics: { enabled: true } }),
    LoggerModule.forRoot({ pinoHttp: { level: 'info' } }),
  ],
  controllers: [TestEmailController, HealthController, PingController],
})
export class AppModule {}
