import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('ping')
  ping() {
    return { pong: true };
  }
}
