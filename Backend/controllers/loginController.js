const bcrypt = require('bcrypt');
const db = require('../models/db');
const path = require('path');

// Mostrar formulario de login
exports.showLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/views/login.html'));
};

// Manejar el proceso de login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario en la base de datos
        const user = await db.oneOrNone('SELECT * FROM usuario WHERE username = $1', [username]);

        if (!user) {
            console.log('Usuario no encontrado');
            return res.redirect('/auth/login?error=Usuario o contraseña incorrectos.'); // Redirigir con error
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.redirect('/auth/login?error=Usuario o contraseña incorrectos.'); // Redirigir con error
        }

        // Si la contraseña es correcta, guardamos el usuario en la sesión
        req.session.user = user;
        console.log('Usuario autenticado correctamente');
        res.redirect('/dashboard'); // Redirigir al dashboard
    } catch (error) {
        console.log('Error durante el inicio de sesión:', error);
        res.redirect('/auth/login?error=Error en el servidor'); // Redirigir con error
    }
};

