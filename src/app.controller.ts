import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('/')
  async home() {
    return true;
  }

  @Get('/healthz')
  async healthCheck() {
    return true;
  }
}
