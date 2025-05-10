import logger from "../../lib/logger.js";
import { formatEventLog } from "../../lib/LogFormat.js";
import { EventModel } from "../../models/event.model.js";

const updateUserEvent = async (id, updateData) => {
    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(id,
            { $set: updateData },
            { new: true },
            { runValidators: true });

        logger.info(`Event updated: ${formatEventLog(updatedEvent)}`);
        return { 'data': updatedEvent, 'status': 200 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to update event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;    
    }
}

export default updateUserEvent;
