//controllers/registerController.ts
import path from 'path';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import db from '../db';

// Mostrar formulario de registro
export const showRegister = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Frontend/views/register.html'));
};

// Registrar un usuario
export const register = async (req: Request, res: Response) => {
    const { username, password, email, nombre_completo, rol } = req.body;

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insertar el nuevo usuario en la base de datos
        await db.none(
            'INSERT INTO usuario (username, password_hash, email, nombre_completo, rol) VALUES ($1, $2, $3, $4, $5)',
            [username, password_hash, email, nombre_completo, rol]
        );

        // Redirigir al login después de registrarse
        res.redirect('/auth/login');
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error(errorMessage);
        res.status(500).send('Error al registrar usuario');
    }
};