//routes/dashboardRoutes.ts
import { Router } from 'express';
import { showDashboard } from '../controllers/dashboardController';

const router = Router();

// Ruta para mostrar el dashboard
router.get('/', showDashboard);

export default router;