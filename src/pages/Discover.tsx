// import { useState, useEffect } from "react";
import "tailwindcss";
// import "./App.css";
// import Header from "../components/Header";
// import SearchBar from "./searchbar/SearchBar";
// import StatsBar from "./components/StatsBar";
// import MoodSelector from "./components/MoodSelector";
// import MovieGrid from "./components/MovieGrid";
// import LoginForm from "./components/LoginForm";
// import { onAuthStateChanged, type User } from "firebase/auth";
// import { auth } from "./components/FireBase/firebaseConfig";

// type SearchProps = {
//   searchValue?: string;
//   onSearchChange?: (value: string) => void;
// };

function Discover() {
  return (
    <div className="pt-28 px-6 sm:px-10 text-white min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        Scopri le ultime uscite
      </h1>
      <p className="text-gray-400">
        Qui presto apparirà una fantastica griglia con le locandine dei film in
        base al tuo Mood!
      </p>

      {/* Qui in futuro metteremo il componente con le card dei film */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Esempio di skeleton per una locandina */}
        <div className="h-64 bg-white/5 border border-white/10 rounded-xl animate-pulse"></div>
        <div className="h-64 bg-white/5 border border-white/10 rounded-xl animate-pulse"></div>
        <div className="h-64 bg-white/5 border border-white/10 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

export default Discover;
