import express from 'express';
const router = express.Router();
import { getWeather } from '../controllers/weather-controller.js';

router.post('/weather', getWeather);

export default router;