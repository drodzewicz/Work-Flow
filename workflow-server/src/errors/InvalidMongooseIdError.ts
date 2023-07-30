export class InvalidMongooseIdError extends Error {
  constructor(message: string = "provided invalid Mongoose Id") {
    super(message);
    this.name = "Invalid Mongoose Id";
  }
}
