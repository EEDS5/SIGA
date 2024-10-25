const db = require('./db');

const Proveedor = {
    // Obtener todos los proveedores
    obtenerTodos: () => {
        return db.any('SELECT * FROM proveedores');
    },

    // Obtener un proveedor por su ID
    obtenerPorId: (id) => {
        return db.one('SELECT * FROM proveedores WHERE id = $1', [id]);
    },

    // Crear un nuevo proveedor
    crear: (nombre, telefono, email, direccion) => {
        return db.none('INSERT INTO proveedores(nombre, telefono, email, direccion) VALUES($1, $2, $3, $4)', [nombre, telefono, email, direccion]);
    },

    // Actualizar un proveedor por su ID
    actualizar: (id, nombre, telefono, email, direccion) => {
        return db.none('UPDATE proveedores SET nombre = $1, telefono = $2, email = $3, direccion = $4 WHERE id = $5', [nombre, telefono, email, direccion, id]);
    },

    // Eliminar un proveedor por ID
    eliminar: (id) => {
        return db.none('DELETE FROM proveedores WHERE id = $1', [id]);
    }
};

module.exports = Proveedor;