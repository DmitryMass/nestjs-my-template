import { GetHelloDataDto } from 'getHelloData.dto';
import { UserRole } from 'types/roles';

import { AppService } from './app.service';

import { Roles } from '@routes/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@routes/auth/guards/auth.guard';
import { RolesGuard } from '@routes/auth/guards/roles.guard';

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App endpoints')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles([UserRole.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('test')
  getHello(@Body() getHelloData: GetHelloDataDto) {
    return this.appService.getHello();
  }
}
