import { motion } from "motion/react";
import { DISINHIBITION_CONCEPTS, ASSETS } from "../data";
import { HelpCircle, Sparkles, ShieldCheck, HeartCrack, EyeOff } from "lucide-react";

export default function Disinhibition() {
  return (
    <section className="relative w-full py-16 px-4 bg-vintage-black text-cream overflow-hidden">
      
      {/* Distressed grain simulation */}
      <div className="distressed-texture opacity-[0.25]"></div>

      {/* Ripped Paper Transitions at top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),transparent)] z-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Area: Darkened polaroid & Fragmented collage with visual disinhibition asset */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="polaroid-frame bg-stone-900 border-stone-800 p-3 pb-8 text-stone-200 transform -rotate-3 hover:rotate-1 transition-transform duration-500 max-w-sm shadow-collage-lg relative">
              <span className="absolute -top-4 right-10 w-24 h-6 tape-overlay z-20 opacity-90"></span>
              
              {/* Primary custom assets from compiler */}
              <div className="w-full h-80 overflow-hidden bg-zinc-950 border border-stone-800 rounded">
                <img
                  src={ASSETS.disinhibition}
                  alt="Anonymity art collage"
                  className="w-full h-full object-cover filter grayscale contrast-125 mb-4 select-none opacity-85 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 pt-1.5 border-t border-dashed border-stone-800 text-center px-1">
                <p className="font-hand text-xl text-stone-300">"Wajah tersembunyi, rem rem emosi terbakar sunyi."</p>
                <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block mt-1.5">COLLAGE INDEX // DEINDIVIDUASI DEEP DATA</span>
              </div>
            </div>

            {/* Floating disrupted bubble overlays */}
            <div className="absolute top-5 left-[-20px] bg-red-950/90 text-red-100 border border-red-800 text-xs px-3.5 py-1.5 rounded rotate-12 shadow-collage hidden sm:block font-serif max-w-[180px]">
              💀 "Lagian dia dibilangin malah ngeyel sih!"
            </div>

            <div className="absolute bottom-8 right-[-20px] bg-stone-900 text-stone-300 border border-stone-700 text-xs px-3.5 py-1.5 rounded -rotate-6 shadow-collage hidden sm:block font-serif max-w-[180px]">
              💬 "Hapus aja akun lo ga berguna!"
            </div>
          </div>

          {/* Right Area: Narrative Copy and Concepts */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-dusty-blue font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Mengapa kita berubah di internet?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream leading-tight">
                Online Disinhibition Effect
              </h2>
              <p className="font-sans text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl font-light">
                Diperkenalkan oleh psikolog John Suler, fenomena ini mendikte bahwa orang merasa memiliki kelonggaran norma sosial, merasa aman tanpa konsekuensi, dan bertindak lebih impulsif saat berkomunikasi di dunia maya dibanding dunia nyata.
              </p>
            </div>

            {/* Keyword tags board requested by prompt */}
            <div className="flex flex-wrap gap-2.5">
              {["anonim", "impulsif", "tanpa konsekuensi", "toxic debate", "emotional release"].map((kw) => (
                <span 
                  key={kw}
                  className="text-xs font-mono px-3.5 py-1 bg-red-950/50 text-red-200 border border-red-800 rounded-full font-semibold uppercase tracking-wider"
                >
                  #{kw}
                </span>
              ))}
            </div>

            {/* Concept cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DISINHIBITION_CONCEPTS.map((concept, index) => (
                <div 
                  key={index} 
                  className="p-5 rounded-lg bg-stone-900 border border-stone-800 hover:border-dusty-blue/40 transition-colors shadow-collage relative hover:scale-[1.02] duration-300 group"
                >
                  <span className="absolute top-3 right-3 text-[10px] font-mono text-stone-600 font-bold group-hover:text-dusty-blue">
                    CONCEPT 0{index + 1}
                  </span>
                  
                  <h4 className="font-serif text-base font-bold text-cream mb-1 group-hover:text-amber-100 transition-colors">
                    {concept.keyword}
                  </h4>
                  
                  <blockquote className="font-hand text-sm text-dusty-red italic font-semibold mb-2">
                    {concept.tagline}
                  </blockquote>
                  
                  <p className="font-sans text-xs text-stone-400 leading-relaxed font-light">
                    {concept.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Immersive Warning Quote Box */}
            <div className="p-4 bg-stone-950 border-l-4 border-dusty-red rounded-r-lg space-y-1">
              <p className="font-mono text-[10px] uppercase text-stone-500 tracking-wider font-extrabold">🚨 PENELITIAN PSIKOSOSIAL</p>
              <p className="font-sans text-[12px] text-stone-300 italic">
                “Penyerang siber bukanlah penjahat bawaan lahir. Mereka seringkali adalah tetangga kita, teman bermain, atau diri kita sendiri saat tidak sadar sedang termakan ilusi anonimitas.”
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
