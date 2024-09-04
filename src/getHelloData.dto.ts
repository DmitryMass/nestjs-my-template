import { IsInt, IsString, Max, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GetHelloDataDto {
  @ApiProperty({
    description: 'Name hello data',
  })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Age hello data',
  })
  @IsInt({ message: 'Must be INT' })
  @Min(1, { message: 'Min 1 ' })
  @Max(99, { message: 'Max 99' })
  age: number;
}
