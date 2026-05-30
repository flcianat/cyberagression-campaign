import { motion } from "motion/react";
import {
  ArrowRight,
  MessageSquareX,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { ASSETS } from "../data";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative w-full py-12 md:py-20 px-4 overflow-hidden bg-grid-paper">
      {/* Absolute Decorative Stickers floating around */}
      <div className="absolute top-10 left-[8%] hidden lg:block transform -rotate-12 z-20 pointer-events-none">
        <div className="px-3 py-1 bg-dusty-red text-cream border border-vintage-black text-xs font-mono font-bold tracking-wider rounded uppercase shadow-collage">
          💥 COZY BUT UNCOMFORTABLE
        </div>
      </div>

      <div className="absolute bottom-[10%] left-[45%] hidden lg:block transform rotate-6 z-20 pointer-events-none">
        <div className="px-4 py-2 bg-warm-beige border-2 border-dashed border-vintage-black rounded-lg shadow-collage">
          <p className="font-hand text-lg text-vintage-black leading-tight">
            ✍️ "Cuma bercanda, kok baper sih?"
          </p>
        </div>
      </div>

      <div className="absolute top-1/4 right-[4%] hidden xl:block transform rotate-12 z-20 pointer-events-none">
        <div className="relative p-3 bg-white border border-stone-200 shadow-collage w-40 text-center rounded">
          <span className="absolute -top-3 left-1/3 w-16 h-5 tape-overlay block"></span>
          <p className="font-mono text-[9px] text-faded-gray uppercase tracking-widest mt-1">
            RESEARCH NOTES
          </p>
          <p className="font-serif text-xs text-vintage-black font-semibold mt-1">
            Anonymity reduces empathy by half.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Left Hero: Narrative & Copywriting */}
          <div className="md:col-span-7 flex flex-col items-start space-y-6">
            {/* Tag label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-kraft text-vintage-black border border-vintage-black text-[11px] font-mono tracking-widest uppercase rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-dusty-red animate-ping"></span>
              Cyberpsychology & Digital Wellness
            </div>

            {/* Headline */}
            <div className="space-y-3 relative">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-vintage-black font-extrabold leading-[1.1] tracking-tight">
                Berani nyerang orang <br />
                <span className="relative inline-block text-dusty-red">
                  di balik layar?
                  <span className="absolute left-0 bottom-1 w-full h-[6px] bg-dusty-blue/30 -z-10 transform -rotate-1"></span>
                </span>
              </h2>

              <p className="font-serif text-xl sm:text-2xl text-faded-gray font-normal leading-relaxed italic border-l-4 border-kraft/60 pl-4">
                “Internet bikin semuanya terasa nggak nyata.{" "}
                <br className="hidden sm:inline" /> Tapi dampaknya nyata.”
              </p>
            </div>

            {/* Campaign Core Copy (Indonesian narrative) */}
            <div className="relative p-5 sm:p-6 bg-white/80 rounded-lg border-2 border-vintage-black/80 shadow-collage space-y-3 max-w-xl">
              <span className="absolute -top-3 right-8 w-24 h-6 tape-overlay block"></span>
              <p className="font-sans text-sm text-vintage-black leading-relaxed">
                Setiap hari, miliaran kata-kata kasar mengalir bebas di
                sela-sela timeline media sosial. Karakter anonim, tuduhan tak
                berdasar, dan penghakiman massal menjadi hal yang lumrah dibaca
                saat sarapan.
              </p>
              <p className="font-hand text-lg text-vintage-black font-semibold">
                — Mengapa kita menjadi jauh lebih kejam di dunia maya
                dibandingkan saat berhadapan langsung?
              </p>
            </div>

            {/* Bulletins lists */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1 flex items-start gap-3 p-3 bg-warm-beige/60 border border-stone-300 rounded-md">
                <MessageSquareX className="w-5 h-5 text-dusty-red mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-mono text-xs font-bold text-vintage-black uppercase tracking-wider">
                    Unchecked Hatred
                  </h4>
                  <p className="font-sans text-xs text-faded-gray">
                    Ujaran kebencian di kolom komentar memicu rasa cemas kronis
                    bagi 1 dari 2 penerimanya.
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3 p-3 bg-dusty-blue/10 border border-dusty-blue/30 rounded-md">
                <AlertTriangle className="w-5 h-5 text-dusty-blue mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-mono text-xs font-bold text-vintage-black uppercase tracking-wider">
                    Online Disinhibition
                  </h4>
                  <p className="font-sans text-xs text-faded-gray">
                    Hilangnya rem sosial di otak membuat jempol kita bertindak
                    lebih liar tanpa pengawasan.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Call to Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-cta-button"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-8 py-4 bg-vintage-black text-cream hover:bg-dusty-red hover:text-white rounded-md font-serif text-lg font-bold tracking-wide shadow-collage-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
              >
                Mulai Cek Diri Kamu Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <span className="font-hand text-lg text-faded-gray -rotate-2 select-none">
                🤫 Hanya butuh 2 menit refleksi.
              </span>
            </div>
          </div>

          {/* Right Hero: Gorgeous Scrapbook Collage Artwork */}
          <div className="md:col-span-5 flex justify-center relative">
            {/* Visual background layers simulating textured notebook stack */}
            <div className="absolute inset-0 bg-kraft/40 rounded-xl transform rotate-2 -z-10 shadow-collage"></div>
            <div className="absolute inset-0 bg-white/70 border border-stone-200 rounded-xl transform -rotate-1 -z-10 shadow-collage-sm"></div>

            <div className="polaroid-frame relative transform rotate-[-2.5deg] max-w-[340px] sm:max-w-sm transition-transform hover:rotate-1 duration-500 scale-95 sm:scale-100">
              {/* Fake Vintage Masking Tape Strips hold the Polaroid */}
              <div className="absolute -top-6 -left-4 w-24 h-7 tape-overlay z-20"></div>
              <div className="absolute -bottom-3 right-6 w-20 h-6 tape-overlay-blue z-20"></div>

              {/* Ripped feedback alert bubble */}
              <div className="absolute top-2 right-2 bg-dusty-red text-cream font-mono text-[9px] px-2 py-0.5 rounded-full uppercase z-20 animate-pulse">
                Dampak Nyata siber
              </div>

              {/* Primary Collage Visual Artwork generated by Gemini 3.5 */}
              <div className="w-full overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={ASSETS.hero}
                  alt="Scrapbook collage highlighting internet trauma and reflective digital mindsets"
                  className="w-full h-[280px] sm:h-[340px] object-cover filter contrast-105 hover:scale-110 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Polaroid Frame Captions / Handwritten Note */}
              <div className="mt-5 text-center px-2">
                <p className="font-hand text-2xl text-vintage-black leading-tight">
                  “Jempol ketik makian, jiwa menanggung goresan.”
                </p>
                <div className="mt-2.5 flex items-center justify-between font-mono text-[9px] text-faded-gray uppercase tracking-widest border-t border-dashed border-stone-300 pt-2 px-1">
                  <span>Entry No. 2026</span>
                  <span>Collage Therapeutic Art</span>
                </div>
              </div>
            </div>

            {/* Torn message commentary mockup under the polaroid frame */}
            <div className="absolute bottom-[-24px] left-[-16px] max-w-[220px] bg-white border border-vintage-black p-3 rounded shadow-collage rotate-6 hidden sm:block">
              <span className="text-[10px] text-dusty-red font-mono block">
                @user_anonym99
              </span>
              <p className="font-serif text-xs text-vintage-black line-through italic decoration-dusty-red decoration-2">
                "Udah jelek, sok pinter lagi hidup lu menyedihkan bgt!"
              </p>
              <div className="mt-1 flex justify-end">
                <span className="font-hand text-xs text-dusty-blue font-bold">
                  X coret komentar beracun
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-10 mt-12 bg-gradient-to-r from-transparent via-stone-300/40 to-transparent flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-kraft-dark block mx-1"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-kraft block mx-1"></span>
        <span className="w-1 h-1 rounded-full bg-kraft block mx-1"></span>
      </div>
    </section>
  );
}
