import logger from "../../lib/logger.js";
import { EventModel } from "../../models/event.model.js";

const updateUserEvent = async (id, updateData) => {
    console.log('id ', id)
    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(id,
            { $set: updateData },
            { new: true },
            { runValidators: true });

        logger.info(`Event updated: "${updatedEvent._id}" (ID: ${updatedEvent.eventName})`);
        return { 'data': updatedEvent, 'status': 200 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to update event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
}

export default updateUserEvent;
