export class ErrorClass extends Error {
    constructor(
        public message: string,
        public code: string,
        public statusCode: number
    ) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class AuthenticationError extends ErrorClass {

    constructor(
        message: string,
        code: string = "AUTHENTICATION",
        statusCode: number = 401
    ) {
        super(message, code, statusCode);
    }
}

export class AuthorizationError extends ErrorClass {


    constructor(
        message: string,
        code: string = "AUTHORIZATION",
        statusCode: number = 403
    ) {
        super(message, code, statusCode);
    }
}

export class ServiceError extends ErrorClass {
    constructor(
        message: string,
        code: string = "SERVER",
        statusCode: number = 500
    ) {
        super(message, code, statusCode);
    }
}
export class RepositoryError extends ErrorClass {
    constructor(
        message: string,
        code: string,
        statusCode: number = 500
    ) {
        super(message, code, statusCode);
    }
}
