import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieRow from "../components/MovieRow";
import Top10Row from "../components/Top10Row";
import MovieCard from "../components/MovieCard";
import TrailerModal from "../components/TrailerModal";
import {
  fetchTrendingMovies,
  searchMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchMovieVideos,
  getImageUrl,
} from "../api/tmdb";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [trendingData, popularData, topRatedData] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
        ]);
        if (mounted) {
          setTrending(trendingData);
          setPopular(popularData);
          setTopRated(topRatedData);
          // Película destacada (primera de tendencias)
          if (trendingData.length > 0) {
            setHeroMovie(trendingData[0]);
          }
        }
      } catch (e) {
        if (mounted) setError(e.message || "No se pudieron cargar las películas");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleSearch(value) {
    setQuery(value);
    if (!value) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await searchMovies(value);
      setSearchResults(data);
    } catch (e) {
      setError(e.message || "Error en la búsqueda");
    } finally {
      setLoading(false);
    }
  }

  async function handlePlayTrailer(movieId) {
    try {
      const videos = await fetchMovieVideos(movieId);
      if (videos.length > 0) {
        setTrailerKey(videos[0].key);
        setIsTrailerOpen(true);
      } else {
        setError("No hay trailer disponible para esta película");
      }
    } catch (e) {
      setError("No se pudo cargar el trailer");
    }
  }

  const backdropUrl = heroMovie ? getImageUrl(heroMovie.backdrop_path, "original") : "";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header estilo Apple TV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15l5-3-5-3v6z" />
              </svg>
              <span>Movie App</span>
            </Link>
            <div className="flex items-center gap-4 flex-1 justify-end max-w-md">
              <div className="flex-1 max-w-xs">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg p-4">
            {error}
          </div>
        </div>
      )}

      {query ? (
        /* Vista de búsqueda */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-semibold mb-6">
            Resultados para: <span className="text-zinc-400">"{query}"</span>
          </h2>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-lg bg-zinc-900 animate-pulse"
                />
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.map((movie) => (
                <div key={movie.id} className="w-full">
                  <MovieCard movie={movie} onPlayTrailer={handlePlayTrailer} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-400 text-center py-12">No se encontraron resultados</p>
          )}
        </main>
      ) : (
        /* Vista principal estilo Apple TV */
        <>
          {/* Hero Section estilo Apple TV */}
          {heroMovie && !loading && (
            <section
              className="relative h-[75vh] min-h-[600px] flex items-center overflow-hidden"
              style={{
                backgroundImage: `url(${backdropUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
                    {heroMovie.title}
                  </h1>
                  <p className="text-xl sm:text-2xl text-zinc-200 mb-8 line-clamp-3 leading-relaxed">
                    {heroMovie.overview}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <button
                      onClick={() => handlePlayTrailer(heroMovie.id)}
                      className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Reproducir Trailer
                    </button>
                    <Link
                      to={`/movie/${heroMovie.id}`}
                      className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
                    >
                      Más información
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 text-base text-zinc-300">
                    <span>{(heroMovie.release_date || "").slice(0, 4)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span>★</span>
                      {heroMovie.vote_average?.toFixed(1) ?? "-"}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Secciones de películas */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Top10Row
              title="Top 10: Películas"
              movies={trending}
              onPlayTrailer={handlePlayTrailer}
              loading={loading}
            />
            <MovieRow
              title="Tendencias"
              movies={trending.slice(10)}
              onPlayTrailer={handlePlayTrailer}
              loading={loading}
            />
            <MovieRow
              title="Populares"
              movies={popular}
              onPlayTrailer={handlePlayTrailer}
              loading={loading}
            />
            <MovieRow
              title="Mejor Valoradas"
              movies={topRated}
              onPlayTrailer={handlePlayTrailer}
              loading={loading}
            />
          </main>
        </>
      )}

      {/* Modal de Trailer */}
      <TrailerModal
        videoKey={trailerKey}
        isOpen={isTrailerOpen}
        onClose={() => {
          setIsTrailerOpen(false);
          setTrailerKey(null);
        }}
      />
    </div>
  );
}
