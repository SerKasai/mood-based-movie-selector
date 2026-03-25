import { useState, useEffect } from "react";
import "tailwindcss";
import "./App.css";
import Header from "./components/Header";
import Discover from "./pages/Discover";
import StatsBar from "./components/StatsBar";
import MoodSelector from "./components/MoodSelector";
import MovieGrid from "./components/MovieGrid";
import LoginForm from "./components/LoginForm";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./components/FireBase/firebaseConfig";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  // Stato per memorizzare l'utente corrente
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 2. Stato di caricamento
  const [loading, setLoading] = useState(true);

  // useEffect per "ascoltare" i cambiamenti di stato dell'autenticazione
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    //Rimuovere il listener quando il componente viene smontato
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  const toggleMood = (id: number) => {
    setSelectedMood((prevId) => (prevId === id ? null : id));
  };

  return (
    <Router>
      {currentUser ? (
        <div className="min-h-screen bg-background bg-gradient-radial">
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Hero Section */}
                  <section
                    id="hero_section"
                    className="text-center mb-12 select-none"
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
                      Scopri i film che si adattano al tuo
                      <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        &nbsp; stato d'animo
                      </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                      Lascia che le tue emozioni ti guidino verso il film
                      perfetto. Seleziona come ti senti e ricevi consigli
                      personalizzati, creati apposta per te.
                    </p>
                  </section>

                  {/* Stats Bar */}
                  <section id="stats_bar" className="mb-12 select-none">
                    <StatsBar />
                  </section>

                  {/* Mood Selector */}
                  <section id="mood_selector" className="mb-12 select-none">
                    <MoodSelector
                      selectedMood={selectedMood}
                      onSelectMood={toggleMood}
                    />
                  </section>

                  {/* Movie Grid */}
                  <section id="movie_grid">
                    <MovieGrid selectedGenreId={selectedMood} />
                  </section>
                </main>
              }
            />

            <Route
              path="/discover"
              element={<Discover selectedGenreId={selectedMood} />}
            />
          </Routes>

          <footer className="border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center">
                    <img src="/emojione--movie-camera.png" alt="icon-camera" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    <img
                      src="/logo_MoodFlix.png"
                      alt="logo"
                      className="h-6 object-contain"
                    />
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
      ) : (
        <Routes>
          <Route path="*" element={<LoginForm />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
