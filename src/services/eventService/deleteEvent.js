import logger from "../../lib/logger.js";
import { EventModel } from "../../models/event.model.js";

const deleteUserEvent = async (id) => {

    try {
        const deletedEvent = await EventModel.findByIdAndDelete(id).lean();
        if (deletedEvent) {
            logger.info(`Event deleted: ${deletedEvent._id} ${deletedEvent.eventName}`);
        }
        return { 'data': deletedEvent, 'status': 200 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to delete event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
}

export default deleteUserEvent;
