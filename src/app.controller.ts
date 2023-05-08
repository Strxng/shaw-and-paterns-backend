import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('/healthz')
  async healthCheck() {
    return true;
  }
}
