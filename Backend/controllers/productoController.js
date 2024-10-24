// controllers/productoController.js
const db = require('../models/db');

// Método para mostrar todos los productos
const mostrarProductos = async (req, res) => {
    try {
        const productos = await db.any('SELECT p.id, p.nombre, c.nombre AS categoria, p.stock, p.precio_venta FROM producto p JOIN categoria c ON p.id_categoria = c.id');
        
        // Obtener todas las categorías para el formulario
        const categorias = await db.any('SELECT id, nombre FROM categoria');

        res.render('productos', { productos, categorias }); // Pasar las categorías a la vista
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
    }
};

// Método para crear un nuevo producto
const crearProducto = async (req, res) => {
    const { nombre, categoria, stock, precio_venta } = req.body;

    try {
        await db.none('INSERT INTO producto(nombre, id_categoria, stock, precio_venta) VALUES($1, $2, $3, $4)', [nombre, categoria, stock, precio_venta]);
        res.status(201).send('Producto creado con éxito');
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).send('Error al crear el producto');
    }
};

// Método para eliminar un producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params; // Obtener el ID del producto a eliminar

    try {
        await db.none('DELETE FROM producto WHERE id = $1', [id]); // Ejecutar la consulta de eliminación
        res.status(200).send('Producto eliminado correctamente'); // Mensaje de éxito
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error al eliminar el producto'); // Mensaje de error
    }
};

module.exports = {
    mostrarProductos,
    crearProducto,
    eliminarProducto
};

