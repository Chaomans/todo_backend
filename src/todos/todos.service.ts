import { ArgumentsHost, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";
import { TodoConflit } from "./exceptions/todoConflict.exception";
import { TodoNotFound } from "./exceptions/todoNotFound.exception";

@Injectable()
export class TodosService extends TypeOrmCrudService<Todo> {
  private todos: Todo[] = [];

  constructor(@InjectRepository(Todo) repo) {
    super(repo);
  }

  async create({ title }: CreateTodoDto) {
    const todo = await this.repo.save({
      title,
      completed: false
    });
    return todo;
  }

  findAll() {
    return this.todos.map((todo) => todo);
  }

  findOneTodo(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new TodoNotFound("todo not found !");
    }
    return todo;
  }

  put(oldTodo: Todo, newTodo: Todo) {
    return this.update(newTodo.id, {
      title: newTodo.title === oldTodo.title ? null : newTodo.title,
      completed:
        newTodo.completed === oldTodo.completed ? null : newTodo.completed,
      order: newTodo.order === oldTodo.order ? null : newTodo.order
    });
  }

  update(id: string, { title, completed, order }: UpdateTodoDto) {
    if (!this.todos.some((todo) => todo.id == id)) {
      throw new TodoNotFound("todo not found !");
    }
    if (order && this.todos.some((todo) => todo.order == order)) {
      throw new TodoConflit("order value already exist");
    }
    const newTodos = this.todos.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          title: title ?? todo.title,
          completed: completed ?? todo.completed,
          order: order ?? todo.order
        };
      } else {
        return todo;
      }
    });
    this.todos = newTodos;
    return this.todos.find((todo) => todo.id === id);
  }

  remove(id: string) {
    const removed = this.findOneTodo(id);
    this.todos = this.todos
      .filter((todo) => todo.id !== id)
      .map((todo, index) => ({ ...todo, order: index + 1 }));
    return removed;
  }

  removeAll(completed: boolean) {
    if (!completed) {
      const removed = this.todos;
      this.todos = [];
      return removed;
    }
    const removed = this.todos.filter((todo) => todo.completed === completed);
    this.todos = this.todos
      .filter((todo) => todo.completed !== completed)
      .map((todo, index) => ({ ...todo, order: index + 1 }));
    return removed;
  }
}
