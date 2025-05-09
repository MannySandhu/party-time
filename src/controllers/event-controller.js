import logger from "../lib/logger.js";
import createUserEvent from "../services/eventService/createEvent.js";
import saveUserEvent from "../services/eventService/saveEvent.js";
import getUserEvent from "../services/eventService/getEvent.js";
import deleteUserEvent from "../services/eventService/deleteEvent.js";
import { EventSchema } from "../models/event.schema.js";
import { CreateEventValidationError } from "../lib/errors/index.js";

export const getEvent = async (req, res, next) => {
    try {
        logger.info(`GET request to /api/v1/event.`);
        const { id } = req.params;
        console.log('id ', id);
        const response = await getUserEvent(id);
        res.status(response.status || 200).json(response.data);
    } catch (error) {
        next(error);
    }
};

export const createEvent = async (req, res, next) => {
    try {
        logger.info(`POST request to /api/v1/event.`);
        const { skipCache } = req.query;

        const validatedEvent = EventSchema.safeParse(req.body);

        if (!validatedEvent.success) {
            throw new CreateEventValidationError();
        }

        const response = await createUserEvent(validatedEvent, skipCache);
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

        const response = await saveUserEvent(validatedEvent);

        res.status(response.status || 201).json(response.data);
    } catch (error) {
        next(error);
    }
};

// export const updateEvent = async (req, res) => {
//     try {
//         logger.info(`PUT request to /api/v1/event.`);
//         const { id } = req.query;


//         res.status(response.status || 200).json(response.data);
//     } catch (error) {
//         const status = error.status || 500;
//         logger.error(`PUT request to /api/v1/event return error ${error.message}.`);
//         res.status(status).json({ error: error.message || 'Internal server error' });
//     }
// };

export const deleteEvent = async (req, res, next) => {
    try {
        logger.info(`DELETE request to /api/v1/event.`);
        const { id } = req.params;

        const response = await deleteUserEvent(id);
        res.status(response.status || 200).json({message: 'Event deleted successfully.'});
    } catch (error) {
        next(error);
    }
};
