import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from './config/config.module';
import { TodosModule } from './todos/todos.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ ConfigModule, TodosModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
