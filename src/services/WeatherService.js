import { env } from "../config/env.js";
import axios from "axios";
import { OpenMateoWeatherSchema } from "../models/weather.schema.js"
import logger from "../lib/logger.js";
import { OpenMeteoWeatherValidationError } from "../lib/errors/index.js"
const OPEN_MATEO_WEATHER_URL = env.OPEN_MATEO_WEATHER_URL ?? 'https://api.open-meteo.com/v1/forecast';
const OPEN_MATEO_WEATHER_URL_PARAMS = env.OPEN_MATEO_WEATHER_URL_PARAMS ?? 'temperature_2m_mean,precipitation_sum,windspeed_10m_max';
const OPEN_MATEO_WEATHER_URL_TIMEZONE = env.OPEN_MATEO_WEATHER_URL_TIMEZONE ?? 'GMT';

export const getWeatherFromOpenMateo = async (coordinates) => {
    
    try {
        logger.info(`Request to OPEN MATEO API.`);
        const response = await axios.get(OPEN_MATEO_WEATHER_URL, {
            params: {
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                daily: OPEN_MATEO_WEATHER_URL_PARAMS,
                timezone: OPEN_MATEO_WEATHER_URL_TIMEZONE
            }
        });

        const result = OpenMateoWeatherSchema.safeParse(response.data);
        if (!result.success) {
            throw new OpenMeteoWeatherValidationError();
        }

        logger.info(`OPEN MATEO API request successful.`);
        return { 'data': result.data, 'status': response.status };

    } catch (err) {
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || err.message || 'Third-party API error.';
        const error = new Error(message);
        error.statusCode = status;
        throw error;
    }
}
