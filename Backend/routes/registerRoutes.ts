//routes/registerRoutes.ts
import { Router } from 'express';
import { showRegister, register } from '../controllers/registerController';

const router = Router();

// Mostrar el formulario de registro
/* router.get('/register', showRegister); */

// Procesar el registro de usuario
router.post('/register', register);

export default router;