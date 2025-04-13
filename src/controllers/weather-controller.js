import { getWeatherFromOpenMateo } from "../services/WeatherService.js";
import logger from "../lib/logger.js";

export const getWeather = async (req, res) => {
    try {
        logger.info(`GET request to /api/v1/weather.`);
        const { lat, lon } = req.body;
        const { skipCache } = req.query;
        const response = await getWeatherFromOpenMateo(lat, lon, skipCache);
        res.status(response.status || 200).json(response.data);
    } catch (error) {
        const status = error.status || 500;
        logger.error(`GET request to /api/v1/weather return error ${error.message}.`);
        res.status(status).json({ error: error.message || 'Internal server error' });
    }
};
