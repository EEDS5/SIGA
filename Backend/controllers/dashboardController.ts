import path from 'path';
import { Request, Response } from 'express';

declare module 'express-session' {
    interface Session {
        user: { nombre_completo: string };
    }
}

export const showDashboard = (req: Request, res: Response) => {
    if (req.session.user) {
        const userName = req.session.user.nombre_completo; // Obtener el nombre del usuario
        res.render('dashboard', { userName }); // Renderizar la vista dashboard.ejs
    } else {
        res.redirect('/auth/login');
    }
};