import mongoose from "mongoose";
import { IBoard, BoardModel } from "../types/database/index.js"
import { Model } from "../types/utils.type.js";

const schema = new mongoose.Schema<IBoard, BoardModel>({
  name: {
    type: String,
    required: [true, "username is required"],
    minlength: [3, "must not be less that 3 charatcters"],
    maxlength: [25, "must not be longer than 25 characters"],
  },
  description: {
    type: String,
    maxlength: [400, "must not be longer than 400 characters"],
  },
  members: [
    {
      _id: false,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Model.User,
      },
      role: {
        type: String,
        default: "REGULAR",
      },
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Model.Tag,
    },
  ],
  columns: [
    {
      name: String,
      tasks: [
        {
          _id: false,
          type: mongoose.Schema.Types.ObjectId,
          ref: Model.Task,
        },
      ],
    },
  ],
  timeCreated: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model<IBoard, BoardModel>(Model.Board, schema);
