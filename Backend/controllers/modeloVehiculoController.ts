import { Request, Response } from 'express';
import ModeloVehiculo from '../models/modeloVehiculoModel';

// Mostrar todos los modelos de vehículos
export const mostrarModelos = async (req: Request, res: Response): Promise<void> => {
    try {
        const modelos = await ModeloVehiculo.obtenerTodos();
        res.json(modelos);
    } catch (error) {
        console.error('Error al obtener los modelos de vehículos:', error);
        res.status(500).json({ message: 'Error al obtener los modelos de vehículos' });
    }
};

// Crear un nuevo modelo de vehículo
export const crearModelo = async (req: Request, res: Response): Promise<void> => {
    const { nombre, descripcion, id_marca } = req.body;

    try {
        const nuevoModelo = await ModeloVehiculo.crear(nombre, descripcion, id_marca);
        res.status(201).send(`Modelo creado con éxito, ID: ${nuevoModelo.id}`);
    } catch (error) {
        console.error('Error al crear el modelo de vehículo:', error);
        res.status(500).json({ message: 'Error al crear el modelo de vehículo' });
    }
};

// Obtener un modelo de vehículo por ID
export const obtenerModelo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const modelo = await ModeloVehiculo.obtenerPorId(id);
        res.json(modelo);
    } catch (error) {
        console.error('Error al obtener el modelo de vehículo:', error);
        res.status(500).json({ message: 'Error al obtener el modelo de vehículo' });
    }
};

// Actualizar un modelo de vehículo por ID
export const actualizarModelo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { nombre, descripcion, id_marca } = req.body;

    try {
        await ModeloVehiculo.actualizar(id, nombre, descripcion, id_marca);
        res.status(200).send('Modelo de vehículo actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el modelo de vehículo:', error);
        res.status(500).json({ message: 'Error al actualizar el modelo de vehículo' });
    }
};

// Eliminar un modelo de vehículo por ID
export const eliminarModelo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await ModeloVehiculo.eliminar(id);
        res.status(200).send('Modelo de vehículo eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el modelo de vehículo:', error);
        res.status(500).json({ message: 'Error al eliminar el modelo de vehículo' });
    }
};
