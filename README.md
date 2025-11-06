## Movie App – Vite + React + Tailwind v4 + TMDb

Aplicación web moderna para explorar películas, inspirada en el diseño de Apple TV. Incluye búsqueda, trailers, y secciones de tendencias.

### 🚀 Características

- 🎬 **Top 10 de Películas** con números destacados
- 🔍 **Búsqueda avanzada** de películas
- 🎥 **Reproducción de trailers** desde YouTube
- 📱 **Diseño responsive** estilo Apple TV
- ⚡ **Rendimiento optimizado** con Vite
- 🎨 **Tailwind CSS v4** con diseño moderno

### 📋 Configuración Local

1) Instala dependencias:

```bash
npm i
```

2) Crea `.env` en la raíz con tu API Key de TMDb (v3):

```
VITE_TMDB_API_KEY=TU_API_KEY_AQUI
```

**⚠️ IMPORTANTE:** 
- Necesitas una **API Key simple**, NO un JWT token
- Obtén tu API Key en: https://www.themoviedb.org/settings/api
- Debes crear una cuenta en TMDb y solicitar una API Key
- La API Key debe verse como: `c989f83ffce891f0f7dfba2b8f684f22` (32 caracteres alfanuméricos)
- Si ves un error 401, verifica que estés usando la API Key correcta

3) Desarrollo:

```bash
npm run dev
```

4) Producción local:

```bash
npm run build && npm run preview
```

### 🌐 Despliegue en GitHub Pages

#### Opción 1: Deploy Automático (Recomendado)

1. **Crea el repositorio en GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/johanseb15/movie-app.git
   git push -u origin main
   ```

2. **Configura GitHub Pages:**
   - Ve a `Settings` > `Pages` en tu repositorio
   - En `Source`, selecciona `GitHub Actions`

3. **Agrega el secreto de la API Key:**
   - Ve a `Settings` > `Secrets and variables` > `Actions`
   - Crea un nuevo secreto llamado `VITE_TMDB_API_KEY`
   - Pega tu API Key de TMDb

4. **El workflow se ejecutará automáticamente** al hacer push a `main`

#### Opción 2: Deploy Manual

```bash
npm run deploy
```

**Nota:** Asegúrate de tener configurado `gh-pages` y estar autenticado con GitHub CLI.

### 📁 Estructura del Proyecto

```
movie-app/
├── src/
│   ├── api/          # Servicios de TMDb API
│   ├── components/   # Componentes reutilizables
│   ├── pages/        # Páginas principales
│   └── ...
├── .github/
│   └── workflows/    # GitHub Actions para deploy
└── ...
```

### 🛠️ Tecnologías

- **React 19** - Framework UI
- **Vite 7** - Build tool
- **Tailwind CSS v4** - Estilos
- **React Router** - Navegación
- **TMDb API** - Datos de películas

### 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
