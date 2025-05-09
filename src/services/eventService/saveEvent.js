import logger from "../../lib/logger.js";
import { EventModel } from "../../models/event.model.js";

const saveUserEvent = async (event) => {

    try {
        const eventModel = new EventModel(event.data);
        await eventModel.validate();
        const savedEvent = await eventModel.save();

        logger.info(`Event saved: "${savedEvent.eventName}" (ID: ${savedEvent._id}) for ${savedEvent.location}`);
        return { 'data': savedEvent, 'status': 201 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to save event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
}

export default saveUserEvent;
