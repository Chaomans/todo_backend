import { ArgumentsHost, Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private TodoError = (code: number, message: string) => ({
    code,
    message
  });

  create({ title }: CreateTodoDto, url: string) {
    const id = crypto.randomUUID();
    const created: Todo = {
      title,
      id,
      order: this.todos.length + 1,
      completed: false,
      url: url + "todos/" + id
    };
    this.todos.push(created);
    return created;
  }

  findAll() {
    return this.todos.map((todo) => todo);
  }

  findOne(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw this.TodoError(404, "todo not found !");
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
      throw this.TodoError(404, "todo not found !");
    }
    if (order && this.todos.some((todo) => todo.order == order)) {
      throw this.TodoError(409, "order value already exist");
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
    const removed = this.findOne(id);
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
