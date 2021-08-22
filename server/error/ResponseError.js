
class ResponseError extends Error {
  constructor(status, details, ...params) {
    super(params);
    this.details = details;
    this.status = status;
  }
}

module.exports = ResponseError;
