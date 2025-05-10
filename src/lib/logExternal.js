import logger from './logger.js';

export const logExternalResponse = (serviceName, response, context = {}) => {
  const status = response?.status ?? 'unknown';
  const statusText = response?.statusText ?? '';
  const extras = Object.entries(context)
    .map(([key, val]) => `${key}: ${JSON.stringify(val)}`)
    .join(', ');

  logger.info(`${serviceName} responded with status ${status} ${statusText}${extras ? ` | ${extras}` : ''}`);
};

export const logExternalError = (serviceName, error, context = {}) => {
  const status = error?.response?.status ?? 'unknown';
  const message = error?.message ?? 'Unknown error';
  const extras = Object.entries(context)
    .map(([key, val]) => `${key}: ${JSON.stringify(val)}`)
    .join(', ');

  logger.error(`${serviceName} request failed with status ${status}: ${message}${extras ? ` | ${extras}` : ''}`);
};
