import { Request, Response } from 'express';
import OrdenTrabajo from '../models/ordenTrabajoModel';

// Mostrar todas las órdenes de trabajo
export const mostrarOrdenesTrabajo = async (req: Request, res: Response): Promise<void> => {
    try {
        const ordenes = await OrdenTrabajo.obtenerTodas();
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener las órdenes de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener las órdenes de trabajo' });
    }
};

// Crear una nueva orden de trabajo
export const crearOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const { id_vehiculo, fecha_recepcion, fecha_entrega, costo_total } = req.body;

    try {
        const nuevaOrden = await OrdenTrabajo.crear(id_vehiculo, fecha_recepcion, fecha_entrega, costo_total);
        res.status(201).send(`Orden de trabajo creada con éxito, ID: ${nuevaOrden.id}`);
    } catch (error) {
        console.error('Error al crear la orden de trabajo:', error);
        res.status(500).json({ message: 'Error al crear la orden de trabajo' });
    }
};

// Obtener una orden de trabajo por ID
export const obtenerOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const orden = await OrdenTrabajo.obtenerPorId(id);
        res.json(orden);
    } catch (error) {
        console.error('Error al obtener la orden de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener la orden de trabajo' });
    }
};

// Actualizar una orden de trabajo por ID
export const actualizarOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { fecha_recepcion, fecha_entrega, costo_total } = req.body;

    try {
        await OrdenTrabajo.actualizar(id, fecha_recepcion, fecha_entrega, costo_total);
        res.status(200).send('Orden de trabajo actualizada con éxito');
    } catch (error) {
        console.error('Error al actualizar la orden de trabajo:', error);
        res.status(500).json({ message: 'Error al actualizar la orden de trabajo' });
    }
};

// Eliminar una orden de trabajo por ID
export const eliminarOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await OrdenTrabajo.eliminar(id);
        res.status(200).send('Orden de trabajo eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la orden de trabajo:', error);
        res.status(500).json({ message: 'Error al eliminar la orden de trabajo' });
    }
};
