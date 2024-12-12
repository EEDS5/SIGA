import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarProductosOrdenTrabajo,
    crearProductoOrdenTrabajo,
    obtenerProductoOrdenTrabajo,
    actualizarProductoOrdenTrabajo,
    eliminarProductoOrdenTrabajo,
} from '../controllers/productoOrdenTrabajoController';

const router = Router();

// Ruta para mostrar todas las relaciones entre producto y orden de trabajo
router.get('/', verificarToken, mostrarProductosOrdenTrabajo);

// Ruta para crear una nueva relación entre producto y orden de trabajo
router.post('/', verificarToken, crearProductoOrdenTrabajo);

// Ruta para obtener una relación entre producto y orden de trabajo por ID
router.get('/:id', verificarToken, obtenerProductoOrdenTrabajo);

// Ruta para actualizar una relación entre producto y orden de trabajo
router.put('/:id', verificarToken, actualizarProductoOrdenTrabajo);

// Ruta para eliminar una relación entre producto y orden de trabajo
router.delete('/:id', verificarToken, eliminarProductoOrdenTrabajo);

export default router;
