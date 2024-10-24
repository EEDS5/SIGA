const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Ruta para mostrar el dashboard
router.get('/', dashboardController.showDashboard);

module.exports = router;
