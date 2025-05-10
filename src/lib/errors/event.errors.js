import AppError from "./AppError.js"

export class CreateEventValidationError extends AppError {
    constructor(message = "Create event failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export class FetchEventListValidationError extends AppError {
    constructor(message = "Fetch event list from DB failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export class FetchEventValidationError extends AppError {
    constructor(message = "Fetch event from DB failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export class InvalidEventIdError extends AppError {
    constructor(message = "Invalid event ID format", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};
