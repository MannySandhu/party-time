import express from 'express';
const router = express.Router();
import {
    getEvent,
    getAllEvents,
    createEvent,
    saveEvent,
    updateEvent,
    deleteEvent
} from '../../controllers/event.controller.js';

router.post('/event', createEvent);
router.get('/event', getAllEvents);
router.get('/event/:id', getEvent);
router.post('/event/confirm', saveEvent);
router.patch('/event/:id', updateEvent);
router.delete('/event/:id', deleteEvent);

export default router;