import express from 'express';
const router = express.Router();
import { getVenues } from '../controllers/venues-controller.js';

router.get('/venues', getVenues);

export default router;