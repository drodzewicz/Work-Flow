const AuthError = require("./AuthError");
const RequiredFieldError = require("./RequiredFieldError");
const ResponseError = require("./ResponseError");

const error = {};

error.AuthError = AuthError;
error.RequiredFieldError = RequiredFieldError;
error.ResponseError = ResponseError;

module.exports = error;
