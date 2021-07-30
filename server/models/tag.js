const mongoose = require("mongoose");
const makeModel = require("./modelFactory");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: String,
  color: String,
});

module.exports = makeModel("Tag", tagSchema);
