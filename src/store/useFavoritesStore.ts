import { create } from "zustand";
import { db, auth } from "@/components/FireBase/firebaseConfig";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { type Movie } from "@/components/MovieCard";

export interface FavoritesState {
  myFavorites: Movie[];
  setFavorites: (movies: Movie[]) => void;
  toggleFavorite: (movie: Movie) => Promise<void>;
  isFavorite: (id: number) => boolean;
}

// HOOK GLOBALE
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  myFavorites: [],
  setFavorites: (movies) => set({ myFavorites: movies }),

  // L'AZIONE CHE SCATTA AL CLICK SULLA STELLINA
  toggleFavorite: async (movie) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Devi essere loggato per salvare i preferiti!");
      return;
    }

    const movieRef = doc(
      db,
      "users",
      user.uid,
      "favorites",
      movie.id.toString(),
    );
    const alredyExists = get().isFavorite(movie.id);

    try {
      if (alredyExists) {
        // ...SI RIMUOVE DALL'ARRAY INIZIALE
        await deleteDoc(movieRef);
      } else {
        // ...ALTRIMENTI, SI AGGIUNGE IN CODA ALL'ARRAY
        await setDoc(movieRef, movie);
      }
    } catch (error) {
      console.error("Errore durante il salvataggio", error);
    }
  },
  // FUNZIONE PER CAPIRE SE UN FILM E' GIA' NEI PREFERITI
  isFavorite: (id) => {
    return get().myFavorites.some((m) => m.id === id);
  },
}));
