import dotenv from 'dotenv';
import { z } from 'zod';
import logger from '../lib/logger.js';

dotenv.config({
    path: `.env.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`
});

export const envSchema = z.object({
    MONGODB_URI: z.string().url(),
    OPEN_MATEO_WEATHER_URL: z.string().url(),
    GOOGLE_PLACES_API_URL: z.string().url(),
    GOOGLE_PLACES_API_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    JWT_SECRET: z.string(),
    PORT: z.string().regex(/^\d+$/).default('3000')
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    logger.error('Invalid environment configuration', result.error.format());
    process.exit(1);
}

export const env = result.data;