import { Request, Response } from 'express';
import TipoTrabajoProducto from '../models/tipoTrabajoProductoModel';

// Mostrar todos los registros de tipo de trabajo-producto
export const mostrarTipoTrabajoProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const registros = await TipoTrabajoProducto.obtenerTodos();
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener los registros tipo_trabajo_producto:', error);
        res.status(500).json({ message: 'Error al obtener los registros tipo_trabajo_producto' });
    }
};

// Crear un nuevo registro tipo de trabajo-producto
export const crearTipoTrabajoProducto = async (req: Request, res: Response): Promise<void> => {
    const { id_tipo_trabajo, id_producto, cantidad } = req.body;

    try {
        const nuevoRegistro = await TipoTrabajoProducto.crear(id_tipo_trabajo, id_producto, cantidad);
        res.status(201).send(`Registro tipo_trabajo_producto creado con éxito, ID: ${nuevoRegistro.id}`);
    } catch (error) {
        console.error('Error al crear el registro tipo_trabajo_producto:', error);
        res.status(500).json({ message: 'Error al crear el registro tipo_trabajo_producto' });
    }
};

// Obtener un registro tipo de trabajo-producto por ID
export const obtenerTipoTrabajoProducto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const registro = await TipoTrabajoProducto.obtenerPorId(id);
        res.json(registro);
    } catch (error) {
        console.error('Error al obtener el registro tipo_trabajo_producto:', error);
        res.status(500).json({ message: 'Error al obtener el registro tipo_trabajo_producto' });
    }
};

// Eliminar un registro tipo de trabajo-producto por ID
export const eliminarTipoTrabajoProducto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await TipoTrabajoProducto.eliminar(id);
        res.status(200).send('Registro tipo_trabajo_producto eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el registro tipo_trabajo_producto:', error);
        res.status(500).json({ message: 'Error al eliminar el registro tipo_trabajo_producto' });
    }
};
