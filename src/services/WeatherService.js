import { env } from "../config/env.js";
import axios from "axios";
import CacheService from "./CacheService.js";
import { Weather } from "../models/weather.schema.js"
import logger from "../lib/logger.js";
import {
    OpenMeteoWeatherValidationError,
    WeatherCacheValidationError
} from "../lib/errors/index.js"
const OPEN_MATEO_WEATHER_URL = env.OPEN_MATEO_WEATHER_URL ?? 'https://api.open-meteo.com/v1/forecast';

export const getWeatherFromOpenMateo = async (lat, lon, skipCache) => {
    
    const skip = skipCache === 'true';
    const cacheKey = `${lat},${lon}`;

    if (!skip) {
        const cached = CacheService.get(cacheKey);
        if (cached) {
            logger.info(`Fetching from cache.`);
            const result = Weather.safeParse(cached);
            if (!result.success) throw new WeatherCacheValidationError();
            return { data: result.data, status: 200 };
        };
    }

    try {
        logger.info(`Making HTTP request to OPEN MATEO.`);
        const response = await axios.get(OPEN_MATEO_WEATHER_URL, {
            params: {
                latitude: lat,
                longitude: lon,
                daily: "temperature_2m_mean,precipitation_sum,windspeed_10m_max",
                timezone: 'GMT'
            }
        });
        
        const result = Weather.safeParse(response.data);
        CacheService.set(cacheKey, result.data);
        logger.info(`Cached response.`);
        if (!result.success) {
            logger.error(`Cache Zod validation failed.`);
            throw new OpenMeteoWeatherValidationError();
        }

        logger.info(`OPEN MATEO request successful.`);
        return { 'data': result.data, 'status': response.status };

    } catch (err) {
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || err.message || 'Third-party API error';
        logger.error(`OPEN MATEO HTTP request failed: ${message}.`)
        throw { status, message };
    }
}
