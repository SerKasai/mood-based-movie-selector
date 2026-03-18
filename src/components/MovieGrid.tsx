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
  const [refreshKey, setRefreshKey] = useState(0);

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
              page: Math.floor(Math.random() * 10) + 1,
              sort_by: "popularity.desc",
              with_genres: selectedGenreId,
            },
          },
        );

        const shuffledResults = response.data.results.sort(
          () => 0.5 - Math.random(),
        );

        window.scrollTo({ top: 1000, behavior: "smooth" });

        const mappedMovies: Movie[] = shuffledResults.map((tmdbMovie: any) => {
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
              tmdbMovie.overview || "Descrizione non disponibile in italiano.",
            trailerUrl: `https://www.youtube.com/results?search_query=${safeTitle}+trailer+ita+ufficiale`,
          };
        });

        setMovies(mappedMovies.slice(0, 4));
      } catch (err) {
        console.error("Errore API TMDB:", err);
        setError("Impossibile caricare i film. Riprova più tardi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenreId, refreshKey]);

  if (!selectedGenreId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700 select-none">
        <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="m17.831 3.306l-9.726 13.9c-.26.37-.045.794.395.794h4c.35 0 .5.14.5.5v10.763c0 .71.86 1.02 1.27.45l9.618-12.828c.27-.37.052-.885-.388-.885H20c-.5 0-1-.5-1-1V3.5c0-.5-.76-.774-1.169-.194"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-2">
          Seleziona il tuo Mood
        </h3>
        <p className="text-gray-400 max-w-md">
          Scegli come ti senti qui sopra e ti consiglieremo 4 film perfetti per
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
      <button
        onClick={() => setRefreshKey((prev) => prev + 1)}
        className="mt-8 mb-12 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full font-medium transition-all duration-300 flex items-center justify-self-center gap-2 group hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        <svg
          className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Mostrami altri film
      </button>
    </div>
  );
}
