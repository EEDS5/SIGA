document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    await obtenerTipoTrabajo(); // Cargar los tipos de trabajo
});

// Función para obtener los tipos de trabajo y renderizarlos
async function obtenerTipoTrabajo() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:3001/tipotrabajo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Tipos de trabajo desde backend:', data);
            renderTipoTrabajo(data); // Muestra los datos en la página
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar tipos de trabajo:', response.status);
        }
    } catch (error) {
        console.error('Error al obtener tipos de trabajo:', error);
    }
}

// Función para renderizar los tipos de trabajo en la tabla
function renderTipoTrabajo(tiposTrabajo) {
    const container = document.getElementById('tipotrabajo-container'); // Contenedor del <tbody>

    if (!container) {
        console.error("Error: Contenedor 'tipotrabajo-container' no encontrado en el DOM.");
        return;
    }

    container.innerHTML = ''; // Limpia el contenido previo

    tiposTrabajo.forEach(tipoTrabajo => {
        const row = document.createElement('tr'); // Crea una fila para cada tipo de trabajo
        row.className = 'animate__animated animate__fadeInUp'; // Clase de animación

        // Crea las celdas (columnas) de la fila
        row.innerHTML = 
            `<td class="py-3 px-6">${tipoTrabajo.id}</td>
             <td class="py-3 px-6">${tipoTrabajo.nombre}</td>
             <td class="py-3 px-6">${tipoTrabajo.descripcion || 'N/A'}</td>
             <td class="py-3 px-6 flex space-x-2">
                <button class="editar-tipotrabajo bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center" 
                    data-id="${tipoTrabajo.id}" 
                    data-nombre="${encodeURIComponent(tipoTrabajo.nombre)}" 
                    data-descripcion="${encodeURIComponent(tipoTrabajo.descripcion || '')}">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="eliminar-tipotrabajo bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md flex items-center" data-id="${tipoTrabajo.id}">
                    <i class="fas fa-trash-alt"></i> Eliminar
                </button>
             </td>`;

        // Añadir la fila a la tabla
        container.appendChild(row);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.editar-tipotrabajo').forEach(button => {
        button.addEventListener('click', function () {
            editarTipoTrabajo(this.dataset.id, decodeURIComponent(this.dataset.nombre), decodeURIComponent(this.dataset.descripcion));
        });
    });

    document.querySelectorAll('.eliminar-tipotrabajo').forEach(button => {
        button.addEventListener('click', function () {
            eliminarTipoTrabajo(this.dataset.id);
        });
    });
}

// Función para editar tipo de trabajo
function editarTipoTrabajo(id, nombre, descripcion) {
    document.getElementById('tipotrabajoId').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;

    document.getElementById('tipotrabajoModalLabel').textContent = 'Editar Tipo de Trabajo';
    abrirModal(); // Abre el modal para editar
}

// Función para eliminar tipo de trabajo
async function eliminarTipoTrabajo(id) {
    const token = localStorage.getItem('token');

    if (!confirm("¿Estás seguro de eliminar este tipo de trabajo?")) return;

    try {
        const response = await fetch(`https://localhost:3001/tipotrabajo/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            Swal.fire('¡Eliminado!', 'El tipo de trabajo ha sido eliminado.', 'success');
            obtenerTipoTrabajo(); // Refresca la lista de tipos de trabajo
        } else {
            Swal.fire('Error', 'Hubo un error al eliminar el tipo de trabajo.', 'error');
        }
    } catch (error) {
        console.error('Error al eliminar tipo de trabajo:', error);
    }
}

// Función para limpiar el modal
function limpiarModal() {
    document.getElementById('tipotrabajoForm').reset();
    document.getElementById('tipotrabajoModalLabel').textContent = 'Crear Tipo de Trabajo';
    document.getElementById('tipotrabajoId').value = ''; // Limpiar ID oculto
    abrirModal(); // Abre el modal para crear
}

// Función para abrir el modal
function abrirModal() {
    document.getElementById('tipotrabajoModal').classList.remove('hidden');
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('tipotrabajoModal').classList.add('hidden');
}
