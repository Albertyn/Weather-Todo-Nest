import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the task' })
  readonly name: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: 'The the date and time it is due' })
  readonly dateDue: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'The task status' })
  readonly completed: boolean;
}