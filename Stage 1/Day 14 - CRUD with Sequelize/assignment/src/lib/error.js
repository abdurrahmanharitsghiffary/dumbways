export class RequestError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "RequestError";
  }
}

export class NotFound extends RequestError {
  constructor() {
    super("Route not found", 404);
    this.name = "NotFound";
  }
}

export const ERROR_MESSAGE = Object.freeze({
  projectNotFound: "Project not found.",
});
