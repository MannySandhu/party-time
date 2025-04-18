import logger from "../lib/logger.js";

export const getEvent = async (req, res) => {
    try {
        logger.info(`GET request to /api/v1/event.`);
        const { id } = req.query;


        res.status(response.status || 200).json(response.data);
    } catch (error) {
        const status = error.status || 500;
        logger.error(`GET request to /api/v1/event return error ${error.message}.`);
        res.status(status).json({ error: error.message || 'Internal server error' });
    }
};

export const createEvent = async (req, res) => {
    try {
        logger.info(`POST request to /api/v1/event.`);

        const { eventName, eventData } = req.body;

        res.status(response.status || 200).json(response.data);
    } catch (error) {
        const status = error.status || 500;
        logger.error(`POST request to /api/v1/event return error ${error.message}.`);
        res.status(status).json({ error: error.message || 'Internal server error' });
    }
};

export const updateEvent = async (req, res) => {
    try {
        logger.info(`PUT request to /api/v1/event.`);
        const { id } = req.query;


        res.status(response.status || 200).json(response.data);
    } catch (error) {
        const status = error.status || 500;
        logger.error(`PUT request to /api/v1/event return error ${error.message}.`);
        res.status(status).json({ error: error.message || 'Internal server error' });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        logger.info(`DELETE request to /api/v1/event.`);
        const { id } = req.query;


        res.status(response.status || 200).json(response.data);
    } catch (error) {
        const status = error.status || 500;
        logger.error(`DELETE request to /api/v1/event return error ${error.message}.`);
        res.status(status).json({ error: error.message || 'Internal server error' });
    }
};
