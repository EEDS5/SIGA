document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    await obtenerOrdenesTrabajo(); // Cargar las órdenes de trabajo
    await obtenerVehiculos(); // Cargar los vehículos disponibles para el select
});

// Función para obtener las órdenes de trabajo y renderizarlas
async function obtenerOrdenesTrabajo() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:3001/ordenes-trabajo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const ordenesTrabajo = await response.json();
            mostrarOrdenesTrabajo(ordenesTrabajo);
        } else {
            Swal.fire('Error', 'No se pudieron cargar las órdenes de trabajo.', 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'Hubo un problema al obtener las órdenes de trabajo.', 'error');
    }
}

// Función para mostrar las órdenes de trabajo en la tabla
function mostrarOrdenesTrabajo(ordenesTrabajo) {
    const container = document.getElementById('ordenesTrabajo-container');
    container.innerHTML = '';

    ordenesTrabajo.forEach(ordenTrabajo => {
        const row = document.createElement('tr');
        row.classList.add('border-b');

        row.innerHTML = `
            <td class="py-3 px-6">${ordenTrabajo.id}</td>
            <td class="py-3 px-6">${ordenTrabajo.id_vehiculo}</td>
            <td class="py-3 px-6">${ordenTrabajo.fecha_recepcion}</td>
            <td class="py-3 px-6">${ordenTrabajo.fecha_entrega || 'N/A'}</td>
            <td class="py-3 px-6">${ordenTrabajo.costo_total}</td>
            <td class="py-3 px-6 text-center">
                <button class="text-blue-600 hover:text-blue-800" onclick="editarOrdenTrabajo(${ordenTrabajo.id})"><i class="fas fa-edit"></i></button>
                <button class="text-red-600 hover:text-red-800" onclick="eliminarOrdenTrabajo(${ordenTrabajo.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;

        container.appendChild(row);
    });
}

// Función para obtener los vehículos y llenar el select
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
            const vehiculos = await response.json();
            const vehiculoSelect = document.getElementById('id_vehiculo');
            vehiculos.forEach(vehiculo => {
                const option = document.createElement('option');
                option.value = vehiculo.id;
                option.textContent = `Vehículo ${vehiculo.id}`;
                vehiculoSelect.appendChild(option);
            });
        } else {
            Swal.fire('Error', 'No se pudieron cargar los vehículos.', 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'Hubo un problema al obtener los vehículos.', 'error');
    }
}
