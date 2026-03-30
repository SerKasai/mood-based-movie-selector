import { useState } from "react";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { Star } from "./animate-ui/icons/star";
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  year: number;
  rating: number;
  genre: string[];
  poster: string;
  backdrop: string;
  description: string;
  trailerUrl: string;
}

export interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div
        className="h-full group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
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
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffc600"
                d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
              />
            </svg>
            <span className="text-sm font-semibold text-foreground">
              {movie.rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 hidden lg:flex flex-col gap-y-2.5">
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
                className={`${g} text-xs px-2.5 py-1 rounded-full text-secondary-foreground`}
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur-sm">
          {/* Bottone Preferiti */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Previene comportamenti di default
              e.stopPropagation(); // Evita che il click "buchi" e clicchi la card sottostante
              setChecked(!checked);

              // TODO: Qui aggiungeremo la logica per salvare il film nel database o Context
            }}
            className="absolute top-3 right-3 glass px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <AnimateIcon
              animateOnTap
              animate={checked}
              persistOnAnimateEnd={true}
              animation="fill"
            >
              <Star
                className={
                  checked ? "fill-[#ffc600] text-[#ffc600]" : "text-white"
                }
              />
            </AnimateIcon>
            <span className="text-sm font-semibold text-foreground">
              {checked ? "Salvato" : "Aggiungi"}
            </span>
          </button>
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
          <button
            onClick={(e) => {
              e.preventDefault(); // Previene comportamenti di default
              e.stopPropagation(); // Evita che il click "buchi" e clicchi la card sottostante
              setChecked(!checked);

              // TODO: Qui aggiungeremo la logica per salvare il film nel database o Context
            }}
            className="z-50 absolute top-3 right-3 glass px-3 py-1.5 rounded-full flex lg:hidden items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <AnimateIcon
              animateOnTap
              animate={checked}
              persistOnAnimateEnd={true}
              animation="fill"
            >
              <Star
                className={
                  checked ? "fill-[#ffc600] text-[#ffc600]" : "text-white"
                }
              />
            </AnimateIcon>
            <span className="text-sm font-semibold text-foreground">
              {checked ? "Salvato" : "Aggiungi"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
