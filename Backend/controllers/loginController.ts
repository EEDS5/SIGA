//controllers/loginController.ts
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import db from '../db';
import path from 'path';


// Mostrar formulario de login
export const showLogin = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Frontend/views/login.html'));
};

// Manejar el proceso de login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario en la base de datos
        const user = await db.oneOrNone('SELECT * FROM usuario WHERE username = $1', [username]);

        if (!user) {
            console.log('Usuario no encontrado');
            return res.redirect('/auth/login?error=Usuario o contraseña incorrectos.');
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.redirect('/auth/login?error=Usuario o contraseña incorrectos.');
        }

        // Si la contraseña es correcta, guardamos el usuario en la sesión
        req.session.user = user;
        res.redirect('/dashboard');
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.log('Error durante el inicio de sesión:', errorMessage);
        res.redirect('/auth/login?error=Error en el servidor');
    }
};