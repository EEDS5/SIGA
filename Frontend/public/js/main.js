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

// Exportar al ámbito global si es necesario
window.showProveedores = showProveedores;
window.showLogout = showLogout;