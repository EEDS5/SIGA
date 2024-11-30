import { Request, Response } from 'express';
import ProductoModel from '../models/productoModel';

// Método para mostrar todos los productos
export const mostrarProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = await ProductoModel.obtenerTodos();
        res.json(productos); // Enviar los productos como respuesta JSON
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Método para crear un nuevo producto
export const crearProducto = async (req: Request, res: Response): Promise<void> => {
    const { nombre, id_categoria, stock, stock_minimo, precio_venta } = req.body;

    try {
        const nuevoProducto = await ProductoModel.crear(
            nombre,
            id_categoria,
            stock,
            stock_minimo,
            precio_venta
        );
        res.status(201).send(`Producto creado con éxito, ID: ${nuevoProducto.id}`);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).send('Error al crear el producto');
    }
};

// Método para obtener un producto por ID (para editar)
export const obtenerProducto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10); // Convertir id a número

    try {
        const producto = await ProductoModel.obtenerPorId(id);
        res.json(producto); // Enviar el producto como respuesta JSON
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error al obtener el producto');
    }
};

// Método para actualizar un producto
export const actualizarProducto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10); // Convertir id a número
    const { nombre, id_categoria, stock, stock_minimo, precio_venta } = req.body;

    try {
        await ProductoModel.actualizar(
            id,
            nombre,
            id_categoria,
            stock,
            stock_minimo,
            precio_venta
        );
        res.status(200).send('Producto actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error al actualizar el producto');
    }
};

// Método para eliminar un producto
export const eliminarProducto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10); // Convertir id a número

    try {
        await ProductoModel.eliminar(id);
        res.status(200).send('Producto eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error al eliminar el producto');
    }
};
