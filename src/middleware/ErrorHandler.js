import logger from '../lib/logger.js';
import { ZodError } from 'zod';

export default function errorHandler(err, req, res) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (err instanceof ZodError) {
    logger.error(`Validation Error: ${JSON.stringify(err.errors)}`);
    return res.status(400).json({
      success: false,
      message: 'Validation Failed',
      errors: err.errors,
    });
  }

  logger.error(`${message} (${statusCode}) - ${req.method} ${req.originalUrl}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
}
