import mongoose from "mongoose";
import { ITag, TagModel } from "../types/database/index.js";
import { Model } from "../types/utils.type.js";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [2, "must not be less that 2 charatcters"],
    maxlength: [20, "must not be longer than 20 characters"],
  },
  key: { type: String, required: [true, "key is required"] },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.Board,
  },
});

export default mongoose.model<ITag, TagModel>(Model.Tag, schema);
