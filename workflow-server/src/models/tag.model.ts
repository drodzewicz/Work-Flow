import mongoose from "mongoose";
import { ITag, TagModel } from "../types/database/index.js";
import { Model } from "../types/utils.type.js";

const schema = new mongoose.Schema({
  name: String,
  key: String,
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.Board,
  },
});

export default mongoose.model<ITag, TagModel>(Model.Tag, schema);
