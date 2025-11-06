# 🚀 Guía de Despliegue a GitHub Pages

## Pasos para subir tu Movie App a GitHub Pages

### 1. Inicializar Git (si no lo has hecho)

```bash
git init
```

### 2. Agregar todos los archivos

```bash
git add .
```

### 3. Hacer el primer commit

```bash
git commit -m "Initial commit: Movie App con diseño Apple TV"
```

### 4. Crear el repositorio en GitHub

1. Ve a https://github.com/johanseb15
2. Haz clic en "New repository"
3. Nombre: `movie-app`
4. Descripción: "Aplicación de películas estilo Apple TV con TMDb API"
5. **NO marques** "Initialize with README" (ya tienes uno)
6. Haz clic en "Create repository"

### 5. Conectar tu repositorio local con GitHub

```bash
git branch -M main
git remote add origin https://github.com/johanseb15/movie-app.git
git push -u origin main
```

### 6. Configurar GitHub Pages

1. Ve a tu repositorio: https://github.com/johanseb15/movie-app
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona **"GitHub Actions"**
4. Guarda los cambios

### 7. Agregar el secreto de la API Key

1. En tu repositorio, ve a **Settings** > **Secrets and variables** > **Actions**
2. Haz clic en **"New repository secret"**
3. Nombre: `VITE_TMDB_API_KEY`
4. Valor: Pega tu API Key de TMDb
5. Haz clic en **"Add secret"**

### 8. Activar el workflow

1. Ve a la pestaña **"Actions"** en tu repositorio
2. Si no se ejecutó automáticamente, haz clic en **"Deploy to GitHub Pages"**
3. Haz clic en **"Run workflow"** > **"Run workflow"**

### 9. Esperar el despliegue

- El workflow tardará unos minutos
- Puedes ver el progreso en la pestaña **Actions**
- Cuando termine, verás un check verde ✅

### 10. Acceder a tu sitio

Tu aplicación estará disponible en:
**https://johanseb15.github.io/movie-app/**

---

## 🔄 Actualizaciones futuras

Cada vez que hagas cambios y hagas push a `main`, el sitio se actualizará automáticamente:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## ⚠️ Notas importantes

- El archivo `.env` NO se sube a GitHub (está en `.gitignore`)
- La API Key debe estar en los Secrets de GitHub Actions
- El base path está configurado como `/movie-app/` en `vite.config.js`
- Si cambias el nombre del repositorio, actualiza el `base` en `vite.config.js`

---

## 🐛 Solución de problemas

### Error: "Workflow not found"
- Asegúrate de que el archivo `.github/workflows/deploy.yml` existe
- Verifica que esté en la rama `main`

### Error: "API Key not found"
- Verifica que el secreto `VITE_TMDB_API_KEY` esté configurado en Settings > Secrets

### El sitio no carga
- Espera unos minutos después del deploy
- Verifica que el workflow haya terminado exitosamente
- Revisa la URL: debe ser `https://johanseb15.github.io/movie-app/`

