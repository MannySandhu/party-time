import AppError from "./AppError.js"

class GooglePlacesApiValidationError extends AppError {
    constructor(message = "Google Places API data failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export default GooglePlacesApiValidationError;