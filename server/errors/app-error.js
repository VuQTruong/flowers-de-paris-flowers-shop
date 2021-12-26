class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  }

  static badRequest(message) {
    return new AppError(message, 400);
  }

  static unauthorized(message) {
    return new AppError(message, 401);
  }

  static forbidden(message) {
    return new AppError(message, 403);
  }

  static notFound(message) {
    return new AppError(message, 404);
  }

  static internalError(message) {
    return new AppError(message, 500);
  }
}

module.exports = AppError;
