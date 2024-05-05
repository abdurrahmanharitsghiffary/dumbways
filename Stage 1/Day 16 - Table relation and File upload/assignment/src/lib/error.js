export class RequestError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "RequestError";
  }
}

export class NotFound extends RequestError {
  constructor(message) {
    super(message ?? "Route not found", 404);
    this.name = "NotFound";
  }
}

export class Unauthorized extends RequestError {
  constructor(message) {
    super(message ?? "Unauthorized", 401);
    this.name = "Unauthorized";
  }
}

export class Forbidden extends RequestError {
  constructor(message) {
    super(message ?? "Access denied", 403);
    this.name = "Forbidden";
  }
}

export class AccessDenied extends RequestError {
  constructor(message) {
    super(message ?? "Access Denied", 403);
    this.name = "AccessDenied";
  }
}

export const ERROR_MESSAGE = Object.freeze({
  projectNotFound: "Project not found.",
  userNotFound: "User not found.",
});
