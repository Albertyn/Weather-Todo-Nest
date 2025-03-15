import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from 'src/auth/auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entity/todo.entity';
import { Public } from '../public.decorator';


@UseGuards(BasicAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Public()
  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    console.log('Received DTO:', createTodoDto);
    console.log("dateDue type", typeof createTodoDto.dateDue);
    return this.todosService.create(createTodoDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Todo {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(BasicAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.todosService.remove(id);
  }
}

