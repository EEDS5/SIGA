// middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "mi_secreto_seguro"; // Asegúrate de que sea la misma clave

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];

    console.log('Encabezado Authorization:', authHeader); // Depuración

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No autenticado: se requiere un token válido' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        (req as any).user = decoded;
        console.log('Token decodificado:', decoded); // Depuración
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(401).json({ message: 'Token inválido' });
    }
};