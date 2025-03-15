import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsDate()
  readonly dateDue: Date;

  @IsNotEmpty()
  @IsBoolean()
  readonly completed: boolean;
}