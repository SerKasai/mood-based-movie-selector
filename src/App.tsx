import { useState } from "react";
import "tailwindcss";
import "./App.css";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import MoodSelector from "./components/MoodSelector";
import MovieGrid from "./components/MovieGrid";

function App() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-background bg-gradient-radial">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Scopri i film che si adattano al tuo
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              &nbsp; stato d'animo
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Lascia che le tue emozioni ti guidino verso il film perfetto.
            Seleziona come ti senti e ricevi consigli personalizzati, creati
            apposta per te.
          </p>
        </section>

        {/* Stats Bar */}
        <section className="mb-12">
          <StatsBar />
        </section>

        {/* Mood Selector */}
        <section className="mb-12">
          <MoodSelector
            selectedMood={selectedMood}
            onSelectMood={setSelectedMood}
          />
        </section>

        {/* Movie Grid */}
        <section>
          <MovieGrid selectedGenreId={selectedMood} />
        </section>
      </main>
    </div>
  );
}

export default App;
