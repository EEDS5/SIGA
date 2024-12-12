import { Request, Response } from 'express';
import ProductoOrdenTrabajo from '../models/productoOrdenTrabajoModel';

// Mostrar todas las relaciones de productos en órdenes de trabajo
export const mostrarProductosOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    try {
        const relaciones = await ProductoOrdenTrabajo.obtenerTodas();
        res.json(relaciones);
    } catch (error) {
        console.error('Error al obtener las relaciones de productos en órdenes de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener las relaciones de productos en órdenes de trabajo' });
    }
};

// Crear una nueva relación entre producto y orden de trabajo
export const crearProductoOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const { id_producto, id_orden_trabajo, cantidad_utilizada } = req.body;

    try {
        const nuevaRelacion = await ProductoOrdenTrabajo.crear(id_producto, id_orden_trabajo, cantidad_utilizada);
        res.status(201).send(`Relación creada con éxito, ID: ${nuevaRelacion.id}`);
    } catch (error) {
        console.error('Error al crear la relación entre producto y orden de trabajo:', error);
        res.status(500).json({ message: 'Error al crear la relación entre producto y orden de trabajo' });
    }
};

// Obtener una relación por ID
export const obtenerProductoOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const relacion = await ProductoOrdenTrabajo.obtenerPorId(id);
        res.json(relacion);
    } catch (error) {
        console.error('Error al obtener la relación entre producto y orden de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener la relación entre producto y orden de trabajo' });
    }
};

// Actualizar una relación entre producto y orden de trabajo
export const actualizarProductoOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { cantidad_utilizada } = req.body;

    try {
        await ProductoOrdenTrabajo.actualizar(id, cantidad_utilizada);
        res.status(200).send('Relación actualizada con éxito');
    } catch (error) {
        console.error('Error al actualizar la relación:', error);
        res.status(500).json({ message: 'Error al actualizar la relación' });
    }
};

// Eliminar una relación entre producto y orden de trabajo
export const eliminarProductoOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await ProductoOrdenTrabajo.eliminar(id);
        res.status(200).send('Relación eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la relación:', error);
        res.status(500).json({ message: 'Error al eliminar la relación' });
    }
};
