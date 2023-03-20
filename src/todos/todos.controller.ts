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
import { Request } from "express";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Query } from "@nestjs/common/decorators";
import { Todo } from "./entities/todo.entity";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    return this.todosService.create(
      createTodoDto,
      `${req.protocol}://${req.get("Host")}/`
    );
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    try {
      return this.todosService.findOne(id);
    } catch (error) {
      throw new NotFoundException({ message: "todo not found" });
    }
  }

  @Put(":id")
  put(@Param("id") id: string, @Body() todo: Todo) {
    try {
      const oldTodo = this.todosService.findOne(id);
      return this.todosService.put(oldTodo, todo);
    } catch (error) {
      switch (error.code) {
        case 404:
          throw new NotFoundException(error.message);
        case 409:
          throw new ConflictException(error.message);
      }
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      return this.todosService.update(id, updateTodoDto);
    } catch (error) {
      switch (error.code) {
        case 404:
          throw new NotFoundException(error.message);
        case 409:
          throw new ConflictException(error.message);
      }
    }
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) {
    try {
      return this.todosService.remove(id);
    } catch (error) {
      throw new NotFoundException({ message: error.message });
    }
  }

  @Delete()
  @HttpCode(204)
  removeAll(@Query("completed", ParseBoolPipe) completed: boolean) {
    return this.todosService.removeAll(completed);
  }
}
