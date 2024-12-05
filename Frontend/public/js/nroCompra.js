document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    await obtenerNroCompra(); // Cargar los números de compra
});

// Función para obtener los números de compra y renderizarlos
async function obtenerNroCompra() {
    const token = localStorage.getItem('token');
    const tablaNroCompra = document.getElementById('nro-compra-container'); // Contenedor del tbody

    if (!tablaNroCompra) {
        console.error("Error: Contenedor 'nro-compra-container' no encontrado en el DOM.");
        return;
    }

    try {
        const response = await fetch('https://localhost:3001/nro-compra', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new TypeError('La respuesta no es un arreglo');
            }

            tablaNroCompra.innerHTML = ''; // Limpiar la tabla
            data.forEach(compra => {
                const row = document.createElement('tr');
                row.classList.add('hover:bg-gray-100');

                // Convertir la fecha al formato YYYY-MM-DD
                const fechaCompra = new Date(compra.fecha_compra).toISOString().split('T')[0];

                row.innerHTML = `
                    <td class="py-3 px-6">${compra.id}</td>
                    <td class="py-3 px-6">${compra.id_proveedor}</td>
                    <td class="py-3 px-6">${fechaCompra}</td>
                    <td class="py-3 px-6">${compra.total}</td>
                    <td class="py-3 px-6 flex space-x-2">
                        <button class="editar-compra bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                            onclick="editarNroCompra(${compra.id})">
                            <i class="fas fa-edit mr-1"></i> Editar
                        </button>
                        <button class="eliminar-compra bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                            onclick="eliminarNroCompra(${compra.id})">
                            <i class="fas fa-trash-alt mr-1"></i> Eliminar
                        </button>
                    </td>
                `;
                tablaNroCompra.appendChild(row);
            });
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener números de compra');
        }
    } catch (error) {
        console.error('Error al obtener números de compra:', error);
    }
}

// Función para abrir el modal
function abrirModal() {
    const modalElement = document.getElementById('nroCompraModal');
    modalElement.classList.remove('hidden');
}

// Función para cerrar el modal
function cerrarModal() {
    const modalElement = document.getElementById('nroCompraModal');
    modalElement.classList.add('hidden');
}

// Función para limpiar el modal antes de crear un nuevo número de compra
function limpiarModal() {
    const formNuevoNroCompra = document.getElementById('formNuevoNroCompra'); // Formulario
    if (formNuevoNroCompra) {
        formNuevoNroCompra.reset();
    }
    document.getElementById('nroCompraId').value = '';
    document.getElementById('nroCompraModalLabel').textContent = 'Crear Número de Compra';
    abrirModal();
}

// Manejo del formulario de creación/edición
document.getElementById('formNuevoNroCompra').addEventListener('submit', async function (event) {
    event.preventDefault();

    const proveedor_id = document.getElementById('proveedor_id').value;
    const fecha_compra = document.getElementById('fecha_compra').value;
    const total = document.getElementById('total').value;
    const id = document.getElementById('nroCompraId').value; // Obtener el ID si existe

    const url = id ? `https://localhost:3001/nro-compra/${id}` : 'https://localhost:3001/nro-compra';
    const method = id ? 'PUT' : 'POST';

    const data = { 
        id_proveedor: parseInt(proveedor_id, 10), 
        fecha_compra, 
        total: parseFloat(total) 
    };

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: id ? 'Número de compra actualizado correctamente.' : 'Número de compra creado correctamente.',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                cerrarModal();
                obtenerNroCompra();
            });
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al guardar el número de compra');
        }
    } catch (error) {
        console.error('Error al guardar el número de compra:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        });
    }
});

// Función para editar un número de compra
function editarNroCompra(id) {
    fetch(`https://localhost:3001/nro-compra/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            if (!data) throw new Error('Número de compra no encontrado');

            document.getElementById('proveedor_id').value = data.id_proveedor;
            // Convertir la fecha al formato YYYY-MM-DD para el campo tipo 'date'
            document.getElementById('fecha_compra').value = new Date(data.fecha_compra).toISOString().split('T')[0];
            document.getElementById('total').value = data.total;
            document.getElementById('nroCompraId').value = data.id;

            document.getElementById('nroCompraModalLabel').textContent = 'Editar Número de Compra';
            abrirModal();
        })
        .catch(error => console.error('Error al obtener el número de compra:', error));
}

// Función para eliminar un número de compra
function eliminarNroCompra(id) {
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
                const response = await fetch(`https://localhost:3001/nro-compra/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'Número de compra eliminado correctamente.',
                        showConfirmButton: false,
                        timer: 2000,
                    }).then(() => obtenerNroCompra());
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al eliminar el número de compra');
                }
            } catch (error) {
                console.error('Error al eliminar el número de compra:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
            }
        }
    });
}