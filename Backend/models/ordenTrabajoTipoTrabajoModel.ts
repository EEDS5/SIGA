import DAO from './dao';
const dao = new DAO();

interface OrdenTrabajoTipoTrabajo {
    id: number;
    id_orden_trabajo: number;
    id_tipo_trabajo: number;
    cantidad: number;
    subtotal: number | null;
}

const OrdenTrabajoTipoTrabajoModel = {
    // Obtener todas las relaciones entre orden de trabajo y tipo de trabajo
    obtenerTodas: (): Promise<OrdenTrabajoTipoTrabajo[]> => {
        const sql = `
            SELECT * 
            FROM orden_trabajo_tipo_trabajo 
            ORDER BY id ASC
        `;
        return dao.consultar<OrdenTrabajoTipoTrabajo>(sql);
    },

    // Obtener una relación entre orden de trabajo y tipo de trabajo por ID
    obtenerPorId: (id: number): Promise<OrdenTrabajoTipoTrabajo> => {
        const sql = `
            SELECT * 
            FROM orden_trabajo_tipo_trabajo 
            WHERE id = $1
        `;
        return dao.consultarUno<OrdenTrabajoTipoTrabajo>(sql, [id]);
    },

    // Crear una nueva relación entre orden de trabajo y tipo de trabajo
    crear: (id_orden_trabajo: number, id_tipo_trabajo: number, cantidad: number): Promise<{ id: number }> => {
        const sql = `
            INSERT INTO orden_trabajo_tipo_trabajo(id_orden_trabajo, id_tipo_trabajo, cantidad) 
            VALUES($1, $2, $3) 
            RETURNING id
        `;
        return dao.insertar<{ id: number }>(sql, [id_orden_trabajo, id_tipo_trabajo, cantidad]);
    },

    // Actualizar una relación entre orden de trabajo y tipo de trabajo por ID
    actualizar: (id: number, cantidad: number): Promise<void> => {
        const sql = `
            UPDATE orden_trabajo_tipo_trabajo 
            SET cantidad = $1 
            WHERE id = $2
        `;
        return dao.actualizar(sql, [cantidad, id]);
    },

    // Eliminar una relación entre orden de trabajo y tipo de trabajo por ID
    eliminar: (id: number): Promise<void> => {
        const sql = `
            DELETE FROM orden_trabajo_tipo_trabajo 
            WHERE id = $1
        `;
        return dao.eliminar(sql, [id]);
    },
};

export default OrdenTrabajoTipoTrabajoModel;
