import AppError from "./AppError.js"

class OpenMeteoWeatherValidationError extends AppError {
    constructor(message = "Weather data from Open-Meteo API failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export default OpenMeteoWeatherValidationError;