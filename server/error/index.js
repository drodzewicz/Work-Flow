const AuthError = require("./AuthError");
const ResponseError = require("./ResponseError");
const PayloadValueError = require("./PayloadValueError");

const error = {};

error.AuthError = AuthError;
error.ResponseError = ResponseError;
error.PayloadValueError = PayloadValueError;

module.exports = error;
