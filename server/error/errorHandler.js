const AuthError = require("./AuthError");
const PayloadValueError = require("./PayloadValueError");
const ResponseError = require("./ResponseError");
const mongoose = require("mongoose");

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    const { message } = err;
    return res.status(err.status).json({ message });
  } else if (err instanceof AuthError) {
    const { message } = err;
    return res.status(err.status).json({ message });
  } else if (err instanceof PayloadValueError) {
    const { message } = err;
    return res.status(err.status).json({ message });
  } else if (err instanceof mongoose.Error.ValidationError) {
    const message = {};
    for (const key in err.errors) {
      message[key] = err.errors[key].message;
    }
    return res.status(400).json({ message });
  }
  console.log(err);
  return res.status(500).json({ message: "something went wrong" });
};

module.exports = apiErrorHandler;
