import { useState } from "react";
import Header from "./components/Header";
import MoodSelector from "./components/MoodSelector";
import MovieGrid from "./components/MovieGrid";
import StatsBar from "./components/StatsBar";
import "./index.css";

function App() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background bg-gradient-radial">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Discover Movies That Match Your
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> Mood</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Let your emotions guide you to the perfect film. Select how you're feeling and get personalized recommendations curated just for you.
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
          <MovieGrid selectedMood={selectedMood} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground">MoodFlix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover your next favorite movie based on how you feel.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
