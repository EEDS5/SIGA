/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../Frontend/views/**/*.ejs',
    '../Frontend/views/**/*.html',
    '../Frontend/public/js/**/*.js', // Incluye scripts interactivos
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF', // Blanco para fondos principales
        section: '#F5F5F5', // Gris claro tenue para secciones y tarjetas
        primary: '#005A9C', // Azul equilibrado para énfasis
        'primary-dark': '#00457A', // Un tono más oscuro de tu color primario para efectos hover
        secondary: '#1A1A1A', // Gris oscuro neutro para textos principales
        labelText: '#4A4A4A', // Gris neutro para etiquetas y textos secundarios
        accent: '#CFCFCF', // Gris acentuado para bordes y elementos secundarios
        success: '#38A169', // Verde para mensajes de éxito
        warning: '#ECC94B', // Amarillo para advertencias
        error: '#E53E3E', // Rojo para mensajes de error
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Fuente principal
      },
    },
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'), // Si usas componentes JS
  ],
};