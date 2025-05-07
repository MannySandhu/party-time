import AppError from "../AppError.js"

class VenuesCacheValidationError extends AppError {
    constructor(message = "Venues data from cache failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export default VenuesCacheValidationError;