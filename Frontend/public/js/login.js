//public/js/login.js
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        showError('Por favor, completa todos los campos.');
        return;
    }

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Cargando...';

    try {
        const response = await fetch('https://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include' // Enviar cookies
        });

        if (response.ok) {
            const data = await response.json();
            if (data.redirectUrl) {
                alert(data.message);
                window.location.href = data.redirectUrl;
            } else {
                showError('Redirección no válida. Contacta al soporte.');
            }
        } else {
            const errorData = await response.json();
            showError(errorData.message);
        }
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        showError('Error al intentar iniciar sesión. Por favor, intenta nuevamente.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Iniciar sesión';
    }
});

function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
}

document.getElementById('username').addEventListener('input', clearError);
document.getElementById('password').addEventListener('input', clearError);

function clearError() {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none';
}