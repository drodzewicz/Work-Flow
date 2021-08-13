const AuthError = require("./AuthError");
const PayloadValueError = require("./PayloadValueError");
const ResponseError = require("./ResponseError");
const mongoose = require("mongoose");

module.exports = (err) => {
  if (err instanceof ResponseError) {
    return err;
  } else if (err instanceof AuthError) {
    return err;
  } else if (err instanceof PayloadValueError) {
    return err;
  } else if (err instanceof mongoose.Error.ValidationError) {
    const message = {};
    for (const key in err.errors) {
      message[key] = err.errors[key].message;
    }
    return { status: 400, message };
  }
  return err;
};
