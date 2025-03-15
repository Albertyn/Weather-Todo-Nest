import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsDate()
  readonly dateDue: Date;

  @IsOptional()
  @IsBoolean()
  readonly completed: boolean;
}