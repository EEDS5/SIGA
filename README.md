
# SIGA (Sistema de Gestión Automotriz)

## Descripción del Proyecto

SIGA es un sistema diseñado para la gestión completa de talleres automotrices. Facilita la administración de inventarios, clientes, proveedores, vehículos y órdenes de trabajo, optimizando los procesos de operación en el taller. El sistema cuenta con un panel de control donde los usuarios pueden gestionar cada uno de los módulos de manera eficiente y sencilla.

## Características Principales

- **Gestión de Clientes**: Permite registrar clientes con sus datos personales y datos de contacto.
- **Gestión de Vehículos**: Vincula los vehículos a los clientes, almacenando información detallada como modelo, año, color, entre otros.
- **Gestión de Productos e Inventarios**: Controla el stock y las categorías de productos usados en el taller, con alertas por niveles bajos de inventario.
- **Gestión de Proveedores**: Almacena la información de los proveedores del taller, incluyendo los productos que ofrecen.
- **Órdenes de Trabajo**: Permite la creación de órdenes de trabajo para los vehículos, registrando los servicios realizados y los productos utilizados.
- **Autenticación de Usuarios**: Permite el registro y login de usuarios con roles definidos, como administrador y mecánico.

## Dependencias

Este proyecto utiliza diversas dependencias para su correcto funcionamiento, que están gestionadas a través de **Node.js** y **NPM**. Algunas de las principales dependencias instaladas son:

```json
{
  "autoprefixer": "^10.4.20",
  "bcrypt": "^5.1.1",
  "ejs": "^3.1.10",
  "express": "^4.21.1",
  "express-session": "^1.18.1",
  "pg-promise": "^11.10.1",
  "postcss": "^8.4.47",
  "rimraf": "^6.0.1",
  "tailwindcss": "^3.4.14"
}
```

- **bcrypt**: Para el manejo seguro de contraseñas.
- **ejs**: Utilizado para renderizar las vistas del lado del servidor.
- **express**: Framework para crear el servidor y manejar rutas.
- **pg-promise**: Para realizar consultas a la base de datos PostgreSQL.
- **tailwindcss**: Framework de CSS para los estilos y diseño responsive.

## Requisitos del Sistema

Antes de comenzar con la instalación, asegúrate de que tienes los siguientes requisitos:

- **Node.js** (v14.0 o superior)
- **PostgreSQL** (v12 o superior)
- **NPM** (v6.0 o superior)
- **Tailwind CSS**

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

### 1. Clonar el repositorio

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/tu-usuario/siga.git
cd siga/Backend
```

### 2. Instalar las dependencias

Instala las dependencias necesarias:

```bash
npm install
```

### 3. Configurar la base de datos

Asegúrate de tener **PostgreSQL** instalado y en ejecución. Crea una base de datos llamada `siga_db`. Luego, importa las tablas y datos iniciales ejecutando el script SQL:

```bash
psql -U postgres -d siga_db -f backend/database/siga_schema.sql
```

### 4. Configuración de la base de datos

En lugar de un archivo `.env`, el proyecto utiliza un archivo `db.ts` para gestionar la conexión a la base de datos. Este archivo se encuentra en la raíz del Backend y contiene la siguiente configuración:

```typescript
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'SIGA',
    user: 'postgres',
    password: 'holasoyelias',
});

export default db;
```

Asegúrate de que los valores de configuración coincidan con tu entorno local.

### 5. Compilar Tailwind CSS

Compila los estilos de **Tailwind CSS** con el siguiente comando:

```bash
npm run build:css
```

Este comando generará los archivos CSS necesarios para el frontend.

### 6. Iniciar el servidor

Una vez configurado, inicia el servidor de desarrollo:

```bash
npm start
```

El servidor estará corriendo en `http://localhost:3001`.

## Uso del Sistema

### 1. Registro e Inicio de Sesión

Los usuarios pueden registrarse en el sistema a través de la pantalla de **Registro**. El sistema soporta roles como **admin** (administrador) y **user** (usuario regular). Dependiendo del rol, tendrán acceso a diferentes funcionalidades del sistema.

### 2. Gestión de Productos

Desde el **Dashboard**, los administradores pueden gestionar los productos del inventario. Esto incluye:

- Crear productos nuevos.
- Editar los productos existentes.
- Eliminar productos del inventario.
  
El sistema realiza alertas automáticas cuando el stock de un producto cae por debajo del mínimo requerido.

### 3. Gestión de Proveedores

El módulo de **Proveedores** permite gestionar la información de todos los proveedores con los que trabaja el taller. Los usuarios pueden añadir, modificar y eliminar proveedores.

### 4. Gestión de Clientes y Vehículos

Cada cliente puede registrar uno o más vehículos. La información de estos vehículos incluye datos como el modelo, año, color, y más. Los mecánicos pueden acceder fácilmente a la información de los vehículos cuando gestionan órdenes de trabajo.

### 5. Órdenes de Trabajo

Las **Órdenes de Trabajo** permiten gestionar las reparaciones realizadas en los vehículos. Cada orden de trabajo incluye:

- Los productos utilizados.
- El servicio realizado (cambio de aceite, revisión de frenos, etc.).
- El costo total del servicio.

Los mecánicos pueden crear y cerrar órdenes de trabajo, registrando todos los detalles relevantes para el cliente y el taller.

## Configuración de TypeScript y Herramientas de Desarrollo

### Configuración de TypeScript

El proyecto utiliza **TypeScript** para mejorar la robustez y mantenibilidad del código. A continuación, se detalla la configuración básica en el archivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2016", 
    "module": "commonjs",
    "rootDir": "./",
    "outDir": "./dist",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["**/*.ts", "types/**/*.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### Instalación de Herramientas

Además de TypeScript, se han instalado herramientas esenciales para mejorar el flujo de trabajo de desarrollo:

```bash
npm install --save-dev typescript nodemon ts-node
```

- **typescript**: Compilador que transforma los archivos `.ts` a JavaScript.
- **nodemon**: Monitoriza los archivos del proyecto y reinicia el servidor automáticamente cuando se detectan cambios.
- **ts-node**: Permite ejecutar archivos TypeScript directamente sin necesidad de compilarlos previamente.

### Configuración de Nodemon

Para integrar **nodemon** y **ts-node**, se utiliza un archivo `nodemon.json` con la siguiente configuración:

```json
{
  "watch": ["."],
  "ext": "ts",
  "ignore": ["node_modules", "dist"],
  "exec": "ts-node ./app.ts"
}
```

Esta configuración asegura que **nodemon** monitorice los archivos `.ts` en la raíz del proyecto, ignorando los cambios en las carpetas `node_modules` y `dist`.

### Scripts de Desarrollo

En el archivo `package.json`, se define el script `start` para iniciar el servidor utilizando **nodemon**:

```json
{
  "scripts": {
    "start": "nodemon"
  }
}
```

### Inicio del Servidor

Para iniciar el servidor en modo de desarrollo, simplemente ejecuta:

```bash
npm start
```

Este comando iniciará el servidor y se reiniciará automáticamente con cada cambio en el código fuente.

## Scripts Disponibles

En el archivo `package.json`, se han definido algunos scripts para facilitar el desarrollo:

- `npm run build:css`: Compila los estilos de **Tailwind CSS** y genera el archivo `output.css`.

## Contribuciones

Las contribuciones al proyecto son bienvenidas. Si deseas contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios: `git checkout -b mi-nueva-funcionalidad`.
3. Realiza tus cambios y haz un commit: `git commit -m 'Añadir nueva funcionalidad'`.
4. Sube tus cambios: `git push origin mi-nueva-funcionalidad`.
5. Abre un Pull Request para que revisemos tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.