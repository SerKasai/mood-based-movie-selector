import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Ciao! Sono MoodFlix AI. Di quale film o serie tv vogliamo parlare oggi?",
    },
  ]);

  // Helper per cercare film e trasformarli in testo per l'IA
  const fetchMoviesForAI = async (userQuery: string) => {
    const API_KEY = "0d3354632adb7f6817b24a58e0fd32dd";
    const currentYear = new Date().getFullYear();

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=it-IT&sort_by=popularity.desc`;

    // Mappatura generi
    const genres: { [key: string]: number } = {
      horror: 27,
      azione: 28,
      avventura: 12,
      animazione: 16,
      commedia: 35,
      crime: 80,
      documentario: 99,
      dramma: 18,
      famiglia: 10751,
      fantasy: 14,
      storia: 36,
      musica: 10402,
      mistero: 9648,
      romantico: 10749,
      fantascienza: 878,
      thriller: 53,
      guerra: 10752,
      western: 37,
    };

    Object.keys(genres).forEach((genre) => {
      if (userQuery.toLowerCase().includes(genre))
        url += `&with_genres=${genres[genre]}`;
    });

    if (
      userQuery.toLowerCase().includes("quest'anno") ||
      userQuery.toLowerCase().includes("2026") ||
      userQuery.toLowerCase().includes("recenti")
    ) {
      url += `&primary_release_year=${currentYear}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.results || data.results.length === 0)
        return "Nessun film recente trovato nei database.";

      return data.results
        .slice(0, 5)
        .map(
          (m: any) =>
            `- ${m.title} (Uscita: ${m.release_date}): ${m.overview.substring(0, 160)}...`,
        )
        .join("\n");
    } catch (e) {
      return "Errore nel recupero dati da TMDB.";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    // Aggiungiamo subito il messaggio dell'utente alla lista visibile
    const newMessages = [
      ...messages,
      { role: "user" as const, content: userMsg },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // 1. Recupero dati TMDB
      const movieData = await fetchMoviesForAI(userMsg);

      // 2. Costruzione del Super-Prompt (Obblighiamo l'IA a credere di essere nel 2026)
      const finalSystemPrompt = `Sei MoodFlix AI, un esperto cinematografico nel 2026.
      REGOLE MANDATORIE:
      1. Rispondi SOLO su film, serie tv e anime. 
      2. Se la domanda è OFF-TOPIC, rifiuta e consiglia un film a tema (es. meteo -> film catastrofici).
      3. NON dire mai "Non ho dati dopo il 2023" o "Le mie informazioni sono limitate". 
      4. USA i seguenti dati reali appena recuperati da TMDB per rispondere alla domanda dell'utente:
      
      DATI TMDB AGGIORNATI (2026):
      ${movieData}

      5. Per ogni film citato, suggerisci su quali piattaforme cercarlo (Netflix, Disney+, Prime Video, ecc.).`;

      // 3. Chiamata a Groq
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: finalSystemPrompt },
              ...newMessages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.6,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Errore API");

      const botText = data.choices[0].message.content;

      // Aggiorniamo la chat con la risposta dell'IA
      setMessages([...newMessages, { role: "assistant", content: botText }]);
    } catch (error) {
      console.error("Errore Chatbot:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Scusa, ho avuto un corto circuito. Riprova tra un attimo!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-28 px-6 text-white min-h-screen flex flex-col items-center font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 px-6 self-start">
        MoodFlix AI
      </h1>

      <div className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-2xl p-4 h-[60vh] overflow-y-auto mb-4 flex flex-col gap-4 shadow-2xl">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-2 ${
              msg.role === "user"
                ? "bg-[#9605bb] self-end rounded-tr-none"
                : "bg-[#1a1c23] self-start rounded-tl-none border border-white/5"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </p>
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500 text-xs animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
            L'IA sta consultando i database...
          </div>
        )}
      </div>

      <div className="flex gap-2 w-full max-w-2xl justify-center">
        <input
          className="flex-1 bg-[#1a1c23] border border-white/10 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9605bb] transition-all"
          placeholder="Chiedimi consigli su cosa guardare"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="bg-[#9605bb] px-6 py-4 rounded-xl font-bold hover:bg-[#7c0c92] disabled:opacity-50 transition-all shadow-lg active:scale-95"
        >
          {isLoading ? "..." : "Invia"}
        </button>
      </div>
    </div>
  );
}
