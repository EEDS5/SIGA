import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarOrdenesTrabajo,
    crearOrdenTrabajo,
    obtenerOrdenTrabajo,
    actualizarOrdenTrabajo,
    eliminarOrdenTrabajo,
} from '../controllers/ordenTrabajoController';

const router = Router();

// Ruta para mostrar todas las órdenes de trabajo
router.get('/', verificarToken, mostrarOrdenesTrabajo);

// Ruta para crear una nueva orden de trabajo
router.post('/', verificarToken, crearOrdenTrabajo);

// Ruta para obtener una orden de trabajo por ID
router.get('/:id', verificarToken, obtenerOrdenTrabajo);

// Ruta para actualizar una orden de trabajo por ID
router.put('/:id', verificarToken, actualizarOrdenTrabajo);

// Ruta para eliminar una orden de trabajo por ID
router.delete('/:id', verificarToken, eliminarOrdenTrabajo);

export default router;
