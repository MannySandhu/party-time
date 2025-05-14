import logger from "../../lib/logger.js";
import { formatEventLog } from "../../lib/LogFormat.js";
import { EventModel } from "../../models/event.model.js";
import { enforceAbility } from "../../lib/enforceAbility.js";

const updateUserEvent = async (id, ability, updateData) => {
    try {
        const fetchedEvent = await EventModel.findById(id).lean();
        enforceAbility(ability, 'update', {
            type: 'Event',
            data: fetchedEvent
        });

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
