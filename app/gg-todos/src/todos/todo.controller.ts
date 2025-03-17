import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from 'src/auth/auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entity/todo.entity';
import { Public } from '../public.decorator';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@UseGuards(BasicAuthGuard)
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Find all Todos' })
  @ApiOkResponse({ description: 'A list of Todos', type: [Todo] })
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find 1 Todo' })
  @ApiOkResponse({ description: 'A Todo', type: Todo })
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Todo' })
  @ApiCreatedResponse({ description: 'The Todo has been successfully created.', type: Todo })
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    console.log('Received DTO:', createTodoDto);
    console.log("dateDue type", typeof createTodoDto.dateDue);
    return this.todosService.create(createTodoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Todo' })
  @ApiOkResponse({ description: 'The Todo has been successfully updated.', type: Todo })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Todo {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Todo' })
  @ApiOkResponse({ description: 'The Todo has been successfully deleted.'})
  @UseGuards(BasicAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.todosService.remove(id);
  }
}

