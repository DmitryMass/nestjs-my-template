import { GetHelloDataDto } from 'getHelloData.dto';

import { AppService } from './app.service';

import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  getHello(@Body() getHelloData: GetHelloDataDto) {
    console.log(getHelloData);
    return this.appService.getHello();
  }
}
