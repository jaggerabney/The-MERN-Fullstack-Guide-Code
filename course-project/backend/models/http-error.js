class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

function error(message, code) {
  return new HttpError(message, code);
}

module.exports = error;
