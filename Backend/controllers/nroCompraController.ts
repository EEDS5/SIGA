// controllers/nroCompraController.ts
import { Request, Response } from "express";
import NroCompra from "../models/nroCompraModel";

// Método para mostrar todos los números de compra
export const mostrarNroCompra = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const compras = await NroCompra.obtenerTodos();
    res.json(compras);
  } catch (error) {
    console.error("Error al obtener los números de compra:", error);
    res.status(500).json({ message: "Error al obtener los números de compra" });
  }
};

// Método para crear un nuevo número de compra
export const crearNroCompra = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id_proveedor, fecha_compra, total } = req.body;

  try {
    const nuevoNroCompra = await NroCompra.crear(
      id_proveedor,
      fecha_compra,
      total
    );
    res
      .status(201)
      .json({
        message: "Número de compra creado con éxito",
        id: nuevoNroCompra.id,
      });
  } catch (error) {
    console.error("Error al crear el número de compra:", error);
    res.status(500).json({ message: "Error al crear el número de compra" });
  }
};

// Método para obtener un número de compra por ID (para editar)
export const obtenerNroCompra = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10); // Convertir id a número

  try {
    const nroCompra = await NroCompra.obtenerPorId(id);
    res.json(nroCompra); // Devolver como JSON para la edición
  } catch (error) {
    console.error("Error al obtener el número de compra:", error);
    res.status(500).send("Error al obtener el número de compra");
  }
};

// Método para actualizar un número de compra
export const actualizarNroCompra = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10); // Convertir id a número
  const { id_proveedor, fecha_compra, total } = req.body;

  try {
    await NroCompra.actualizar(id, id_proveedor, fecha_compra, total);
    res.status(200).send("Número de compra actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el número de compra:", error);
    res.status(500).send("Error al actualizar el número de compra");
  }
};

// Método para eliminar un número de compra
export const eliminarNroCompra = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10); // Convertir id a número

  try {
    await NroCompra.eliminar(id);
    res.status(200).send("Número de compra eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el número de compra:", error);
    res.status(500).send("Error al eliminar el número de compra");
  }
};
