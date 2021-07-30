const mongoose = require("mongoose");
const makeModel = require("./modelFactory");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
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
    ref: "User",
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  people: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

module.exports = makeModel("Task", taskSchema);
