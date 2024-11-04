import DAO from "./dao";
const dao = new DAO();

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
}

const ProveedorModel = {
  // Obtener todos los proveedores
  obtenerTodos: (): Promise<Proveedor[]> => {
    const sql = "SELECT * FROM proveedores ORDER BY id ASC";
    return dao.consultar<Proveedor>(sql);
  },

  // Obtener un proveedor por su ID
  obtenerPorId: (id: number): Promise<Proveedor> => {
    const sql = "SELECT * FROM proveedores WHERE id = $1";
    return dao.consultarUno<Proveedor>(sql, [id]);
  },

  // Crear un nuevo proveedor
  crear: (
    nombre: string,
    telefono: string,
    email: string,
    direccion: string
  ): Promise<{ id: number }> => {
    const sql =
      "INSERT INTO proveedores(nombre, telefono, email, direccion) VALUES($1, $2, $3, $4) RETURNING id";
    return dao.insertar<{ id: number }>(sql, [
      nombre,
      telefono,
      email,
      direccion,
    ]);
  },

  // Actualizar un proveedor por su ID
  actualizar: (
    id: number,
    nombre: string,
    telefono: string,
    email: string,
    direccion: string
  ): Promise<void> => {
    const sql =
      "UPDATE proveedores SET nombre = $1, telefono = $2, email = $3, direccion = $4 WHERE id = $5";
    return dao.actualizar(sql, [nombre, telefono, email, direccion, id]);
  },

  // Eliminar un proveedor por ID
  eliminar: (id: number): Promise<void> => {
    const sql = "DELETE FROM proveedores WHERE id = $1";
    return dao.eliminar(sql, [id]);
  },
};

export default ProveedorModel;
