import AppError from "./AppError.js"

export class GooglePlacesApiValidationError extends AppError {
    constructor(message = "Google Places API failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export class VenuesCacheValidationError extends AppError {
    constructor(message = "Venues from cache failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};
