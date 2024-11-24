// controllers/authController.ts
import { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
            return res.status(500).json({ message: 'No se pudo cerrar sesión' });
        }
        res.clearCookie('connect.sid', { path: '/' }); // Borra la cookie de sesión
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    });
};