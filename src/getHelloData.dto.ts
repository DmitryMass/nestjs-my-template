import { IsInt, IsString, Max, Min } from 'class-validator';

export class GetHelloDataDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsInt({ message: 'Must be INT' })
  @Min(1, { message: 'Min 1 ' })
  @Max(99, { message: 'Max 99' })
  age: number;
}
