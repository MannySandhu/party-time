import AppError from "./AppError.js"

export class OpenMeteoAPIValidationError extends AppError {
    constructor(message = "Open-Meteo API failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export class WeatherCacheValidationError extends AppError {
    constructor(message = "Weather from cache failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};
