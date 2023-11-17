import mongoose from "mongoose";
import { HttpError } from "routing-controllers";

export class CustomMongooseValidationError extends HttpError {
  constructor(error: mongoose.Error.ValidationError) {
    super(500, error.message);
    this.name = "CustomMongooseValidationError";
    this.messages = Object.keys(error.errors).reduce((acc, key) => ({ ...acc, [key]: error.errors[key].message }), {});
  }
  public name: string;
  public messages: Record<string, string>;
}
