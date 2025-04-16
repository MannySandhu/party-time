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
    PORT: z.string().regex(/^\d+$/).default('3000')
})

const result = envSchema.safeParse(process.env);

if(!result.success){
    console.error('Invalid environment configuration', result.error.format());
    process.exit(1);
}

const startServer = async () => {
    try {
        await mongoose.connect(result.data.MONGODB_URI);
        logger.info('MongoDB connected');

        app.listen(result.data.PORT, () => {
            logger.info(`Server running on ${result.data.PORT}`);
        })
    } catch (error) {
        logger.error('MongoDB connection failed', error);
        process.exit(1);        
    }   
};

startServer();
