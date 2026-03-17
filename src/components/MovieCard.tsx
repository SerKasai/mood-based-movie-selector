interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  poster: string;
  description: string;
  trailerUrl: string;
}

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  return (
    <div
      className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-sm font-semibold text-foreground">
            {movie.rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <span className="text-sm text-muted-foreground shrink-0">
            {movie.year}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {movie.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {movie.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur-sm">
        <a
          href={movie.trailerUrl} // Usiamo il link dinamico
          target="_blank" // Apre in una nuova scheda
          rel="noopener noreferrer" // Sicurezza per i link esterni
          className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
          </svg>
          Guarda Trailer
        </a>
      </div>

      {/* Tasto Trailer Mobile */}
      <div className="p-4">
        <a
          href={movie.trailerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden flex items-center gap-1 text-xs font-bold text-red-500 uppercase tracking-wider"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Trailer
        </a>
      </div>
    </div>
  );
}
