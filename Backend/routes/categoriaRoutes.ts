import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria,
} from '../controllers/categoriaController';

const router = Router();

// Ruta para mostrar todas las categorías
router.get('/', verificarToken, mostrarCategorias);

// Ruta para crear una nueva categoría
router.post('/', verificarToken, crearCategoria);

// Ruta para obtener una categoría por ID
router.get('/:id', verificarToken, obtenerCategoria);

// Ruta para actualizar una categoría por ID
router.put('/:id', verificarToken, actualizarCategoria);

// Ruta para eliminar una categoría por ID
router.delete('/:id', verificarToken, eliminarCategoria);

export default router;
