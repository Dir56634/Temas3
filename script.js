// Ejemplo de datos de alumnos
const alumnos = [
  { id: 1, nombre: "Juan Pérez", carrera: "Ingeniería de Sistemas", semestre: "5°", ultimoIngreso: "08/04/2024 10:00 AM" },
  { id: 2, nombre: "María López", carrera: "Arquitectura", semestre: "7°", ultimoIngreso: "08/04/2024 09:30 AM" },
  { id: 3, nombre: "Carlos Sánchez", carrera: "Medicina", semestre: "8°", ultimoIngreso: "08/04/2024 08:45 AM" },
  { id: 4, nombre: "Luisa Martínez", carrera: "Derecho", semestre: "6°", ultimoIngreso: "07/04/2024 11:30 AM" },
  { id: 5, nombre: "Elena Nito", carrera: "Ingeniería Industrial", semestre: "4°", ultimoIngreso: "07/04/2024 08:20 AM" },
  { id: 6, nombre: "Marco Andino", carrera: "Ingeniería Electrónica", semestre: "9°", ultimoIngreso: "06/04/2024 10:15 AM" },
  { id: 7, nombre: "Diana Salazar", carrera: "Biología", semestre: "3°", ultimoIngreso: "06/04/2024 09:00 AM" },
  { id: 8, nombre: "Oscar Díaz", carrera: "Matemáticas", semestre: "5°", ultimoIngreso: "05/04/2024 12:00 PM" },
  { id: 9, nombre: "Patricia Mora", carrera: "Física", semestre: "7°", ultimoIngreso: "05/04/2024 08:50 AM" },
  { id: 10, nombre: "Roberto Gómez", carrera: "Química", semestre: "8°", ultimoIngreso: "04/04/2024 10:30 AM" },
  { id: 11, nombre: "Sofía Castro", carrera: "Historia", semestre: "1°", ultimoIngreso: "04/04/2024 11:45 AM" },
  { id: 12, nombre: "Miguel Ángel Torres", carrera: "Filosofía", semestre: "2°", ultimoIngreso: "03/04/2024 09:30 AM" },
];

// Función para llenar la tabla de alumnos
function llenarTabla(alumnosFiltrados = alumnos) {
  const tbody = document.querySelector('#gestionAlumnos table tbody');
  tbody.innerHTML = ''; // Limpiar la tabla antes de volver a llenarla
  alumnosFiltrados.forEach(alumno => {
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

function calcularEstadisticas() {
  // Convertir las horas de ingreso a minutos desde la medianoche para facilitar el cálculo
  const ingresosEnMinutos = alumnos.map(alumno => {
    const [fecha, hora] = alumno.ultimoIngreso.split(' ');
    const [horas, minutos] = hora.split(':').map(num => parseInt(num, 10));
    const [dia, mes, año] = fecha.split('/').map(num => parseInt(num, 10));
    return new Date(año, mes - 1, dia, horas, minutos).getTime();
  });

  const horaMayorIngreso = Math.max(...ingresosEnMinutos);
  const horaMenorIngreso = Math.min(...ingresosEnMinutos);

  // Calculando la carrera que más uso hace de la biblioteca
  const cuentaCarreras = alumnos.reduce((acc, { carrera }) => {
    acc[carrera] = (acc[carrera] || 0) + 1;
    return acc;
  }, {});

  const carreraMasUsada = Object.entries(cuentaCarreras).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  // Actualizar el DOM con las estadísticas calculadas
  const formatHora = timestamp => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} Hrs`;
  };

  document.getElementById('horaMayorIngreso').querySelector('span').textContent = formatHora(horaMayorIngreso);
  document.getElementById('horaMenorIngreso').querySelector('span').textContent = formatHora(horaMenorIngreso);
  document.getElementById('carreraMasUsada').querySelector('span').textContent = carreraMasUsada;
}

// Función de búsqueda para filtrar los resultados de la tabla
function buscarAlumno() {
  const textoDeBusqueda = document.getElementById('buscarAlumno').value.toLowerCase();
  const alumnosFiltrados = alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(textoDeBusqueda) ||
      alumno.carrera.toLowerCase().includes(textoDeBusqueda) ||
      alumno.semestre.includes(textoDeBusqueda));
  llenarTabla(alumnosFiltrados);
}

// Event listener para el campo de búsqueda
document.getElementById('buscarAlumno').addEventListener('keyup', buscarAlumno);

// Llamada inicial para llenar la tabla
window.onload = function() {
  llenarTabla();
  calcularEstadisticas();
};
