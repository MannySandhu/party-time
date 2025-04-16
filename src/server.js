import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import logger from './lib/logger.js';

const startServer = async () => {
    try {
        await connectDB();
        logger.info('MongoDB connected');
        app.listen(env.PORT, () => {
            logger.info(`Server running on ${env.PORT}`);
        })
    } catch (error) {
        logger.error('MongoDB connection failed', error);
        process.exit(1);        
    }   
};

startServer();
