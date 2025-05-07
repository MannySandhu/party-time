import AppError from "../AppError.js"

class WeatherCacheValidationError extends AppError {
    constructor(message = "Weather data from cache failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export default WeatherCacheValidationError;