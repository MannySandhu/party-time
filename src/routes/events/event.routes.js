import express from 'express';
const router = express.Router();
import authenticateToken from '../../middleware/AuthToken.js';
import {
    getEvent,
    getAllEvents,
    createEvent,
    saveEvent,
    updateEvent,
    deleteEvent
} from '../../controllers/event.controller.js';

router.post('/event', createEvent);
router.get('/event', authenticateToken, getAllEvents);
router.get('/event/:id', authenticateToken, getEvent);
router.post('/event/confirm', authenticateToken, saveEvent);
router.patch('/event/:id', authenticateToken, updateEvent);
router.delete('/event/:id', authenticateToken, deleteEvent);

export default router;