import express from 'express';
const app = express();
import eventRoutes from './routes/event-routes.js';
import errorHandler from './middleware/ErrorHandler.js';

app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1', eventRoutes);

app.get('/', (req, res) => {
    res.status(200).send('API is up and running!');
});

app.use(errorHandler);

export default app;
