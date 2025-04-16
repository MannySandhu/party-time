import app from './app.js';
import dotenv from 'dotenv';
import { z } from 'zod';
import mongoose, { mongo } from 'mongoose';
import logger from './lib/logger.js';

dotenv.config({
    path: `.env.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`
});

const envSchema = z.object({
    MONGODB_URI: z.string().url(),
    PORT: z.string().regex(/^\d+$/)
})

const result = envSchema.safeParse(process.env);

if(!result.success){
    console.error('Invalid environment configuration', result.error.format());
    process.exit(1);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Starting server on ${PORT}`);
})