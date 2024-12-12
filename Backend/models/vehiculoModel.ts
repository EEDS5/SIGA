import DAO from './dao';
const dao = new DAO();

interface Vehiculo {
    id: number;
    cliente_id: number;
    id_modelo: number;
    placa: string;
    ano: number | null;
    origen_fabricacion: string | null;
    color: string | null;
    transmision: string | null;
    traccion: string | null;
    tipo_neumatico: string | null;
}

const VehiculoModel = {
    // Obtener todos los vehículos
    obtenerTodos: (): Promise<Vehiculo[]> => {
        const sql = "SELECT * FROM vehiculo ORDER BY id ASC";
        return dao.consultar<Vehiculo>(sql);
    },

    // Obtener un vehículo por su ID
    obtenerPorId: (id: number): Promise<Vehiculo> => {
        const sql = "SELECT * FROM vehiculo WHERE id = $1";
        return dao.consultarUno<Vehiculo>(sql, [id]);
    },

    // Crear un nuevo vehículo
    crear: (
        cliente_id: number,
        id_modelo: number,
        placa: string,
        ano: number | null,
        origen_fabricacion: string | null,
        color: string | null,
        transmision: string | null,
        traccion: string | null,
        tipo_neumatico: string | null
    ): Promise<{ id: number }> => {
        const sql = `
            INSERT INTO vehiculo (cliente_id, id_modelo, placa, ano, origen_fabricacion, color, transmision, traccion, tipo_neumatico)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
        `;
        return dao.insertar<{ id: number }>(sql, [cliente_id, id_modelo, placa, ano, origen_fabricacion, color, transmision, traccion, tipo_neumatico]);
    },

    // Actualizar un vehículo por su ID
    actualizar: (
        id: number,
        cliente_id: number,
        id_modelo: number,
        placa: string,
        ano: number | null,
        origen_fabricacion: string | null,
        color: string | null,
        transmision: string | null,
        traccion: string | null,
        tipo_neumatico: string | null
    ): Promise<void> => {
        const sql = `
            UPDATE vehiculo
            SET cliente_id = $1, id_modelo = $2, placa = $3, ano = $4, origen_fabricacion = $5, color = $6, transmision = $7, traccion = $8, tipo_neumatico = $9
            WHERE id = $10
        `;
        return dao.actualizar(sql, [cliente_id, id_modelo, placa, ano, origen_fabricacion, color, transmision, traccion, tipo_neumatico, id]);
    },

    // Eliminar un vehículo por ID
    eliminar: (id: number): Promise<void> => {
        const sql = "DELETE FROM vehiculo WHERE id = $1";
        return dao.eliminar(sql, [id]);
    },
};

export default VehiculoModel;
