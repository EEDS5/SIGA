//routes/registerRoutes.ts
import { Router } from 'express';
import { registerUser, showRegister } from '../controllers/registerController';

const router = Router();

// Mostrar el formulario de registro
/* router.get('/register', showRegister); */

// Opcional: Ruta para mostrar un mensaje o información adicional (GET /auth/register)
router.get('/register', showRegister); 

// Procesar el registro de usuario
router.post('/register', registerUser);

export default router;