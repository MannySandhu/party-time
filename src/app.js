import express from 'express';
const app = express();
import expressStatusMonitor from 'express-status-monitor';
import authRoutes from './routes/auth/auth.routes.js';
import eventRoutes from './routes/events/event.routes.js';
import errorHandler from './middleware/ErrorHandler.js';
import authenticateToken from './middleware/AuthToken.js';
import attachAbility from './middleware/attachAbility.js';

app.use(expressStatusMonitor())
app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', authenticateToken, attachAbility, eventRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
app.get('/', (req, res) => { 
  res.status(200).send('PartyTime API running.'); 
});

app.use(errorHandler);

export default app;
