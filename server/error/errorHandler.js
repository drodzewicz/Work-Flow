const mongoose = require("mongoose");

module.exports = (err) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const message = {};
    for (const key in err.errors) {
      message[key] = err.errors[key].message;
    }
    return { status: 400, message };
  }
  return { status: err.status || 400, message: err.details || err.message };
};
