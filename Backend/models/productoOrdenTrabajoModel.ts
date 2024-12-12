import DAO from './dao';
const dao = new DAO();

interface ProductoOrdenTrabajo {
    id: number;
    id_producto: number;
    id_orden_trabajo: number;
    cantidad_utilizada: number;
    subtotal: number | null;
}

const ProductoOrdenTrabajoModel = {
    // Obtener todas las relaciones entre producto y orden de trabajo
    obtenerTodas: (): Promise<ProductoOrdenTrabajo[]> => {
        const sql = `
            SELECT * 
            FROM producto_orden_trabajo 
            ORDER BY id ASC
        `;
        return dao.consultar<ProductoOrdenTrabajo>(sql);
    },

    // Obtener una relación entre producto y orden de trabajo por ID
    obtenerPorId: (id: number): Promise<ProductoOrdenTrabajo> => {
        const sql = `
            SELECT * 
            FROM producto_orden_trabajo 
            WHERE id = $1
        `;
        return dao.consultarUno<ProductoOrdenTrabajo>(sql, [id]);
    },

    // Crear una nueva relación entre producto y orden de trabajo
    crear: (id_producto: number, id_orden_trabajo: number, cantidad_utilizada: number): Promise<{ id: number }> => {
        const sql = `
            INSERT INTO producto_orden_trabajo(id_producto, id_orden_trabajo, cantidad_utilizada) 
            VALUES($1, $2, $3) 
            RETURNING id
        `;
        return dao.insertar<{ id: number }>(sql, [id_producto, id_orden_trabajo, cantidad_utilizada]);
    },

    // Actualizar una relación entre producto y orden de trabajo por ID
    actualizar: (id: number, cantidad_utilizada: number): Promise<void> => {
        const sql = `
            UPDATE producto_orden_trabajo 
            SET cantidad_utilizada = $1 
            WHERE id = $2
        `;
        return dao.actualizar(sql, [cantidad_utilizada, id]);
    },

    // Eliminar una relación entre producto y orden de trabajo por ID
    eliminar: (id: number): Promise<void> => {
        const sql = `
            DELETE FROM producto_orden_trabajo 
            WHERE id = $1
        `;
        return dao.eliminar(sql, [id]);
    },
};

export default ProductoOrdenTrabajoModel;
