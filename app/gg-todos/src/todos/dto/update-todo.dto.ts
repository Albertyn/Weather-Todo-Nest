import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The name of the task' })
  readonly name: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: 'The the date and time it is due' })
  readonly dateDue: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'The task status' })
  readonly completed: boolean;
}