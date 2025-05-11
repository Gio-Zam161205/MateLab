// Función para mostrar la sección seleccionada
function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  // Mostrar la sección seleccionada
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add('active');
  }
}
