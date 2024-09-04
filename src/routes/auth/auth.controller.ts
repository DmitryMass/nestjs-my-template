import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignupDto } from './dto/signup.dto';

import { Message } from '@utils/class.types';
import { ERROR, SUCCESS } from '@utils/responses';

import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User signup' })
  @ApiCreatedResponse({
    description: SUCCESS.userCreated,
    type: Message,
  })
  @ApiUnauthorizedResponse({ description: ERROR.wrongCredentials })
  @ApiBadRequestResponse({ description: ERROR.userExist })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiCreatedResponse({ description: SUCCESS.userLoginSuccess })
  @ApiUnauthorizedResponse({ description: ERROR.wrongCredentials })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiUnauthorizedResponse({ description: ERROR.refreshTokenInvalid })
  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
