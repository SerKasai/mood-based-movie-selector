import MovieCard from "./MovieCard";
import { getGenreNames } from "../utils/genreMap";
import { useState, useEffect } from "react";
import axios from "axios";

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

interface MovieGridProps {
  selectedGenreId: string | number | null;
}

export default function MovieGrid({ selectedGenreId }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedGenreId) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: "6cad6dafb0a219bd44da63ec9029cbb4",
              language: "it-IT",
              include_adult: false,
              include_video: false,
              page: 1,
              sort_by: "popularity.desc",
              with_genres: selectedGenreId,
            },
          },
        );

        window.scrollTo({ top: 500, behavior: "smooth" });

        const mappedMovies: Movie[] = response.data.results.map(
          (tmdbMovie: any) => {
            const releaseYear = tmdbMovie.release_date
              ? parseInt(tmdbMovie.release_date.split("-")[0])
              : 0;

            const genreNamesString = getGenreNames(tmdbMovie.genre_ids);
            const genreArray = genreNamesString
              ? genreNamesString.split(", ")
              : ["Sconosciuto"];

            const safeTitle = encodeURIComponent(tmdbMovie.title);

            return {
              id: tmdbMovie.id,
              title: tmdbMovie.title,
              year: releaseYear,
              rating: Math.round(tmdbMovie.vote_average * 10) / 10,
              genre: genreArray,
              poster: tmdbMovie.poster_path
                ? `https://image.tmdb.org/t/p/w342${tmdbMovie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Poster",
              description:
                tmdbMovie.overview ||
                "Descrizione non disponibile in italiano.",
              trailerUrl: `https://www.youtube.com/results?search_query=${safeTitle}+trailer+ita+ufficiale`,
            };
          },
        );

        setMovies(mappedMovies.slice(0, 4));
      } catch (err) {
        console.error("Errore API TMDB:", err);
        setError("Impossibile caricare i film. Riprova più tardi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenreId]);

  if (!selectedGenreId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <svg
            className="w-12 h-12 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M15.91 11.72a.5.5 0 0 1 0 .56l-5.25 7.83a.5.5 0 0 1-.91-.28V13H5.5a.5.5 0 0 1-.41-.79l5.25-7.83a.5.5 0 0 1 .91.28V11h4.25a.5.5 0 0 1 .41.72z" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-2">
          Seleziona il tuo Mood
        </h3>
        <p className="text-gray-400 max-w-md">
          Scegli come ti senti qui sopra e ti consiglieremo 3 film perfetti per
          il tuo stato d'animo.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-4 min-h-[500px]">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="glass-card rounded-2xl aspect-[2/3] animate-pulse bg-white/5"
          />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              stroke-dasharray="60"
              d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.6s"
                values="60;0"
              />
            </path>
            <path
              stroke-dasharray="8"
              stroke-dashoffset="8"
              d="M12 12l4 4M12 12l-4 -4M12 12l-4 4M12 12l4 -4"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.6s"
                dur="0.2s"
                to="0"
              />
            </path>
          </g>
        </svg>
        {error}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[500px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Scelti per te</h2>
        <span className="text-sm text-muted-foreground">
          {movies.length} Film
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}
