import { Test, TestingModule } from "@nestjs/testing";
import { Todo } from "./entities/todo.entity";
import { TodosService } from "./todos.service";

describe("TodosService", () => {
  let service: TodosService;
  const todos: Todo[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService]
    }).compile();

    service = module.get<TodosService>(TodosService);
    todos.length = 0;
    todos.push(
      ...[
        {
          id: "426ccf2c-8039-4734-86e2-3d403bb5ab4d",
          title: "Eat a unicorn",
          completed: false,
          order: 1
        },
        {
          id: "ec3ef365-bd81-4c1c-8d9f-1d9b66cced82",
          title: "Shoot a fly d'un seul geste",
          completed: false,
          order: 2
        }
      ]
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Should create a todo", () => {
    todos.length = 0;
    const newTodo = service.create({ title: "buy an apple" });
    const regex = /^[0-9a-fA-F]{8}(-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$/;
    expect(newTodo.title).toEqual("buy an apple");
    expect(newTodo.completed).toBeFalsy();
    expect(newTodo.order).toEqual(1);
    expect(regex.test(newTodo.id)).toBeTruthy();
  });

  // Fake response from repo
  // unit test
});
