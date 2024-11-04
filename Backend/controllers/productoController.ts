import { Request, Response } from 'express';
import db from '../db';

export const mostrarProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = await db.any(
            'SELECT p.id, p.nombre, c.nombre AS categoria, p.stock, p.precio_venta FROM producto p JOIN categoria c ON p.id_categoria = c.id'
        );
        
        const categorias = await db.any('SELECT id, nombre FROM categoria');

        res.render('productos', { productos, categorias });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
    }
};

export const crearProducto = async (req: Request, res: Response): Promise<void> => {
    const { nombre, categoria, stock, precio_venta } = req.body;

    try {
        await db.none('INSERT INTO producto(nombre, id_categoria, stock, precio_venta) VALUES($1, $2, $3, $4)', [
            nombre,
            categoria,
            stock,
            precio_venta
        ]);
        res.status(201).send('Producto creado con éxito');
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).send('Error al crear el producto');
    }
};

export const eliminarProducto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        await db.none('DELETE FROM producto WHERE id = $1', [id]);
        res.status(200).send('Producto eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error al eliminar el producto');
    }
};