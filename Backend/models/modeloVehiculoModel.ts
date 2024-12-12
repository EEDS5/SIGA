import DAO from './dao';
const dao = new DAO();

interface ModeloVehiculo {
    id: number;
    nombre: string;
    descripcion: string | null;
    id_marca: number;
}

const ModeloVehiculoModel = {
    // Obtener todos los modelos
    obtenerTodos: (): Promise<ModeloVehiculo[]> => {
        const sql = `
            SELECT mv.*, m.nombre AS marca
            FROM modelo_vehiculo mv
            JOIN marca_vehiculo m ON mv.id_marca = m.id
            ORDER BY mv.id ASC
        `;
        return dao.consultar<ModeloVehiculo>(sql);
    },

    // Obtener un modelo por ID
    obtenerPorId: (id: number): Promise<ModeloVehiculo> => {
        const sql = `
            SELECT mv.*, m.nombre AS marca
            FROM modelo_vehiculo mv
            JOIN marca_vehiculo m ON mv.id_marca = m.id
            WHERE mv.id = $1
        `;
        return dao.consultarUno<ModeloVehiculo>(sql, [id]);
    },

    // Crear un nuevo modelo
    crear: (
        nombre: string,
        descripcion: string | null,
        id_marca: number
    ): Promise<{ id: number }> => {
        const sql = `
            INSERT INTO modelo_vehiculo(nombre, descripcion, id_marca)
            VALUES($1, $2, $3) RETURNING id
        `;
        return dao.insertar<{ id: number }>(sql, [nombre, descripcion, id_marca]);
    },

    // Actualizar un modelo por ID
    actualizar: (
        id: number,
        nombre: string,
        descripcion: string | null,
        id_marca: number
    ): Promise<void> => {
        const sql = `
            UPDATE modelo_vehiculo
            SET nombre = $1, descripcion = $2, id_marca = $3
            WHERE id = $4
        `;
        return dao.actualizar(sql, [nombre, descripcion, id_marca, id]);
    },

    // Eliminar un modelo por ID
    eliminar: (id: number): Promise<void> => {
        const sql = 'DELETE FROM modelo_vehiculo WHERE id = $1';
        return dao.eliminar(sql, [id]);
    },
};

export default ModeloVehiculoModel;
