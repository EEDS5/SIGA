import { Request, Response } from 'express';
import MarcaVehiculo from '../models/marcaVehiculoModel';

// Mostrar todas las marcas de vehículos
export const mostrarMarcas = async (req: Request, res: Response): Promise<void> => {
    try {
        const marcas = await MarcaVehiculo.obtenerTodas();
        res.json(marcas);
    } catch (error) {
        console.error('Error al obtener las marcas de vehículos:', error);
        res.status(500).json({ message: 'Error al obtener las marcas de vehículos' });
    }
};

// Crear una nueva marca de vehículo
export const crearMarca = async (req: Request, res: Response): Promise<void> => {
    const { nombre, casa_distribuidora, pais_origen } = req.body;

    try {
        const nuevaMarca = await MarcaVehiculo.crear(nombre, casa_distribuidora, pais_origen);
        res.status(201).send(`Marca creada con éxito, ID: ${nuevaMarca.id}`);
    } catch (error) {
        console.error('Error al crear la marca de vehículo:', error);
        res.status(500).json({ message: 'Error al crear la marca de vehículo' });
    }
};

// Obtener una marca de vehículo por ID (para editar)
export const obtenerMarca = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const marca = await MarcaVehiculo.obtenerPorId(id);
        res.json(marca);
    } catch (error) {
        console.error('Error al obtener la marca de vehículo:', error);
        res.status(500).json({ message: 'Error al obtener la marca de vehículo' });
    }
};

// Actualizar una marca de vehículo por ID
export const actualizarMarca = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { nombre, casa_distribuidora, pais_origen } = req.body;

    try {
        await MarcaVehiculo.actualizar(id, nombre, casa_distribuidora, pais_origen);
        res.status(200).send('Marca de vehículo actualizada con éxito');
    } catch (error) {
        console.error('Error al actualizar la marca de vehículo:', error);
        res.status(500).json({ message: 'Error al actualizar la marca de vehículo' });
    }
};

// Eliminar una marca de vehículo por ID
export const eliminarMarca = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await MarcaVehiculo.eliminar(id);
        res.status(200).send('Marca de vehículo eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la marca de vehículo:', error);
        res.status(500).json({ message: 'Error al eliminar la marca de vehículo' });
    }
};
