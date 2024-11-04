import { Router } from 'express';
import { showLogin, login } from '../controllers/loginController';

const router = Router();

// Ruta para mostrar el formulario de login
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
});

export default router;