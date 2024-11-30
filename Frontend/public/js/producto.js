document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró un token');
        window.location.href = 'login.html'; // Redirige al login si no hay token
        return;
    }

    await obtenerProductos(); // Cargar los productos
});

// Función para obtener los productos y renderizarlos
async function obtenerProductos() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:3001/productos', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Productos desde backend:', data);

            renderProductos(data); // Muestra los datos en la página
        } else if (response.status === 401) {
            console.error('No autenticado');
            window.location.href = 'login.html';
        } else {
            console.error('Error al cargar productos:', response.status);
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// Función para renderizar los productos en la tabla
function renderProductos(productos) {
    const container = document.getElementById('productos-container'); // Contenedor del <tbody>

    if (!container) {
        console.error("Error: Contenedor 'productos-container' no encontrado en el DOM.");
        return;
    }

    container.innerHTML = ''; // Limpia el contenido previo

    productos.forEach(producto => {
        const row = document.createElement('tr'); // Crea una fila para cada producto
        row.className = 'animate__animated animate__fadeInUp'; // Clase de animación

        // Crea las celdas (columnas) de la fila
        row.innerHTML = `
            <td class="py-3 px-6">${producto.id}</td>
            <td class="py-3 px-6">${producto.nombre}</td>
            <td class="py-3 px-6">${producto.categoria || 'N/A'}</td>
            <td class="py-3 px-6">${producto.precio || 'N/A'}</td>
            <td class="py-3 px-6">${producto.stock || 'N/A'}</td>
            <td class="py-3 px-6 flex space-x-2">
                <button class="editar-producto bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center" 
                    data-id="${producto.id}" 
                    data-nombre="${encodeURIComponent(producto.nombre)}" 
                    data-categoria="${encodeURIComponent(producto.categoria || '')}" 
                    data-precio="${encodeURIComponent(producto.precio || '')}" 
                    data-stock="${encodeURIComponent(producto.stock || '')}">
                    <i class="fas fa-edit mr-1"></i> Editar
                </button>
                <button class="eliminar-producto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center" data-id="${producto.id}">
                    <i class="fas fa-trash-alt mr-1"></i> Eliminar
                </button>
            </td>
        `;

        // Agrega la fila al contenedor
        container.appendChild(row);
    });

    // Añadir event listeners después de crear los elementos
    // Para los botones de editar
    const editButtons = document.querySelectorAll('.editar-producto');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.dataset.id;
            const nombre = decodeURIComponent(button.dataset.nombre);
            const categoria = decodeURIComponent(button.dataset.categoria);
            const precio = decodeURIComponent(button.dataset.precio);
            const stock = decodeURIComponent(button.dataset.stock);

            cargarDatosProducto(id, nombre, categoria, precio, stock);
        });
    });

    // Para los botones de eliminar
    const deleteButtons = document.querySelectorAll('.eliminar-producto');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.dataset.id;
            eliminarProducto(id);
        });
    });
}

// Función para abrir el modal
function abrirModal() {
    const modal = document.getElementById('productoModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('productoModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// Función para cargar los datos en el modal para editar
function cargarDatosProducto(id, nombre, categoria, precio, stock) {
    document.getElementById('productoId').value = id;
    document.getElementById('nombre').value = nombre || '';
    document.getElementById('categoria').value = categoria || '';
    document.getElementById('precio').value = precio || '';
    document.getElementById('stock').value = stock || '';
    document.getElementById('productoModalLabel').textContent = 'Editar Producto';

    // Mostrar el modal manualmente
    abrirModal();
}

// Función para limpiar el modal al crear un nuevo producto
function limpiarModal() {
    document.getElementById('productoForm').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('productoModalLabel').textContent = 'Crear Producto';

    // Mostrar el modal manualmente
    abrirModal();
}

// Manejo del formulario de creación/edición
document.getElementById('productoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = document.getElementById('productoId').value; // ID oculto
    const url = id ? `https://localhost:3001/productos/${id}/editar` : 'https://localhost:3001/productos';
    const method = 'POST'; // Usamos POST para crear y editar, según las rutas del backend

    const data = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value,
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
                text: id ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                cerrarModal(); // Ocultar el modal
                obtenerProductos(); // Actualizar la lista de productos
            });
        } else {
            let errorMessage = 'No se pudo guardar el producto.';
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
        console.error('Error al guardar el producto:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar el producto.',
        });
    }
});

// Función para eliminar un producto
async function eliminarProducto(id) {
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
                const response = await fetch(`https://localhost:3001/productos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'Producto eliminado correctamente.',
                        showConfirmButton: false,
                        timer: 2000,
                    }).then(() => {
                        obtenerProductos(); // Actualizar la lista de productos
                    });
                } else {
                    let errorMessage = 'No se pudo eliminar el producto.';
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
                console.error('Error al eliminar el producto:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el producto.',
                });
            }
        }
    });
}
