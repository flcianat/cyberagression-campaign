import {
  Sparkles,
  Heart,
  Globe,
  Printer,
  Download,
  Image as ImageIcon,
  QrCode,
} from "lucide-react";

export default function About() {
  return (
    <section className="relative w-full py-20 px-4 bg-[#e2d6c2] overflow-hidden border-b-2 border-vintage-black">
      {/* Subtle organic dotted background texture built directly into the section */}
      <div className="absolute inset-0 bg-[radial-gradient(#3c3a37_1px,transparent_0)] bg-[size:32px_32px] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative">
        <div className="space-y-12">
          {/* Main Header with elegant editorial accent lines */}
          <div className="border-b border-vintage-black/25 pb-6">
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-vintage-black text-center tracking-tight relative ">
              THE FINAL CALL
              <span className="absolute -bottom-1 left-1/6 w-2/3 h-[5px] bg-[#c08272]/50 rounded"></span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="font-sans text-lg sm:text-xl text-vintage-black leading-relaxed font-bold">
              Jadi… kamu bagian dari masalah, atau perubahan?
            </p>

            <p className="font-sans text-base sm:text-lg text-stone-800 leading-relaxed">
              Cyberaggression tidak selalu dimulai dari kebencian besar. Kadang
              dimulai dari hal-hal kecil yang dianggap biasa:
            </p>

            <div className="bg-[#FAF6EE]/70 border border-dashed border-dusty-red/50 rounded-xl p-6 space-y-3">
              <p className="font-serif italic text-dusty-red text-lg">
                • Satu komentar kasar
              </p>
              <p className="font-serif italic text-dusty-red text-lg">
                • Satu sindiran dingin
              </p>
              <p className="font-serif italic text-dusty-red text-lg">
                • Satu emosi yang tidak terkontrol
              </p>
            </div>

            <p className="font-sans text-base sm:text-lg text-stone-800 leading-relaxed">
              Yang menulis mungkin lupa beberapa menit kemudian. Yang menerima
              bisa mengingatnya selama berbulan-bulan.
            </p>

            <p className="font-sans text-base sm:text-lg text-stone-800 leading-relaxed">
              Sebelum menekan tombol <span className="font-bold">Kirim</span>,
              tanyakan satu hal sederhana:
            </p>

            <div className="inline-block px-6 py-4 bg-vintage-black text-[#FAF6EE] font-hand text-3xl sm:text-5xl font-black tracking-wide transform -rotate-1 shadow-[6px_6px_0px_0px_#c08272]">
              Apakah ini perlu dikirim?
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faded-gray">
              Karena internet yang lebih baik dimulai dari keputusan kecil yang
              kita buat setiap hari.
            </p>
          </div>

          {/* Campaign Statistics / Core Targets Checklist Grid */}
          <div className="border-t border-dashed border-stone-300 pt-8 mt-4">
            <h4 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest mb-6 block text-center sm:text-left">
              🎯 SASARAN UTAMA KAMPANYE:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#FAF6EE] p-5 rounded-lg border border-stone-200 hover:border-vintage-black transition-all hover:shadow-collage-sm text-center relative transform -rotate-1">
                <span className="text-3xl block mb-2">📢</span>
                <h5 className="font-serif text-sm font-black text-[#111] mb-1">
                  Kesadaran Kolektif
                </h5>
                <p className="font-mono text-[9px] text-faded-gray uppercase tracking-widest leading-normal">
                  Mengedukasi 10,000+ pengguna tentang psikologi siber.
                </p>
              </div>

              <div className="bg-[#FAF6EE] p-5 rounded-lg border border-stone-200 hover:border-vintage-black transition-all hover:shadow-collage-sm text-center relative transform rotate-1">
                <span className="text-3xl block mb-2">❤️</span>
                <h5 className="font-serif text-sm font-black text-[#111] mb-1">
                  Digital Empathy
                </h5>
                <p className="font-mono text-[9px] text-faded-gray uppercase tracking-widest leading-normal">
                  Membiasakan tombol "Tahan Jeda" sebelum mengetik opini.
                </p>
              </div>

              <div className="bg-[#FAF6EE] p-5 rounded-lg border border-stone-200 hover:border-vintage-black transition-all hover:shadow-collage-sm text-center relative transform -rotate-1">
                <span className="text-3xl block mb-2">🛡️</span>
                <h5 className="font-serif text-sm font-black text-[#111] mb-1">
                  Ruang Aman Siber
                </h5>
                <p className="font-mono text-[9px] text-faded-gray uppercase tracking-widest leading-normal">
                  Mendorong penyediaan platform dukungan kesehatan mental siber.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer block */}
          <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-[10px] text-faded-gray">
            <span className="flex items-center gap-1.5 text-dusty-red font-bold">
              <Heart className="w-3.5 h-3.5 fill-dusty-red animate-pulse" />{" "}
              SPREAD COZY EMPATHY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
