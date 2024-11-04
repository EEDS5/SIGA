import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend/views')); // Ajusta la ruta

// Configuración de sesiones
app.use(session({
    secret: 'mi_secreto_seguro',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../Frontend/public'))); // Ajusta la ruta

// Rutas
import registerRoutes from './routes/registerRoutes';
import loginRoutes from './routes/loginRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import productoRoutes from './routes/productoRoutes';
import proveedorRoutes from './routes/proveedorRoutes';

app.use('/auth', registerRoutes);
app.use('/auth', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/productos', productoRoutes);
app.use('/proveedores', proveedorRoutes);

// Página principal
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../Frontend/views/index.html')); // Ajusta la ruta
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;