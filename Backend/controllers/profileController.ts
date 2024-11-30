//controllers/profileController.ts
import { Request, Response } from 'express';
import db from '../db'; // Importamos 'db' en lugar de 'pool'

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id;

        if (!userId) {
            console.error('ID de usuario no proporcionado');
            res.status(400).json({ message: 'ID de usuario no proporcionado' });
            return;
        }

        console.log('ID de usuario:', userId);

        const query = 'SELECT id, username, nombre_completo, email, rol, creado_en FROM usuario WHERE id = $1';
        const user = await db.oneOrNone(query, [userId]);

        console.log('Resultado de la consulta:', user);

        if (!user) {
            console.error('Usuario no encontrado');
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};