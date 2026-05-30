import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Disinhibition from "@/components/Disinhibition";
import Impact from "@/components/Impact";
import Quiz from "@/components/Quiz";
import Tips from "@/components/Tips";
import Articles from "@/components/Articles";
import SocialCampaign from "@/components/SocialCampaign";
import Closing from "@/components/Closing";
import About from "@/components/About";

import {
  Sparkles,
  Heart,
  Pin,
  Music,
  VolumeX,
  Volume2,
  Play,
  Pause,
  SkipForward,
} from "lucide-react";

const LOFI_TRACKS = [
  {
    title: "🍪 Biscuit",
    artist: "Lukrembo",
    url: "https://www.free-stock-music.com/music/lukrembo-biscuit.mp3",
  },
  {
    title: "🏺 Clay",
    artist: "Lukrembo",
    url: "https://www.free-stock-music.com/music/lukrembo-clay.mp3",
  },
  {
    title: "🎈 Daily",
    artist: "Lukrembo",
    url: "https://www.free-stock-music.com/music/lukrembo-daily.mp3",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const [isPlayingLofi, setIsPlayingLofi] = useState(false);
  const [currentLofiTrack, setCurrentLofiTrack] = useState(0);
  const [lofiVolume, setLofiVolume] = useState(0.25);
  const lofiAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Persistent HTML5 background lofi backsound configuration
    lofiAudioRef.current = new Audio(LOFI_TRACKS[currentLofiTrack].url);
    lofiAudioRef.current.volume = lofiVolume;

    const handleEnded = () => {
      handleNextLofi();
    };

    lofiAudioRef.current.addEventListener("ended", handleEnded);

    if (isPlayingLofi) {
      lofiAudioRef.current
        .play()
        .catch((e) => console.log("Audio play blocked", e));
    }

    return () => {
      if (lofiAudioRef.current) {
        lofiAudioRef.current.pause();
        lofiAudioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentLofiTrack]);

  useEffect(() => {
    if (lofiAudioRef.current) {
      lofiAudioRef.current.volume = lofiVolume;
    }
  }, [lofiVolume]);

  const toggleLofiPlay = () => {
    if (!lofiAudioRef.current) return;
    if (isPlayingLofi) {
      lofiAudioRef.current.pause();
      setIsPlayingLofi(false);
    } else {
      lofiAudioRef.current
        .play()
        .then(() => setIsPlayingLofi(true))
        .catch((err) => {
          console.log("Audio block", err);
          setIsPlayingLofi(false);
        });
    }
  };

  const handleNextLofi = () => {
    const nextIdx = (currentLofiTrack + 1) % LOFI_TRACKS.length;
    setIsPlayingLofi(false);
    if (lofiAudioRef.current) {
      lofiAudioRef.current.pause();
    }
    setCurrentLofiTrack(nextIdx);
    setTimeout(() => {
      if (lofiAudioRef.current) {
        lofiAudioRef.current
          .play()
          .then(() => setIsPlayingLofi(true))
          .catch((e) => console.log(e));
      }
    }, 120);
  };

  // Play a soft typewriter click sound using browser Web Audio API synthesizers
  const playTypewriterClick = (frequency = 800, duration = 0.04) => {
    if (!isPlayingSound) return;
    try {
      const audioCtx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.00001,
        audioCtx.currentTime + duration,
      );

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("AudioContext failed or blocked by browser policies.");
    }
  };

  // Listen to clicks to emit typewriter click sounds for deep sensory immersion
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("[role='button']") ||
        target.closest("button")
      ) {
        playTypewriterClick(950, 0.035);
      } else {
        // Subtle background tap
        playTypewriterClick(450, 0.02);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isPlayingSound]);

  // Handle section jumping and syncing the navigation bar state
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);

    if (tabId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen scrapbook-bg text-vintage-black selection:bg-dusty-red/20 selection:text-vintage-black flex flex-col relative pb-10 border-[12px] border-artistic-border">
      {/* Decorative notebook left-side spiral wire binder effect (desktop only) */}
      <div className="absolute left-2 top-0 bottom-0 w-3 hidden xl:flex flex-col gap-6 pt-24 pb-12 z-40 pointer-events-none select-none">
        {[...Array(55)].map((_, i) => (
          <div key={i} className="flex flex-col gap-0.5 relative">
            <span className="w-5 h-2.5 bg-gradient-to-r from-stone-400/90 to-stone-500/90 rounded-full border border-slate-700/50 block shadow-inner rotate-[15deg]"></span>
            <span className="w-4 h-1 bg-stone-700/20 rounded block ml-0.5"></span>
          </div>
        ))}
      </div>

      {/* Top Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Primary single-page content structure with targeted anchors */}
      <main className="flex-1 w-full relative">
        {/* Distressed cover textures overlay */}
        <div className="distressed-texture"></div>

        {/* Hero Segment */}
        <div id="home">
          <Hero onCtaClick={() => handleTabChange("self-check")} />
        </div>

        {/* Education Segment */}
        <div id="edukasi">
          <Education />
        </div>

        {/* Online Disinhibition Segment */}
        <div>
          <Disinhibition />
        </div>

        {/* Impact Segment */}
        <div>
          <Impact />
        </div>

        {/* Self Checklist Test Segment */}
        <div id="self-check">
          <Quiz />
        </div>

        {/* Digital Wellness Tips Segment */}
        <div>
          <Tips />
        </div>

        {/* Articles Segment */}
        <div id="artikel">
          <Articles />
        </div>

        {/* Social Activism Campaign Segment */}
        <div>
          <SocialCampaign />
        </div>

        {/* Closing Emotional Reflection Segment */}
        <div>
          <Closing onRestartClick={() => handleTabChange("self-check")} />
        </div>

        {/* About Campaign Team Section */}
        <div id="tentang">
          <About />
        </div>
      </main>
    </div>
  );
}
