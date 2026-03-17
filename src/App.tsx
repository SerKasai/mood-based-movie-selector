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
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center">
                <img src="/emojione--movie-camera.png" alt="icon-camera" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                MoodFlix
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; Sergio Ignizio
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
