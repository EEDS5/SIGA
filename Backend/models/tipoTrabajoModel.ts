import DAO from './dao';
const dao = new DAO();

interface TipoTrabajo {
    id: number;
    nombre: string;
    precio_base: number;
}

const TipoTrabajoModel = {
    // Obtener todos los tipos de trabajo
    obtenerTodos: (): Promise<TipoTrabajo[]> => {
        const sql = `
            SELECT * 
            FROM tipo_trabajo 
            ORDER BY id ASC
        `;
        return dao.consultar<TipoTrabajo>(sql);
    },

    // Obtener un tipo de trabajo por ID
    obtenerPorId: (id: number): Promise<TipoTrabajo> => {
        const sql = `
            SELECT * 
            FROM tipo_trabajo 
            WHERE id = $1
        `;
        return dao.consultarUno<TipoTrabajo>(sql, [id]);
    },

    // Crear un nuevo tipo de trabajo
    crear: (nombre: string, precio_base: number): Promise<{ id: number }> => {
        const sql = `
            INSERT INTO tipo_trabajo(nombre, precio_base) 
            VALUES($1, $2) 
            RETURNING id
        `;
        return dao.insertar<{ id: number }>(sql, [nombre, precio_base]);
    },

    // Actualizar un tipo de trabajo por ID
    actualizar: (id: number, nombre: string, precio_base: number): Promise<void> => {
        const sql = `
            UPDATE tipo_trabajo 
            SET nombre = $1, precio_base = $2 
            WHERE id = $3
        `;
        return dao.actualizar(sql, [nombre, precio_base, id]);
    },

    // Eliminar un tipo de trabajo por ID
    eliminar: (id: number): Promise<void> => {
        const sql = `
            DELETE FROM tipo_trabajo 
            WHERE id = $1
        `;
        return dao.eliminar(sql, [id]);
    },
};

export default TipoTrabajoModel;
