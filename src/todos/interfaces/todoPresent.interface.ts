import { Todo } from "../entities/todo.entity";

export class TodoPresent {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  url: string;

  constructor({ id, title, completed, order }: Todo, url: string) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.order = order;
    this.url = url + id;
  }
}
