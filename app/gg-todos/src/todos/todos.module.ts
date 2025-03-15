import { Module } from '@nestjs/common';
import { TodosController } from './todo.controller';
import { TodosService } from './todos.service';
import { BasicAuthGuard } from '../auth/auth.guard';
import { ConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/app-config.service';

@Module({
  imports:[ ConfigModule ],
  controllers: [TodosController],
  providers: [TodosService, BasicAuthGuard, AppConfigService],
})
export class TodosModule {}