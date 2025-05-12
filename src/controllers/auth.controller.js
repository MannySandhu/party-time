import logger from "../lib/logger.js";
import { authGoogleUser } from "../services/authService.js";

export const googleAuth = async (req, res, next) => {
    try {
        logger.info(`POST request to /api/v1/auth/google.`);

        const { idToken } = req.body
        const response = await authGoogleUser(idToken)

        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}
