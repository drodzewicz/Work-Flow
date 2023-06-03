import { Document, Types, Model } from "mongoose";
import { InvalidMongooseIdError } from "../errors/InvalidMongooseIdError.js";

export abstract class GenericRepository<T, D extends Document, F> {
  public model: Model<T>;
  public fields: F[];

  async save(document: D) {
    await document.save();
  }

  async getById(id: string): Promise<D | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new InvalidMongooseIdError("Provided invalid id");
    }

    return await this.model.findById(id, this.fields.join(" "));
  }

  async create(data: T): Promise<D> {
    const newInstance = new this.model(data);
    return await (newInstance as D).save();
  }
}
