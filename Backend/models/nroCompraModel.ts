// models/nroCompraModel.ts
import DAO from './dao';
const dao = new DAO();

interface NroCompra {
    id: number;
    id_proveedor: number;  // <-- Aquí deberías usar `id_proveedor` para que coincida con la base de datos
    fecha_compra: string;
    total: number;
}


const NroCompraModel = {
    // Obtener todos los números de compra
    obtenerTodos: (): Promise<NroCompra[]> => {
        const sql = "SELECT * FROM nro_compra ORDER BY id ASC";
        return dao.consultar<NroCompra>(sql);
    },

    // Obtener un número de compra por su ID
    obtenerPorId: (id: number): Promise<NroCompra> => {
        const sql = "SELECT * FROM nro_compra WHERE id = $1";
        return dao.consultarUno<NroCompra>(sql, [id]);
    },

    // Crear un nuevo número de compra
    crear: (
        proveedor_id: number,
        fecha_compra: string,
        total: number
    ): Promise<{ id: number }> => {
        const sql =
            "INSERT INTO nro_compra(id_proveedor, fecha_compra, total) VALUES($1, $2, $3) RETURNING id";
        return dao.insertar<{ id: number }>(sql, [proveedor_id, fecha_compra, total]);
    },

    // Actualizar un número de compra
    actualizar: (
        id: number,
        proveedor_id: number,
        fecha_compra: string,
        total: number
    ): Promise<void> => {
        const sql =
            "UPDATE nro_compra SET id_proveedor = $1, fecha_compra = $2, total = $3 WHERE id = $4";
        return dao.actualizar(sql, [proveedor_id, fecha_compra, total, id]);
    },

    // Eliminar un número de compra
    eliminar: (id: number): Promise<void> => {
        const sql = "DELETE FROM nro_compra WHERE id = $1";
        return dao.eliminar(sql, [id]);
    },
};

export default NroCompraModel;
