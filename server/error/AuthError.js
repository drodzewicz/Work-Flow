const ResponseError = require("./ResponseError");

class AuthError extends ResponseError {
  constructor(message, status) {
    super(message, status);
  }

  static unauthorized() {
    return new AuthError("unauthorized", 401);
  }

  static badLogin() {
    const message = { username: "bad username", password: "bad password" };
    return new AuthError(message, 400);
  }
}

module.exports = AuthError;
