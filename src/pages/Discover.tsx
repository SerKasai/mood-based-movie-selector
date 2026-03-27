import "tailwindcss";
import axios from "axios";
import MovieCard, { type Movie } from "@/components/MovieCard";
import { useEffect, useState } from "react";
import { getGenreNames } from "@/utils/genreMap";

interface DiscoverProps {
  selectedGenreId: string | number | null;
}

export default function Discover({ selectedGenreId }: DiscoverProps) {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming",
          {
            params: {
              api_key: "0d3354632adb7f6817b24a58e0fd32dd",
              language: "it-IT",
              include_adult: false,
              include_video: false,
              sort_by: "release_date",
              with_genre: selectedGenreId,
            },
          },
        );
        const results = response.data.results;
        const mappedUpcomingMovies: Movie[] = results.map(
          (upcomingMovie: any) => {
            const safeTitle = encodeURIComponent(upcomingMovie.title);
            const genreNamesString = getGenreNames(upcomingMovie.genre_ids);
            const genreArray = genreNamesString
              ? genreNamesString.split(", ")
              : ["Sconosciuto"];
            return {
              id: upcomingMovie.id,
              title: upcomingMovie.title,
              original_title:
                upcomingMovie.original_title || upcomingMovie.title,
              year: upcomingMovie.release_date
                ? parseInt(upcomingMovie.release_date.split("-")[0])
                : 0,
              rating: upcomingMovie.vote_average || 0,
              genre: genreArray,
              description:
                upcomingMovie.overview || "Nessuna descrizione disponibile.",
              trailerUrl: `https://www.youtube.com/results?search_query=${safeTitle}+trailer+ita+ufficiale`,
              backdrop: upcomingMovie.backdrop_path
                ? `https://image.tmdb.org/t/p/w780${upcomingMovie.backdrop_path}`
                : "",
              poster: upcomingMovie.poster_path
                ? `https://image.tmdb.org/t/p/w342${upcomingMovie.poster_path}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s",
            };
          },
        );

        setUpcomingMovies(mappedUpcomingMovies);
      } catch (err) {
        console.error("Errore API TMDB:", err);
        setError("Impossibile caricare i film. Riprova più tardi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

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
    <div className="pt-28 px-6 sm:px-10 text-white min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        Scopri le ultime uscite
      </h1>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {upcomingMovies.map((movie, i) => (
          <div
            key={movie.id}
            className="h-fit lg:h-auto bg-white/5 border border-white/10 rounded-xl"
          >
            <MovieCard movie={movie} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
