const mongoose = require("../configs/mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
	name: String,
	colorCode: String,
});

module.exports = mongoose.model("Tag", tagSchema);
