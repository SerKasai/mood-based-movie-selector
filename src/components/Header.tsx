export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer">
              <img src="/emojione--movie-camera.png" alt="icon-camera" />
            </div>
            <span className="text-xl font-bold text-foreground">MoodFlix</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Discover
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Watchlist
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 text-muted-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M16.34 3.07h-2.69A5 5 0 0 0 8.7 8.73l.078 1.204a2 2 0 0 0 .257 3.975l.115 1.761a4.75 4.75 0 0 0 3.597 3.988A12.9 12.9 0 0 0 6.19 22.93v-.01a12.9 12.9 0 0 0-3.5 5.53v.11a3 3 0 0 0-.09.32l3.587.04l.002.01h17.62l.003-.01l3.588-.04l-.022-.059a.8.8 0 0 1-.068-.261v-.11a13 13 0 0 0-3.5-5.53v.01a12.9 12.9 0 0 0-6.552-3.27a4.75 4.75 0 0 0 3.602-3.99l.109-1.764a2 2 0 0 0 .245-3.961l.076-1.215a5 5 0 0 0-4.95-5.66"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
