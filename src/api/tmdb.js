const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) {
    throw new Error("Falta VITE_TMDB_API_KEY en el archivo .env");
  }
  // Validar que no sea un JWT token (los JWT tienen 3 partes separadas por puntos)
  if (key.split(".").length === 3) {
    throw new Error(
      "Error: Estás usando un JWT token. TMDb requiere una API Key simple. Obtén tu API Key en https://www.themoviedb.org/settings/api"
    );
  }
  return key;
}

async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (res.status === 401) {
      throw new Error(
        "API Key inválida o expirada. Verifica tu VITE_TMDB_API_KEY en el archivo .env. Debe ser una API Key simple, no un JWT token."
      );
    }
    if (res.status === 404) {
      throw new Error("Recurso no encontrado");
    }
    throw new Error(errorData.status_message || `Error ${res.status}: ${res.statusText}`);
  }
  return res;
}

export async function fetchTrendingMovies() {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}/trending/movie/week?api_key=${apiKey}&language=es-ES`;
  const res = await handleResponse(await fetch(url));
  const data = await res.json();
  return data.results ?? [];
}

export async function searchMovies(query) {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&language=es-ES&query=${encodeURIComponent(
    query
  )}`;
  const res = await handleResponse(await fetch(url));
  const data = await res.json();
  return data.results ?? [];
}

export async function fetchMovieDetails(movieId) {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${apiKey}&language=es-ES`;
  const res = await handleResponse(await fetch(url));
  return await res.json();
}

export async function fetchMovieVideos(movieId) {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${apiKey}&language=es-ES`;
  const res = await handleResponse(await fetch(url));
  const data = await res.json();
  // Filtrar trailers de YouTube
  const trailers = data.results?.filter(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  ) || [];
  return trailers;
}

export async function fetchPopularMovies() {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}/movie/popular?api_key=${apiKey}&language=es-ES`;
  const res = await handleResponse(await fetch(url));
  const data = await res.json();
  return data.results ?? [];
}

export async function fetchTopRatedMovies() {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}/movie/top_rated?api_key=${apiKey}&language=es-ES`;
  const res = await handleResponse(await fetch(url));
  const data = await res.json();
  return data.results ?? [];
}

export function getImageUrl(path, size = "w500") {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}


