import { Request, Response } from 'express';
import Vehiculo from '../models/vehiculoModel';

// Método para mostrar todos los vehículos
export const mostrarVehiculos = async (req: Request, res: Response): Promise<void> => {
    try {
        const vehiculos = await Vehiculo.obtenerTodos();
        res.json(vehiculos);
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        res.status(500).json({ message: 'Error al obtener los vehículos' });
    }
};

// Método para crear un nuevo vehículo
export const crearVehiculo = async (req: Request, res: Response): Promise<void> => {
    const { cliente_id, id_modelo, placa, ano, origen_fabricacion, color, transmision, traccion, tipo_neumatico } = req.body;

    try {
        const nuevoVehiculo = await Vehiculo.crear(cliente_id, id_modelo, placa, ano, origen_fabricacion, color, transmision, traccion, tipo_neumatico);
        res.status(201).send(`Vehículo creado con éxito, ID: ${nuevoVehiculo.id}`);
    } catch (error) {
        console.error('Error al crear vehículo:', error);
        res.status(500).send('Error al crear el vehículo');
    }
};

// Método para obtener un vehículo por ID
export const obtenerVehiculo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const vehiculo = await Vehiculo.obtenerPorId(id);
        res.json(vehiculo);
    } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        res.status(500).send('Error al obtener el vehículo');
    }
};

// Método para actualizar un vehículo
export const actualizarVehiculo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { cliente_id, id_modelo, placa, ano, origen_fabricacion, color, transmision, traccion, tipo_neumatico } = req.body;

    try {
        await Vehiculo.actualizar(id, cliente_id, id_modelo, placa, ano, origen_fabricacion, color, transmision, traccion, tipo_neumatico);
        res.status(200).send('Vehículo actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar vehículo:', error);
        res.status(500).send('Error al actualizar el vehículo');
    }
};

// Método para eliminar un vehículo
export const eliminarVehiculo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await Vehiculo.eliminar(id);
        res.status(200).send('Vehículo eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el vehículo:', error);
        res.status(500).send('Error al eliminar el vehículo');
    }
};
