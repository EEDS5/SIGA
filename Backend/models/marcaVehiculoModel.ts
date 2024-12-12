import DAO from './dao';
const dao = new DAO();

interface MarcaVehiculo {
    id: number;
    nombre: string;
    casa_distribuidora: string;
    pais_origen: string;
}

const MarcaVehiculoModel = {
    // Obtener todas las marcas
    obtenerTodas: (): Promise<MarcaVehiculo[]> => {
        const sql = 'SELECT * FROM marca_vehiculo ORDER BY id ASC';
        return dao.consultar<MarcaVehiculo>(sql);
    },

    // Obtener una marca por ID
    obtenerPorId: (id: number): Promise<MarcaVehiculo> => {
        const sql = 'SELECT * FROM marca_vehiculo WHERE id = $1';
        return dao.consultarUno<MarcaVehiculo>(sql, [id]);
    },

    // Crear una nueva marca
    crear: (
        nombre: string,
        casa_distribuidora: string,
        pais_origen: string
    ): Promise<{ id: number }> => {
        const sql =
            'INSERT INTO marca_vehiculo(nombre, casa_distribuidora, pais_origen) VALUES($1, $2, $3) RETURNING id';
        return dao.insertar<{ id: number }>(sql, [nombre, casa_distribuidora, pais_origen]);
    },

    // Actualizar una marca por ID
    actualizar: (
        id: number,
        nombre: string,
        casa_distribuidora: string,
        pais_origen: string
    ): Promise<void> => {
        const sql =
            'UPDATE marca_vehiculo SET nombre = $1, casa_distribuidora = $2, pais_origen = $3 WHERE id = $4';
        return dao.actualizar(sql, [nombre, casa_distribuidora, pais_origen, id]);
    },

    // Eliminar una marca por ID
    eliminar: (id: number): Promise<void> => {
        const sql = 'DELETE FROM marca_vehiculo WHERE id = $1';
        return dao.eliminar(sql, [id]);
    },
};

export default MarcaVehiculoModel;
