// public/js/register.js
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const nombre_completo = document.getElementById('nombre_completo').value.trim();
        const email = document.getElementById('email').value.trim();
        const rol = document.getElementById('rol').value;

        if (!username || !password || !nombre_completo || !email || !rol) {
            showError('Por favor, completa todos los campos.');
            return;
        }

        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Cargando...';

        try {
            const response = await fetch('https://localhost:3001/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, nombre_completo, email, rol }),
                credentials: 'include' // Incluye cookies si es necesario
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // Redirigir al login después de registrarse
                window.location.href = 'login.html';
            } else if (response.status === 409) {
                // El usuario ya existe
                const data = await response.json();
                showError(data.message);
            } else {
                const data = await response.json();
                showError('Error al registrar usuario: ' + data.message);
            }
        } catch (error) {
            console.error('Error durante el registro:', error);
            showError('Error en la conexión al servidor');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Registrar';
        }
    });
});

function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
}

document.getElementById('username').addEventListener('input', clearError);
document.getElementById('password').addEventListener('input', clearError);
document.getElementById('nombre_completo').addEventListener('input', clearError);
document.getElementById('email').addEventListener('input', clearError);
document.getElementById('rol').addEventListener('change', clearError);

function clearError() {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none';
}