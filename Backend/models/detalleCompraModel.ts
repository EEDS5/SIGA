import DAO from './dao';
const dao = new DAO();

interface DetalleCompra {
  id: number;
  id_nro_compra: number;
  id_producto: number;
  nombre_producto: string; // Nuevo campo
  cantidad: number;
  precio_compra: number;
  subtotal: number;
}

const DetalleCompraModel = {
  obtenerTodos: (): Promise<DetalleCompra[]> => {
    const sql = `
      SELECT 
        detalle_compra.id,
        detalle_compra.id_nro_compra,
        detalle_compra.id_producto,
        producto.nombre AS nombre_producto,
        detalle_compra.cantidad,
        detalle_compra.precio_compra,
        detalle_compra.subtotal
      FROM 
        detalle_compra
      INNER JOIN 
        producto ON detalle_compra.id_producto = producto.id
      ORDER BY detalle_compra.id ASC
    `;
    return dao.consultar<DetalleCompra>(sql);
  },

  // Obtener un detalle de compra por su ID
  obtenerPorId: (id: number): Promise<DetalleCompra> => {
    const sql = 'SELECT * FROM detalle_compra WHERE id = $1';
    return dao.consultarUno<DetalleCompra>(sql, [id]);
  },

  // Crear un nuevo detalle de compra
  crear: (
    id_nro_compra: number,
    id_producto: number,
    cantidad: number,
    precio_compra: number
  ): Promise<{ id: number }> => {
    const sql = `
      INSERT INTO detalle_compra (id_nro_compra, id_producto, cantidad, precio_compra)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    return dao.insertar<{ id: number }>(sql, [
      id_nro_compra,
      id_producto,
      cantidad,
      precio_compra,
    ]);
  },

  // Actualizar un detalle de compra por su ID
  actualizar: (
    id: number,
    id_nro_compra: number,
    id_producto: number,
    cantidad: number,
    precio_compra: number
  ): Promise<void> => {
    const sql = `
      UPDATE detalle_compra
      SET id_nro_compra = $1, id_producto = $2, cantidad = $3, precio_compra = $4
      WHERE id = $5
    `;
    return dao.actualizar(sql, [
      id_nro_compra,
      id_producto,
      cantidad,
      precio_compra,
      id,
    ]);
  },

  // Eliminar un detalle de compra por ID
  eliminar: (id: number): Promise<void> => {
    const sql = 'DELETE FROM detalle_compra WHERE id = $1';
    return dao.eliminar(sql, [id]);
  },
};

export default DetalleCompraModel;
