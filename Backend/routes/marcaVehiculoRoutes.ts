import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarMarcas,
    crearMarca,
    obtenerMarca,
    actualizarMarca,
    eliminarMarca,
} from '../controllers/marcaVehiculoController';

const router = Router();

// Ruta para mostrar todas las marcas de vehículos
router.get('/', verificarToken, mostrarMarcas);

// Ruta para crear una nueva marca
router.post('/', verificarToken, crearMarca);

// Ruta para obtener una marca por ID
router.get('/:id', verificarToken, obtenerMarca);

// Ruta para actualizar una marca por ID
router.put('/:id', verificarToken, actualizarMarca);

// Ruta para eliminar una marca por ID
router.delete('/:id', verificarToken, eliminarMarca);

export default router;
