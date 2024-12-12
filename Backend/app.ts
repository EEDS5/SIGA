//app.ts
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import pg from 'pg';
import { sessionPool } from './db'; // Importa sessionPool desde db.ts
import cors from 'cors';
import https from 'https';
import fs from 'fs';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: ['https://localhost:3000', 'https://127.0.0.1:3000'], // Cambia 'localhost' por '127.0.0.1'
    credentials: true // Necesario para sesiones o autenticación basada en cookies
}));

// Configuración de EJS
/* app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend/views')); */ // Ajusta la ruta

// Configuración de sesiones
/* app.use(session({
    secret: 'mi_secreto_seguro',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
})); */
/* app.use(session({
    secret: 'mi_secreto_seguro', // Cambiar por un secreto más fuerte en producción
    resave: false,
    saveUninitialized: false, // Evita guardar sesiones vacías
    cookie: {
        secure: false, // Cambiar a true si usas HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // Expiración de 1 día
    }
})); */
// Configuración de sesiones con sessionPool
app.use(session({
    store: new (pgSession(session))({
        pool: sessionPool,
        tableName: 'session'
    }),
    secret: 'mi_secreto_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // HTTPS solo en producción
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 día,
        sameSite: 'none', // O 'none' si es necesario
    }
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* app.use(express.static(path.join(__dirname, '../../Frontend/public'))); */ // Ajusta la ruta

app.use((req, res, next) => {
    console.log('Encabezados de la solicitud:', req.headers);
    console.log('Cookies:', req.cookies);
    console.log('Cookies recibidas:', req.headers.cookie);
    console.log('Sesión:', req.session);
    next();
});

// Rutas
import registerRoutes from './routes/registerRoutes';
import loginRoutes from './routes/loginRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import productoRoutes from './routes/productoRoutes';
import proveedorRoutes from './routes/proveedorRoutes';
import nroCompraRoutes from './routes/nroCompraRoutes'; // Importa las rutas de nro_compra
import detalleCompraRoutes from './routes/detalleCompraRoutes';
import vehiculoRoutes from './routes/vehiculoRoutes';
import marcaVehiculoRoutes from './routes/marcaVehiculoRoutes'; // Importa las rutas de marca_vehiculo
import modeloVehiculoRoutes from './routes/modeloVehiculoRoutes'; // Importa las rutas de modelo_vehiculo
import categoriaRoutes from './routes/categoriaRoutes'; // Importa las rutas de categoría
import tipoTrabajoRoutes from './routes/tipoTrabajoRoutes'; // Importa las rutas de tipo_trabajo
import tipoTrabajoProductoRoutes from './routes/tipoTrabajoProductoRoutes'; // Importa las rutas tipo_trabajo_producto
import ordenTrabajoRoutes from './routes/ordenTrabajoRoutes'; // Importa las rutas orden_trabajo
import ordenTrabajoTipoTrabajoRoutes from './routes/ordenTrabajoTipoTrabajoRoutes'; // Importa las rutas
import productoOrdenTrabajoRoutes from './routes/productoOrdenTrabajoRoutes'; // Importa las rutas
import profileRoutes from './routes/profileRoutes';


app.use('/auth', registerRoutes);
app.use('/auth', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/productos', productoRoutes);
app.use('/proveedores', proveedorRoutes);
app.use('/nro-compra', nroCompraRoutes); // Agrega la nueva ruta para nro_compra
app.use('/vehiculos', vehiculoRoutes); // Agrega la nueva ruta para vehiculos
app.use('/detalle-compra', detalleCompraRoutes);
app.use('/marcas-vehiculos', marcaVehiculoRoutes); // Agrega la nueva ruta para marcas de vehículos
app.use('/modelos-vehiculos', modeloVehiculoRoutes); // Agrega la nueva ruta para modelos de vehículos
app.use('/categorias', categoriaRoutes); // Agrega la nueva ruta para categorías
app.use('/tipos-trabajo', tipoTrabajoRoutes); // Agrega la nueva ruta para tipos de trabajo
app.use('/tipos-trabajo-productos', tipoTrabajoProductoRoutes); // Agrega la nueva ruta para tipos de trabajo-productos
app.use('/ordenes-trabajo', ordenTrabajoRoutes); // Agrega la nueva ruta para órdenes de trabajo
app.use('/ordenes-trabajo-tipo-trabajo', ordenTrabajoTipoTrabajoRoutes); // Agrega la ruta
app.use('/productos-orden-trabajo', productoOrdenTrabajoRoutes); // Agrega la ruta
app.use('/', profileRoutes);

// Página principal
/* app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../Frontend/views/index.html')); // Ajusta la ruta
}); */
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Backend activo'); // Mensaje básico
});

const httpsOptions = {
    key: fs.readFileSync('localhost+2-key.pem'),
    cert: fs.readFileSync('localhost+2.pem')
  };
  
// Iniciar el servidor
/* app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); */
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Servidor corriendo en https://localhost:${PORT}`);
  });

export default app;