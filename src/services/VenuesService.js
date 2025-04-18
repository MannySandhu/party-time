import { env } from "../config/env.js";
import axios from "axios";
import CacheService from "./CacheService.js";
import { VenuesCollectionSchema } from "../models/venues.schema.js"
import logger from "../lib/logger.js";
import {
    GooglePlacesApiValidationError,
    VenuesCacheValidationError
} from "../lib/errors/index.js"
const GOOGLE_PLACES_API_URL = env.GOOGLE_PLACES_API_URL ?? 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const GOOGLE_PLACES_API_KEY = env.GOOGLE_PLACES_API_KEY;

export const getPlacesFromGooglePlacesAPI = async (location, radius, type, skipCache) => {

    const skip = skipCache === 'true';
    const cacheKey = `${location},${radius},${type}`;

    if (!skip) {
        const cached = CacheService.get(cacheKey);
        if (cached) {
            logger.info(`Fetching from cache.`);
            const result = VenuesCollectionSchema.safeParse(cached);
            if (!result.success) throw new VenuesCacheValidationError();
            return { data: result.data, status: 200 };
        };
    }

    try {
        logger.info(`Making HTTP request to GOOGLE PLACES API.`);
        const response = await axios.get(GOOGLE_PLACES_API_URL, {
            params: {
                location: location,
                radius: radius,
                type: type,
                key: GOOGLE_PLACES_API_KEY
            }
        });
        
        const result = VenuesCollectionSchema.safeParse(response.data);
        CacheService.set(cacheKey, result.data);
        logger.info(`Cached response.`);
        if (!result.success) {
            logger.error(`Cache Zod validation failed.`);
            throw new GooglePlacesApiValidationError();
        }

        logger.info(`GOOGLE PLACES API request successful.`);
        return { 'data': result.data, 'status': response.status };

    } catch (err) {
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || err.message || 'Third-party API error';
        logger.error(`GOOGLE PLACES API request failed: ${message}.`)
        throw { status, message };
    }
}
