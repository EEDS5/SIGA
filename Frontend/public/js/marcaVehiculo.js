document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#marcaVehiculoTable tbody");
    const form = document.querySelector("#marcaVehiculoForm");
    const nombreInput = document.querySelector("#nombreMarca");
  
    const fetchMarcas = async () => {
      try {
        const response = await fetch("/api/marcaVehiculo");
        const data = await response.json();
        tableBody.innerHTML = ""; // Limpiar la tabla
        data.forEach((marca) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${marca.id}</td>
            <td>${marca.nombre}</td>
            <td>
              <button data-id="${marca.id}" class="delete-btn">Eliminar</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };
  
    const addMarca = async (nombre) => {
      try {
        const response = await fetch("/api/marcaVehiculo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre }),
        });
        if (response.ok) {
          fetchMarcas(); // Actualizar la tabla
          form.reset(); // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error al agregar la marca:", error);
      }
    };
  
    const deleteMarca = async (id) => {
      try {
        const response = await fetch(`/api/marcaVehiculo/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchMarcas(); // Actualizar la tabla
        }
      } catch (error) {
        console.error("Error al eliminar la marca:", error);
      }
    };
  
    // Eventos
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = nombreInput.value.trim();
      if (nombre) {
        addMarca(nombre);
      }
    });
  
    tableBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        deleteMarca(id);
      }
    });
  
    // Inicialización
    fetchMarcas();
  });
  