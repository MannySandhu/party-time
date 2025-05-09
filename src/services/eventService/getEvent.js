import logger from "../../lib/logger.js";
import { EventModel } from "../../models/event.model.js";

const getUserEvent = async (id) => {

    try {
        const fetchedEvent = await EventModel.findById(id).lean();
        if (fetchedEvent) {
            logger.info(`Event fetched: ${fetchedEvent._id} ${fetchedEvent.eventName}`);
        }
        return { 'data': fetchedEvent, 'status': 200 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to get event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
}

export default getUserEvent;
