//public/js/main.js
async function showLogin() {
    try {
        const response = await fetch('https://localhost:3001/auth/login');
        if (response.ok) {
            // Lógica para redirigir al usuario
            window.location.href = 'login.html'; // Página de login en el frontend
        } else {
            console.error('Error al cargar el formulario de login:', response.status);
        }
    } catch (error) {
        console.error('Error al intentar acceder al login:', error);
    }
}

async function showRegister() {
    try {
        const response = await fetch('https://localhost:3001/auth/register');
        if (response.ok) {
            // Lógica para redirigir al usuario
            window.location.href = 'register.html'; // Página de registro en el frontend
        } else {
            console.error('Error al cargar el formulario de registro:', response.status);
        }
    } catch (error) {
        console.error('Error al intentar acceder al registro:', error);
    }
}

/* // Función para gestionar proveedores
async function showProveedores() {
    try {
        const response = await fetch('https://localhost:3001/proveedores', {
            method: 'GET',
            credentials: 'include', // Esto asegura que las cookies se envíen
        });

        if (response.ok) {
            // Redirige solo después de una respuesta exitosa
            window.location.href = 'proveedor.html';
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html'; // Redirige al login si no está autenticado
        } else {
            console.error('Error al cargar proveedores:', response.status);
        }
    } catch (error) {
        console.error('Error en showProveedores:', error);
    }
} */


// Función para gestionar proveedores
// public/js/main.js

/* async function showProveedores() {
    const token = localStorage.getItem('token'); // Recupera el token almacenado

    console.log('Token obtenido de localStorage:', token); // Depuración

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    try {
        const response = await fetch('https://localhost:3001/proveedores', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
            },
            // No es necesario 'credentials: include' si usas tokens
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Proveedores:', data);
            // Almacena los datos si es necesario
            window.location.href = 'proveedor.html'; // Redirige a la página de proveedores
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar proveedores:', response.status);
        }
    } catch (error) {
        console.error('Error en showProveedores:', error);
    }
} */

async function showProveedores() {
    const token = localStorage.getItem('token'); // Recupera el token almacenado

    console.log('Token obtenido de localStorage:', token); // Depuración

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    try {
        const response = await fetch('https://localhost:3001/proveedores', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Proveedores:', data);
            // Almacenar los datos en localStorage o sessionStorage si los necesitas en proveedor.html
            localStorage.setItem('proveedores', JSON.stringify(data));
            window.location.href = 'proveedor.html'; // Redirige a la página de proveedores
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar proveedores:', response.status);
        }
    } catch (error) {
        console.error('Error en showProveedores:', error);
    }
}

    // Función para mostrar detalles de compra
async function showDetalleCompra() {
    const token = localStorage.getItem('token'); // Recupera el token almacenado

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    try {
        const response = await fetch('https://localhost:3001/detalle-compra', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Detalles de compra:', data);
            localStorage.setItem('detalleCompra', JSON.stringify(data));
            window.location.href = 'detalleCompra.html'; // Redirige a la página de detalle compra
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar detalles de compra:', response.status);
        }
    } catch (error) {
        console.error('Error en showDetalleCompra:', error);
    }
}


    //nrocompra
    async function showNroCompra() {
        const token = localStorage.getItem('token'); // Recupera el token almacenado
    
        console.log('Token obtenido de localStorage:', token); // Depuración
    
        if (!token) {
            console.error('No se encontró un token');
            window.location.href = 'login.html'; // Redirige al login si no hay token
            return;
        }
    
        try {
            const response = await fetch('https://localhost:3001/nro-compra', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Números de compra:', data);
                // Almacenar los datos en localStorage o sessionStorage si los necesitas en nroCompra.html
                localStorage.setItem('nroCompra', JSON.stringify(data));
                window.location.href = 'nroCompra.html'; // Redirige a la página de números de compra
            } else if (response.status === 401) {
                console.error('No autenticado');
                window.location.href = 'login.html';
            } else {
                console.error('Error al cargar números de compra:', response.status);
            }
        } catch (error) {
            console.error('Error en showNroCompra:', error);
        }
    }
    // Función para gestionar productos
async function showProductos() {
    const token = localStorage.getItem('token'); // Recupera el token almacenado

    console.log('Token obtenido de localStorage:', token); // Depuración

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    try {
        const response = await fetch('https://localhost:3001/productos', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Productos:', data);
            // Almacenar los productos en localStorage o sessionStorage si los necesitas en producto.html
            localStorage.setItem('productos', JSON.stringify(data));
            window.location.href = 'producto.html'; // Redirige a la página de productos
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar productos:', response.status);
        }
    } catch (error) {
        console.error('Error en showProductos:', error);
    }
}

// Función para cerrar sesión
async function showLogout() {
    try {
        const response = await fetch('https://localhost:3001/auth/logout', {
            method: 'POST',
            credentials: 'include', // Incluye cookies para autenticación
        });

        if (response.ok) {
            console.log('Sesión cerrada exitosamente');
            // Eliminar el token JWT de localStorage
            localStorage.removeItem('token');
            // Redirigir al usuario a la página de inicio de sesión o principal
            window.location.href = 'index.html';
        } else {
            console.error('Error al cerrar sesión:', response.status);
        }
    } catch (error) {
        console.error('Error al intentar cerrar sesión:', error);
    }
}

// Lógica para el enlace "Cerrar sesión"
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el enlace de "Cerrar sesión"
    const logoutLink = document.querySelector('.logout-link');

    // Verificar si el enlace está presente
    if (logoutLink) {
        logoutLink.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            await showLogout(); // Llamar a la función para cerrar sesión
        });
    } else {
        console.log('El enlace de "Cerrar sesión" no está disponible en el DOM.');
    }
});

// Función para redirigir al Dashboard
async function showDashboard() {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    if (!token) {
        console.error('No se encontró un token. Redirigiendo al login.');
        window.location.href = 'login.html'; // Redirigir al login si no hay token
        return;
    }

    try {
        const response = await fetch('https://localhost:3001/dashboard', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
            },
            credentials: 'include', // Asegura que se envíen cookies y credenciales de sesión
        });

        if (response.ok) {
            window.location.href = 'dashboard.html'; // Página del Dashboard
        } else {
            console.error('Error al redirigir al Dashboard:', response.status);
            if (response.status === 401) {
                console.error('Token o sesión no válidos. Redirigiendo al login.');
                window.location.href = 'login.html'; // Redirigir al login si no está autorizado
            }
        }
    } catch (error) {
        console.error('Error al intentar acceder al Dashboard:', error);
    }
}

// Exportar al ámbito global si es necesario
window.showProveedores = showProveedores;
<<<<<<< HEAD
window.showLogout = showLogout;
window.showDashboard = showDashboard;
=======
window.showDetalleCompra = showDetalleCompra;
window.showLogout = showLogout;
// Exportar al ámbito global si es necesario
window.showProductos = showProductos;
>>>>>>> c4eba7e (tblCompraProducto)
