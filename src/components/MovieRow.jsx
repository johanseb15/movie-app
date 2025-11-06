import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, onPlayTrailer, loading = false }) {
  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 px-4">{title}</h2>
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 aspect-[2/3] rounded-lg bg-zinc-900 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <section className="mb-12">
      {title && <h2 className="text-xl font-semibold mb-4 px-4">{title}</h2>}
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide scroll-smooth">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-40">
            <MovieCard movie={movie} onPlayTrailer={onPlayTrailer} />
          </div>
        ))}
      </div>
    </section>
  );
}

