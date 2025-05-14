import { validateSessionToken } from '../lib/validateSessionToken.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    req.user = validateSessionToken(token);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default authenticateToken;
