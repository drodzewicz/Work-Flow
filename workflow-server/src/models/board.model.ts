import mongoose from "mongoose";
import { Model } from "../types/utils.type.js";

const boardSchema = new mongoose.Schema({
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.User,
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

export default mongoose.model(Model.Board, boardSchema);
