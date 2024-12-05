//models/productoModel.ts
import DAO from "./dao";
const dao = new DAO();

interface Producto {
  id: number;
  nombre: string;
  id_categoria: number;
  stock: number;
  stock_minimo: number;
  precio_venta: number;
}

const ProductoModel = {
  // Obtener todos los productos
  obtenerTodos: (): Promise<Producto[]> => {
    const sql = "SELECT * FROM producto ORDER BY id ASC";
    return dao.consultar<Producto>(sql);
  },

  // Obtener un producto por su ID
  obtenerPorId: (id: number): Promise<Producto> => {
    const sql = "SELECT * FROM producto WHERE id = $1";
    return dao.consultarUno<Producto>(sql, [id]);
  },

  // Crear un nuevo producto
  crear: (
    nombre: string,
    id_categoria: number,
    stock: number,
    stock_minimo: number,
    precio_venta: number
  ): Promise<{ id: number }> => {
    const sql =
      "INSERT INTO producto(nombre, id_categoria, stock, stock_minimo, precio_venta) VALUES($1, $2, $3, $4, $5) RETURNING id";
    return dao.insertar<{ id: number }>(sql, [
      nombre,
      id_categoria,
      stock,
      stock_minimo,
      precio_venta,
    ]);
  },

  // Actualizar un producto por su ID
  actualizar: (
    id: number,
    nombre: string,
    id_categoria: number,
    stock: number,
    stock_minimo: number,
    precio_venta: number
  ): Promise<void> => {
    const sql =
      "UPDATE producto SET nombre = $1, id_categoria = $2, stock = $3, stock_minimo = $4, precio_venta = $5 WHERE id = $6";
    return dao.actualizar(sql, [
      nombre,
      id_categoria,
      stock,
      stock_minimo,
      precio_venta,
      id,
    ]);
  },

  // Eliminar un producto por ID
  eliminar: (id: number): Promise<void> => {
    const sql = "DELETE FROM producto WHERE id = $1";
    return dao.eliminar(sql, [id]);
  },
};

export default ProductoModel;
