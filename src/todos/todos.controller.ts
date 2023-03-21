import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseBoolPipe,
  NotFoundException,
  Put,
  ConflictException,
  Req,
  HttpCode
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Query, UseFilters } from "@nestjs/common/decorators";
import { Todo } from "./entities/todo.entity";
import { TodoPresent } from "./interfaces/todoPresent.interface";
import { Request } from "express";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { Crud, CrudController } from "@nestjsx/crud";

@Crud({
  model: { type: Todo }
})
@UseFilters(new HttpExceptionFilter())
@Controller("todos")
export class TodosController implements CrudController<Todo> {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    return new TodoPresent(
      await this.todosService.create(createTodoDto),
      this.todoUrl(req)
    );
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.todosService
      .findAll()
      .map((todo) => new TodoPresent(todo, this.todoUrl(req)));
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: Request) {
    return new TodoPresent(
      this.todosService.findOneTodo(id),
      this.todoUrl(req)
    );
  }

  @Put(":id")
  put(@Param("id") id: string, @Body() todo: Todo, @Req() req: Request) {
    const oldTodo = this.todosService.findOneTodo(id);
    return new TodoPresent(
      this.todosService.put(oldTodo, todo),
      this.todoUrl(req)
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: Request
  ) {
    return new TodoPresent(
      this.todosService.update(id, updateTodoDto),
      this.todoUrl(req)
    );
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) {
    return this.todosService.remove(id);
  }

  @Delete()
  @HttpCode(204)
  removeAll(@Query("completed", ParseBoolPipe) completed: boolean) {
    return this.todosService.removeAll(completed);
  }

  todoUrl = (req: Request) => `${req.protocol}://${req.get("Host")}/todos/`;
}
