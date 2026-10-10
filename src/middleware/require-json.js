
import { HttpError } from '../utils/http-error.js';

const METHODS_WITH_BODY = new Set(['POST', 'PUT', 'PATCH']);

export function requireJson(req, res, next) {
  if (
    METHODS_WITH_BODY.has(req.method) &&
    !req.is('application/json')
  ) {
    return next(
      new HttpError(
        415,
        'Unsupported Media Type',
        'Content-Type must be application/json'
      )
    );
  }

  next();
}
