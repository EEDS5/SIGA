import DAO from './dao';
const dao = new DAO();

interface OrdenTrabajo {
    id: number;
    id_vehiculo: number;
    fecha_recepcion: Date;
    fecha_entrega: Date | null;
    costo_total: number;
}

const OrdenTrabajoModel = {
    // Obtener todas las órdenes de trabajo
    obtenerTodas: (): Promise<OrdenTrabajo[]> => {
        const sql = `
            SELECT * 
            FROM orden_trabajo 
            ORDER BY id ASC
        `;
        return dao.consultar<OrdenTrabajo>(sql);
    },

    // Obtener una orden de trabajo por ID
    obtenerPorId: (id: number): Promise<OrdenTrabajo> => {
        const sql = `
            SELECT * 
            FROM orden_trabajo 
            WHERE id = $1
        `;
        return dao.consultarUno<OrdenTrabajo>(sql, [id]);
    },

    // Crear una nueva orden de trabajo
    crear: (id_vehiculo: number, fecha_recepcion: Date, fecha_entrega: Date | null, costo_total: number): Promise<{ id: number }> => {
        const sql = `
            INSERT INTO orden_trabajo(id_vehiculo, fecha_recepcion, fecha_entrega, costo_total) 
            VALUES($1, $2, $3, $4) 
            RETURNING id
        `;
        return dao.insertar<{ id: number }>(sql, [id_vehiculo, fecha_recepcion, fecha_entrega, costo_total]);
    },

    // Actualizar una orden de trabajo por ID
    actualizar: (id: number, fecha_recepcion: Date, fecha_entrega: Date | null, costo_total: number): Promise<void> => {
        const sql = `
            UPDATE orden_trabajo 
            SET fecha_recepcion = $1, fecha_entrega = $2, costo_total = $3 
            WHERE id = $4
        `;
        return dao.actualizar(sql, [fecha_recepcion, fecha_entrega, costo_total, id]);
    },

    // Eliminar una orden de trabajo por ID
    eliminar: (id: number): Promise<void> => {
        const sql = `
            DELETE FROM orden_trabajo 
            WHERE id = $1
        `;
        return dao.eliminar(sql, [id]);
    },
};

export default OrdenTrabajoModel;
