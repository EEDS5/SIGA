/* //routes/proveedorRoutes.ts
import { Router } from 'express';
import {
    mostrarProveedor,
    crearProveedor,
    eliminarProveedor,
    obtenerProveedor,
    actualizarProveedor
} from '../controllers/proveedorController';

const router = Router();

// Ruta para mostrar todos los proveedores
router.get('/', mostrarProveedor);

// Ruta para crear un nuevo proveedor
router.post('/', crearProveedor);

// Ruta para obtener un proveedor por ID (para editar)
router.get('/:id/editar', obtenerProveedor);

// Ruta para actualizar un proveedor
router.post('/:id/editar', actualizarProveedor);

// Ruta para eliminar un proveedor
router.delete('/:id', eliminarProveedor);

export default router; */

/* import { Router } from 'express';
import { verificarAutenticacion } from '../middlewares/authMiddleware';
import {
    mostrarProveedor,
    crearProveedor,
    obtenerProveedor,
    actualizarProveedor,
    eliminarProveedor,
} from '../controllers/proveedorController';

const router = Router();

// Ruta para mostrar todos los proveedores
router.get('/', verificarAutenticacion, mostrarProveedor);

// Ruta para crear un nuevo proveedor
router.post('/', verificarAutenticacion, crearProveedor);

// Ruta para obtener un proveedor por ID
router.get('/:id/editar', verificarAutenticacion, obtenerProveedor);

// Ruta para actualizar un proveedor
router.post('/:id/editar', verificarAutenticacion, actualizarProveedor);

// Ruta para eliminar un proveedor
router.delete('/:id', verificarAutenticacion, eliminarProveedor);

export default router; */

import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware'; // Cambiar a verificarToken
import {
    mostrarProveedor,
    crearProveedor,
    obtenerProveedor,
    actualizarProveedor,
    eliminarProveedor,
} from '../controllers/proveedorController';

const router = Router();

// Ruta para mostrar todos los proveedores
router.get('/', verificarToken, mostrarProveedor);

// Ruta para crear un nuevo proveedor
router.post('/', verificarToken, crearProveedor);

// Ruta para obtener un proveedor por ID
router.get('/:id/editar', verificarToken, obtenerProveedor);

// Ruta para actualizar un proveedor
router.post('/:id/editar', verificarToken, actualizarProveedor);

// Ruta para eliminar un proveedor
router.delete('/:id', verificarToken, eliminarProveedor);

export default router;