import { Request, Response } from 'express';
import OrdenTrabajoTipoTrabajo from '../models/ordenTrabajoTipoTrabajoModel';

// Mostrar todas las relaciones de orden de trabajo y tipo de trabajo
export const mostrarOrdenesTrabajoTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    try {
        const relaciones = await OrdenTrabajoTipoTrabajo.obtenerTodas();
        res.json(relaciones);
    } catch (error) {
        console.error('Error al obtener las relaciones de orden de trabajo y tipo de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener las relaciones de orden de trabajo y tipo de trabajo' });
    }
};

// Crear una nueva relación entre orden de trabajo y tipo de trabajo
export const crearOrdenTrabajoTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    const { id_orden_trabajo, id_tipo_trabajo, cantidad } = req.body;

    try {
        const nuevaRelacion = await OrdenTrabajoTipoTrabajo.crear(id_orden_trabajo, id_tipo_trabajo, cantidad);
        res.status(201).send(`Relación creada con éxito, ID: ${nuevaRelacion.id}`);
    } catch (error) {
        console.error('Error al crear la relación entre orden de trabajo y tipo de trabajo:', error);
        res.status(500).json({ message: 'Error al crear la relación entre orden de trabajo y tipo de trabajo' });
    }
};

// Obtener una relación por ID
export const obtenerOrdenTrabajoTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const relacion = await OrdenTrabajoTipoTrabajo.obtenerPorId(id);
        res.json(relacion);
    } catch (error) {
        console.error('Error al obtener la relación entre orden de trabajo y tipo de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener la relación entre orden de trabajo y tipo de trabajo' });
    }
};

// Actualizar una relación entre orden de trabajo y tipo de trabajo
export const actualizarOrdenTrabajoTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { cantidad } = req.body;

    try {
        await OrdenTrabajoTipoTrabajo.actualizar(id, cantidad);
        res.status(200).send('Relación actualizada con éxito');
    } catch (error) {
        console.error('Error al actualizar la relación:', error);
        res.status(500).json({ message: 'Error al actualizar la relación' });
    }
};

// Eliminar una relación entre orden de trabajo y tipo de trabajo
export const eliminarOrdenTrabajoTipoTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await OrdenTrabajoTipoTrabajo.eliminar(id);
        res.status(200).send('Relación eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la relación:', error);
        res.status(500).json({ message: 'Error al eliminar la relación' });
    }
};
