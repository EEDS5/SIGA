//public/js/detalleCompra.js
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    await obtenerDetallesCompra(); // Cargar los detalles de compra
});

// Función para obtener los detalles de compra y renderizarlos
async function obtenerDetallesCompra() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:3001/detalle-compra', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Detalles de compra desde backend:', data);

            renderDetallesCompra(data); // Muestra los datos en la página
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar detalles de compra:', response.status);
        }
    } catch (error) {
        console.error('Error al obtener detalles de compra:', error);
    }
}

// Función para renderizar los detalles de compra en la tabla
function renderDetallesCompra(detalles) {
    const container = document.getElementById('detalle-compra-container'); // Contenedor del <tbody>

    if (!container) {
        console.error("Error: Contenedor 'detalle-compra-container' no encontrado en el DOM.");
        return;
    }

    container.innerHTML = ''; // Limpia el contenido previo

    detalles.forEach(detalle => {
        const row = document.createElement('tr'); // Crea una fila para cada detalle
        row.className = 'animate__animated animate__fadeInUp'; // Clase de animación

        // Crea las celdas (columnas) de la fila
        row.innerHTML = `
            <td class="py-3 px-6">${detalle.id}</td>
            <td class="py-3 px-6">${detalle.nombre_producto}</td>
            <td class="py-3 px-6">${detalle.cantidad}</td>
            <td class="py-3 px-6">${detalle.precio_compra}</td>
            <td class="py-3 px-6">${detalle.subtotal}</td>
            <td class="py-3 px-6 flex space-x-2">
                <button class="editar-detalle bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center" 
                    data-id="${detalle.id}" 
                    data-id-producto="${detalle.id_producto}" 
                    data-nro-compra="${detalle.nro_compra}" 
                    data-cantidad="${detalle.cantidad}" 
                    data-precio-compra="${detalle.precio_compra}">
                    <i class="fas fa-edit mr-1"></i> Editar
                </button>
                <button class="eliminar-detalle bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center" 
                    data-id="${detalle.id}">
                    <i class="fas fa-trash-alt mr-1"></i> Eliminar
                </button>
            </td>
        `;

        // Agrega la fila al contenedor
        container.appendChild(row);
    });

    // Añadir event listeners después de crear los elementos
    const editButtons = document.querySelectorAll('.editar-detalle');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.dataset.id;
            const idProducto = button.dataset.idProducto;
            const nroCompra = button.dataset.nroCompra;
            const cantidad = button.dataset.cantidad;
            const precioCompra = button.dataset.precioCompra;

            cargarDatosDetalle(id, idProducto, nroCompra, cantidad, precioCompra);
        });
    });

    const deleteButtons = document.querySelectorAll('.eliminar-detalle');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.dataset.id;
            eliminarDetalleCompra(id);
        });
    });
}

// Función para abrir el modal
function abrirModal() {
    const modal = document.getElementById('detalleCompraModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('detalleCompraModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// Función para cargar los datos en el modal para editar
function cargarDatosDetalle(id, idProducto, nroCompra, cantidad, precioCompra) {
    document.getElementById('detalleId').value = id;
    document.getElementById('id_producto').value = idProducto || ''; // Mostrar el ID del producto
    document.getElementById('id_nro_compra').value = nroCompra || ''; // Mostrar el ID de la compra
    document.getElementById('cantidad').value = cantidad || '';
    document.getElementById('precio_compra').value = precioCompra || '';

    // Bloquear listas desplegables para edición
    document.getElementById('id_nro_compra').disabled = true;
    document.getElementById('id_producto').disabled = true;

    document.getElementById('detalleCompraModalLabel').textContent = 'Editar Detalle de Compra';
    abrirModal();
}

// Función para limpiar el modal al crear un nuevo detalle
function limpiarModal() {
    document.getElementById('detalleCompraForm').reset();
    document.getElementById('detalleId').value = '';
    document.getElementById('detalleCompraModalLabel').textContent = 'Crear Detalle de Compra';

    // Mostrar el modal manualmente
    abrirModal();
}

// Manejo del formulario de creación/edición
document.getElementById('detalleCompraForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = document.getElementById('detalleId').value; // ID oculto
    const url = id ? `https://localhost:3001/detalle-compra/${id}` : 'https://localhost:3001/detalle-compra';
    const method = id ? 'PUT' : 'POST'; // Usamos PUT para editar y POST para crear

    const data = {
        id_nro_compra: document.getElementById('id_nro_compra').value,
        id_producto: document.getElementById('id_producto').value,
        cantidad: document.getElementById('cantidad').value,
        precio_compra: document.getElementById('precio_compra').value,
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
                text: id ? 'Detalle de compra actualizado correctamente.' : 'Detalle de compra creado correctamente.',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                cerrarModal(); // Ocultar el modal
                obtenerDetallesCompra(); // Actualizar la lista de detalles de compra
            });
        } else {
            let errorMessage = 'No se pudo guardar el detalle de compra.';
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }
    } catch (error) {
        console.error('Error al guardar el detalle de compra:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar el detalle de compra.',
        });
    }
});

// Función para eliminar un detalle de compra
async function eliminarDetalleCompra(id) {
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
                const response = await fetch(`https://localhost:3001/detalle-compra/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'Detalle de compra eliminado correctamente.',
                        showConfirmButton: false,
                        timer: 2000,
                    }).then(() => {
                        obtenerDetallesCompra(); // Actualizar la lista de detalles de compra
                    });
                } else {
                    let errorMessage = 'No se pudo eliminar el detalle de compra.';
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
                console.error('Error al eliminar el detalle de compra:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el detalle de compra.',
                });
            }
        }
    });
}