const mongoose = require("mongoose");
const ENV_CONF = require("../configs/env.conf");

(async () => {
  try {
    await mongoose.connect(ENV_CONF.DBURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = mongoose;
