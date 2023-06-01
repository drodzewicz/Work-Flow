import { Document, Types, Model } from "mongoose";
import { InvalidMongooseIdError } from "../errors/InvalidMongooseIdError.js";

export abstract class GenericRepository<T, F> {
  public model: Model<unknown>;
  public fields: F[];

  async save(document: Document<unknown>) {
    await document.save();
  }

  async getById(id: string): Promise<T> {
    if (!Types.ObjectId.isValid(id)) {
      throw new InvalidMongooseIdError("Provided invalid id");
    }

    return await this.model.findById(id, this.fields.join(" "));
  }
}
