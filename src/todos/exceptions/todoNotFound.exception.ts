import { HttpException, HttpStatus } from "@nestjs/common";

export class TodoNotFound extends HttpException {
  public message: string;
  constructor(message?: string) {
    super("NotFoundException", HttpStatus.NOT_FOUND);
    this.message = message;
  }
}
