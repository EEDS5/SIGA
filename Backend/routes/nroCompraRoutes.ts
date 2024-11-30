// routes/nroCompraRoutes.ts
import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarNroCompra,
    crearNroCompra,
    obtenerNroCompra,
    actualizarNroCompra,
    eliminarNroCompra,
} from '../controllers/nroCompraController';

const router = Router();

// Ruta para mostrar todos los números de compra
router.get('/', verificarToken, mostrarNroCompra);

// Ruta para crear un nuevo número de compra
router.post('/', verificarToken, crearNroCompra);

// Ruta para obtener un número de compra por ID (para editar)
router.get('/:id', verificarToken, obtenerNroCompra);

// Ruta para actualizar un número de compra
router.put('/:id', verificarToken, actualizarNroCompra);

// Ruta para eliminar un número de compra
router.delete('/:id', verificarToken, eliminarNroCompra);

export default router;
