import DAO from './dao';
const dao = new DAO();

interface TipoTrabajoProducto {
    id: number;
    id_tipo_trabajo: number;
    id_producto: number;
    cantidad: number;
}

const TipoTrabajoProductoModel = {
    // Obtener todos los registros tipo de trabajo-producto
    obtenerTodos: (): Promise<TipoTrabajoProducto[]> => {
        const sql = `
            SELECT * 
            FROM tipo_trabajo_producto 
            ORDER BY id ASC
        `;
        return dao.consultar<TipoTrabajoProducto>(sql);
    },

    // Obtener un registro tipo de trabajo-producto por ID
    obtenerPorId: (id: number): Promise<TipoTrabajoProducto> => {
        const sql = `
            SELECT * 
            FROM tipo_trabajo_producto 
            WHERE id = $1
        `;
        return dao.consultarUno<TipoTrabajoProducto>(sql, [id]);
    },

    // Crear un nuevo registro tipo de trabajo-producto
    crear: (id_tipo_trabajo: number, id_producto: number, cantidad: number): Promise<{ id: number }> => {
        const sql = `
            INSERT INTO tipo_trabajo_producto(id_tipo_trabajo, id_producto, cantidad) 
            VALUES($1, $2, $3) 
            RETURNING id
        `;
        return dao.insertar<{ id: number }>(sql, [id_tipo_trabajo, id_producto, cantidad]);
    },

    // Eliminar un registro tipo de trabajo-producto por ID
    eliminar: (id: number): Promise<void> => {
        const sql = `
            DELETE FROM tipo_trabajo_producto 
            WHERE id = $1
        `;
        return dao.eliminar(sql, [id]);
    },
};

export default TipoTrabajoProductoModel;
