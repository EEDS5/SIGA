import { Request, Response } from 'express';
import Categoria from '../models/categoriaModel';

// Mostrar todas las categorías
export const mostrarCategorias = async (req: Request, res: Response): Promise<void> => {
    try {
        const categorias = await Categoria.obtenerTodas();
        res.json(categorias);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
};

// Crear una nueva categoría
export const crearCategoria = async (req: Request, res: Response): Promise<void> => {
    const { nombre } = req.body;

    try {
        const nuevaCategoria = await Categoria.crear(nombre);
        res.status(201).send(`Categoría creada con éxito, ID: ${nuevaCategoria.id}`);
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ message: 'Error al crear la categoría' });
    }
};

// Obtener una categoría por ID
export const obtenerCategoria = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const categoria = await Categoria.obtenerPorId(id);
        res.json(categoria);
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
};

// Actualizar una categoría por ID
export const actualizarCategoria = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { nombre } = req.body;

    try {
        await Categoria.actualizar(id, nombre);
        res.status(200).send('Categoría actualizada con éxito');
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ message: 'Error al actualizar la categoría' });
    }
};

// Eliminar una categoría por ID
export const eliminarCategoria = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await Categoria.eliminar(id);
        res.status(200).send('Categoría eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
};
