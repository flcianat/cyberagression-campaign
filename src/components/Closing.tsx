import { useState, useEffect, useRef } from "react";
import { Wind, Heart, Play, RotateCcw, Volume2, ShieldCheck, CheckCircle, Sparkles } from "lucide-react";

interface ClosingProps {
  onRestartClick: () => void;
}

type BreathingPhase = "idle" | "inhale" | "hold" | "exhale" | "complete";

export default function Closing({ onRestartClick }: ClosingProps) {
  const [phase, setPhase] = useState<BreathingPhase>("idle");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [breathInstruction, setBreathInstruction] = useState("Ambil nafas dalam-dalam untuk memulai.");
  
  // Ref for audio context if sound is integrated
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Frequency play function for breathing guidance
  const playSound = (type: "inhale" | "hold" | "exhale" | "complete") => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === "inhale") {
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 4);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 4);
        osc.start();
        osc.stop(ctx.currentTime + 4);
      } else if (type === "hold") {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 7);
        osc.start();
        osc.stop(ctx.currentTime + 7);
      } else if (type === "exhale") {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 8);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 8);
        osc.start();
        osc.stop(ctx.currentTime + 8);
      } else if (type === "complete") {
        // Soft chime
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      // Ignored if browser blocks audio
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (phase === "inhale") {
      setBreathInstruction("Hirup napas perlahan... isi paru-parumu.");
      playSound("inhale");
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setPhase("hold");
            setSecondsLeft(7);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (phase === "hold") {
      setBreathInstruction("Tahan napas... biarkan ketenangan meresap.");
      playSound("hold");
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setPhase("exhale");
            setSecondsLeft(8);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (phase === "exhale") {
      setBreathInstruction("Hembuskan perlahan... lepaskan semua amarah & impuls siber.");
      playSound("exhale");
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setPhase("complete");
            setSecondsLeft(0);
            setCycleCount((c) => c + 1);
            playSound("complete");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [phase]);

  const handleStartBreathing = () => {
    // Attempt sound context initialization inside user click interaction
    try {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {}

    setPhase("inhale");
    setSecondsLeft(4);
  };

  const handleReset = () => {
    setPhase("idle");
    setSecondsLeft(0);
    setBreathInstruction("Siap ambil kendali emosi kembali?");
  };

  // Get current active color/scale state for visual circle
  const getCircleClasses = () => {
    switch (phase) {
      case "inhale":
        return "scale-145 bg-dusty-blue/30 border-dusty-blue text-dusty-blue duration-[4000ms] animate-pulse";
      case "hold":
        return "scale-150 bg-amber-200/40 border-amber-400 text-amber-700 font-bold duration-[7000ms]";
      case "exhale":
        return "scale-95 bg-dusty-red/20 border-dusty-red text-dusty-red duration-[8000ms]";
      case "complete":
        return "scale-110 bg-emerald-50 border-emerald-500 text-emerald-600";
      default:
        return "scale-100 bg-cream border-vintage-black/20 text-vintage-black/60";
    }
  };

  return (
    <section className="relative w-full py-20 px-4 bg-grid-paper border-b-2 border-vintage-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Scrapbook Textured Card */}
        <div className="bg-white border-2 border-vintage-black rounded-lg p-8 sm:p-12 shadow-collage-lg relative overflow-hidden">
          
          {/* Slashed background watermark pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5ddd0_1.5px,transparent_0)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

          {/* Masking tape header label */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-56 h-7 tape z-10 flex items-center justify-center">
            <span className="font-mono text-[9.5px] text-[#2c3d4a] tracking-widest font-black uppercase">
              📓 INTERACTIVE MINDFUL STOP-CAP
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-8 mt-4">
            
            {/* Soft notification badge */}
            <div className="flex items-center gap-1.5 bg-warm-beige border border-vintage-black/15 px-4 py-1.5 rounded-full text-xs font-mono text-faded-gray">
              <Wind className={`w-4 h-4 text-dusty-blue ${phase !== "idle" && phase !== "complete" ? "animate-spin" : ""}`} />
              <span className="uppercase tracking-wider font-semibold">Latihan Jeda Amigdala (4-7-8)</span>
            </div>

            {/* Main Statement */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-vintage-black leading-[1.12] tracking-tight">
                Ambil Jeda Sebelum <br className="hidden sm:inline" />
                <span className="relative inline-block text-dusty-red italic">
                  Mengetik Amarah Siber
                  <span className="absolute left-0 bottom-1 w-full h-[6px] bg-yellow-100 -z-10"></span>
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-faded-gray leading-relaxed font-light">
                Tarik napas secara teratur di bawah untuk menenangkan denyut nadi, membersihkan emosi impulsif, dan menjernihkan emosi sebelum kamu menanggapi argumen atau menulis apapun online.
              </p>
            </div>

            {/* Interactive Visual & Countdowns Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6 border-y border-dashed border-stone-200">
              
              {/* Step checklist side (4-7-8 breakdown) */}
              <div className="md:col-span-5 text-left space-y-4 font-sans">
                <span className="font-mono text-[10px] text-stone-400 tracking-wider uppercase block">
                  Metode Detoks Amigdala:
                </span>
                
                <div className={`p-4 border rounded transition-all flex items-center justify-between ${phase === "inhale" ? "bg-dusty-blue/10 border-dusty-blue" : "bg-cream border-stone-200"}`}>
                  <div>
                    <h4 className="font-serif font-bold text-vintage-black text-sm">1. Inhale (Hirup)</h4>
                    <p className="text-xs text-stone-500">Kembangkan perut & hirup udara segar</p>
                  </div>
                  <span className="font-serif text-xl font-black text-dusty-blue bg-white px-2.5 py-1 rounded border border-dusty-blue/30 shadow-sm">
                    4 Detik
                  </span>
                </div>

                <div className={`p-4 border rounded transition-all flex items-center justify-between ${phase === "hold" ? "bg-amber-100/40 border-amber-400" : "bg-cream border-stone-200"}`}>
                  <div>
                    <h4 className="font-serif font-bold text-vintage-black text-sm">2. Hold (Tahan)</h4>
                    <p className="text-xs text-stone-500">Biarkan oksigen mengendapkan keresahan</p>
                  </div>
                  <span className="font-serif text-xl font-black text-amber-600 bg-white px-2.5 py-1 rounded border border-amber-400/30 shadow-sm">
                    7 Detik
                  </span>
                </div>

                <div className={`p-4 border rounded transition-all flex items-center justify-between ${phase === "exhale" ? "bg-dusty-red/10 border-dusty-red" : "bg-cream border-stone-200"}`}>
                  <div>
                    <h4 className="font-serif font-bold text-vintage-black text-sm">3. Exhale (Hembuskan)</h4>
                    <p className="text-xs text-stone-500">Keluarkan perlahan lewat mulut</p>
                  </div>
                  <span className="font-serif text-xl font-black text-dusty-red bg-white px-2.5 py-1 rounded border border-dusty-red/30 shadow-sm">
                    8 Detik
                  </span>
                </div>
              </div>

              {/* Dynamic breathing orb visualization side */}
              <div className="md:col-span-7 flex flex-col items-center justify-center space-y-5">
                <div className="relative w-56 h-56 flex items-center justify-center">
                  
                  {/* Decorative guide rings */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-stone-200 animate-spin" style={{ animationDuration: "25s" }}></div>
                  <div className="absolute inset-4 rounded-full border border-stone-200/50"></div>
                  
                  {/* The actual pulsing/breathing physical card orb */}
                  <div className={`w-36 h-36 rounded-full border-2 flex flex-col items-center justify-center transition-all ease-in-out shadow-collage-lg ${getCircleClasses()}`}>
                    {phase === "idle" && (
                      <span className="text-2xl animate-bounce">🧘‍♀️</span>
                    )}
                    {phase === "inhale" && (
                      <span className="text-2xl animate-pulse">🌬️</span>
                    )}
                    {phase === "hold" && (
                      <span className="text-2xl">⏳</span>
                    )}
                    {phase === "exhale" && (
                      <span className="text-2xl animate-ping" style={{ animationDuration: '2s' }}>💨</span>
                    )}
                    {phase === "complete" && (
                      <span className="text-2xl animate-bounce">✨</span>
                    )}

                    <span className="font-mono text-xs uppercase tracking-widest mt-2">
                      {phase === "idle" ? "READY" : phase}
                    </span>
                    
                    {secondsLeft > 0 && (
                      <span className="font-serif text-3xl font-black mt-1">
                        {secondsLeft}s
                      </span>
                    )}
                  </div>
                </div>

                {/* Instant action helper instruction block */}
                <div className="bg-cream border border-stone-300 rounded-md py-3 px-5 max-w-sm shadow-inner min-h-[64px] flex items-center justify-center text-center">
                  <p className="font-sans text-xs italic text-vintage-black leading-relaxed">
                    {breathInstruction}
                  </p>
                </div>
              </div>

            </div>

            {/* Core Action Call To Breath Cycle */}
            <div className="flex flex-col items-center space-y-4 w-full">
              
              {phase === "idle" || phase === "complete" ? (
                <div className="flex flex-col items-center space-y-3">
                  <button
                    onClick={handleStartBreathing}
                    className="group px-10 py-4 bg-vintage-black text-cream hover:bg-dusty-red hover:text-white rounded-none font-serif text-lg font-extrabold tracking-wider shadow-collage transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Mulai Ambil Jeda</span>
                  </button>
                  <p className="text-xs text-faded-gray italic font-sans max-w-sm mt-1">
                    Klik tombol di atas untuk memulai siklus pernapasan 5 detik pencegah amarah siber.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-vintage-black rounded border border-stone-300 font-mono text-xs tracking-wider flex items-center gap-2 transition"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Jeda
                  </button>
                </div>
              )}

              {/* Achievement metrics or cycle counts for gamification of digital calm */}
              {cycleCount > 0 && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded px-4 py-1.5 text-xs font-mono">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>Kamu telah menyelesaikan {cycleCount} Jeda Amigdala. Pikiran kamu siap kembali positif!</span>
                </div>
              )}

            </div>

            {/* Simulated fading toxic text to beautiful digital growth journal prompt */}
            {phase === "complete" && (
              <div className="w-full max-w-md bg-stone-50 border border-emerald-100 rounded-lg p-5 mt-4 text-center animate-fade-in space-y-2">
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold font-mono py-0.5 px-2 rounded-full uppercase">Refleksi Berhasil</span>
                <p className="font-serif text-sm italic text-stone-800 font-medium">
                  "Menghirup kesabaran, membuang reaksioner. Dunia siber butuh ketenanganmu hari ini."
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
