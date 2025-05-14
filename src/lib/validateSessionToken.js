import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { TokenSchema } from '../models/token.schema.js';

export function validateSessionToken(token) {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return TokenSchema.parse(decoded);
  } catch (err) {
    err.status = 500;
    throw new Error('Invalid session token',);
  }
}
