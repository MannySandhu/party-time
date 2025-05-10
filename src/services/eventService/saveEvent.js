import logger from "../../lib/logger.js";
import { formatEventLog } from "../../lib/LogFormat.js";
import { EventModel } from "../../models/event.model.js";
import cacheService from "../cacheService.js";

const saveUserEvent = async (event) => {
    try {
        const eventModel = new EventModel(event);
        await eventModel.validate();
        const savedEvent = await eventModel.save();

        logger.info(`Event saved: "${formatEventLog(savedEvent)}`);

        const cacheKey = `event:${savedEvent._id}`;
        cacheService.set(cacheKey, savedEvent.toObject());

        return { 'data': savedEvent, 'status': 201 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to save event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
}

export default saveUserEvent;
