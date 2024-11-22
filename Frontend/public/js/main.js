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