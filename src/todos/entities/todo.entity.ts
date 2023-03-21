import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @ApiProperty({ description: "The ID of the todo, typically a UUID" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ description: "The title of the todo" })
  @Column()
  title: string;

  @ApiProperty({ description: "The todo's completion status" })
  @Column()
  completed: boolean;

  @ApiProperty({ description: "The order of the todo" })
  @Column()
  order: number;
}
