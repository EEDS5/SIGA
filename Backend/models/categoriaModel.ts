import DAO from './dao';
const dao = new DAO();

interface Categoria {
    id: number;
    nombre: string;
}

const CategoriaModel = {
    // Obtener todas las categorías
    obtenerTodas: (): Promise<Categoria[]> => {
        const sql = `
            SELECT * 
            FROM categoria 
            ORDER BY id ASC
        `;
        return dao.consultar<Categoria>(sql);
    },

    // Obtener una categoría por ID
    obtenerPorId: (id: number): Promise<Categoria> => {
        const sql = `
            SELECT * 
            FROM categoria 
            WHERE id = $1
        `;
        return dao.consultarUno<Categoria>(sql, [id]);
    },

    // Crear una nueva categoría
    crear: (nombre: string): Promise<{ id: number }> => {
        const sql = `
            INSERT INTO categoria(nombre) 
            VALUES($1) 
            RETURNING id
        `;
        return dao.insertar<{ id: number }>(sql, [nombre]);
    },

    // Actualizar una categoría por ID
    actualizar: (id: number, nombre: string): Promise<void> => {
        const sql = `
            UPDATE categoria 
            SET nombre = $1 
            WHERE id = $2
        `;
        return dao.actualizar(sql, [nombre, id]);
    },

    // Eliminar una categoría por ID
    eliminar: (id: number): Promise<void> => {
        const sql = `
            DELETE FROM categoria 
            WHERE id = $1
        `;
        return dao.eliminar(sql, [id]);
    },
};

export default CategoriaModel;
