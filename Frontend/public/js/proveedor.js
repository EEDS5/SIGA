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

// Función para renderizar los proveedores en el DOM
/* function renderProveedores(proveedores) {
    const container = document.getElementById('proveedores-container');
    
    if (!container) {
        console.error("Error: Contenedor 'proveedores-container' no encontrado en el DOM.");
        return; // Evita continuar si no existe el contenedor
    }

    container.innerHTML = ''; // Limpia el contenido previo

    proveedores.forEach(proveedor => {
        const div = document.createElement('div');
        div.textContent = `Nombre: ${proveedor.nombre}, ID: ${proveedor.id}`;
        container.appendChild(div);
    });
} */
// Código existente - Respetado íntegramente
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
            <td>${proveedor.id}</td>
            <td>${proveedor.nombre}</td>
            <td>${proveedor.telefono || 'N/A'}</td>
            <td>${proveedor.email || 'N/A'}</td>
            <td>${proveedor.direccion || 'N/A'}</td>
            <td>
                <button class="btn btn-warning editar-proveedor" 
                    data-id="${proveedor.id}" 
                    data-nombre="${encodeURIComponent(proveedor.nombre)}" 
                    data-telefono="${encodeURIComponent(proveedor.telefono || '')}" 
                    data-email="${encodeURIComponent(proveedor.email || '')}" 
                    data-direccion="${encodeURIComponent(proveedor.direccion || '')}" 
                    data-toggle="modal" 
                    data-target="#proveedorModal">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger eliminar-proveedor" data-id="${proveedor.id}">
                    <i class="fas fa-trash-alt"></i> Eliminar
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

// Nuevas funcionalidades - Añadido sin modificar lo existente

// Función para cargar los datos en el modal para editar
function cargarDatosProveedor(id, nombre, telefono, email, direccion) {
    document.getElementById('proveedorId').value = id; // ID oculto
    document.getElementById('nombre').value = nombre || '';
    document.getElementById('telefono').value = telefono || '';
    document.getElementById('email').value = email || '';
    document.getElementById('direccion').value = direccion || '';

    // Cambiar el título del modal
    document.getElementById('proveedorModalLabel').textContent = 'Editar Proveedor';
}

// Función para limpiar el modal al crear un nuevo proveedor
function limpiarModal() {
    document.getElementById('proveedorForm').reset(); // Resetea los campos
    document.getElementById('proveedorId').value = ''; // Limpia el ID oculto

    // Cambiar el título del modal a "Crear Proveedor"
    document.getElementById('proveedorModalLabel').textContent = 'Crear Proveedor';
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
                $('#proveedorModal').modal('hide'); // Ocultar el modal
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