import logger from '../../lib/logger.js';
import { formatEventLog } from '../../lib/LogFormat.js';
import { getWeatherFromOpenMateoAPI } from "../weatherService/getWeatherFromOpenMateoAPI.js";
import { getVenuesFromGooglePlacesAPI } from "../venueService/getVenuesFromGooglePlacesAPI.js";
import { EventSchema } from "../../models/event.schema.js";
import { CreateEventValidationError } from '../../lib/errors/index.js';
import cacheService from '../cacheService.js';
import { EventModel } from '../../models/event.model.js';
import { enforceAbility } from '../../lib/enforceAbility.js';

const createUserEvent = async (ability, event, { skipCache } = {}) => {
    try {
        const eventModel = new EventModel({
            userId: ability.user.id
        });
        enforceAbility(ability, 'create', {
            type: 'Event',
            data: eventModel
        });

        const { coordinates } = event;
        const cacheKey = `event:${event.eventName},${event.location},${JSON.stringify(event.coordinates)}`;

        if (!skipCache) {
            const cachedEvent = await cacheService.get(cacheKey);
            if (cachedEvent) {
                return { data: cachedEvent, status: 200 };
            }
            logger.warn(`Cache miss for event:${event.eventName},${event.location}`);
        };

        const weatherResponse = await getWeatherFromOpenMateoAPI(
            coordinates
        );

        const venuesResponse = await getVenuesFromGooglePlacesAPI(
            coordinates,
            event.radius,
            event.preferences
        );

        const createdEvent = EventSchema.safeParse({
            eventName: event.eventName,
            location: event.location,
            coordinates: { lat: coordinates.lat, lng: coordinates.lng },
            radius: event.radius,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            groupSize: event.groupSize,
            preferences: event.preferences,
            weather: weatherResponse.data,
            venues: venuesResponse.data.results,
            finalized: false
        });

        if (!createdEvent.success) {
            throw new CreateEventValidationError();
        };

        cacheService.set(cacheKey, createdEvent.data);

        logger.info(`Event created: ${formatEventLog(createdEvent.data)}`);
        return { 'data': createdEvent.data, 'status': 200 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to create event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
}

export default createUserEvent;
