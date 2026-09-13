
// It lets the app return useful HTTP status codes like 400, 404, or 500.
class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export = ApiError;