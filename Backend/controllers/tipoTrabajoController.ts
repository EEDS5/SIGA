import { Request, Response } from 'express';
import TipoTrabajo from '../models/tipoTrabajoModel';

// Mostrar todos los tipos de trabajo
export const mostrarTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    try {
        const tiposTrabajo = await TipoTrabajo.obtenerTodos();
        res.json(tiposTrabajo);
    } catch (error) {
        console.error('Error al obtener los tipos de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener los tipos de trabajo' });
    }
};

// Crear un nuevo tipo de trabajo
export const crearTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    const { nombre, precio_base } = req.body;

    try {
        const nuevoTipoTrabajo = await TipoTrabajo.crear(nombre, precio_base);
        res.status(201).send(`Tipo de trabajo creado con éxito, ID: ${nuevoTipoTrabajo.id}`);
    } catch (error) {
        console.error('Error al crear el tipo de trabajo:', error);
        res.status(500).json({ message: 'Error al crear el tipo de trabajo' });
    }
};

// Obtener un tipo de trabajo por ID
export const obtenerTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const tipoTrabajo = await TipoTrabajo.obtenerPorId(id);
        res.json(tipoTrabajo);
    } catch (error) {
        console.error('Error al obtener el tipo de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener el tipo de trabajo' });
    }
};

// Actualizar un tipo de trabajo por ID
export const actualizarTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { nombre, precio_base } = req.body;

    try {
        await TipoTrabajo.actualizar(id, nombre, precio_base);
        res.status(200).send('Tipo de trabajo actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el tipo de trabajo:', error);
        res.status(500).json({ message: 'Error al actualizar el tipo de trabajo' });
    }
};

// Eliminar un tipo de trabajo por ID
export const eliminarTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await TipoTrabajo.eliminar(id);
        res.status(200).send('Tipo de trabajo eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el tipo de trabajo:', error);
        res.status(500).json({ message: 'Error al eliminar el tipo de trabajo' });
    }
};
