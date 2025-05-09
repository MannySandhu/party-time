import express from 'express';
const router = express.Router();
import {
    getEvent,
    createEvent,
    saveEvent,
    // updateEvent,
    deleteEvent
} from '../controllers/event-controller.js';

router.get('/event/:id', getEvent);
router.post('/event', createEvent);
router.post('/event/confirm', saveEvent);
// router.put('/event/:id', updateEvent);
router.delete('/event/:id', deleteEvent);

export default router;