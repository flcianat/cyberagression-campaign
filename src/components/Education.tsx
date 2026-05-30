import { useState } from "react";
import { EDUCATION_CARDS } from "../data";
import { Check, ClipboardList, AlertCircle, Quote, EyeOff } from "lucide-react";

export default function Education() {
  const [revealedComment, setRevealedComment] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string, idx: number) => {
    const key = `${id}-${idx}`;
    setRevealedComment(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative w-full py-16 px-4 bg-kraft overflow-hidden border-t-2 border-b-2 border-vintage-black">
      
      {/* Tape on edges to hold section */}
      <div className="absolute top-4 left-1/3 w-32 h-6 tape-overlay z-20"></div>
      <div className="absolute bottom-4 right-1/4 w-36 h-7 tape-overlay-blue z-20"></div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 relative">
          <span className="font-hand text-xl text-vintage-black bg-cream/70 px-4 py-1.5 border border-dashed border-vintage-black rounded-lg inline-block transform -rotate-1 mb-2.5">
            📝 Bab I: Menggali Kebenaran Psikis
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-vintage-black font-extrabold tracking-tight mt-1">
            "Cuma komentar doang. Serius?"
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-faded-gray mt-2 font-semibold">
            Anatomi Cyberaggression di Dunia Maya
          </p>
        </div>

        {/* Responsive Scrapbook Row/Grid with Improved Gap */}
        <div className="flex flex-col gap-12">
          
          {/* Left Block: White Ripped Paper Educational Cards styled as premium Binder Journal Sheets */}
          <div className="space-y-10 max-w-4xl mx-auto w-full">
            {EDUCATION_CARDS.map((card, cardIdx) => (
              <div 
                key={card.id}
                className="ripped-card pl-14 pr-6 sm:pl-16 sm:pr-8 py-7 sm:py-8 rounded-lg shadow-collage relative bg-white border border-vintage-black/10 transform transition-all duration-300 hover:scale-[1.01] overflow-hidden"
              >
                {/* Vintage torn note page border design */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-300 to-transparent"></div>
                
                {/* Notebook Binder Rings Simulation (Left Gutter) */}
                <div className="absolute left-3 sm:left-4.5 top-0 bottom-0 py-8 flex flex-col justify-between pointer-events-none select-none z-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-kraft border border-stone-400/40 shadow-inner flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700/10"></div>
                    </div>
                  ))}
                </div>

                {/* Notebook Red Margin Line */}
                <div className="absolute left-10 sm:left-12 top-0 bottom-0 border-l border-red-200 pointer-events-none z-10"></div>

                {/* Category Pin and Stickers */}
                <div className="flex flex-wrap gap-2 mb-4 items-center">
                  {card.stickers.map((stk, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 bg-warm-beige text-vintage-black border border-vintage-black rounded"
                    >
                      {stk}
                    </span>
                  ))}
                  <span className="ml-auto font-mono text-[10px] text-faded-gray/80 italic font-medium bg-stone-100 px-2 py-0.5 rounded">
                    #{cardIdx + 1} Journal Sheet
                  </span>
                </div>

                {/* Card Title with handwritten highlight feel */}
                <div className="mb-4">
                  <h3 className="font-serif text-2xl sm:text-3xl text-vintage-black font-black tracking-tight relative inline-block">
                    {card.title}
                    <span className="absolute bottom-1 left-0 w-full h-[8px] bg-yellow-200/50 -z-10 rounded"></span>
                  </h3>
                </div>

                {/* General Indonesian context paragraph */}
                <p className="font-sans text-sm sm:text-base text-vintage-black leading-relaxed mb-6 font-normal">
                  {card.rawText}
                </p>

                {/* Sub annotations representing journal points */}
                <div className="border-t border-dashed border-stone-200 pt-5 space-y-4">
                  <h4 className="font-mono text-xs font-bold text-vintage-black uppercase tracking-wider flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-dusty-blue" /> Catatan Psikologis Peneliti:
                  </h4>
                  <ul className="space-y-3.5 pl-1">
                    {card.notes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-cream font-mono text-xs flex items-center justify-center border border-vintage-black text-vintage-black shrink-0 font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-faded-gray leading-relaxed font-semibold">
                          {note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Toxic Comments interactive demo (Blurred comment overlay) */}
                {card.comments && card.comments.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-stone-150 bg-cream/45 p-4 rounded-lg border border-stone-200/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3.5">
                      <span className="font-mono text-[10px] uppercase font-bold text-dusty-red tracking-wider flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Sample Komentar Toksik Nyata:
                      </span>
                      <span className="font-hand text-xs text-faded-gray">Klik ikon mata untuk me-reveal kata-kata</span>
                    </div>

                    <div className="space-y-2.5">
                      {card.comments.map((comment, cIndex) => {
                        const isRevealed = !!revealedComment[`${card.id}-${cIndex}`];
                        return (
                          <div 
                            key={cIndex}
                            className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded border border-stone-200 gap-3 hover:border-stone-400/50 transition-colors"
                          >
                            <div className="flex-1">
                              <p 
                                className={`font-sans text-xs transition-all duration-300 ${
                                  isRevealed 
                                    ? "text-vintage-black filter-none" 
                                    : "text-red-900/30 select-none blur-[4.5px]"
                                } font-semibold`}
                              >
                                "{comment}"
                              </p>
                            </div>
                            <button
                              onClick={() => toggleReveal(card.id, cIndex)}
                              className="p-1.5 rounded text-stone-400 hover:text-vintage-black hover:bg-stone-100 transition-colors shrink-0 cursor-pointer"
                              title={isRevealed ? "Sembunyikan komentar" : "Tampilkan komentar secara aman"}
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Footnote citations resembling real academic inserts */}
                {card.citation && (
                  <div className="mt-5 flex items-center justify-start gap-1.5 font-mono text-[10px] text-faded-gray tracking-tight italic select-none">
                    <Quote className="w-3 h-3 text-kraft-dark" />
                    <span>Referensi: {card.citation}</span>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Right Block: Sticky Notes Board - Reconfigured as a wide horizontal board layout */}
          <div className="bg-cream/35 border-2 border-dashed border-vintage-black/15 p-6 rounded-2xl shadow-inner w-full">
            
            <div className="border-b border-vintage-black/10 pb-3 mb-6 flex items-center justify-center">
              <span className="font-mono text-xs text-[#827461] tracking-widest uppercase block font-extrabold">
                📌 PAPAN CATATAN TEMPILAN
              </span>
            </div>

            {/* Grid display layout making all three items 1 line (columns) on tablet & desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              {/* Taped Sticky Note 1: Anonymity and behaviour */}
              <div className="p-6 bg-cream border-2 border-vintage-black shadow-collage rounded transform rotate-[-0.5deg] relative flex flex-col justify-between">
                <div>
                  {/* Sticker overlay tapes */}
                  <div className="absolute -top-4 left-1/4 w-20 h-5 tape-overlay"></div>
                  
                  <h4 className="font-mono text-xs font-extrabold text-vintage-black tracking-wider uppercase mb-3 text-center border-b border-vintage-black/10 pb-1.5">
                    📌 DISINHIBITION 101
                  </h4>
                  <p className="font-serif text-sm italic text-vintage-black leading-relaxed">
                    "Orang berani bersembunyi karena tahu, jika mereka bertindak kasar secara offline berlapis sanksi hukum dan sosial, sedangkan online berujung sekedar log-out dari medsos."
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-dashed border-vintage-black/20 flex items-center justify-center">
                  <span className="font-hand text-xl text-dusty-red font-bold">#SaringSebelumSharing</span>
                </div>
              </div>

              {/* Sticky Card 2: Hand-drawn Statistics Poster with Pins */}
              <div className="p-6 bg-rose-50 border-2 border-dashed border-dusty-red/80 shadow-collage rounded-xl transform rotate-[0.5deg] relative flex flex-col justify-between">
                <div>
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-vintage-black border border-cream flex items-center justify-center font-mono text-xs text-cream uppercase font-bold">
                    %
                  </span>
                  <h4 className="font-serif text-xl font-bold text-vintage-black mb-3 border-b border-vintage-black/5 pb-1">
                    Angka Realita
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-xs text-faded-gray leading-tight">Korban Cyberbullying:</span>
                        <span className="font-serif text-3xl font-black text-dusty-red ml-2">49%</span>
                      </div>
                      <div className="h-3 w-full bg-stone-200/70 rounded-full overflow-hidden border border-vintage-black/5 p-0.5">
                        <div className="h-full bg-dusty-red rounded-full" style={{ width: "49%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-xs text-faded-gray leading-tight">Merasa Hanya 'Candaan':</span>
                        <span className="font-serif text-3xl font-black text-vintage-black ml-2">72%</span>
                      </div>
                      <div className="h-3 w-full bg-stone-200/70 rounded-full overflow-hidden border border-vintage-black/5 p-0.5">
                        <div className="h-full bg-vintage-black rounded-full" style={{ width: "72%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-dashed border-stone-300">
                  <p className="font-hand text-base text-vintage-black text-center leading-tight">
                    "Apakah komentar terakhirmu termasuk salah satu dari gurauan yang fatal?"
                  </p>
                </div>
              </div>

              {/* Sticky Card 3: Checklist reminder */}
              <div className="p-6 bg-blue-50 border-2 border-vintage-black shadow-collage rounded transform rotate-[-0.5deg] relative flex flex-col justify-between">
                <div>
                  <div className="absolute -top-3 right-[10%] w-16 h-4 tape-overlay-blue"></div>
                  <h4 className="font-mono text-xs font-bold text-vintage-black uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-dusty-blue" /> Check Sebelum Ketik:
                  </h4>
                  <ul className="space-y-3 text-xs font-sans text-vintage-black">
                    <li className="flex items-start gap-2.5">
                      <span className="w-4 h-4 border-2 border-vintage-black rounded flex items-center justify-center shrink-0 mt-0.5 bg-white text-[9px] font-black text-sky-800">
                        ✓
                      </span>
                      <span className="leading-tight font-medium">Apakah saya kenal baik dengannya?</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-4 h-4 border-2 border-vintage-black rounded flex items-center justify-center shrink-0 mt-0.5 bg-white text-[9px] font-black text-sky-800">
                        ✓
                      </span>
                      <span className="leading-tight font-medium">Berani mengucapkannya langsung?</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-4 h-4 border-2 border-vintage-black rounded flex items-center justify-center shrink-0 mt-0.5 bg-white text-[9px] font-black text-sky-800">
                        ✓
                      </span>
                      <span className="leading-tight font-medium">Kritik membangun atau sekedar mengejek?</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-dashed border-vintage-black/10 text-center">
                  <p className="font-sketch text-2.5xl text-dusty-blue leading-none font-bold">Empati itu gratis.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
