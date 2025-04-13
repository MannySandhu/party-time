import app from './app.js';
import dotenv from 'dotenv';
import logger from './lib/logger.js';
dotenv.config({
    path: `.env.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Starting server on ${PORT}`)
    console.log(`Listening on PORT: ${PORT}`);
})