import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarTipoTrabajo,
    crearTipoTrabajo,
    obtenerTipoTrabajo,
    actualizarTipoTrabajo,
    eliminarTipoTrabajo,
} from '../controllers/tipoTrabajoController';

const router = Router();

// Ruta para mostrar todos los tipos de trabajo
router.get('/', verificarToken, mostrarTipoTrabajo);

// Ruta para crear un nuevo tipo de trabajo
router.post('/', verificarToken, crearTipoTrabajo);

// Ruta para obtener un tipo de trabajo por ID
router.get('/:id', verificarToken, obtenerTipoTrabajo);

// Ruta para actualizar un tipo de trabajo por ID
router.put('/:id', verificarToken, actualizarTipoTrabajo);

// Ruta para eliminar un tipo de trabajo por ID
router.delete('/:id', verificarToken, eliminarTipoTrabajo);

export default router;
