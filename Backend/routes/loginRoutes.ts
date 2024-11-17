//routes/loginRoutes.ts
import { Router } from 'express';
import { showLogin, login } from '../controllers/loginController';

const router = Router();

/* // Ruta para mostrar el formulario de login
router.get('/login', showLogin);

// Ruta para procesar el login
router.post('/login', login);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/auth/login');
    });
}); */

// Ruta para mostrar el formulario de login (GET)
router.get('/login', showLogin);

// Ruta para manejar el proceso de login (POST)
router.post('/login', login);

export default router;