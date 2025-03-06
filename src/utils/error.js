export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = "AppError";
    // Ensure stack trace is captured
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleError(error) {
  // Handle null or undefined error
  if (!error) {
    return {
      message: "An unknown error occurred",
      statusCode: 500,
    };
  }

  // Ensure we have a proper error object
  const errorObject =
    error instanceof Error ? error : new Error(error.toString());

  console.error("Error:", {
    name: errorObject.name || "Error",
    message: errorObject.message || "An unknown error occurred",
    stack: errorObject.stack || new Error().stack,
    details: error.details || null,
  });

  // Return a sanitized error object for the client
  return {
    message: errorObject.message || "An unexpected error occurred",
    statusCode: error.statusCode || 500,
    ...(process.env.NODE_ENV === "development" && {
      details: error.details || null,
      stack: errorObject.stack || new Error().stack,
    }),
  };
}

export function isAppError(error) {
  return error instanceof AppError;
}

export function createNotFoundError(message = "Resource not found") {
  return new AppError(message, 404);
}

export function createValidationError(message, details) {
  return new AppError(message, 400, details);
}

export function createAuthenticationError(message = "Authentication required") {
  return new AppError(message, 401);
}

export function createAuthorizationError(message = "Permission denied") {
  return new AppError(message, 403);
}
