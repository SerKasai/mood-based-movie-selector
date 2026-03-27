import "./MovieDetails.css";
import { type MovieCardProps } from "../MovieCard";

interface MovieDetailsProps extends MovieCardProps {
  onClose: () => void;
}

export default function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 flex flex-col lg:flex-row h-auto lg:h-[40vh] mt-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Pulsante di chiusura (X) in alto a destra */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full w-8 h-8 hidden lg:flex items-center justify-center transition-colors"
      >
        ✕
      </button>
      <div className="w-full lg:w-1/3 relative overflow-hidden ">
        <img
          className="w-full h-full object-cover lg:object-contain transition-transform duration-700"
          alt={movie.title}
          src={movie.backdrop}
        />
        {/* Pulsante di chiusura (X) mobile*/}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full w-8 h-8 flex lg:hidden items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="p-4 flex flex-col justify-around w-full lg:w-2/3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1 transition-colors">
            {movie.title}
          </h3>
          <span className="text-sm text-muted-foreground shrink-0 p-0 lg:pr-10">
            {movie.year}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-full overflow-auto! scrollbar">
          {movie.description}
        </p>
        <div className="grid grid-flow-col justify-between gap-2">
          <div className="container-genres gap-1.5 flex grow overflow-auto! items-end scrollbar">
            {movie.genre.map((g) => (
              <span
                key={g}
                className={`${g} text-xs px-2.5 py-1 rounded-full text-secondary-foreground`}
              >
                {g}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground">
            TItolo Originale: {movie.original_title}
          </p>
        </div>
      </div>
    </div>
  );
}
