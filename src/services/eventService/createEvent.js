import logger from '../../lib/logger.js';
import { getWeatherFromOpenMateo } from "../WeatherService.js";
import { getPlacesFromGooglePlacesAPI } from "../VenuesService.js";
import { EventSchema } from "../../models/event.schema.js";
import { CreateEventValidationError } from '../../lib/errors/index.js';

const createUserEvent = async (event) => {
    const { coordinates } = event.data;

    try {
        const weatherResponse = await getWeatherFromOpenMateo(
            coordinates
        );

        const venuesResponse = await getPlacesFromGooglePlacesAPI(
            coordinates,
            event.data.radius,
            event.data.preferences
        );
        
        const createdEvent = EventSchema.safeParse({
            eventName: event.data.eventName,
            location: event.data.location,
            coordinates: { lat: coordinates.lat, lng: coordinates.lng },
            radius: event.data.radius,
            date: event.data.date,
            startTime: event.data.startTime,
            endTime: event.data.endTime,
            groupSize: event.data.groupSize,
            preferences: event.data.preferences,
            weather: weatherResponse.data,
            venues: venuesResponse.data.results,
            finalized: false
        });

        if(!createdEvent.success){
            throw new CreateEventValidationError();
        }

        logger.info(`Event created: ${createdEvent.data.eventName} at ${createdEvent.data.location} by user ${createdEvent.data.userId}`);
        return { 'data': createdEvent, 'status': 200 };

    } catch (err) {
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || err.message || 'Failed to create event.';
        const error = new Error(message);
        error.statusCode = status;
        throw error;
    }
}

export default createUserEvent;
