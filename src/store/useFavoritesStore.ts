import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Movie } from "@/components/MovieCard";

export interface FavoritesState {
  myFavorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number | string) => boolean;
}

// HOOK GLOBALE
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    // PERMETTE DI SALVARE OGNI MODIFICA DELL'ARRAY NEL LOCALSTORAGE
    (set, get) => ({
      // ARRAY INIZIALE
      myFavorites: [],

      // L'AZIONE CHE SCATTA AL CLICK SULLA STELLINA
      toggleFavorite: (movie) => {
        set((state) => {
          // SE IL FILM E' GIA' PRESENTE...
          const alredyExists = state.myFavorites.some((m) => m.id === movie.id);

          if (alredyExists) {
            // ...SI RIMUOVE DALL'ARRAY INIZIALE
            return {
              myFavorites: state.myFavorites.filter((m) => m.id !== movie.id),
            };
          } else {
            // ...ALTRIMENTI, SI AGGIUNGE IN CODA ALL'ARRAY
            return {
              myFavorites: [...state.myFavorites, movie],
            };
          }
        });
      },
      // FUNZIONE PER CAPIRE SE UN FILM E' GIA' NEI PREFERITI
      isFavorite: (id) => {
        return get().myFavorites.some((m) => m.id === id);
      },
    }),
    {
      name: "movie-watchlist", // NOME DELLA CHIAVE NEL LOCALSTORAGE DEL BROWSER
    },
  ),
);
