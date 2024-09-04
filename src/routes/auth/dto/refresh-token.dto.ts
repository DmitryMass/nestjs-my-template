import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Valid refresh token of current user' })
  @IsString()
  refreshToken: string;
}
