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
  "express": "^4.21.1",
  "express-session": "^1.18.1",
  "pg-promise": "^11.10.1",
  "postcss": "^8.4.47",
  "rimraf": "^6.0.1",
  "tailwindcss": "^3.4.14",
  "connect-pg-simple": "^7.0.0",
  "cors": "^2.8.5",
  "typescript": "^4.0.0",
  "nodemon": "^2.0.0",
  "ts-node": "^10.0.0"
}
```

- **bcrypt**: Para el manejo seguro de contraseñas.
- **express**: Framework para crear el servidor y manejar rutas.
- **express-session**: Manejo de sesiones en Express.
- **pg-promise**: Para realizar consultas a la base de datos PostgreSQL.
- **tailwindcss**: Framework de CSS para los estilos y diseño responsive.
- **connect-pg-simple**: Almacena las sesiones de Express en PostgreSQL.
- **cors**: Middleware para habilitar CORS.
- **typescript**, **nodemon**, **ts-node**: Herramientas para el desarrollo con TypeScript.

## Requisitos del Sistema

- **Node.js** (v14.0 o superior)
- **PostgreSQL** (v12 o superior)
- **NPM** (v6.0 o superior)
- **Tailwind CSS**
- **http-server**: Servidor web simple para el frontend.
- **Certificados SSL**: Certificados válidos para localhost.
- **mkcert**: Herramienta para generar certificados SSL locales.


## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/siga.git
cd siga
```

### 2. Instalar las dependencias del Backend

```bash
cd Backend
npm install
```

### 3. Configurar la base de datos

Asegúrate de tener **PostgreSQL** instalado y en ejecución. Crea una base de datos llamada `siga_db`. Luego, importa las tablas y datos iniciales ejecutando el script SQL:

```bash
psql -U postgres -d siga_db -f database/siga_schema.sql
```

Si tu usuario de PostgreSQL no es `postgres`, reemplázalo por el nombre de tu usuario.

### 4. Crear la tabla de sesiones en PostgreSQL

```sql
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL COLLATE "default",
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,
    PRIMARY KEY ("sid")
) WITH (OIDS=FALSE);

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
```

### 5. Configuración de la base de datos

En el archivo `db.ts`, configura la conexión a la base de datos. Este archivo se encuentra en la carpeta `Backend`:

```typescript
import pgPromise from 'pg-promise';
import { Pool } from 'pg';

// Configuración para pg-promise
const pgp = pgPromise();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'siga_db',
    user: 'tu_usuario',
    password: 'tu_contraseña',
});

// Configuración para pg.Pool (exclusivo para sesiones)
const sessionPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'siga_db',
    user: 'tu_usuario',
    password: 'tu_contraseña',
});

export default db;
export { sessionPool };
```

### 6. Generar Certificados SSL

Para habilitar HTTPS en el frontend y backend, necesitas certificados SSL válidos para localhost. Genera los certificados utilizando **mkcert**:

```bash
mkcert localhost 127.0.0.1 ::1
```

Esto generará archivos como `localhost+2.pem` y `localhost+2-key.pem`. Copia los certificados a la carpeta `Backend`:

```bash
cp localhost+2.pem localhost+2-key.pem Backend/
```

### 7. Compilar Tailwind CSS

Desde la carpeta raíz del proyecto, compila los estilos de **Tailwind CSS**:

```bash
npm run build:css
```

### 8. Iniciar los servidores Frontend y Backend

El proyecto está dividido en dos partes: **Frontend** y **Backend**, que funcionan como aplicaciones separadas. Es necesario iniciar ambos servidores para que la aplicación funcione correctamente.

#### 8.1 Iniciar el servidor Backend

Desde la carpeta `Backend`, inicia el servidor:

```bash
npm start
```

El servidor Backend estará corriendo en `https://localhost:3001`.

#### 8.2 Iniciar el servidor Frontend

Para servir el frontend, utiliza **http-server**. Asegúrate de tenerlo instalado globalmente o instálalo con:

```bash
npm install -g http-server
```

Desde la carpeta raíz del proyecto (donde se encuentra el frontend), inicia el servidor Frontend:

```bash
http-server ./ -p 3000 --cors -S -C Backend/localhost+2.pem -K Backend/localhost+2-key.pem --host localhost
```

El servidor Frontend estará corriendo en `https://localhost:3000`.

### 9. Acceder a la Aplicación

Una vez que ambos servidores están en ejecución, puedes acceder a la aplicación en tu navegador: [https://localhost:3000](https://localhost:3000).

---

## Notas Adicionales

- **Tabla de Sesiones en PostgreSQL:**

  El proyecto utiliza una tabla llamada `session` en la base de datos para almacenar las sesiones de los usuarios. Asegúrate de ejecutar los comandos SQL proporcionados en el paso 4 para crear esta tabla e índice:

  ```sql
  CREATE TABLE "session" (
      "sid" VARCHAR NOT NULL COLLATE "default",
      "sess" JSON NOT NULL,
      "expire" TIMESTAMP(6) NOT NULL,
      PRIMARY KEY ("sid")
  ) WITH (OIDS=FALSE);

  CREATE INDEX "IDX_session_expire" ON "session" ("expire");
  ```

- **Certificados SSL y Problemas de Sesiones:**

  La configuración detallada en el paso 8 resuelve el problema de las sesiones que no se mantenían correctamente debido a que el navegador interpretaba el frontend y el backend como orígenes diferentes. Al utilizar el mismo dominio (`localhost`) y habilitar HTTPS con certificados SSL válidos, las cookies de sesión se comparten adecuadamente entre el frontend y el backend.

- **Archivos JavaScript en el Frontend:**

  Asegúrate de incluir los archivos JavaScript necesarios en el frontend:

  - `public/js/dashboard.js`: Maneja la carga del dashboard y muestra el nombre del usuario.
  - `public/js/login.js`: Gestiona el proceso de inicio de sesión.
  - `public/js/main.js`: Controla la redirección al login y otras funcionalidades iniciales.

- **Estructura del Proyecto:**

  Mantén la estructura de carpetas organizada, separando el frontend y el backend para facilitar el desarrollo y mantenimiento.

- **Ejecutar los Servidores:**

  Recuerda siempre iniciar primero el backend y luego el frontend para asegurar que los servicios estén disponibles cuando el frontend intente conectarse al backend.

## Contribuciones

Las contribuciones al proyecto son bienvenidas. Sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama: `git checkout -b mi-nueva-funcionalidad`.
3. Realiza tus cambios y haz un commit: `git commit -m 'Añadir nueva funcionalidad'`.
4. Sube tus cambios: `git push origin mi-nueva-funcionalidad`.
5. Abre un Pull Request para que revisemos tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.