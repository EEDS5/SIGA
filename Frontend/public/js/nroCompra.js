document.addEventListener('DOMContentLoaded', function () {
    const formNuevoNroCompra = document.getElementById('formNuevoNroCompra');
    const tablaNroCompra = document.getElementById('tablaNroCompra').getElementsByTagName('tbody')[0];

    // Obtener todos los números de compra
    function obtenerNroCompra() {
        fetch('https://localhost:3001/nro-compra', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            tablaNroCompra.innerHTML = ''; // Limpiar la tabla
            data.forEach(compra => {
                let row = tablaNroCompra.insertRow();
                row.innerHTML = `
                    <td>${compra.id}</td>
                    <td>${compra.proveedor_id}</td>
                    <td>${compra.fecha_compra}</td>
                    <td>${compra.total}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editarNroCompra(${compra.id})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarNroCompra(${compra.id})">Eliminar</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error('Error al obtener números de compra:', error));
    }

    // Crear un nuevo número de compra
    formNuevoNroCompra.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const proveedor_id = document.getElementById('proveedor_id').value;
        const fecha_compra = document.getElementById('fecha_compra').value;
        const total = document.getElementById('total').value;

        fetch('https://localhost:3001/nro-compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ proveedor_id, fecha_compra, total }),
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                alert('Número de compra creado con éxito');
                obtenerNroCompra(); // Actualizar la lista
                formNuevoNroCompra.reset(); // Limpiar el formulario
            } else {
                alert('Error al crear el número de compra');
            }
        })
        .catch(error => console.error('Error al crear el número de compra:', error));
    });

    // Editar número de compra
    window.editarNroCompra = function (id) {
        fetch(`https://localhost:3001/nro-compra/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('editarProveedor').value = data.proveedor_id;
            document.getElementById('editarFecha').value = data.fecha_compra;
            document.getElementById('editarTotal').value = data.total;
            const modal = new bootstrap.Modal(document.getElementById('modalEditarNroCompra'));
            modal.show();
            
            document.getElementById('guardarCambios').onclick = function () {
                const proveedor_id = document.getElementById('editarProveedor').value;
                const fecha_compra = document.getElementById('editarFecha').value;
                const total = document.getElementById('editarTotal').value;

                fetch(`https://localhost:3001/nro-compra/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ proveedor_id, fecha_compra, total }),
                    credentials: 'include'
                })
                .then(response => {
                    if (response.ok) {
                        alert('Número de compra actualizado');
                        obtenerNroCompra(); // Actualizar la lista
                        modal.hide();
                    } else {
                        alert('Error al actualizar el número de compra');
                    }
                })
                .catch(error => console.error('Error al actualizar el número de compra:', error));
            };
        })
        .catch(error => console.error('Error al obtener el número de compra:', error));
    };

    // Eliminar número de compra
    window.eliminarNroCompra = function (id) {
        if (confirm('¿Estás seguro de que deseas eliminar este número de compra?')) {
            fetch(`https://localhost:3001/nro-compra/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    alert('Número de compra eliminado');
                    obtenerNroCompra(); // Actualizar la lista
                } else {
                    alert('Error al eliminar el número de compra');
                }
            })
            .catch(error => console.error('Error al eliminar el número de compra:', error));
        }
    };

    obtenerNroCompra(); // Cargar los números de compra al cargar la página
});
