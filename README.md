# Movie App

Aplicacion web para descubrir peliculas usando la API de TMDb, construida con React + Vite + Tailwind CSS.

Este proyecto esta pensado como pieza de portafolio junior: muestra consumo de APIs externas, arquitectura por componentes, rutas, estado, UI responsive y deploy continuo en GitHub Pages.

## Demo

- Produccion: https://johanseb15.github.io/movie-app/
- Repositorio: https://github.com/johanseb15/movie-app

## Features

- Home estilo streaming con hero destacado.
- Top 10 de peliculas con numeracion visual.
- Filas por categoria: Tendencias, Populares y Mejor Valoradas.
- Busqueda de peliculas por texto.
- Vista de detalle por pelicula (`/movie/:id`).
- Reproduccion de trailer en modal (YouTube).
- Estados de carga y manejo de errores de API.
- UI responsive para mobile, tablet y desktop.

## Stack Tecnico

- React 19
- Vite 7
- Tailwind CSS v4
- React Router DOM v6
- TMDb API v3
- GitHub Actions + GitHub Pages

## Arquitectura del Proyecto

```txt
movie-app/
|- src/
|  |- api/            # Cliente TMDb y helpers
|  |- components/     # Componentes reutilizables de UI
|  |- pages/          # Home y detalle de pelicula
|  |- App.jsx         # Router principal
|  |- main.jsx        # Entry point
|- .github/workflows/
|  |- deploy.yml      # CI/CD para Pages
|- vite.config.js     # Base para despliegue en /movie-app/
```

## Lo que practique en este proyecto

- Integracion de API REST real con manejo de errores (401/404).
- Gestion de estado en React con hooks (`useState`, `useEffect`).
- Navegacion con rutas y parametros dinamicos.
- Diseno de interfaz tipo producto real (streaming UI).
- Flujo de deploy automatico con GitHub Actions.

## Setup Local

### 1) Instalar dependencias

```bash
npm i
```

### 2) Crear `.env`

```env
VITE_TMDB_API_KEY=TU_API_KEY_V3
```

Importante:

- Usa la API Key v3 (32 caracteres).
- No uses JWT Bearer token en `VITE_TMDB_API_KEY`.
- Si aparece error 401, revisa la clave.

### 3) Ejecutar en desarrollo

```bash
npm run dev
```

### 4) Build local de produccion

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev`: inicia entorno local.
- `npm run build`: genera build de produccion.
- `npm run preview`: previsualiza build.
- `npm run lint`: ejecuta ESLint.
- `npm run deploy`: deploy manual con `gh-pages`.

## Deploy en GitHub Pages

Este repo ya incluye CI/CD automatico con `.github/workflows/deploy.yml`.

Requisitos:

1. En GitHub, ir a `Settings > Pages` y seleccionar `GitHub Actions`.
2. Crear secreto `VITE_TMDB_API_KEY` en:
   `Settings > Secrets and variables > Actions`.
3. Hacer push a `main`.

El workflow construye y publica automaticamente en:
`https://johanseb15.github.io/movie-app/`

## Roadmap

- Filtros por genero/anio/calificacion.
- Favoritos y watchlist local.
- Tests unitarios y de componentes.
- Mejora de accesibilidad (teclado, focus, ARIA).
- Skeletons y optimizacion de percepcion de carga.

## Autor

- GitHub: https://github.com/johanseb15
- Proyecto realizado como practica para portafolio de desarrollo frontend.

## Licencia

MIT
