import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../components/FireBase/firebaseConfig";
import { Link, NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";

// 1. Definiamo i link fuori dal componente per mantenere il codice pulito (DRY)
const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/discover", label: "Discover" },
  { path: "/watchlist", label: "Watchlist" },
  { path: "/about", label: "About" },
];

export default function Header() {
  const [isactive, setIsActive] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.photoURL) setUserPhoto(user.photoURL);
    });
    return unsubscribe;
  }, []);

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
        ? "text-[#9605bb]"
        : "text-muted-foreground hover:text-foreground"
    }`;

  // 2. Mini-componente per l'Avatar così non duplichiamo l'HTML
  const UserAvatar = () => (
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
  );

  return (
    // Ho aggiunto bg-black/50 all'header principale per fargli avere l'effetto vetro
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md select-none border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img src="/emojione--movie-camera.png" alt="icon-camera" />
            </div>
            <img
              src="/logo_MoodFlix.png"
              alt="logo"
              className="h-10 object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.path} to={link.path} className={navLinkStyles}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SECTION: USER & MOBILE TOGGLE */}
          <div className="relative flex items-center">
            <button
              onClick={() => setIsActive(!isactive)}
              className="cursor-pointer focus:outline-none"
            >
              {/* Desktop: mostra Avatar / Mobile: mostra Hamburger */}
              <div className="hidden md:block">
                <UserAvatar />
              </div>
              <div className="block md:hidden">
                <Hamburger color="#3B82F6" rounded />
              </div>
            </button>

            {/* DROPDOWN MENU (Sia Desktop che Mobile) */}
            {isactive && (
              <div className="fixed lg:absolute top-16 lg:top-12.5 right-0 w-full md:w-[200px] bg-[#0A0A0F]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 flex flex-col gap-4 origin-top-right animate-in fade-in zoom-in-95">
                {/* Dettagli utente per il mobile dentro al menu */}
                <div className="flex flex-col items-center pb-4 border-b border-white/10 md:hidden">
                  <UserAvatar />
                </div>

                {/* Mobile Nav Links (nascosti su Desktop) */}
                <nav className="flex flex-col items-center gap-3 md:hidden border-b border-white/10 pb-4">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={navLinkStyles}
                      onClick={() => setIsActive(false)} // Chiude il menu al click
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>

                {/* Logout Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirm(true);
                    setIsActive(false);
                  }}
                  className="w-full text-center cursor-pointer rounded-xl py-2 bg-[#7c0c92]/20 hover:bg-[#7c0c92] text-white text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALE DI CONFERMA LOGOUT */}
      {showConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[#14161D] text-white p-6 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full mx-4 animate-in fade-in zoom-in-95">
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
                onClick={async () => {
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
