document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html';
        return;
    }

    await obtenerVehiculos();
});

async function obtenerVehiculos() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:3001/vehiculos', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            renderVehiculos(data);
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar vehículos:', response.status);
        }
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
    }
}

function renderVehiculos(vehiculos) {
    const container = document.getElementById('vehiculos-container');

    if (!container) {
        console.error("Error: Contenedor 'vehiculos-container' no encontrado.");
        return;
    }

    container.innerHTML = '';
    vehiculos.forEach(vehiculo => {
        const row = document.createElement('tr');
        row.className = 'animate__fadeInUp';
        row.innerHTML = `
            <td>${vehiculo.id}</td>
            <td>${vehiculo.placa}</td>
            <td>${vehiculo.color}</td>
            <td>${vehiculo.marca}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.propietario}</td>
            <td>
                <button class="editar-vehiculo" data-id="${vehiculo.id}">Editar</button>
                <button class="eliminar-vehiculo" data-id="${vehiculo.id}">Eliminar</button>
            </td>
        `;
        container.appendChild(row);
    });
}
