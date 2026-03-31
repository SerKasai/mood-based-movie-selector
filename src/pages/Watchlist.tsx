"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import MovieCard from "@/components/MovieCard";
import { Star } from "@/components/animate-ui/icons/star";

export default function Watchlist() {
  const myFavorites = useFavoritesStore((state) => state.myFavorites);
  return (
    <div className="pt-28 px-6 sm:px-10 text-white min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">I tuoi preferiti</h1>
      {myFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl border-dashed border-2 border-muted">
          <div className="bg-muted/20 p-6 rounded-full mb-4">
            <Star className="w-12 h-12 text-muted-foreground opacity-20" />
          </div>
          <h2 className="text-2xl font-semibold">La tua lista è vuota</h2>
          <p className="text-muted-foreground mt-2 max-w-xs">
            Esplora i film e clicca sulla stellina per aggiungerli alla tua
            collezione personale.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {myFavorites.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
