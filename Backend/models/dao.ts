import db from "../db";

class DAO {
  // Constructor opcional para configuraciones iniciales
  constructor() {}

  // Método para consultar un único registro
  async consultarUno<T>(sql: string, params: any[] = []): Promise<T> {
    try {
      const data = await db.one<T>(sql, params);
      return data;
    } catch (error) {
      console.error("Error en consultarUno:", (error as Error).message);
      throw error;
    }
  }

  // Método genérico para consultas SELECT
  async consultar<T>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const data = await db.any<T>(sql, params);
      return data;
    } catch (error) {
      console.error("Error en consultar:", (error as Error).message);
      throw error;
    }
  }

  // Método para inserciones INSERT
  async insertar<T>(sql: string, params: any[] = []): Promise<T> {
    try {
      const data = await db.one<T>(sql, params);
      return data;
    } catch (error) {
      console.error("Error en insertar:", (error as Error).message);
      throw error;
    }
  }

  // Método para actualizar registros UPDATE
  async actualizar(sql: string, params: any[] = []): Promise<void> {
    try {
      await db.none(sql, params);
    } catch (error) {
      console.error("Error en actualizar:", (error as Error).message);
      throw error;
    }
  }

  // Método para eliminar registros DELETE
  async eliminar(sql: string, params: any[] = []): Promise<void> {
    try {
      await db.none(sql, params);
    } catch (error) {
      console.error("Error en eliminar:", (error as Error).message);
      throw error;
    }
  }

  // Transacciones complejas como maestro-detalle
  async maestroDetalle(
    sqlMaster: string,
    sqlDetail: string,
    masterParams: any[] = [],
    detailParamsList: any[][] = [],
    keyName: string,
    keyPosition: number
  ): Promise<any> {
    try {
      const result = await db.tx(async (t) => {
        const masterId = await t.one(
          sqlMaster,
          masterParams,
          (row: any) => row[keyName]
        );
        for (const params of detailParamsList) {
          params[keyPosition] = masterId;
          await t.none(sqlDetail, params);
        }
        return masterId;
      });
      return result;
    } catch (error) {
      console.error("Error en maestroDetalle:", (error as Error).message);
      throw error;
    }
  }
}

export default DAO;
