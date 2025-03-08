import { Request, Response, NextFunction } from "express";
import { ErrorClass, ServiceError } from "../error/error";

const errorHandler = (
    error: Error | null,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (!error) {

        res.status(500).json(
            new ServiceError("An unexpected error occurred", "UNKNOWN_ERROR")
        );
        return;
    }


    if (error instanceof ErrorClass) {
        res.status(520).json(
            {
                message: error.message,
                code: error.code
            }
        );
    } else {
        res.status(500).json(
            {
                message: error.message,
                'INTERNAL_SERVER_ERROR'
            }
        );
    }
};

export default errorHandler;
