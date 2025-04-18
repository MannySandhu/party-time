import { getPlacesFromGooglePlacesAPI } from "../services/VenuesService.js";
import logger from "../lib/logger.js";

export const getVenues = async (req, res) => {
    try {
        logger.info(`GET request to /api/v1/venue.`);
        const { location, radius, type } = req.query;
        
        const response = await getPlacesFromGooglePlacesAPI(location, radius, type);
        res.status(response.status || 200).json(response.data);

    } catch (error) {
        const status = error.status || 500;
        logger.error(`GET request to /api/v1/venue return error ${error.message}.`);
        res.status(status).json({ error: error.message || 'Internal server error' });
    }
};