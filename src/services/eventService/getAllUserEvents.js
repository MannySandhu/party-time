import logger from "../../lib/logger.js";
import { formatEventLog } from "../../lib/LogFormat.js";
import { EventModel } from "../../models/event.model.js";
import cacheService from '../cacheService.js';
import { FetchEventListValidationError } from "../../lib/errors/index.js";

const getUserEvent = async (userId, { skipCache } = {}) => {
    try {
        const cacheKey = `userEvents:${userId}`;

        if (!skipCache) {
            const cachedEvent = await cacheService.get(cacheKey);
            if (cachedEvent) {
                return { data: cachedEvent, status: 200 };
            }
            logger.warn(`Cache miss for user:${userId}`);
        }

        logger.info(`Fetching fresh events list:${userId} from DB`);
        const fetchedEventsList = await EventModel.find().lean();


        if (!fetchedEventsList) {
            throw new FetchEventListValidationError();
        }

        logger.info(`Events fetched: ${formatEventLog(fetchedEventsList, 3, userId)}`);
        return { data: fetchedEventsList, status: 200 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to get event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
};

export default getUserEvent;
