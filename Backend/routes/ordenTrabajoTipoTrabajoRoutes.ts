import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarOrdenesTrabajoTipoTrabajo,
    crearOrdenTrabajoTipoTrabajo,
    obtenerOrdenTrabajoTipoTrabajo,
    actualizarOrdenTrabajoTipoTrabajo,
    eliminarOrdenTrabajoTipoTrabajo,
} from '../controllers/ordenTrabajoTipoTrabajoController';

const router = Router();

// Ruta para mostrar todas las relaciones entre orden de trabajo y tipo de trabajo
router.get('/', verificarToken, mostrarOrdenesTrabajoTipoTrabajo);

// Ruta para crear una nueva relación entre orden de trabajo y tipo de trabajo
router.post('/', verificarToken, crearOrdenTrabajoTipoTrabajo);

// Ruta para obtener una relación entre orden de trabajo y tipo de trabajo por ID
router.get('/:id', verificarToken, obtenerOrdenTrabajoTipoTrabajo);

// Ruta para actualizar una relación entre orden de trabajo y tipo de trabajo
router.put('/:id', verificarToken, actualizarOrdenTrabajoTipoTrabajo);

// Ruta para eliminar una relación entre orden de trabajo y tipo de trabajo
router.delete('/:id', verificarToken, eliminarOrdenTrabajoTipoTrabajo);

export default router;
