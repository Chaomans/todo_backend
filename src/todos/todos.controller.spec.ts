import { Test, TestingModule } from "@nestjs/testing";
// import { Request } from "express";
// import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";

describe("TodosController", () => {
  let controller: TodosController;

  const mockTodosService = {
    create: jest.fn()
  };

  const req = jest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService]
    })
      .overrideProvider(TodosService)
      .useValue(mockTodosService)
      .compile();

    controller = module.get<TodosController>(TodosController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  //   it("Should create a todo", () => {
  //     expect(
  //       controller.create(
  //         {
  //           title: "Shoot a fly d'un seul geste"
  //         },
  //       )
  //     );
  //   });
});
