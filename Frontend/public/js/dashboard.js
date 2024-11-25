//public/js/dashboard.js

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://localhost:3001/dashboard', {
            method: 'GET',
            credentials: 'include', // Incluye cookies para autenticación
        });
        console.log('Response:', response);

        if (response.ok) {
            try {
                const data = await response.json();
                console.log('Data:', data);
                document.getElementById('user-name').textContent = data.userName;
            } catch (jsonError) {
                console.error('Error al parsear JSON:', jsonError);
            }
        } else if (response.status === 401) {
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar el dashboard:', response.status);
        }        
    } catch (error) {
        console.error('Error durante la carga del dashboard:', error);
    }
});

// Lógica para el enlace "Cerrar sesión"
/* document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el enlace de "Cerrar sesión"
    const logoutLink = document.querySelector('.nav-link[href="#"]');

    // Verificar si el enlace está presente
    if (logoutLink) {
        logoutLink.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            try {
                const response = await fetch('https://localhost:3001/auth/logout', {
                    method: 'POST',
                    credentials: 'include', // Incluye cookies para autenticación
                });

                if (response.ok) {
                    console.log('Sesión cerrada exitosamente');
                    window.location.href = 'index.html'; // Redirige al inicio
                } else {
                    console.error('Error al cerrar sesión:', response.status);
                }
            } catch (error) {
                console.error('Error durante el cierre de sesión:', error);
            }
        });
    } else {
        console.log('El enlace de "Cerrar sesión" no está disponible en el DOM.');
    }
}); */