import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchMovieDetails, fetchMovieVideos, getImageUrl } from "../api/tmdb";
import TrailerModal from "../components/TrailerModal";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(id);
        if (mounted) {
          setMovie(data);
          // Cargar trailers
          const videos = await fetchMovieVideos(id);
          if (videos.length > 0 && mounted) {
            setTrailerKey(videos[0].key);
          }
        }
      } catch (e) {
        if (mounted) setError(e.message || "No se pudo cargar la película");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white grid place-items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black text-white grid place-items-center px-4">
        <div className="text-center">
          <p className="mb-4 text-red-400 text-lg">{error || "Película no encontrada"}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const poster = getImageUrl(movie.poster_path, "w500");
  const backdrop = getImageUrl(movie.backdrop_path, "original");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero con backdrop */}
      <div
        className="relative h-[60vh] min-h-[400px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 100%), url(${backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={poster}
              alt={movie.title}
              className="w-48 md:w-64 lg:w-80 rounded-xl shadow-2xl"
            />
          </div>

          {/* Información */}
          <div className="flex-1 pb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-zinc-300">
              <span>{(movie.release_date || "").slice(0, 4)}</span>
              {movie.runtime && <span>• {movie.runtime} min</span>}
              {movie.genres && movie.genres.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">★</span>
                <span className="text-xl font-semibold">
                  {movie.vote_average?.toFixed(1) ?? "-"}
                </span>
                <span className="text-zinc-400">({movie.vote_count} votos)</span>
              </div>
            </div>

            {trailerKey && (
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="mb-6 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Reproducir Trailer
              </button>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Sinopsis</h2>
              <p className="text-zinc-300 leading-relaxed text-lg">
                {movie.overview || "Sin descripción disponible."}
              </p>
            </div>

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Producción</h2>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.slice(0, 3).map((company) => (
                    <div key={company.id} className="flex items-center gap-2">
                      {company.logo_path && (
                        <img
                          src={getImageUrl(company.logo_path, "w92")}
                          alt={company.name}
                          className="h-8 object-contain"
                        />
                      )}
                      <span className="text-zinc-400">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.budget && movie.budget > 0 && (
              <div className="text-sm text-zinc-400">
                <span>Presupuesto: ${movie.budget.toLocaleString()}</span>
                {movie.revenue && movie.revenue > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Recaudación: ${movie.revenue.toLocaleString()}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Trailer */}
      <TrailerModal
        videoKey={trailerKey}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
}
