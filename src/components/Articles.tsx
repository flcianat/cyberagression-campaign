import { useState } from "react";
import { ARTICLES } from "../data";
import { BookOpen, Calendar, Clock, X, Heart, Sparkles, Pin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Articles() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Find active article context
  const activeArticle = ARTICLES.find(a => a.id === selectedArticleId);

  return (
    <section className="relative w-full py-16 px-4 bg-grid-paper border-b-2 border-vintage-black">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 relative">
          <span className="font-hand text-xl text-dusty-red bg-white/80 px-4 py-1.5 border border-dashed border-vintage-black rounded transform -rotate-2 inline-block">
            ☕ Bab V: Meja Kopi & Jurnal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-vintage-black font-extrabold tracking-tight mt-1">
            Artikel Kampanye
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-faded-gray font-bold">
            Esai Psikologi Siber & Kemanusiaan Digital
          </p>
        </div>

        {/* Pinterest-style dynamic cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art, idx) => {
            // Apply unique rotation to each card to represent loose paper scraps
            const rotations = ["-rotate-1", "rotate-1", "-rotate-2"];
            const currentRotation = rotations[idx % rotations.length];

            return (
              <div 
                key={art.id}
                onClick={() => setSelectedArticleId(art.id)}
                className={`p-5 bg-white border-2 border-vintage-black rounded-lg shadow-collage relative ${currentRotation} hover:rotate-0 hover:-translate-y-1 hover:shadow-collage-lg transition-all duration-300 cursor-pointer flex flex-col justify-between`}
              >
                {/* Visual pin on top */}
                <div className="absolute top-[-10px] left-1/2 -ml-3 z-10">
                  <Pin className="w-5.5 h-10 text-dusty-red transform rotate-12 drop-shadow" />
                </div>

                <div>
                  {/* Polaroid Simulation thumbnail inside the Card */}
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded text-center mb-4">
                    <div className="w-full h-40 bg-kraft/20 rounded flex items-center justify-center overflow-hidden relative border border-stone-100">
                      {art.polaroidUrl ? (
                        <img 
                          src={art.polaroidUrl} 
                          alt={art.polaroidCaption || art.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <>
                          {/* Generative texture & thematic icon overlay */}
                          <div className="absolute inset-0 bg-[radial-gradient(#3c3a37_1px,transparent_0)] bg-[size:16px_16px] opacity-10 pointer-events-none"></div>
                          <BookOpen className="w-10 h-10 text-vintage-black/30" />
                        </>
                      )}
                    </div>
                    <p className="font-hand text-base text-[#827461] mt-2 truncate">
                      📸 “{art.polaroidCaption}”
                    </p>
                  </div>

                  {/* Metadatas */}
                  <div className="flex gap-2 mb-2 w-full">
                    {art.stickers.map((st, sIndex) => (
                      <span 
                        key={sIndex}
                        className="text-[9px] font-mono font-bold tracking-wider bg-warm-beige/80 border border-stone-300 text-vintage-black px-2 py-0.5 rounded"
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-extrabold text-vintage-black leading-tight hover:text-dusty-red transition-colors">
                    {art.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-sans text-xs text-faded-gray mt-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="mt-5 pt-3 border-t border-dashed border-stone-200 flex items-center justify-between font-mono text-[9px] text-faded-gray">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {art.date}
                  </span>
                  <span className="flex items-center gap-1 bg-cream border border-stone-200/80 px-1.5 py-0.5 rounded font-semibold text-vintage-black">
                    <Clock className="w-2.5 h-2.5" /> {art.readTime}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* FULL ARTICLE OVERLAY DIALOG MODAL */}
        <AnimatePresence>
          {selectedArticleId && activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vintage-black/70 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white border-2 border-vintage-black rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-collage-lg flex flex-col relative"
              >
                
                {/* Tape strip style overlay */}
                <span className="absolute -top-3 left-1/3 w-32 h-6 tape-overlay z-10 block"></span>

                {/* Cover Header Bar */}
                <div className="bg-warm-beige border-b-2 border-vintage-black px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-vintage-black" />
                    <span className="font-mono text-[9px] text-faded-gray uppercase tracking-widest font-bold">EXCELLENT CYBER READER</span>
                  </div>
                  <button
                    id="close-article-overlay"
                    onClick={() => setSelectedArticleId(null)}
                    className="p-1 round border border-vintage-black/20 hover:border-vintage-black hover:bg-stone-100 transition-colors rounded text-vintage-black cursor-pointer"
                    title="Close reader"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Article Body Scroll */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-5 bg-lined-paper select-text">
                  
                  {/* Category labels and stats */}
                  <div className="flex items-center gap-3 font-mono text-[10px] text-faded-gray uppercase tracking-widest">
                    <span>{activeArticle.date}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-vintage-black leading-tight">
                    {activeArticle.title}
                  </h1>

                  {activeArticle.polaroidUrl && (
                    <div className="my-4 p-2.5 bg-warm-beige border border-stone-300 rounded shadow-collage-sm max-w-md mx-auto">
                      <div className="w-full h-48 rounded overflow-hidden border border-vintage-black/15">
                        <img 
                          src={activeArticle.polaroidUrl} 
                          alt={activeArticle.polaroidCaption || activeArticle.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="font-hand text-center text-sm text-[#827461] mt-2 select-none">
                        📸 “{activeArticle.polaroidCaption}”
                      </p>
                    </div>
                  )}

                  <blockquote className="my-2 p-3 bg-cream border-l-4 border-dusty-red italic font-sans text-xs sm:text-sm text-faded-gray leading-relaxed font-medium">
                    "{activeArticle.summary}"
                  </blockquote>

                  {/* Primary text display */}
                  <div className="font-sans text-sm sm:text-base text-vintage-black leading-relaxed space-y-4 font-normal">
                    {activeArticle.content.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Aesthetic closure */}
                  <div className="pt-6 border-t border-dashed border-stone-300 flex items-center justify-between">
                    <div>
                      <p className="font-hand text-xl text-dusty-red font-bold">“Selesai dibaca dengan rasa empati.”</p>
                      <p className="font-mono text-[8px] text-faded-gray uppercase">Kampanye Aksara Nurani Cyberpsychology</p>
                    </div>
                    <button
                      onClick={() => setSelectedArticleId(null)}
                      className="px-4 py-2 bg-vintage-black text-cream hover:bg-dusty-red hover:text-white rounded text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                    >
                      Tutup Lembaran
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
}
