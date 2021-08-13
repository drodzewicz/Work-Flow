const errorHandler = require("../error/errorHandler");

const apiErrorHandler = (err, req, res, next) => {
  const { message, status } = errorHandler(err);
  if (status && message) {
    return res.status(status).json({ message });
  }
  console.log(err);
  return res.json({ message: err });
};

module.exports = apiErrorHandler;
