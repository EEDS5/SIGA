const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend/views')); // Ajusta esta ruta si es necesario

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
app.use(express.static(path.join(__dirname, '../Frontend/public')));

// Rutas
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Ruta para el dashboard
const productoRoutes = require('./routes/productoRoutes'); // Nueva ruta para productos

app.use('/auth', registerRoutes);
app.use('/auth', loginRoutes);
app.use('/dashboard', dashboardRoutes); // Ruta para el dashboard
app.use('/productos', productoRoutes); // Agregar ruta para la gestión de productos

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/views/index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

