import { Link } from "react-router-dom";
import { getImageUrl } from "../api/tmdb";

export default function MovieCard({ movie, onPlayTrailer }) {
  const poster = getImageUrl(movie.poster_path, "w342");

  return (
    <div className="group relative flex-shrink-0">
      <Link
        to={`/movie/${movie.id}`}
        className="block relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:z-10"
      >
        <div className="aspect-[2/3] bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden rounded-lg">
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
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{movie.title}</h3>
          <div className="text-xs text-zinc-300 flex items-center gap-2">
            <span>{(movie.release_date || "").slice(0, 4)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>★</span>
              {movie.vote_average?.toFixed(1) ?? "-"}
            </span>
          </div>
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
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
