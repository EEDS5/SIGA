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
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token; // Extrae el token del servidor

            if (data.redirectUrl) {
                // Guarda el token en localStorage para usarlo en solicitudes protegidas
                localStorage.setItem('token', token);

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