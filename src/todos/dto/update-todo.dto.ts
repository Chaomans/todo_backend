import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  Min
} from "class-validator";
import { CreateTodoDto } from "./create-todo.dto";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: "The title of the todo" })
  title?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: "The todo's completion status" })
  completed?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiProperty({ description: "The order of the todo" })
  order?: number;
}
