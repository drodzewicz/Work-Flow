const ResponseError = require("./ResponseError");

class AuthError extends ResponseError {
  constructor(...args) {
    super(...args);
  }

  static unauthorized() {
    return new AuthError(401, {}, "Unauthorized");
  }

  static badLogin() {
    const message = { username: "bad username", password: "bad password" };
    return new AuthError(401, message, "bad login");
  }
}

module.exports = AuthError;
