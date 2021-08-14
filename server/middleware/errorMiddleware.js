const errorHandler = require("../error/errorHandler");

const apiErrorHandler = (err, req, res, next) => {
  const { message, status } = errorHandler(err);
  return res.status(status).json({ message });
};

module.exports = apiErrorHandler;
