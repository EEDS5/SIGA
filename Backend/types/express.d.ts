import { JwtPayload } from 'jsonwebtoken';

declare namespace Express {
    export interface Request {
        user?: string | JwtPayload; // Ajusta el tipo según los datos decodificados del JWT
    }
}