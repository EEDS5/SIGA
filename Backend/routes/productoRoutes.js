// routes/productoRoutes.js
const express = require('express');
const { mostrarProductos, crearProducto, eliminarProducto } = require('../controllers/productoController');
const router = express.Router();

// Ruta para mostrar todos los productos
router.get('/', mostrarProductos);

// Ruta para crear un nuevo producto
router.post('/', crearProducto); // Asegúrate de que esta ruta esté configurada

// Ruta para eliminar un producto
router.delete('/:id', eliminarProducto); // Ruta para eliminar un producto

module.exports = router;
