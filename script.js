// Ejemplo de datos de alumnos ajustados a carrera y semestre
const alumnos = [
  { id: 1, nombre: "Juan Pérez", carrera: "Ingeniería de Sistemas", semestre: "5°", ultimoIngreso: "08/04/2024 10:00 AM" },
  { id: 2, nombre: "María López", carrera: "Arquitectura", semestre: "7°", ultimoIngreso: "08/04/2024 09:30 AM" },
  { id: 3, nombre: "Carlos Sánchez", carrera: "Medicina", semestre: "8°", ultimoIngreso: "08/04/2024 08:45 AM" }
];

// Función para llenar la tabla de alumnos con los datos ajustados
function llenarTabla() {
  const tbody = document.querySelector('#gestionAlumnos table tbody');
  alumnos.forEach(alumno => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
          <td>${alumno.id}</td>
          <td>${alumno.nombre}</td>
          <td>${alumno.carrera}</td>
          <td>${alumno.semestre}</td>
          <td>${alumno.ultimoIngreso}</td>
      `;
      tbody.appendChild(fila);
  });
}

// Llamada a la función al cargar la página
window.onload = function() {
  llenarTabla();
};

  