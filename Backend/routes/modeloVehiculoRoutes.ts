import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarModelos,
    crearModelo,
    obtenerModelo,
    actualizarModelo,
    eliminarModelo,
} from '../controllers/modeloVehiculoController';

const router = Router();

// Ruta para mostrar todos los modelos de vehículos
router.get('/', verificarToken, mostrarModelos);

// Ruta para crear un nuevo modelo
router.post('/', verificarToken, crearModelo);

// Ruta para obtener un modelo por ID
router.get('/:id', verificarToken, obtenerModelo);

// Ruta para actualizar un modelo por ID
router.put('/:id', verificarToken, actualizarModelo);

// Ruta para eliminar un modelo por ID
router.delete('/:id', verificarToken, eliminarModelo);

export default router;
