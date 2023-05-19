import mongoose from "mongoose";
import { Model } from "../types/model.type.js";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [100, "task title is too long"],
  },
  description: {
    type: String,
    maxlength: [500, "task description is too long"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.User,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.Board,
  },
  people: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Model.User,
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Model.Tag,
    },
  ],
});

export default mongoose.model(Model.Task, taskSchema);
