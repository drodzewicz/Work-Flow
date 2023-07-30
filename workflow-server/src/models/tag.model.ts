import mongoose from "mongoose";
import { ITag, TagModel } from "../types/database/index.js";
import { Model } from "../types/utils.type.js";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  key: { type: String, required: [true, "key is required"] },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.Board,
  },
});

export default mongoose.model<ITag, TagModel>(Model.Tag, schema);
