import { motion } from "motion/react";
import { Sparkles, Globe, Heart, ShieldAlert } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "edukasi", label: "Edukasi" },
    { id: "self-check", label: "Self Check" },
    { id: "artikel", label: "Artikel" },
    { id: "tentang", label: "Tentang" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 bg-cream/50 backdrop-blur-md border-b border-vintage-black/10">
      {/* Vintage Browser Shell Frame */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between border-2 border-vintage-black bg-cream rounded-md shadow-collage-sm overflow-hidden">
        
        {/* Top bar with metallic beads or retro dot pins */}
        <div className="w-full bg-warm-beige border-b-2 border-vintage-black px-4 py-1.5 flex items-center justify-between text-xs font-mono text-faded-gray">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-dusty-red/80 border border-vintage-black inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-kraft-dark/80 border border-vintage-black inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-dusty-blue/80 border border-vintage-black inline-block"></span>
            <span className="ml-2 tracking-tight hidden sm:inline-block">journal-entry://cyberpsychology-01.local</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* Brand & Responsive Navigation bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between p-3 sm:px-6 bg-cream gap-4 sm:gap-0">
          <div></div>{/* Spacer to balance centered navigation if needed or empty */}

          <nav className="flex items-center justify-center gap-1 bg-warm-beige/50 border border-stone-200/80 p-1 rounded-lg">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-tight rounded-md transition-all duration-300 font-sans cursor-pointer ${
                    isActive
                      ? "text-cream font-bold bg-vintage-black z-10 scale-105"
                      : "text-vintage-black hover:bg-kraft/30 hover:scale-95"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-vintage-black rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                  {item.id === "self-check" && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dusty-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-dusty-red"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <span className="font-hand text-sm text-faded-gray rotate-[-4deg]">#KebaikanDigital</span>
            <div className="w-8 h-8 rounded-full border border-vintage-black/20 flex items-center justify-center bg-warm-beige shadow-collage-sm">
              <Heart className="w-4 h-4 text-dusty-red fill-dusty-red animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
