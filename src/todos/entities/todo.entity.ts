import { ApiProperty } from "@nestjs/swagger";

export class Todo {
  @ApiProperty({ description: "The ID of the todo, typically a UUID" })
  id: string;

  @ApiProperty({ description: "The title of the todo" })
  title: string;

  @ApiProperty({ description: "The todo's completion status" })
  completed: boolean;

  @ApiProperty({ description: "The order of the todo" })
  order: number;

  @ApiProperty({
    description:
      "The URL of the todo resource, depending on the deployed server"
  })
  url: string;
}
