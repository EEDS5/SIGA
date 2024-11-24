//controllers/loginController.ts
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import db from "../db";
import path from "path";
import jwt from "jsonwebtoken";

// Mostrar formulario de login
/* export const showLogin = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Frontend/views/login.html'));
}; */

// Mostrar mensaje de login
export const showLogin = (req: Request, res: Response) => {
  res.status(200).json({ message: "Login exitoso", redirectUrl: "/views/dashboard" });
};

// Manejar el proceso de login
/* export const login = async (req: Request, res: Response) => {
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
}; */

/* export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM usuario WHERE username = $1', [username]);

        if (!user) {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return;
        }

        req.session.user = user;

        // Log para verificar la sesión
        console.log('Contenido de la sesión después del login:', req.session);

        res.status(200).json({
            message: 'Login exitoso',
            redirectUrl: '/views/dashboard'
        });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', (error as Error).message);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}; */

const SECRET_KEY = "mi_secreto_seguro"; // Cambia esto por una clave segura en producción

// Función para generar un token JWT
const generarToken = (user: any): string => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            rol: user.rol, // Puedes incluir más datos si son necesarios
        },
        SECRET_KEY,
        { expiresIn: "1h" } // El token expira en 1 hora
    );
};

// Manejar el proceso de login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM usuario WHERE username = $1', [username]);

        if (!user) {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return;
        }

        // Genera un token JWT utilizando la función generarToken
        const token = generarToken(user);

        // Asigna la sesión
        req.session.user = user;

        res.status(200).json({
            message: 'Login exitoso',
            redirectUrl: '/views/dashboard',
            token, // Incluye el token en la respuesta
        });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};