const mongoose = require("mongoose");

const { DBURI } = process.env;
(async () => {
	try {
		await mongoose.connect(DBURI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();

const db = mongoose.connection;

db.on("open", () => {
	console.log(`Successfully connected to MongoDB ${DBURI}`);
});

db.on("error", console.error.bind(console, "Can't connect to MongoDB: "));

module.exports = mongoose;
