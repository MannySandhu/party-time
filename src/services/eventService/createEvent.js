import logger from '../../lib/logger.js';
import { getWeatherFromOpenMateo } from "../WeatherService.js";
import { getPlacesFromGooglePlacesAPI } from "../VenuesService.js";
import { EventSchema } from "../../models/event.schema.js";
import { CreateEventValidationError } from '../../lib/errors/index.js';

const createUserEvent = async (event) => {
    const { coordinates } = event;

    try {
        const weatherResponse = await getWeatherFromOpenMateo(
            coordinates
        );

        const venuesResponse = await getPlacesFromGooglePlacesAPI(
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

        if(!createdEvent.success){
            throw new CreateEventValidationError();
        }

        logger.info(`Event created: ${createdEvent.data.eventName} at ${createdEvent.data.location} by user ${createdEvent.data.userId}`);
        return { 'data': createdEvent.data, 'status': 200 };

    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to create event.';
        const error = new Error(message);
        error.statusCode = err.response?.status || 500;
        throw error;
    }
}

export default createUserEvent;
