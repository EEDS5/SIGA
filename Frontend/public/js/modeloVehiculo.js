document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    await obtenerModelos(); // Cargar los modelos
});

// Función para obtener los modelos y renderizarlos
async function obtenerModelos() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/modelos-vehiculos', { // Modificado para tu ruta de modelos de vehículos
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Modelos desde backend:', data);

            renderModelos(data); // Muestra los datos en la página
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar modelos:', response.status);
        }
    } catch (error) {
        console.error('Error al obtener modelos:', error);
    }
}

// Función para renderizar los modelos en la tabla
function renderModelos(modelos) {
    const container = document.getElementById('modelos-container'); // Contenedor del <tbody>

    if (!container) {
        console.error("Error: Contenedor 'modelos-container' no encontrado en el DOM.");
        return;
    }

    container.innerHTML = ''; // Limpia el contenedor

    modelos.forEach((modelo) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="py-3 px-6 text-left">${modelo.id}</td>
            <td class="py-3 px-6 text-left">${modelo.nombre}</td>
            <td class="py-3 px-6 text-left">${modelo.descripcion}</td>
            <td class="py-3 px-6 text-left">${modelo.marca}</td>
            <td class="py-3 px-6 text-left">
                <button class="text-blue-500 hover:text-blue-700" onclick="editarModelo(${modelo.id})">
                    <i class="fas fa-pencil-alt"></i> Editar
                </button>
                <button class="text-red-500 hover:text-red-700" onclick="eliminarModelo(${modelo.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </td>
        `;

        container.appendChild(row);
    });
}

// Función para editar modelo
function editarModelo(id) {
    // Lógica para cargar los datos del modelo y abrir el modal
}

// Función para eliminar modelo
function eliminarModelo(id) {
    // Lógica para eliminar el modelo
}

// Función para mostrar el modal
function limpiarModal() {
    document.getElementById('modeloModal').classList.remove('hidden');
    document.getElementById('modeloForm').reset(); // Limpia el formulario
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modeloModal').classList.add('hidden');
}
