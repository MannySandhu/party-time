import logger from "../lib/logger.js";
// import mongoose from "mongoose";
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
        const ability = req.ability;
        const validatedEvent = EventSchema.safeParse(req.body);

        if (!validatedEvent.success) {
            throw new CreateEventValidationError();
        }
        const response = await createUserEvent(ability, validatedEvent.data, { skipCache });

        res.status(response.status || 200).json(response.data);

    } catch (error) {
        next(error);
    }
};

export const saveEvent = async (req, res, next) => {
    try {
        logger.info(`POST request to /api/v1/event/confirm.`);
        const id = req.user.id;
        const ability = req.ability;

        const validatedEvent = EventSchema.safeParse(req.body);
        if (!validatedEvent.success) {
            throw new CreateEventValidationError();
        }
        const response = await saveUserEvent(id, ability, validatedEvent.data);

        res.status(response.status || 201).json(response.data);
    } catch (error) {
        next(error);
    }
};

export const getAllEvents = async (req, res, next) => {
    try {
        logger.info(`GET request to /api/v1/event.`);
        const skipCache = req.query.skipCache === 'true';
        const ability = req.ability;
        const response = await getAllUserEvents(ability, { skipCache });
        
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
        const ability = req.ability;
        
        // if (!mongoose.Types.ObjectId.isValid(id)) {
            
        // }

        const response = await getUserEvent(id, ability, { skipCache });

        res.status(response.status || 200).json(response.data);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    try {
        logger.info(`PATCH request to /api/v1/event.`);
        const { id } = req.params;
        const ability = req.ability;

        // if (!mongoose.Types.ObjectId.isValid(id)) {
            
        // }

        const validatedUpdate = UpdateEventSchema.safeParse(req.body);

        if (!validatedUpdate.success) {
            throw new CreateEventValidationError();
        }

        const response = await updateUserEvent(id, ability, validatedUpdate.data);

        res.status(response.status || 200).json({ message: 'Event updated.' });
    } catch (error) {
        next(error)
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        logger.info(`DELETE request to /api/v1/event.`);
        const { id } = req.params;
        const ability = req.ability;

        // if (!mongoose.Types.ObjectId.isValid(id)) {
            
        // }

        const response = await deleteUserEvent(id, ability);

        res.status(response.status || 200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
