const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../models/db');

// Mostrar formulario de registro
exports.showRegister = (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/views/register.html'));
};

// Registrar un usuario
exports.register = async (req, res) => {
    const { username, password, email, nombre_completo, rol } = req.body; // Agregar nombre_completo y rol

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insertar el nuevo usuario en la base de datos
        await db.none('INSERT INTO usuario (username, password_hash, email, nombre_completo, rol) VALUES ($1, $2, $3, $4, $5)', 
            [username, password_hash, email, nombre_completo, rol]);

        // Redirigir al login después de registrarse
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al registrar usuario');
    }
};