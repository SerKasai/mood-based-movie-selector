import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../components/FireBase/firebaseConfig";
import { Link, NavLink } from "react-router-dom";
// import SearchBar from "./searchbar/SearchBar";

export default function Header() {
  const [isactive, setIsActive] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.photoURL) {
        setUserPhoto(user.photoURL);
      }
    });
    return unsubscribe;
  }, []);

  const toggleClass = () => {
    setIsActive(!isactive);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-[#9605bb]" // Classi per il tasto attivo
        : "text-muted-foreground hover:text-foreground" // Classi per i tasti inattivi
    }`;

  return (
    <header className="sticky top-0 z-50 glass border-b border-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO SECTION */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer">
                <img src="/emojione--movie-camera.png" alt="icon-camera" />
              </div>
              <span className="text-xl font-bold text-foreground">
                <img
                  src="/logo_MoodFlix.png"
                  alt="logo"
                  className="h-10 object-contain"
                />
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/discover" className={navLinkStyles}>
              Discover
            </NavLink>
            <NavLink to="/watchlist" className={navLinkStyles}>
              Watchlist
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              About
            </NavLink>
          </nav>

          {/* USER MENU (Sia Desktop che Mobile) */}
          <div className="flex items-center gap-4">
            <div
              className="user-menu relative cursor-pointer"
              onClick={toggleClass}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
                <img
                  src={
                    userPhoto ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=MoodFlix"
                  }
                  alt="user-avatar"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>

              {/* Dropdown Menu - Rimosso 'hidden' fisso e aggiunto controllo isactive */}
              {isactive && (
                <div className="glass-card rounded-2xl absolute top-12 right-0 flex items-center justify-center min-w-[120px] shadow-xl border border-white/10 bg-black/80 backdrop-blur-md">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evita di chiudere il menu prima di aprire il popup
                      setShowConfirm(true);
                      setIsActive(false); // Chiude il dropdown dopo il click
                    }}
                    className="cursor-pointer select-none rounded-xl p-2.5 m-2 bg-[#7c0c92] hover:bg-[#620a74] text-white text-sm w-full transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* POPUP DI CONFERMA - Spostato qui fuori così è globale */}
      {showConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="h-screen fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-[#14161D] text-white p-6 rounded-2xl border-2 border-primary/20 shadow-2xl max-w-sm w-full mx-4">
            <p className="mb-6 text-center text-lg font-medium">
              Sei sicuro di voler uscire?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-6 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => setShowConfirm(false)}
              >
                Annulla
              </button>
              <button
                className="px-6 py-2 rounded-xl bg-[#7c0c92] hover:bg-[#620a74] transition-colors cursor-pointer font-bold"
                onClick={async (e) => {
                  e.stopPropagation();
                  setShowConfirm(false);
                  await handleLogout();
                }}
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
