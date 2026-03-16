import MovieCard from "./MovieCard";
import { getGenreNames } from "../utils/genreMap";
import { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
  genre: string[];
  poster_path: string;
  overview: string;
}

const URLSearchParams = {
  language: "?language=it-IT",
  with_genres: { getGenreNames },
  string_image: "https://image.tmdb.org/t/p/w342",
};

export default function MovieGrid() {}
