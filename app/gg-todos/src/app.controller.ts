import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IsDate, IsString } from 'class-validator';

class TestDto {
  @IsString()
  name: string;
  @IsDate()
  dateDue: Date;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post()
  test(@Body() testDto: TestDto) {
    console.log('Test route hit:', testDto);
    return 'Test successful';
  }
}
