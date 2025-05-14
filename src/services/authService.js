import { env } from '../config/env.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import UserModel from "../models/user.model.js";
import logger from "../lib/logger.js";

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export const authGoogleUser = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await UserModel.findOne({ googleId });
    if (!user) {
      user = await UserModel.create({
        email,
        name,
        picture,
        googleId,
        role: 'user'
      });
    }

    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(tokenPayload, env.JWT_SECRET, { expiresIn: '7d' });

    logger.info(`Token issued for user: ${user.email}`);
    return { token, user };

  } catch (err) {
    const message = err.message || 'Google login failed.';
    const error = new Error(message);
    error.statusCode = err.statusCode || 500;
    throw error;
  }
};
