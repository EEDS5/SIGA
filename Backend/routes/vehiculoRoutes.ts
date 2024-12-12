import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import {
    mostrarVehiculos,
    crearVehiculo,
    obtenerVehiculo,
    actualizarVehiculo,
    eliminarVehiculo,
} from '../controllers/vehiculoController';

const router = Router();

// Ruta para mostrar todos los vehículos
router.get('/', verificarToken, mostrarVehiculos);

// Ruta para crear un nuevo vehículo
router.post('/', verificarToken, crearVehiculo);

// Ruta para obtener un vehículo por ID
router.get('/:id', verificarToken, obtenerVehiculo);

// Ruta para actualizar un vehículo
router.put('/:id', verificarToken, actualizarVehiculo);

// Ruta para eliminar un vehículo
router.delete('/:id', verificarToken, eliminarVehiculo);

export default router;
