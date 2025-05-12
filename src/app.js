import express from 'express';
const app = express();
import authRoutes from './routes/auth/auth.routes.js';
import eventRoutes from './routes/events/event.routes.js';
import errorHandler from './middleware/ErrorHandler.js';

app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', eventRoutes);

app.get('/', (req, res) => {
    res.status(200).send('API is up and running!');
});

app.use(errorHandler);

export default app;
