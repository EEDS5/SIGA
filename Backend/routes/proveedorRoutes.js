const express = require('express');
const { mostrarProveedores, crearProveedor, eliminarProveedor, obtenerProveedor, actualizarProveedor } = require('../controllers/proveedorController');
const router = express.Router();

// Ruta para mostrar todos los proveedores
router.get('/', mostrarProveedores);

// Ruta para crear un nuevo proveedor
router.post('/', crearProveedor);

// Ruta para obtener un proveedor por ID (para editar)
router.get('/:id/editar', obtenerProveedor);  // Ruta para obtener los datos del proveedor a editar

// Ruta para actualizar un proveedor
router.post('/:id/editar', actualizarProveedor);  // Ruta para actualizar el proveedor

// Ruta para eliminar un proveedor
router.delete('/:id', eliminarProveedor);

module.exports = router;