import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  poster: string;
  description: string;
}

const moviesByMood: Record<string, Movie[]> = {
  happy: [
    { id: 1, title: "The Grand Budapest Hotel", year: 2014, rating: 8.1, genre: ["Comedy", "Drama"], poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", description: "A quirky tale of a legendary concierge and his lobby boy in a famous European hotel." },
    { id: 2, title: "La La Land", year: 2016, rating: 8.0, genre: ["Musical", "Romance"], poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", description: "A jazz pianist and an aspiring actress fall in love while pursuing their dreams in Los Angeles." },
    { id: 3, title: "Paddington 2", year: 2017, rating: 7.8, genre: ["Comedy", "Family"], poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop", description: "Paddington takes on odd jobs to buy a present for his aunt, but things go hilariously wrong." },
    { id: 4, title: "Ferris Bueller's Day Off", year: 1986, rating: 7.8, genre: ["Comedy"], poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop", description: "A high school student plays hooky for an epic day of adventure in Chicago." },
  ],
  sad: [
    { id: 5, title: "Eternal Sunshine", year: 2004, rating: 8.3, genre: ["Drama", "Romance"], poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", description: "A couple undergoes a procedure to erase each other from their memories after a painful breakup." },
    { id: 6, title: "The Pursuit of Happyness", year: 2006, rating: 8.0, genre: ["Drama", "Biography"], poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop", description: "A struggling salesman takes custody of his son while navigating homelessness and hardship." },
    { id: 7, title: "A Star Is Born", year: 2018, rating: 7.6, genre: ["Drama", "Music"], poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop", description: "A musician discovers and falls in love with a struggling artist while battling his own demons." },
    { id: 8, title: "The Fault in Our Stars", year: 2014, rating: 7.7, genre: ["Drama", "Romance"], poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop", description: "Two teenagers with cancer fall in love and embark on a journey to meet their favorite author." },
  ],
  excited: [
    { id: 9, title: "Mad Max: Fury Road", year: 2015, rating: 8.1, genre: ["Action", "Adventure"], poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop", description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland." },
    { id: 10, title: "Top Gun: Maverick", year: 2022, rating: 8.3, genre: ["Action", "Drama"], poster: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=600&fit=crop", description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator." },
    { id: 11, title: "Mission: Impossible", year: 2023, rating: 7.8, genre: ["Action", "Thriller"], poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop", description: "Ethan Hunt and his IMF team embark on their most dangerous mission yet." },
    { id: 12, title: "John Wick", year: 2014, rating: 7.4, genre: ["Action", "Thriller"], poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop", description: "An ex-hitman comes out of retirement to track down the gangsters who destroyed his life." },
  ],
  relaxed: [
    { id: 13, title: "The Secret Life of Walter Mitty", year: 2013, rating: 7.3, genre: ["Adventure", "Comedy"], poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop", description: "A daydreamer embarks on a global journey to track down a missing photograph." },
    { id: 14, title: "Chef", year: 2014, rating: 7.3, genre: ["Comedy", "Drama"], poster: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop", description: "A chef starts a food truck with his son after losing his restaurant job." },
    { id: 15, title: "Julie & Julia", year: 2009, rating: 7.0, genre: ["Biography", "Drama"], poster: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=600&fit=crop", description: "The story of Julia Child's career and a blogger who cooks all her recipes in one year." },
    { id: 16, title: "Lost in Translation", year: 2003, rating: 7.7, genre: ["Drama", "Romance"], poster: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=600&fit=crop", description: "Two Americans form an unlikely bond while staying at a Tokyo hotel." },
  ],
  romantic: [
    { id: 17, title: "The Notebook", year: 2004, rating: 7.8, genre: ["Drama", "Romance"], poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop", description: "A poor young man falls for a rich girl, leading to a passionate summer romance." },
    { id: 18, title: "Pride and Prejudice", year: 2005, rating: 7.8, genre: ["Drama", "Romance"], poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", description: "Elizabeth Bennet and Mr. Darcy overcome their initial impressions of each other." },
    { id: 19, title: "Before Sunrise", year: 1995, rating: 8.1, genre: ["Drama", "Romance"], poster: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop", description: "Two strangers meet on a train and spend one romantic night walking through Vienna." },
    { id: 20, title: "Crazy Rich Asians", year: 2018, rating: 6.9, genre: ["Comedy", "Romance"], poster: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=400&h=600&fit=crop", description: "A woman accompanies her boyfriend to Singapore for a wedding and discovers his family's wealth." },
  ],
  scared: [
    { id: 21, title: "Get Out", year: 2017, rating: 7.7, genre: ["Horror", "Thriller"], poster: "https://images.unsplash.com/photo-1509248961895-caffce3dea65?w=400&h=600&fit=crop", description: "A young man uncovers a disturbing secret when he meets his girlfriend's parents." },
    { id: 22, title: "A Quiet Place", year: 2018, rating: 7.5, genre: ["Horror", "Drama"], poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop", description: "A family must live in silence while hiding from creatures that hunt by sound." },
    { id: 23, title: "Hereditary", year: 2018, rating: 7.3, genre: ["Horror", "Mystery"], poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop", description: "A family is haunted by mysterious occurrences after their grandmother passes away." },
    { id: 24, title: "The Conjuring", year: 2013, rating: 7.5, genre: ["Horror", "Mystery"], poster: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=400&h=600&fit=crop", description: "Paranormal investigators help a family terrorized by a dark presence in their farmhouse." },
  ],
};

interface MovieGridProps {
  selectedMood: string | null;
}

export default function MovieGrid({ selectedMood }: MovieGridProps) {
  const movies = selectedMood ? moviesByMood[selectedMood] : [];

  if (!selectedMood) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15.91 11.72a.5.5 0 0 1 0 .56l-5.25 7.83a.5.5 0 0 1-.91-.28V13H5.5a.5.5 0 0 1-.41-.79l5.25-7.83a.5.5 0 0 1 .91.28V11h4.25a.5.5 0 0 1 .41.72z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Select Your Mood</h3>
        <p className="text-muted-foreground max-w-md">
          Choose how you're feeling above and we'll recommend the perfect movies to match your vibe.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Recommended for you
        </h2>
        <span className="text-sm text-muted-foreground">{movies.length} movies</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}
