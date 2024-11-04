import { Router } from 'express';
import { mostrarProductos, crearProducto, eliminarProducto } from '../controllers/productoController';

const router = Router();

// Ruta para mostrar todos los productos
router.get('/', mostrarProductos);

// Ruta para crear un nuevo producto
router.post('/', crearProducto);

// Ruta para eliminar un producto
router.delete('/:id', eliminarProducto);

export default router;