//controllers/registerController.ts
import path from 'path';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import db from '../db';

// Mostrar formulario de registro
/* export const showRegister = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Frontend/views/register.html'));
}; */

/* // Mostrar mensaje de registro
export const showRegister = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Endpoint para registrar usuarios' });
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
}; */

// Registrar un usuario
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email, nombre_completo, rol } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await db.oneOrNone('SELECT * FROM usuario WHERE username = $1', [username]);

        if (existingUser) {
            res.status(409).json({ message: 'El nombre de usuario ya existe' });
            return;
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insertar el nuevo usuario en la base de datos
        await db.none(
            'INSERT INTO usuario (username, password_hash, email, nombre_completo, rol) VALUES ($1, $2, $3, $4, $5)',
            [username, password_hash, email, nombre_completo, rol]
        );

        // Responder con éxito
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Error al registrar usuario:', errorMessage);
        res.status(500).json({ message: 'Error en el servidor al registrar usuario' });
    }
};

// Mostrar mensaje de registro (puedes eliminarlo si no lo necesitas)
export const showRegister = (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Endpoint para registrar usuarios' });
};