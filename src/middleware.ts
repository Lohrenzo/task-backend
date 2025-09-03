import { NextFunction, Request, Response } from "express";

/**
 * Logs the request method, path and time on the console.
 * 
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Next function in middleware chain
 */
export const logger = function (req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${res.statusCode} "${req.path}" - ${new Date().toLocaleString()}`)
    next()
}

/**
 * Centralized error handling.
 * 
 * @param err Error
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Next function in middleware chain
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        error: err.message,
    });
};

/**
 * Handles CORS.
 * 
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Next function in middleware chain
 */
export const corsHandler = (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173'];
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();

};