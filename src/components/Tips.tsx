import { WELLNESS_TIPS, ASSETS } from "../data";
import { Coffee, ShieldCheck, Heart, Leaf, CalendarDays } from "lucide-react";

export default function Tips() {
  return (
    <section className="relative w-full py-20 px-4 bg-cream overflow-hidden border-b-2 border-vintage-black">
      
      {/* Visual top and bottom separator */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-2">
          <span className="font-hand text-xl text-dusty-blue font-bold tracking-wide flex items-center justify-center gap-1.5">
            <Leaf className="w-5 h-5 text-dusty-blue animate-bounce" /> Bab IV: Penjaga Kedamaian Jiwa
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-vintage-black font-extrabold tracking-tight">
            Digital Wellness Tips
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-faded-gray font-semibold">
            Papan Pesan Analog untuk Jiwa yang Kelelahan Layar
          </p>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Cozy Flatlay Photo Collage */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            
            <div className="polaroid-frame bg-cream border-stone-200 p-3.5 pb-10 shadow-collage transform -rotate-2 hover:rotate-1 transition-transform duration-500 max-w-sm mx-auto relative">
              <span className="absolute -top-4 left-1/4 w-24 h-6 tape-overlay"></span>
              
              <div className="overflow-hidden bg-stone-50 border border-stone-200/60 rounded">
                <img
                  src={ASSETS.tips}
                  alt="Cozy digital wellness flatlay journal display"
                  className="w-full h-80 object-cover pointer-events-none select-none filter contrast-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center px-1">
                <p className="font-hand text-2xl text-stone-700 leading-tight">
                  “Dunia nyata menyambutmu siang ini.”
                </p>
                <div className="mt-2.5 flex items-center justify-between font-mono text-[9px] text-[#8c8273] uppercase tracking-widest border-t border-dashed border-stone-300 pt-2 px-1">
                  <span>Entry No. 04</span>
                  <span>Cozy Wellness</span>
                </div>
              </div>
            </div>

            {/* Cozy supportive message inside of a book card */}
            <div className="mt-6 p-4 bg-white border border-stone-300/80 rounded shadow-collage-sm max-w-sm mx-auto transform rotate-1 text-center">
              <span className="font-mono text-[10px] text-dusty-blue uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Coffee className="w-3.5 h-3.5" /> AMBIENT CALM INSIGHT
              </span>
              <p className="font-sans text-[11px] text-faded-gray mt-1 leading-relaxed">
                "Kesejahteraan mental digital dimulai dengan memberikan hak istirahat kepada kelopak matamu."
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Scrapbook Bulletin Cards */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* Outer bulletin plate simulating wood/craftboard frame */}
            <div className="p-6 sm:p-8 bg-warm-beige rounded-xl border-2 border-vintage-black shadow-collage relative">
              <div className="absolute top-2.5 left-6 w-12 h-1.5 bg-stone-400/40 rounded"></div>
              <div className="absolute top-2.5 right-6 w-12 h-1.5 bg-stone-400/40 rounded"></div>

              {/* Bullet board grid pins */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {WELLNESS_TIPS.map((tip) => (
                  <div
                    key={tip.id}
                    className={`p-6 rounded border-2 border-vintage-black shadow-collage ${tip.colorClass} relative transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between`}
                  >
                    
                    {/* Adhesive masking tape overlay depending on custom values */}
                    {tip.pinType === "tape" && (
                      <span className="absolute -top-3.5 left-1/4 w-20 h-5 tape-overlay block z-20"></span>
                    )}
                    {tip.pinType === "tape-blue" && (
                      <span className="absolute -top-3.5 left-1/4 w-20 h-5 tape-overlay-blue block z-20"></span>
                    )}
                    {tip.pinType === "clip" && (
                      <span className="absolute -top-3 left-[45%] w-8 h-4 bg-stone-400 rounded-b shadow inline-block border border-stone-500"></span>
                    )}
                    {tip.pinType === "pin" && (
                      <span className="absolute -top-2 left-[48%] w-3 h-3 bg-red-800 rounded-full inline-block border border-black shadow"></span>
                    )}

                    <div>
                      {/* Tip Title */}
                      <h4 className="font-serif text-lg font-bold text-vintage-black tracking-tight flex items-center gap-1.5 mt-1 border-b border-dashed border-vintage-black/10 pb-1.5">
                        <ShieldCheck className="w-4 h-4 text-vintage-black" />
                        {tip.title}
                      </h4>

                      {/* Details description */}
                      <p className="font-sans text-xs text-vintage-black/90 leading-relaxed mt-2 font-medium">
                        {tip.details}
                      </p>
                    </div>

                    {/* Handwritten scribbled footnote */}
                    <div className="mt-4 pt-3 border-t border-dashed border-vintage-black/15">
                      <p className="font-hand text-lg text-vintage-black leading-tight">
                        {tip.handwrittenNote}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

             {/* Taped journal prompt below */}
             <div className="mt-8 p-5 bg-white border-2 border-dashed border-vintage-black rounded-lg shadow-collage relative transform -rotate-1 max-w-xl mx-auto">
               <span className="absolute -top-3 right-10 w-24 h-5 tape-overlay"></span>
               <h4 className="font-serif text-sm font-bold text-vintage-black tracking-tight flex items-center gap-1">
                 📝 Journal Prompts Malam Ini:
               </h4>
               <p className="font-sans text-xs text-faded-gray mt-1 font-medium">
                 Tuliskan 1 hal baik yang kamu temukan di kehidupan nyata (offline) hari ini, dan renungkan betapa berharganya itu daripada perdebatan di kolom komentar.
               </p>
             </div>

          </div>

        </div>

      </div>

    </section>
  );
}
