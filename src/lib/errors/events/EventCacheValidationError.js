import AppError from "../AppError.js"

export class CreateEventCacheValidationError extends AppError {
    constructor(message = "Create event data failed cache validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};
