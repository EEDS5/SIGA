import { Request, Response } from 'express';
import Proveedor from '../models/proveedorModel';

// Método para mostrar todos los proveedores
export const mostrarProveedor = async (req: Request, res: Response) => {
    try {
        const proveedores = await Proveedor.obtenerTodos();
        res.render('proveedor', { proveedores });
    } catch (error) {
        console.error('Error al obtener los proveedores:', (error as Error).message);
        res.status(500).send('Error al obtener los proveedores');
    }
};

// Método para crear un nuevo proveedor
export const crearProveedor = async (req: Request, res: Response) => {
    const { nombre, telefono, email, direccion } = req.body;

    try {
        const nuevoProveedor = await Proveedor.crear(nombre, telefono, email, direccion);
        res.status(201).send(`Proveedor creado con éxito, ID: ${nuevoProveedor.id}`);
    } catch (error) {
        console.error('Error al crear proveedor:', (error as Error).message);
        res.status(500).send('Error al crear el proveedor');
    }
};

// Método para obtener un proveedor por ID (para editar)
export const obtenerProveedor = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10); // Convertir id a número

    try {
        const proveedor = await Proveedor.obtenerPorId(id);
        res.render('editarProveedor', { proveedor }); // Renderizar una vista para editar
    } catch (error) {
        console.error('Error al obtener el proveedor:', (error as Error).message);
        res.status(500).send('Error al obtener el proveedor');
    }
};

// Método para actualizar un proveedor
export const actualizarProveedor = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10); // Convertir id a número
    const { nombre, telefono, email, direccion } = req.body;

    try {
        await Proveedor.actualizar(id, nombre, telefono, email, direccion);
        res.status(200).send('Proveedor actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar proveedor:', (error as Error).message);
        res.status(500).send('Error al actualizar el proveedor');
    }
};

// Método para eliminar un proveedor
export const eliminarProveedor = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10); // Convertir id a número

    try {
        await Proveedor.eliminar(id);
        res.status(200).send('Proveedor eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el proveedor:', (error as Error).message);
        res.status(500).send('Error al eliminar el proveedor');
    }
};