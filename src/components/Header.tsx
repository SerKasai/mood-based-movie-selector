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
        ? "text-primary" // Classi per il tasto attivo
        : "text-muted-foreground hover:text-foreground" // Classi per i tasti inattivi
    }`;

  return (
    <header className="sticky top-0 z-50 glass border-b border-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
          <div className="hidden lg:flex items-center gap-4">
            {/* <SearchBar value={searchValue ?? ""} onChange={onSearchChange} /> */}
            <div className="user-menu cursor-pointer" onClick={toggleClass}>
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
              <div
                className={`${isactive ? "active" : ""} glass-card rounded-2xl absolute top-16 justify-self-center hidden items-center justify-center mr-8 lg:m-0`}
              >
                <button
                  onClick={() => setShowConfirm(true)}
                  className="cursor-pointer select-none rounded-2xl p-2.5 m-2.5 bg-[#0A0A0F] hover:bg-[#cb7dcc]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div id="hamburger-menu" className="flex lg:hidden">
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
            <div className="hidden lg:flex items-center gap-4">
              {/* <SearchBar value={searchValue ?? ""} onChange={onSearchChange} /> */}
              <div className="user-menu cursor-pointer" onClick={toggleClass}>
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
                <div
                  className={`${isactive ? "active" : ""} glass-card rounded-2xl absolute top-16 justify-self-center hidden items-center justify-center mr-8 lg:m-0`}
                >
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="cursor-pointer select-none rounded-2xl p-2.5 m-2.5 bg-[#0A0A0F] hover:bg-[#cb7dcc]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            {showConfirm && (
              <div
                role="dialog"
                aria-modal="true"
                className="h-screen fixed inset-0 z-60 flex items-center justify-center bg-black/50"
              >
                <div className="bg-[#14161D] text-white p-6 rounded-2xl border-double border-4 border-[#0A0A0F]">
                  <p className="mb-4">
                    Sei sicuro di voler effettuare il logout?
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      className="px-3 py-1 border rounded text-white border-none! bg-[#0A0A0F] cursor-pointer"
                      onClick={() => setShowConfirm(false)}
                    >
                      Annulla
                    </button>
                    <button
                      className="px-3 py-1  text-[#cb7dcc] rounded border-none! bg-[#0A0A0F] cursor-pointer"
                      onClick={async (e) => {
                        e.stopPropagation(); // Evita che il click chiuda accidentalmente altri menu sotto al modale
                        setShowConfirm(false); // Chiudiamo subito il modale per un feedback visivo istantaneo
                        await handleLogout(); // Facciamo partire il logout
                      }}
                    >
                      Conferma
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
