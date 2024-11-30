import { Request, Response } from 'express';
import DetalleCompraModel from '../models/detalleCompraModel';

// Obtener todos los detalles de compra
export const obtenerDetallesCompra = async (req: Request, res: Response) => {
  try {
    const detalles = await DetalleCompraModel.obtenerTodos();
    res.status(200).json(detalles);
  } catch (error) {
    console.error('Error al obtener detalles de compra:', error);
    res.status(500).json({ message: 'Error al obtener detalles de compra' });
  }
};

// Crear un nuevo detalle de compra
export const crearDetalleCompra = async (req: Request, res: Response) => {
  const { id_nro_compra, id_producto, cantidad, precio_compra } = req.body;

  try {
    const nuevoDetalle = await DetalleCompraModel.crear(
      id_nro_compra,
      id_producto,
      cantidad,
      precio_compra
    );
    res.status(201).json({ message: 'Detalle de compra creado', id: nuevoDetalle.id });
  } catch (error) {
    console.error('Error al crear detalle de compra:', error);
    res.status(500).json({ message: 'Error al crear detalle de compra' });
  }
};

// Obtener un detalle de compra por su ID
export const obtenerDetalleCompraPorId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const detalle = await DetalleCompraModel.obtenerPorId(Number(id));
    if (!detalle) {
      res.status(404).json({ message: 'Detalle de compra no encontrado' });
      return;
    }
    res.status(200).json(detalle);
  } catch (error) {
    console.error('Error al obtener detalle de compra:', error);
    res.status(500).json({ message: 'Error al obtener detalle de compra' });
  }
};

// Actualizar un detalle de compra
export const actualizarDetalleCompra = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_nro_compra, id_producto, cantidad, precio_compra } = req.body;

  try {
    await DetalleCompraModel.actualizar(
      Number(id),
      id_nro_compra,
      id_producto,
      cantidad,
      precio_compra
    );
    res.status(200).json({ message: 'Detalle de compra actualizado' });
  } catch (error) {
    console.error('Error al actualizar detalle de compra:', error);
    res.status(500).json({ message: 'Error al actualizar detalle de compra' });
  }
};

// Eliminar un detalle de compra
export const eliminarDetalleCompra = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await DetalleCompraModel.eliminar(Number(id));
    res.status(200).json({ message: 'Detalle de compra eliminado' });
  } catch (error) {
    console.error('Error al eliminar detalle de compra:', error);
    res.status(500).json({ message: 'Error al eliminar detalle de compra' });
  }
};
