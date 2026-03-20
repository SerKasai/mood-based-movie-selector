import "./genreMap.css";

export const TMDB_GENRES: Record<number, string> = {
  28: "Azione",
  12: "Avventura",
  16: "Animazione",
  35: "Commedia",
  80: "Crime",
  99: "Documentario",
  18: "Dramma",
  10751: "Famiglia",
  14: "Fantasy",
  36: "Storia",
  27: "Horror",
  10402: "Musica",
  9648: "Mistero",
  10749: "Romance",
  878: "Fantascienza",
  10770: "Film TV",
  53: "Thriller",
  10752: "Guerra",
  37: "Western",
};

// Funzione di utilità per convertire un array di ID in una stringa di nomi
export const getGenreNames = (genreIds: number[]): string => {
  return genreIds
    .map((id) => TMDB_GENRES[id])
    .filter((name) => name !== undefined) // Rimuove eventuali id sconosciuti
    .join(", "); // Unisce i nomi con una virgola
};
