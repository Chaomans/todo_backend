import { HttpException, HttpStatus } from "@nestjs/common";

export class TodoConflit extends HttpException {
  public message: string;
  constructor(message?: string) {
    super("Conflict", HttpStatus.CONFLICT);
    this.message = message;
  }
}
