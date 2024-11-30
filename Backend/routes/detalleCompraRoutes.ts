import { Router } from 'express';
import {
  obtenerDetallesCompra,
  crearDetalleCompra,
  obtenerDetalleCompraPorId,
  actualizarDetalleCompra,
  eliminarDetalleCompra,
} from '../controllers/detalleCompraController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

// Ruta para obtener todos los detalles de compra
router.get('/', verificarToken, obtenerDetallesCompra);

// Ruta para crear un nuevo detalle de compra
router.post('/', verificarToken, crearDetalleCompra);

// Ruta para obtener un detalle de compra por ID
router.get('/:id',verificarToken, obtenerDetalleCompraPorId);

// Ruta para actualizar un detalle de compra por ID
router.put('/:id', verificarToken, actualizarDetalleCompra);

// Ruta para eliminar un detalle de compra por ID
router.delete('/:id', verificarToken, eliminarDetalleCompra);

export default router;
