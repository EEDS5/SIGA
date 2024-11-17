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