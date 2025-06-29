import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Utility')
@Controller()
export class PingController {
  @Get('ping')
  getPing() {
    return { pong: true };
  }
}
