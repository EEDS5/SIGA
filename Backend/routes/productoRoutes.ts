import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware'; // Asegúrate de tener el middleware de verificación de token
import {
    mostrarProductos,
    crearProducto,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
} from '../controllers/productoController';

const router = Router();

// Ruta para mostrar todos los productos
router.get('/', verificarToken, mostrarProductos);

// Ruta para crear un nuevo producto
router.post('/', verificarToken, crearProducto);

// Ruta para obtener un producto por ID (para editar)
router.get('/:id/editar', verificarToken, obtenerProducto);

// Ruta para actualizar un producto
router.post('/:id/editar', verificarToken, actualizarProducto);

// Ruta para eliminar un producto
router.delete('/:id', verificarToken, eliminarProducto);

export default router;
