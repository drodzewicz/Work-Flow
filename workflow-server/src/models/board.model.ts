import mongoose from "mongoose";
import { IBoard, BoardModel } from "../types/database/index.js"
import { Model } from "../types/utils.type.js";
import { RoleNames } from "../config/permissions.config.js"

const schema = new mongoose.Schema<IBoard, BoardModel>({
  name: {
    type: String,
    required: [true, "username is required"],
    minlength: [3, "must not be less that 3 charatcters"],
    maxlength: [50, "must not be longer than 50 characters"],
  },
  description: {
    type: String,
    maxlength: [1000, "must not be longer than 1000 characters"],
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
        default: RoleNames.VIEWER,
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
