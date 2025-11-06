/** @type {import('tailwindcss').Config} */
export default {
  // En Tailwind v4, la configuración se hace principalmente en CSS con @theme
  // Este archivo se mantiene para compatibilidad, pero la mayoría de la configuración
  // ahora se hace en el archivo CSS usando @theme
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
