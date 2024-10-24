const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController'); // Cambiado a registerController

// Mostrar el formulario de registro
router.get('/register', registerController.showRegister);

// Procesar el registro de usuario
router.post('/register', registerController.register);

module.exports = router;
