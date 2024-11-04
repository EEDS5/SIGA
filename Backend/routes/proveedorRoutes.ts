import { Router } from 'express';
import {
    mostrarProveedores,
    crearProveedor,
    eliminarProveedor,
    obtenerProveedor,
    actualizarProveedor
} from '../controllers/proveedorController';

const router = Router();

// Ruta para mostrar todos los proveedores
router.get('/', mostrarProveedores);

// Ruta para crear un nuevo proveedor
router.post('/', crearProveedor);

// Ruta para obtener un proveedor por ID (para editar)
router.get('/:id/editar', obtenerProveedor);

// Ruta para actualizar un proveedor
router.post('/:id/editar', actualizarProveedor);

// Ruta para eliminar un proveedor
router.delete('/:id', eliminarProveedor);

export default router;