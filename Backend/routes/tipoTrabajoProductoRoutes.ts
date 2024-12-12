import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarTipoTrabajoProducto,
    crearTipoTrabajoProducto,
    obtenerTipoTrabajoProducto,
    eliminarTipoTrabajoProducto,
} from '../controllers/tipoTrabajoProductoController';

const router = Router();

// Ruta para mostrar todos los registros tipo_trabajo_producto
router.get('/', verificarToken, mostrarTipoTrabajoProducto);

// Ruta para crear un nuevo registro tipo_trabajo_producto
router.post('/', verificarToken, crearTipoTrabajoProducto);

// Ruta para obtener un registro tipo_trabajo_producto por ID
router.get('/:id', verificarToken, obtenerTipoTrabajoProducto);

// Ruta para eliminar un registro tipo_trabajo_producto por ID
router.delete('/:id', verificarToken, eliminarTipoTrabajoProducto);

export default router;
