class AppError extends Error {
    constructor(message = "App Error", status=500){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);      
    };
};

export default AppError;