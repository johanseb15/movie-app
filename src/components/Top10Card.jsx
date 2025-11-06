import { Link } from "react-router-dom";
import { getImageUrl } from "../api/tmdb";

export default function Top10Card({ movie, rank, onPlayTrailer }) {
  const poster = getImageUrl(movie.poster_path, "w342");

  return (
    <div className="group relative flex-shrink-0">
      <Link
        to={`/movie/${movie.id}`}
        className="block relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:z-10"
      >
        <div className="aspect-[2/3] bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden rounded-lg">
          {/* Número grande en la esquina superior izquierda */}
          <div className="absolute top-0 left-0 z-10 bg-gradient-to-br from-black/80 to-transparent w-16 h-16 flex items-center justify-center">
            <span className="text-3xl font-bold text-white drop-shadow-lg">{rank}</span>
          </div>
          {poster ? (
            <img
              src={poster}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-zinc-500 text-sm">
              Sin póster
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-semibold text-white line-clamp-1 uppercase tracking-wide">
            {movie.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">Película</p>
        </div>
      </Link>
      {onPlayTrailer && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPlayTrailer(movie.id);
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 hover:scale-110"
          aria-label="Reproducir trailer"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}

