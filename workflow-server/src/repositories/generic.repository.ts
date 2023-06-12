import { Document, Types, Model } from "mongoose";
import { InvalidMongooseIdError } from "../errors/InvalidMongooseIdError.js";

export abstract class GenericRepository<T, D extends Document, F> {
  public model: Model<T>;
  public fields: F[];

  protected validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new InvalidMongooseIdError("Provided invalid id");
    }
  }

  async save(document: D) {
    await document.save();
  }

  async getById(id: string): Promise<D | null> {
    this.validateId(id);
    return await this.model.findById(id, this.fields.join(" "));
  }

  async create(data: T): Promise<D> {
    const newInstance = new this.model(data);
    return await (newInstance as D).save();
  }

  async delete(id: string): Promise<void> {
    this.validateId(id);
    await this.model.findByIdAndDelete(id);
  }
}
