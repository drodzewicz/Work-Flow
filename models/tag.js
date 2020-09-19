const mongoose = require("../configs/mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
	name: String,
	colorCode: String,
});

const Tag = mongoose.model("Tag", tagSchema);

Tag.processErrors = (err) => {
	const msg = {};
	for (const key in err.errors) {
		msg[key] = err.errors[key].message;
	}
	return msg;
};

module.exports = Tag;
