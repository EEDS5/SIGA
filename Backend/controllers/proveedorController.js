const Proveedor = require('../models/proveedorModel');

// Método para mostrar todos los proveedores
const mostrarProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.obtenerTodos();
        res.render('proveedores', { proveedores });
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        res.status(500).send('Error al obtener los proveedores');
    }
};

// Método para crear un nuevo proveedor
const crearProveedor = async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;

    try {
        await Proveedor.crear(nombre, telefono, email, direccion);
        res.status(201).send('Proveedor creado con éxito');
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        res.status(500).send('Error al crear el proveedor');
    }
};

// Método para obtener un proveedor por ID (para editar)
const obtenerProveedor = async (req, res) => {
    const { id } = req.params;

    try {
        const proveedor = await Proveedor.obtenerPorId(id);
        res.render('editarProveedor', { proveedor }); // Renderizar una vista para editar
    } catch (error) {
        console.error('Error al obtener el proveedor:', error);
        res.status(500).send('Error al obtener el proveedor');
    }
};

// Método para actualizar un proveedor
const actualizarProveedor = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email, direccion } = req.body;

    try {
        await Proveedor.actualizar(id, nombre, telefono, email, direccion);
        res.status(200).send('Proveedor actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        res.status(500).send('Error al actualizar el proveedor');
    }
};

// Método para eliminar un proveedor
const eliminarProveedor = async (req, res) => {
    const { id } = req.params;

    try {
        await Proveedor.eliminar(id);
        res.status(200).send('Proveedor eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
        res.status(500).send('Error al eliminar el proveedor');
    }
};

module.exports = {
    mostrarProveedores,
    crearProveedor,
    obtenerProveedor,
    actualizarProveedor,
    eliminarProveedor
};