import { env } from "../../config/env.js";
import axios from "axios";
import { OpenMateoWeatherSchema } from "../../models/weather.schema.js"
import logger from "../../lib/logger.js";
import { logExternalResponse, logExternalError } from "../../lib/logExternal.js";
import { OpenMeteoAPIValidationError } from "../../lib/errors/index.js"
const OPEN_MATEO_WEATHER_URL = env.OPEN_MATEO_WEATHER_URL ?? 'https://api.open-meteo.com/v1/forecast';
const OPEN_MATEO_WEATHER_URL_PARAMS = env.OPEN_MATEO_WEATHER_URL_PARAMS ?? 'temperature_2m_mean,precipitation_sum,windspeed_10m_max';
const OPEN_MATEO_WEATHER_URL_TIMEZONE = env.OPEN_MATEO_WEATHER_URL_TIMEZONE ?? 'GMT';

export const getWeatherFromOpenMateoAPI = async (coordinates) => {

    const params = {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        daily: OPEN_MATEO_WEATHER_URL_PARAMS,
        timezone: OPEN_MATEO_WEATHER_URL_TIMEZONE
    }

    try {
        logger.info(`Request to OPEN MATEO API.`);
        const response = await axios.get(OPEN_MATEO_WEATHER_URL, { params });

        const result = OpenMateoWeatherSchema.safeParse(response.data);
        if (!result.success) {
            throw new OpenMeteoAPIValidationError();
        }

        logExternalResponse('Open-Mateo', response, { params })
        return { 'data': result.data, 'status': response.status };

    } catch (err) {
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || err.message || 'Third-party API error.';
        const error = new Error(message);
        error.statusCode = status;

        logExternalError('Open-Meteo', error, { params });

        throw error;
    }
}
