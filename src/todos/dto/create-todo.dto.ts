import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The title of the todo" })
  title: string;
}
