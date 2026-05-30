import { IMPACTS, ASSETS } from "../data";
import { Smile, Frown, Sparkles, HeartCrack, Info } from "lucide-react";

export default function Impact() {
  const shortKeywords = [
    { name: "stres", desc: "Ketegangan konstan dari ketakutan berlebih online" },
    { name: "anxiety", desc: "Kecemasan hebat saat layar menyala" },
    { name: "rasa malu", desc: "Membatin hujatan orang menjadi identitas baru" },
    { name: "kehilangan rasa aman", desc: "Kamar tidur sekalipun terasa diserbu" },
    { name: "menarik diri sosial", desc: "Mengunci diri, tak sudi memandang manusia" }
  ];

  return (
    <section className="relative w-full py-20 px-4 bg-cream overflow-hidden">
      
      {/* Hand-drawn water stain element or faint grid overlay */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-dusty-blue/5 rounded-full filter blur-xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-dusty-red/5 rounded-full filter blur-xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="font-hand text-xl text-dusty-blue font-bold tracking-wide">
            💧 Bab II: Gema Di Dunia Nyata
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-vintage-black leading-tight tracking-tight">
            “Dampaknya Nyata.”
          </h2>
          <p className="font-sans text-sm sm:text-base text-faded-gray italic leading-relaxed">
            Menurunkan ritme, mengamati luka emosional yang tertinggal di balik komentar kasual kita sehari-hari.
          </p>
          <div className="w-16 h-1.5 bg-dusty-blue/30 mx-auto rounded mt-4"></div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Storytelling and paper labels */}
          <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
            
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-vintage-black tracking-tight">
                Luka Mental Tanpa Pendarahan Fisik
              </h3>
              <p className="font-sans text-sm sm:text-base text-faded-gray leading-relaxed font-light">
                Saat seseorang dikeroyok secara siber, tidak ada darah yang menetes ke lantai. Namun, sistem saraf mendeteksi penolakan sosial sebagai situasi darurat berskala besar.
              </p>
            </div>

            {/* Paper label cards displaying impacts beautifully */}
            <div className="space-y-4 pt-2">
              <h4 className="font-mono text-xs font-bold text-vintage-black uppercase tracking-wider block">
                🚨 Manifestasi Psikologis Terberat:
              </h4>

              <div className="grid grid-cols-1 gap-3.5">
                {IMPACTS.map((imp, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded border-2 border-dashed ${imp.color} shadow-collage-sm transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden`}
                  >
                    {/* Retro tape styling indicator */}
                    <div className="absolute top-0 right-4 w-8 h-2 bg-stone-300/30"></div>
                    
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs bg-vintage-black/10 text-vintage-black px-1.5 py-0.5 rounded font-bold mt-0.5 shrink-0">
                        0{index + 1}
                      </span>
                      <div>
                        <h5 className="font-serif text-base font-bold tracking-tight">
                          {imp.name}
                        </h5>
                        <p className="font-sans text-xs mt-1 leading-relaxed opacity-85">
                          {imp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Custom Blue-Gray emotional artwork collage */}
          <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
            
            <div className="polaroid-frame bg-slate-50 border-slate-200/60 p-4 pb-12 rotate-2 hover:-rotate-1 transition-transform duration-700 max-w-sm sm:max-w-md shadow-collage-lg relative">
              <span className="absolute -top-5 left-1/3 w-28 h-6 tape-overlay-blue z-20"></span>
              
              <div className="overflow-hidden bg-slate-100 border border-slate-200 rounded">
                <img
                  src={ASSETS.impact}
                  alt="Melancholy scrapbook collage"
                  className="w-full h-72 sm:h-96 object-cover filter brightness-[1.02] contrast-95 pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="mt-5 text-center">
                <p className="font-hand text-2xl text-slate-700 leading-tight">
                  “Dinding kamar saksi bisu, saat air mata runtuh di balik layar HP.”
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#a0aab5] mt-2">
                  WATER STAIN THERAPEUTIC PAPER COLLECTION // 2026
                </p>
              </div>
            </div>

            {/* Aesthetic Sticky label listing requested keywords */}
            <div className="mt-8 p-4 bg-blue-50/80 border border-dusty-blue/40 rounded-lg shadow-collage max-w-sm w-full relative transform -rotate-1">
              <div className="absolute -top-3 right-8 w-16 h-4 tape-overlay"></div>
              <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-dusty-blue mb-2.5">📋 KATA KUNCI UTAMA (IMPACT):</h4>
              <div className="flex flex-wrap gap-1.5">
                {shortKeywords.map((tag, idx) => (
                  <div 
                    key={idx}
                    className="text-xs font-serif bg-white border border-stone-200 text-vintage-black px-2.5 py-1 rounded shadow-collage-sm"
                    title={tag.desc}
                  >
                    📌 <span className="font-bold">{tag.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Aesthetic Ripped Bottom Border */}
      <div className="w-full h-8 mt-16 bg-gradient-to-t from-stone-200/50 via-transparent to-transparent"></div>

    </section>
  );
}
