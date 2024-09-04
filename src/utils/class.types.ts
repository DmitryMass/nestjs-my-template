import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty({ description: 'Response message' })
  message: string;
}
