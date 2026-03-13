interface Mood {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

const moods: Mood[] = [
  { id: "happy", name: "Happy", icon: "sun", color: "text-yellow-400", gradient: "from-yellow-400/20 to-orange-400/20" },
  { id: "sad", name: "Sad", icon: "cloud-rain", color: "text-blue-400", gradient: "from-blue-400/20 to-indigo-400/20" },
  { id: "excited", name: "Excited", icon: "zap", color: "text-orange-400", gradient: "from-orange-400/20 to-red-400/20" },
  { id: "relaxed", name: "Relaxed", icon: "moon", color: "text-emerald-400", gradient: "from-emerald-400/20 to-teal-400/20" },
  { id: "romantic", name: "Romantic", icon: "heart", color: "text-pink-400", gradient: "from-pink-400/20 to-rose-400/20" },
  { id: "scared", name: "Thrilled", icon: "ghost", color: "text-purple-400", gradient: "from-purple-400/20 to-violet-400/20" },
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
}

function MoodIcon({ icon, className }: { icon: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    sun: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    "cloud-rain": (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M16 14v6M8 14v6M12 16v6" />
      </svg>
    ),
    zap: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </svg>
    ),
    moon: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
    heart: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    ghost: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
      </svg>
    ),
  };
  return icons[icon] || null;
}

export default function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-foreground">How are you feeling today?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelectMood(mood.id)}
            className={`
              group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl
              transition-all duration-300 ease-out cursor-pointer
              glass-card hover:scale-105
              ${selectedMood === mood.id 
                ? `bg-gradient-to-br ${mood.gradient} border-white/20 shadow-lg` 
                : "hover:bg-white/5"
              }
            `}
          >
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center
              bg-gradient-to-br ${mood.gradient}
              transition-transform duration-300 group-hover:scale-110
            `}>
              <MoodIcon icon={mood.icon} className={`w-6 h-6 ${mood.color}`} />
            </div>
            <span className={`text-sm font-medium ${selectedMood === mood.id ? "text-foreground" : "text-muted-foreground"}`}>
              {mood.name}
            </span>
            {selectedMood === mood.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
