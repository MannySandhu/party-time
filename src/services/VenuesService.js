import { env } from "../config/env.js";
import axios from "axios";
import { GooglePlacesAPISchema } from "../models/venues.schema.js"
import logger from "../lib/logger.js";
import { logExternalResponse, logExternalError } from "../lib/logExternal.js";
import { GooglePlacesApiValidationError } from "../lib/errors/index.js"
const GOOGLE_PLACES_API_URL = env.GOOGLE_PLACES_API_URL ?? 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const GOOGLE_PLACES_API_KEY = env.GOOGLE_PLACES_API_KEY;

export const getPlacesFromGooglePlacesAPI = async (coordinates, radius, preferences) => {

    const params = {
        location: `${coordinates.lat},${coordinates.lng}`,
        radius: radius,
        type: preferences[0],
        key: GOOGLE_PLACES_API_KEY
    }

    try {
        logger.info(`Request to GOOGLE PLACES API.`);
        const response = await axios.get(GOOGLE_PLACES_API_URL, { params });

        const result = GooglePlacesAPISchema.safeParse(response.data);
        if (!result.success) {
            throw new GooglePlacesApiValidationError();
        }

        logExternalResponse('Google Places API', response, { ...params, key: 'REDACTED' });
        return { 'data': result.data, 'status': response.status };

    } catch (err) {
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || err.message || 'Third-party API error.';
        const error = new Error(message);
        error.statusCode = status;

        logExternalError('Google Places API', error, { params })

        throw error;
    }
}
