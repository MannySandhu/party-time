import AppError from "../AppError.js"

class CreateEventValidationError extends AppError {
    constructor(message = "Create event failed validation", status=400){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

export default CreateEventValidationError;
