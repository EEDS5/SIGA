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
        background: '#FFFFFF', // Blanco puro para fondos principales
        section: '#F5F5F5', // Gris claro tenue para secciones y tarjetas
        primary: '#005A9C', // Azul equilibrado para énfasis y botones principales
        'primary-dark': '#00457A', // Azul más oscuro para efectos hover y enfoque
        secondary: '#1A1A1A', // Gris oscuro neutro para textos principales
        labelText: '#4A4A4A', // Gris intermedio para etiquetas y textos secundarios
        accent: '#CFCFCF', // Gris acentuado para bordes y elementos secundarios
        border: '#E2E8F0', // Gris tenue para bordes y divisores
        success: '#38A169', // Verde para mensajes de éxito
        warning: '#ECC94B', // Amarillo para advertencias y mensajes de precaución
        error: '#E53E3E', // Rojo para mensajes de error
        info: '#3182CE', // Azul claro para mensajes de información
        'flyon-highlight': '#FFD700', // Personalizado: Dorado para resaltar elementos interactivos
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Fuente principal para textos
        heading: ['Poppins', 'sans-serif'], // Fuente secundaria para encabezados
        mono: ['Fira Code', 'monospace'], // Fuente para texto técnico y código
      },
      spacing: {
        '72': '18rem', // Espaciado adicional para componentes grandes
        '84': '21rem', // Espaciado para elementos amplios
        '96': '24rem', // Espaciado máximo para secciones extensas
      },
      borderRadius: {
        'lg': '10px', // Bordes redondeados estándar para tarjetas y modales
        'xl': '20px', // Bordes más pronunciados para botones y contenedores
      },
      boxShadow: {
        default: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)', // Sombra ligera predeterminada
        md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)', // Sombra mediana
        lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)', // Sombra más pronunciada
        'flyon-glow': '0 0 8px rgba(255, 215, 0, 0.8)', // Personalizado: Efecto de resplandor dorado
      },
      ringWidth: {
        '3': '3px', // Anillo más grueso para inputs en estado de enfoque
        '4': '4px', // Anillo extra grueso para elementos destacados
      },
      transitionTimingFunction: {
        'in-out-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)', // Transición más fluida
      },
    },
  },
  plugins: [
    require('flyonui'), // Base de FlyonUI
    require('flyonui/plugin'), // Componentes adicionales de FlyonUI
    require('@tailwindcss/forms'), // Plugin para formularios estilizados
    require('@tailwindcss/typography'), // Plugin para textos enriquecidos
    require('@tailwindcss/aspect-ratio'), // Plugin para relaciones de aspecto
  ],
};