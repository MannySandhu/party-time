import express from 'express';
const app = express();
import weatherRoutes from './routes/weather-routes.js';

app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1', weatherRoutes);

app.get('/', (req, res) => {
    res.send('API is up and running!');
});

export default app;