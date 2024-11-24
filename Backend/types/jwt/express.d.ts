//types/express.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any; // Define el tipo adecuado si conoces la estructura de `user`
        }
    }
}