import { useState } from "react";
import { QUIZ_QUESTIONS } from "../data";
import { Check, RotateCcw, Sparkles, Clipboard, AlertCircle, HeartCrack } from "lucide-react";

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Toggle answer checkboxes
  const handleCheckboxChange = (id: number) => {
    if (quizSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Submit and calculate points
  const handleSubmitQuiz = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (answers[q.id]) {
        score += q.points;
      }
    });
    setFinalScore(score);
    setQuizSubmitted(true);
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById("quiz-result-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Reset quiz state
  const handleResetQuiz = () => {
    setAnswers({});
    setQuizSubmitted(false);
    setFinalScore(0);
  };

  // Determine Result level
  // Max possible score = 3 + 2 + 4 + 5 + 3 + 4 = 21 points
  // Score mapping:
  // <= 5: Masih Aman (Low risk)
  // 6 - 13: Waspada (Medium risk)
  // >= 14: Red Flag (High risk)
  const getResultType = () => {
    if (finalScore <= 5) return "aman";
    if (finalScore <= 13) return "waspada";
    return "redflag";
  };

  return (
    <section className="relative w-full py-16 px-4 bg-grid-paper border-b-2 border-vintage-black">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 relative">
          <span className="font-hand text-lg text-dusty-red bg-white px-3.5 py-1 border border-dashed border-vintage-black rounded transform rotate-2 inline-block">
            🔍 Bab III: Cermin Kaca Digital
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-vintage-black mt-2">
            Bagaimana Etika Siber Kamu?
          </h2>
          <p className="font-sans text-xs text-faded-gray uppercase tracking-widest mt-1">
            Self-Check Keberadaan Empati di Jempol Kita
          </p>
        </div>

        {/* Notebook Spiral-Bind Container */}
        <div className="bg-white border-2 border-vintage-black rounded-lg shadow-collage relative overflow-hidden">
          
          {/* Top binder strip with circle binder holes */}
          <div className="bg-warm-beige border-b-2 border-vintage-black h-8 px-8 flex items-center justify-between">
            <div className="flex gap-4">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="w-4.5 h-4.5 rounded-full bg-stone-300 border border-stone-500 block shrink-0 shadow-inner"></span>
              ))}
            </div>
            <span className="font-mono text-[9px] text-faded-gray uppercase tracking-widest hidden sm:inline">FORM_SHEET // DIGITAL WELLNESS CHECK</span>
          </div>

          <div className="p-6 sm:p-10 bg-lined-paper relative">
            
            {/* Introductory instructions prompt */}
            <div className="mb-8 p-5 bg-cream border border-stone-300 rounded transform -rotate-0.5 relative">
              <span className="absolute -top-3 left-6 w-16 h-4 tape-overlay"></span>
              <p className="font-serif text-sm italic text-vintage-black leading-relaxed">
                "Jujurlah pada selembar kertas ini. Tidak ada database server yang menyimpan jawabanmu. Sesi ini sepenuhnya bersifat privat, antara komitmen nuranimu dan kebenaran siber."
              </p>
            </div>

            {/* Quiz Questions List */}
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isChecked = !!answers[q.id];
                return (
                  <div 
                    key={q.id}
                    onClick={() => handleCheckboxChange(q.id)}
                    className="flex items-start gap-4 p-3 bg-white/40 hover:bg-white/80 border border-transparent hover:border-stone-300 rounded-lg cursor-pointer transition-all duration-200"
                  >
                    {/* Hand-drawn checkbox button target */}
                    <div className="mt-1 shrink-0">
                      <button
                        id={`quiz-checkbox-${q.id}`}
                        type="button"
                        className={`w-6 h-6 rounded-full border-2 border-vintage-black flex items-center justify-center transition-all ${
                          isChecked 
                            ? "bg-dusty-red text-white" 
                            : "bg-transparent hover:bg-stone-100"
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 text-white stroke-[3px]" />}
                      </button>
                    </div>

                    {/* Question copies */}
                    <div className="flex-1">
                      <span className="font-mono text-[9px] uppercase font-bold text-dusty-blue tracking-wide bg-blue-50/70 border border-blue-200 px-2 py-0.5 rounded">
                        {q.category}
                      </span>
                      <h4 className="font-serif text-base font-bold text-vintage-black mt-1.5 leading-snug">
                        {idx + 1}. {q.question}
                      </h4>
                      <p className="font-sans text-xs text-faded-gray mt-1 leading-relaxed">
                        {q.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons Frame */}
            <div className="mt-10 pt-6 border-t border-dashed border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-hand text-lg text-faded-gray">
                ✍️ {QUIZ_QUESTIONS.length - Object.keys(answers).length} pertanyaan belum terjawab...
              </p>

              <div className="flex gap-3 w-full sm:w-auto">
                {quizSubmitted && (
                  <button
                    id="quiz-reset-button"
                    onClick={handleResetQuiz}
                    className="px-5 py-2.5 bg-warm-beige text-vintage-black border border-vintage-black rounded hover:bg-kraft transition-colors font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Ulangi Test
                  </button>
                )}
                
                <button
                  id="quiz-submit-button"
                  onClick={handleSubmitQuiz}
                  className="flex-1 sm:flex-none px-8 py-3 bg-vintage-black text-cream hover:bg-dusty-red hover:text-white rounded font-serif text-base font-bold tracking-wide shadow-collage transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Clipboard className="w-4 h-4" /> {quizSubmitted ? "Lihat Analisis" : "Mulai Self-Check"}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RESULTS GRAPHIC SECTION */}
        <div id="quiz-result-anchor" className="mt-12">
          {quizSubmitted && (
            <div className="space-y-6">
              
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-faded-gray">Hasil Skor Pemeriksaan Mandiri</p>
                <div className="font-serif text-4xl font-extrabold text-vintage-black mt-1">Skor: {finalScore} / 21</div>
              </div>

              {/* LEVEL 1: MASIH AMAN */}
              {getResultType() === "aman" && (
                <div className="p-6 sm:p-8 bg-cream border-2 border-vintage-black rounded-lg shadow-collage relative transform rotate-[0.5deg]">
                  {/* Adhesive tape cover */}
                  <div className="absolute -top-3 left-1/3 w-32 h-6 tape-overlay"></div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-dashed border-vintage-black/20 pb-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-dusty-blue tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded inline-block">
                        LEVEL KESEHATAN DIGITAL
                      </span>
                      <h3 className="font-serif text-3xl font-extrabold text-slate-800 tracking-tight mt-2 flex items-center gap-2">
                        🌿 Masih Aman
                      </h3>
                    </div>
                    <span className="text-4xl">🌤️</span>
                  </div>

                  <div className="mt-5 space-y-3.5 text-vintage-black">
                    <p className="font-sans text-sm sm:text-base leading-relaxed">
                      Luar biasa! Analisis menunjukkan kamu memiliki pertahanan empati digital yang sehat. Kamu masih memperlakukan profil media sosial sebagai manusia nyata berjiwa sensitif di balik layar, bukan melulu NPC.
                    </p>
                    <p className="font-hand text-lg text-slate-700 italic">
                      “Teruskan memancarkan kehangatan di sela-sela status penuh guntur internet.”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-mono text-faded-gray">
                    <Sparkles className="w-3.5 h-3.5 text-dusty-blue animate-pulse" />
                    <span>Langkah rekomendasi: Pertahankan, jadilah pelopor kampanye literasi digital di sekitarmu.</span>
                  </div>
                </div>
              )}

              {/* LEVEL 2: WASPADA */}
              {getResultType() === "waspada" && (
                <div className="p-6 sm:p-8 bg-[#fffbeb] border-2 border-vintage-black rounded-lg shadow-collage relative transform -rotate-[0.5deg]">
                  {/* Adhesive tape cover */}
                  <div className="absolute -top-3 right-1/4 w-32 h-6 tape-overlay-blue"></div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-dashed border-vintage-black/20 pb-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-amber-800 tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded inline-block">
                        LEVEL KESEHATAN DIGITAL
                      </span>
                      <h3 className="font-serif text-3xl font-extrabold text-amber-900 tracking-tight mt-2 flex items-center gap-2">
                        ⚠️ Waspada
                      </h3>
                    </div>
                    <span className="text-4xl">⏳</span>
                  </div>

                  <div className="mt-5 space-y-3.5 text-vintage-black">
                    <p className="font-sans text-sm sm:text-base leading-relaxed">
                      Kamu berada di area abu-abu. Kadang kala, karena dinamika perdebatan yang intens atau terbawa emosi siber, kamu melupakan batas etika berkomunikasi. Kamu tanpa sadar kerap melempar sindiran pasif-agresif digital.
                    </p>
                    
                    {/* Messy mock comments overlap layout */}
                    <div className="my-4 p-3 bg-white/60 rounded border border-amber-200/50 flex flex-col gap-1.5 opacity-80">
                      <p className="font-mono text-[10px] text-amber-900/60 uppercase">Dinamika Perilaku Kamu baru-baru ini:</p>
                      <p className="font-serif text-xs italic text-vintage-black">"Iya deh paling bener sedunia..."</p>
                      <p className="font-serif text-xs italic text-vintage-black">"Lucu banget tapi kasihan mental korbannya."</p>
                    </div>

                    <p className="font-hand text-lg text-amber-800 font-semibold italic">
                      “Lambaian jari mungkin kecil, namun bayangnya melintasi batas kepedulian.”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200/50 flex items-center gap-2 text-xs font-mono text-faded-gray">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Saran kampanye: Mulailah mengambil jeda 3 detik sebelum mengetik balasan teks panas.</span>
                  </div>
                </div>
              )}

              {/* LEVEL 3: RED FLAG */}
              {getResultType() === "redflag" && (
                <div className="p-6 sm:p-8 bg-red-50 border-2 border-vintage-black rounded-lg shadow-collage relative transform rotate-[0.5deg]">
                  {/* Adhesive red label mark style */}
                  <div className="absolute -top-3.5 left-6 px-3 py-1 bg-red-700 text-cream text-[10px] font-mono tracking-widest rounded shadow-md uppercase">
                    🚩 KRITIS EMPATI DIGITAL
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-dashed border-vintage-black/20 pb-5 pt-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-red-700 tracking-widest bg-red-100 border border-red-200 px-3 py-1 rounded inline-block">
                        LEVEL KESEHATAN DIGITAL
                      </span>
                      <h3 className="font-serif text-3xl font-extrabold text-red-950 tracking-tight mt-2 flex items-center gap-2">
                        🚨 Red Flag
                      </h3>
                    </div>
                    <span className="text-4xl">🔥</span>
                  </div>

                  <div className="mt-5 space-y-3.5 text-red-950">
                    <p className="font-sans text-sm sm:text-base leading-relaxed">
                      Sinyal bahaya berbunyi. Keberadaan filter anonimitas di internet telah mendetoksifikasi sanksi emosionalmu, membuatmu sangat mudah terpancing atau ikut andil menyerang orang lain secara siber tanpa rasa bersalah.
                    </p>
                    
                    {/* Collaging chaotic comments to show confrontation */}
                    <div className="p-4 bg-zinc-950 text-stone-200 rounded border border-red-900/40 relative overflow-hidden my-4">
                      <div className="absolute top-1 right-2 font-mono text-[9px] text-red-600 uppercase">Collage Toksitas</div>
                      <p className="font-serif text-[11px] text-stone-300 line-through decoration-red-600 block mb-1">"Bisa diem ga sih lu sok imut bgt?"</p>
                      <p className="font-serif text-[11px] text-stone-300 block">"Mending ga usah upload kalo gamau dikritik!"</p>
                    </div>

                    <p className="font-hand text-lg text-red-800 font-extrabold italic">
                      “Luka psikologis yang kamu buat di layar orang lain bisa berbekas seumur hidup mereka.”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-red-200 flex items-center gap-2 text-xs font-mono text-red-900">
                    <HeartCrack className="w-3.5 h-3.5 text-red-700 shrink-0" />
                    <span className="font-semibold">Saran Refleksi: Tutup media sosialmu selama 24 jam. Jalin kontak nyata dengan orang terdekatmu.</span>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
