//public/js/main.js

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
    };
}

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

async function showProfile() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:3001/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include', // Enviar credenciales
        });

        if (response.ok) {
            // Redirige a la página de perfil
            window.location.href = 'profile.html';
        } else {
            console.error('No autenticado: Redirigiendo al login.');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error al acceder al perfil:', error);
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    // Obtener referencias a los enlaces
    const dashboardLink = document.getElementById('dashboard-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');

    try {
        // Verificar autenticación usando el endpoint /dashboard
        const response = await fetch('https://localhost:3001/dashboard', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
            },
            credentials: 'include', // Enviar credenciales (cookies)
        });

        if (response.ok) {
            // Usuario autenticado: Mostrar enlaces de usuario autenticado
            dashboardLink?.classList.remove('hidden');
            profileLink?.classList.remove('hidden');
            logoutLink?.classList.remove('hidden');
            loginLink?.classList.add('hidden');
        } else {
            // Usuario no autenticado o sesión expirada
            hideAuthenticatedLinks();
        }
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
        hideAuthenticatedLinks(); // Asumir que no está autenticado
    }

    // Asignar eventos a los enlaces
    dashboardLink?.addEventListener('click', showDashboard);
    profileLink?.addEventListener('click', showProfile);
    logoutLink?.addEventListener('click', showLogout);
    loginLink?.addEventListener('click', showLogin);
});

// Función para ocultar enlaces relacionados con el usuario autenticado
function hideAuthenticatedLinks() {
    const dashboardLink = document.getElementById('dashboard-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');

    dashboardLink?.classList.add('hidden');
    profileLink?.classList.add('hidden');
    logoutLink?.classList.add('hidden');
    loginLink?.classList.remove('hidden');
}

// Función para cargar datos del perfil
async function loadUserProfile() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:3001/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (response.ok) {
            const user = await response.json();
            console.log('Perfil del usuario:', user);

            // Actualizar la información en el encabezado del perfil
            document.getElementById('profile-name').textContent = user.nombre_completo || user.username;
            document.getElementById('profile-email').textContent = user.email || 'Sin información';
            document.getElementById('profile-role').textContent = user.rol || 'Sin rol';

            // Actualizar la información en la sección de detalles
            document.getElementById('profile-fullname').textContent = user.nombre_completo || 'Sin información';
            document.getElementById('profile-username').textContent = user.username;
            document.getElementById('profile-email-detail').textContent = user.email || 'Sin información';
            document.getElementById('profile-role-detail').textContent = user.rol || 'Sin rol';
            document.getElementById('profile-created-at').textContent = new Date(user.creado_en).toLocaleString();

        } else if (response.status === 404) {
            Swal.fire('Usuario no encontrado', 'Por favor, verifica tus datos.', 'warning');
        } else {
            Swal.fire('Error', 'No se pudo cargar el perfil.', 'error');
        }
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
        Swal.fire('Error', 'Hubo un problema al cargar el perfil.', 'error');
    }
}

// Función para inicializar la navegación y manejar autenticación
async function initializeNavigation() {
    const token = localStorage.getItem('token');

    // Obtener referencias a los enlaces
    const dashboardLink = document.getElementById('dashboard-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');

    try {
        // Verificar autenticación usando el endpoint /dashboard (o cualquier otro endpoint seguro)
        const response = await fetch('https://localhost:3001/dashboard', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (response.ok) {
            // Usuario autenticado: Mostrar enlaces de usuario autenticado
            dashboardLink?.classList.remove('hidden');
            profileLink?.classList.remove('hidden');
            logoutLink?.classList.remove('hidden');
            loginLink?.classList.add('hidden');
        } else {
            // Usuario no autenticado o sesión expirada
            hideAuthenticatedLinks();
        }
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
        hideAuthenticatedLinks(); // Asumir que no está autenticado
    }

    // Asignar eventos a los enlaces
    dashboardLink?.addEventListener('click', showDashboard);
    profileLink?.addEventListener('click', showProfile);
    logoutLink?.addEventListener('click', showLogout);
    loginLink?.addEventListener('click', showLogin);
}

// Función para ocultar enlaces relacionados con el usuario autenticado
function hideAuthenticatedLinks() {
    const dashboardLink = document.getElementById('dashboard-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');

    dashboardLink?.classList.add('hidden');
    profileLink?.classList.add('hidden');
    logoutLink?.classList.add('hidden');
    loginLink?.classList.remove('hidden');
}

// Evento que se ejecuta al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    if (currentPath.endsWith('profile.html')) {
        loadUserProfile();
    }

    // Inicializar navegación
    initializeNavigation();

    // Puedes agregar más condiciones para otras páginas
    if (currentPath.endsWith('proveedor.html')) {
        // Llamar a funciones específicas para proveedor.html
    }
});

// Exportar al ámbito global si es necesario
window.showProveedores = showProveedores;
window.showLogout = showLogout;
window.showDashboard = showDashboard;
window.showProfile = showProfile;