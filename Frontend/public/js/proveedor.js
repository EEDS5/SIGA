// public/js/proveedor.js

/* document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    try {
        const response = await fetch('https://localhost:3001/proveedores', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Proveedores:', data);
            // Aquí puedes mostrar los datos en la página
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar proveedores:', response.status);
        }
    } catch (error) {
        console.error('Error en proveedor.js:', error);
    }
}); */

/* document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    try {
        // Intenta obtener los datos de proveedores desde localStorage
        let proveedores = localStorage.getItem('proveedores');

        if (proveedores) {
            console.log('Proveedores desde localStorage:', JSON.parse(proveedores));
            renderProveedores(JSON.parse(proveedores)); // Muestra los datos en la página
        } else {
            // Si no hay datos en localStorage, realiza una nueva solicitud al backend
            const response = await fetch('https://localhost:3001/proveedores', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Proveedores desde backend:', data);

                // Guarda los datos en localStorage para futuras visitas
                localStorage.setItem('proveedores', JSON.stringify(data));

                renderProveedores(data); // Muestra los datos en la página
            } else if (response.status === 401) {
                console.error('No autenticado');
                window.location.href = 'login.html';
            } else {
                console.error('Error al cargar proveedores:', response.status);
            }
        }
    } catch (error) {
        console.error('Error en proveedor.js:', error);
    }
}); */

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    await obtenerProveedores(); // Cargar los proveedores
});

// Función para obtener los proveedores y renderizarlos
async function obtenerProveedores() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:3001/proveedores', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Proveedores desde backend:', data);

            renderProveedores(data); // Muestra los datos en la página
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar proveedores:', response.status);
        }
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
    }
}

// Función para renderizar los proveedores en la tabla
function renderProveedores(proveedores) {
    const container = document.getElementById('proveedores-container'); // Contenedor del <tbody>

    if (!container) {
        console.error("Error: Contenedor 'proveedores-container' no encontrado en el DOM.");
        return;
    }

    container.innerHTML = ''; // Limpia el contenido previo

    proveedores.forEach(proveedor => {
        const row = document.createElement('tr'); // Crea una fila para cada proveedor
        row.className = 'animate__animated animate__fadeInUp'; // Clase de animación

        // Crea las celdas (columnas) de la fila
        row.innerHTML = `
            <td class="py-3 px-6">${proveedor.id}</td>
            <td class="py-3 px-6">${proveedor.nombre}</td>
            <td class="py-3 px-6">${proveedor.telefono || 'N/A'}</td>
            <td class="py-3 px-6">${proveedor.email || 'N/A'}</td>
            <td class="py-3 px-6">${proveedor.direccion || 'N/A'}</td>
            <td class="py-3 px-6 flex space-x-2">
                <button class="editar-proveedor bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center" 
                    data-id="${proveedor.id}" 
                    data-nombre="${encodeURIComponent(proveedor.nombre)}" 
                    data-telefono="${encodeURIComponent(proveedor.telefono || '')}" 
                    data-email="${encodeURIComponent(proveedor.email || '')}" 
                    data-direccion="${encodeURIComponent(proveedor.direccion || '')}">
                    <i class="fas fa-edit mr-1"></i> Editar
                </button>
                <button class="eliminar-proveedor bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center" data-id="${proveedor.id}">
                    <i class="fas fa-trash-alt mr-1"></i> Eliminar
                </button>
            </td>
        `;

        // Agrega la fila al contenedor
        container.appendChild(row);
    });

    // Añadir event listeners después de crear los elementos
    // Para los botones de editar
    const editButtons = document.querySelectorAll('.editar-proveedor');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.dataset.id;
            const nombre = decodeURIComponent(button.dataset.nombre);
            const telefono = decodeURIComponent(button.dataset.telefono);
            const email = decodeURIComponent(button.dataset.email);
            const direccion = decodeURIComponent(button.dataset.direccion);

            cargarDatosProveedor(id, nombre, telefono, email, direccion);
        });
    });

    // Para los botones de eliminar
    const deleteButtons = document.querySelectorAll('.eliminar-proveedor');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.dataset.id;
            eliminarProveedor(id);
        });
    });
}

// Función para abrir el modal
function abrirModal() {
    const modal = document.getElementById('proveedorModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('proveedorModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// Función para cargar los datos en el modal para editar
function cargarDatosProveedor(id, nombre, telefono, email, direccion) {
    document.getElementById('proveedorId').value = id;
    document.getElementById('nombre').value = nombre || '';
    document.getElementById('telefono').value = telefono || '';
    document.getElementById('email').value = email || '';
    document.getElementById('direccion').value = direccion || '';
    document.getElementById('proveedorModalLabel').textContent = 'Editar Proveedor';

    // Mostrar el modal manualmente
    abrirModal();
}

// Función para limpiar el modal al crear un nuevo proveedor
function limpiarModal() {
    document.getElementById('proveedorForm').reset();
    document.getElementById('proveedorId').value = '';
    document.getElementById('proveedorModalLabel').textContent = 'Crear Proveedor';

    // Mostrar el modal manualmente
    abrirModal();
}

// Manejo del formulario de creación/edición
document.getElementById('proveedorForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = document.getElementById('proveedorId').value; // ID oculto
    const url = id ? `https://localhost:3001/proveedores/${id}/editar` : 'https://localhost:3001/proveedores';
    const method = 'POST'; // Usamos POST para crear y editar, según las rutas del backend

    const data = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
    };

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: id ? 'Proveedor actualizado correctamente.' : 'Proveedor creado correctamente.',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                cerrarModal(); // Ocultar el modal
                obtenerProveedores(); // Actualizar la lista de proveedores
            });
        } else {
            let errorMessage = 'No se pudo guardar el proveedor.';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (jsonError) {
                const errorText = await response.text();
                errorMessage = errorText || errorMessage;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }
    } catch (error) {
        console.error('Error al guardar el proveedor:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar el proveedor.',
        });
    }
});

// Función para eliminar un proveedor
async function eliminarProveedor(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://localhost:3001/proveedores/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'Proveedor eliminado correctamente.',
                        showConfirmButton: false,
                        timer: 2000,
                    }).then(() => {
                        obtenerProveedores(); // Actualizar la lista de proveedores
                    });
                } else {
                    let errorMessage = 'No se pudo eliminar el proveedor.';
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch (jsonError) {
                        const errorText = await response.text();
                        errorMessage = errorText || errorMessage;
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: errorMessage,
                    });
                }
            } catch (error) {
                console.error('Error al eliminar el proveedor:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el proveedor.',
                });
            }
        }
    });
}