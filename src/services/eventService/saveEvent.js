import logger from "../../lib/logger.js";
import { formatEventLog } from "../../lib/LogFormat.js";
import { EventModel } from "../../models/event.model.js";
import cacheService from "../cacheService.js";
import { enforceAbility } from "../../lib/enforceAbility.js";

const saveUserEvent = async (id, ability, event) => {
    try {
        const saveEventWithUserId = {
            ...event,
            userId: id
        };
        const eventModel = new EventModel(saveEventWithUserId);
        await eventModel.validate();

        enforceAbility(ability, 'create', {
            type: 'Event',
            data: eventModel
        });

        const savedEvent = await eventModel.save();
        logger.info(`Event saved: "${formatEventLog(saveEventWithUserId)}`);

        const cacheKey = `event:${savedEvent._id}`;
        cacheService.set(cacheKey, savedEvent.toObject());

        return { 'data': savedEvent.toObject(), 'status': 201 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to save event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
}

export default saveUserEvent;
