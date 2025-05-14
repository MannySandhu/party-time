import logger from "../../lib/logger.js";
import { formatEventLog } from "../../lib/LogFormat.js";
import { EventModel } from "../../models/event.model.js";
import cacheService from '../cacheService.js';
import { FetchEventValidationError } from "../../lib/errors/index.js";
import { enforceAbility } from "../../lib/enforceAbility.js";

const getUserEvent = async (id, ability, { skipCache } = {}) => {
  try {
    const cacheKey = `event:${id}`;
    if (!skipCache) {
      const cachedEvent = await cacheService.get(cacheKey);
      if (cachedEvent) {
        return { data: cachedEvent, status: 200 };
      }
      logger.warn(`Cache miss for event:${id}`);
    }

    logger.info(`Fetching fresh event:${id} from DB`);
    const fetchedEvent = await EventModel.findById(id).lean();
    if (!fetchedEvent) {
      throw new FetchEventValidationError();
    }

    enforceAbility(ability, 'read', {
      type: 'Event',
      data: fetchedEvent
    });

    logger.info(`Event fetched: ${formatEventLog(fetchedEvent)}`);
    return { data: fetchedEvent, status: 200 };

  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Failed to get event.';
    const error = new Error(message);
    error.statusCode = err.response?.status || 500;
    throw error;
  }
};

export default getUserEvent;
