import logger from "../../lib/logger.js";
import { formatEventLog } from "../../lib/LogFormat.js";
import { EventModel } from "../../models/event.model.js";
import { enforceAbility } from "../../lib/enforceAbility.js";

const deleteUserEvent = async (id, ability) => {

    try {
        const fetchedEvent = await EventModel.findById(id).lean();
        enforceAbility(ability, 'delete', {
            type: 'Event',
            data: fetchedEvent
        });

        const deletedEvent = await EventModel.findByIdAndDelete(id).lean();
        if (deletedEvent) {
            logger.info(`Event deleted: ${formatEventLog(deletedEvent)}`);
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
