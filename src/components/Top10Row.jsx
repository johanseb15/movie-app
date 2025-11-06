import Top10Card from "./Top10Card";

export default function Top10Row({ title, movies, onPlayTrailer, loading = false }) {
  if (loading) {
    return (
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 px-4">{title}</h2>
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 aspect-[2/3] rounded-lg bg-zinc-900 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) return null;

  const top10 = movies.slice(0, 10);

  return (
    <section className="mb-16">
      {title && (
        <div className="flex items-center gap-2 mb-6 px-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <svg
            className="w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide scroll-smooth">
        {top10.map((movie, index) => (
          <div key={movie.id} className="flex-shrink-0 w-48">
            <Top10Card movie={movie} rank={index + 1} onPlayTrailer={onPlayTrailer} />
          </div>
        ))}
      </div>
    </section>
  );
}

