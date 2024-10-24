// backend/routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Ruta para mostrar el formulario de login
router.get('/login', loginController.showLogin);

// Ruta para procesar el login
router.post('/login', loginController.login);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error al cerrar sesión:', err);
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;
