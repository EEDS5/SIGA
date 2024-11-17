//controllers/dashboardController.ts
import path from 'path';
import { Request, Response } from 'express';

declare module 'express-session' {
    interface Session {
        user: { nombre_completo: string };
    }
}

export const showDashboard = (req: Request, res: Response) => {
    if (req.session.user) {
        const userName = req.session.user.nombre_completo;
        res.json({ userName });
    } else {
        res.status(401).json({ message: 'No autenticado' });
    }
};