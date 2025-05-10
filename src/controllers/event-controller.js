import logger from "../lib/logger.js";
import mongoose from "mongoose";
import createUserEvent from "../services/eventService/createEvent.js";
import saveUserEvent from "../services/eventService/saveEvent.js";
import getAllUserEvents from "../services/eventService/getAllUserEvents.js";
import getUserEvent from "../services/eventService/getEvent.js";
import deleteUserEvent from "../services/eventService/deleteEvent.js";
import updateUserEvent from "../services/eventService/updateEvent.js";
import { EventSchema, UpdateEventSchema } from "../models/event.schema.js";
import { CreateEventValidationError } from "../lib/errors/index.js";

export const createEvent = async (req, res, next) => {
    try {
        logger.info(`POST request to /api/v1/event.`);
        const skipCache = req.query.skipCache === 'true';

        const validatedEvent = EventSchema.safeParse(req.body);

        if (!validatedEvent.success) {
            throw new CreateEventValidationError();
        }
        const response = await createUserEvent(validatedEvent.data, { skipCache });

        res.status(response.status || 200).json(response.data);

    } catch (error) {
        next(error);
    }
};

export const saveEvent = async (req, res, next) => {
    try {
        logger.info(`POST request to /api/v1/event/confirm.`);
        const validatedEvent = EventSchema.safeParse(req.body);

        if (!validatedEvent.success) {
            throw new CreateEventValidationError();
        }
        const response = await saveUserEvent(validatedEvent.data);

        res.status(response.status || 201).json(response.data);
    } catch (error) {
        next(error);
    }
};

export const getAllEvents = async (req, res, next) => {
    try {
        logger.info(`GET request to /api/v1/event.`);

        const { userId } = req.query;
        const skipCache = req.query.skipCache === 'true';
        const response = await getAllUserEvents(userId, { skipCache });

        res.status(response.status || 200).json(response.data);
    } catch (error) {
        next(error);
    }
};

export const getEvent = async (req, res, next) => {
    try {
        logger.info(`GET request to /api/v1/event.`);
        const skipCache = req.query.skipCache === 'true';
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`Invalid MongoDB ObjectId received: ${id}`);
            // throw createError(400, 'Invalid event ID format');
        }

        const response = await getUserEvent(id, { skipCache });

        res.status(response.status || 200).json(response.data);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    try {
        logger.info(`PATCH request to /api/v1/event.`);
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            // throw custom error
        }

        const validatedUpdate = UpdateEventSchema.safeParse(req.body);

        if (!validatedUpdate.success) {
            throw new CreateEventValidationError();
        }

        const response = await updateUserEvent(id, validatedUpdate.data);

        res.status(response.status || 200).json({ message: 'Event updated.' });
    } catch (error) {
        next(error)
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        logger.info(`DELETE request to /api/v1/event.`);
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            // throw custom error
        }
        const response = await deleteUserEvent(id);

        res.status(response.status || 200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
