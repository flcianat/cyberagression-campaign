import React, { useState, useEffect } from "react";
import {
  Heart,
  Send,
  CheckCircle2,
  UserCheck,
  Plus,
  Sparkles,
  MessageSquare,
  Trash2,
  Edit,
  Check,
  X,
  RotateCcw,
  AlertCircle,
  Smile,
  HelpCircle,
  Eye,
  HandIcon,
  HelpCircle as HelpIcon,
  Flame,
} from "lucide-react";

interface CommitmentCard {
  id: string;
  author: string;
  text: string;
  emoji: string;
  status: string;
  dateStr: string;
  themeClass: string; // e.g., 'bg-cream border-vintage-black'
  textColorClass: string;
}

const REMINDERS = [
  "Sebelum menekan tombol 'Kirim', pastikan kamu siap mengatakan ketikan tersebut secara langsung di depan wajahnya.",
  "Layar HP-mu hanyalah kaca datar, tapi di baliknya ada hati manusia yang bergetar penuh perasaan nyata.",
  "Kemarahan online itu instan dipicu algoritma, tapi penyesalan emosi impulsif bisa menghantui selamanya.",
  "Berdebat dengan username anonim tanpa wajah bukanlah diskusi hebat, melainkan pemborosan sisa energi harimu.",
  "Meninggalkan komentar baik tak butuh banyak tenaga, tapi bisa mengubah seluruh perspektif mendung seseorang.",
];

const MISSIONS = [
  {
    id: 1,
    label: "Challenge 1",
    title: "Silent Support",
    description:
      "Kirim pesan penyemangat secara privat (DM) kepada seseorang yang sedang dituduh atau sedang menghadapi cibiran tanpa menyalakan api perseteruan siber.",
  },
  {
    id: 2,
    label: "Challenge 2",
    title: "Zero Comment Day",
    description:
      "Tantang dirimu hari ini untuk tidak memposting opini, tanggapan, kritikan, atau argumen apapun di media sosial publik. Cukup jadilah pembaca yang tenang.",
  },
  {
    id: 3,
    label: "Challenge 3",
    title: "Digital Screen Detox",
    description:
      "Singkirkan gawai 2 jam sebelum tidur dan baca buku fisik untuk larutkan sisa stimulan siber yang memicu impulsivitas.",
  },
  {
    id: 4,
    label: "Challenge 4",
    title: "Breathe Over Reply",
    description:
      "Sebelum membalas konten atau komentar yang membuatmu naik darah, lakukan Jeda Amigdala 10 detik penuh keheningan.",
  },
];

const THEMES = [
  {
    id: "cream",
    label: "Vintage Cream",
    bg: "bg-cream border-yellow-800/20",
    border: "border-yellow-800/30",
    text: "text-amber-950",
    dot: "bg-amber-400",
  },
  {
    id: "rose",
    label: "Soft Rose",
    bg: "bg-rose-50 border-rose-200",
    border: "border-rose-300",
    text: "text-rose-950",
    dot: "bg-rose-400",
  },
  {
    id: "blue",
    label: "Ocean Ice",
    bg: "bg-blue-50 border-blue-200",
    border: "border-blue-300",
    text: "text-blue-950",
    dot: "bg-blue-400",
  },
  {
    id: "emerald",
    label: "Sage Leaf",
    bg: "bg-emerald-50 border-emerald-200",
    border: "border-emerald-300",
    text: "text-emerald-950",
    dot: "bg-emerald-400",
  },
  {
    id: "kraft",
    label: "Kraft Paper",
    bg: "bg-[#f4efe2] border-stone-300",
    border: "border-stone-400",
    text: "text-stone-900",
    dot: "bg-stone-500",
  },
];

const EMOJIS = ["🧘‍♂️", "✨", "🛡️", "🕊️", "🌿", "💡", "❤️", "🚀", "🌸", "🌻"];

export default function SocialCampaign() {
  // Reminders state
  const [currentReminderIdx, setCurrentReminderIdx] = useState(0);

  // Daily Mission state
  const [currentMissionIdx, setCurrentMissionIdx] = useState(1); // Default to "Zero Comment Day"
  const [isFollowingMission, setIsFollowingMission] = useState<
    Record<number, boolean>
  >({});
  const [missionCount, setMissionCount] = useState<Record<number, number>>({
    1: 342,
    2: 1512, // Zero comment is popular
    3: 894,
    4: 672,
  });

  // Commitments state
  const [cards, setCards] = useState<CommitmentCard[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);

  // Database status state
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    fallbackMode: boolean;
    uriConfigured: boolean;
    error: string | null;
  } | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Load commitments and database status on mount
  useEffect(() => {
    fetchCards();
    fetchDbStatus();
  }, []);

  const fetchDbStatus = async (retry = false) => {
    setIsCheckingStatus(true);
    try {
      const res = await fetch(`/api/db-status${retry ? "?retry=true" : ""}`);
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data);
        if (retry && data.connected) {
          fetchCards();
        }
      }
    } catch (err) {
      console.error("Failed to load db-status:", err);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const fetchCards = async () => {
    setIsLoadingCards(true);
    try {
      const res = await fetch("/api/commitments");
      if (res.ok) {
        const data = await res.json();
        setCards(data);
      }
    } catch (err) {
      console.error("Failed to load commitments from database:", err);
    } finally {
      setIsLoadingCards(false);
    }
  };

  // Form input states (creation)
  const [inputName, setInputName] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🧘‍♂️");
  const [selectedThemeId, setSelectedThemeId] = useState("cream");
  const [inputStatus, setInputStatus] = useState("PERSISTEN");

  // Modal State for Pop-Up Writing Form
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const handleNextReminder = () => {
    setCurrentReminderIdx((prev) => (prev + 1) % REMINDERS.length);
  };

  const handleNextMission = () => {
    setCurrentMissionIdx((prev) => (prev + 1) % MISSIONS.length);
  };

  const handleToggleFollowMission = (id: number) => {
    const isFollowing = !isFollowingMission[id];
    setIsFollowingMission((prev) => ({ ...prev, [id]: isFollowing }));
    setMissionCount((prev) => ({
      ...prev,
      [id]: isFollowing ? prev[id] + 1 : prev[id] - 1,
    }));
  };

  // Add a brand new card/postcard
  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const chosenTheme =
      THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];
    const authorName = inputName.trim() || "Netizen Mindful";

    const now = new Date();
    // Format timestamp nicely e.g., 24/5/2026, 14.15
    const dateFormatted = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, "0")}.${String(now.getMinutes()).padStart(2, "0")}`;

    const newCardPayload = {
      author: authorName,
      text: inputText.trim(),
      emoji: selectedEmoji,
      status: inputStatus.trim() || "PERSISTEN",
      dateStr: dateFormatted,
      themeClass: chosenTheme.bg,
      textColorClass: chosenTheme.text,
    };

    try {
      const res = await fetch("/api/commitments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCardPayload),
      });
      if (res.ok) {
        const addedCard = await res.json();
        setCards((prev) => [addedCard, ...prev]);
      } else {
        // Fallback locally if network succeeds but response has error
        const fallbackCard: CommitmentCard = {
          id: `card-${Date.now()}`,
          ...newCardPayload,
        };
        setCards((prev) => [fallbackCard, ...prev]);
      }
    } catch (err) {
      console.error("Error creating commitment postcard:", err);
      // Fallback locally
      const fallbackCard: CommitmentCard = {
        id: `card-${Date.now()}`,
        ...newCardPayload,
      };
      setCards((prev) => [fallbackCard, ...prev]);
    }

    // Reset Form
    setInputName("");
    setInputText("");
    setSelectedEmoji("🧘‍♂️");
    setSelectedThemeId("cream");
    setInputStatus("PERSISTEN");

    // Close modal
    setIsWriteModalOpen(false);
  };

  const handleDeleteCard = async (id: string) => {
    try {
      const res = await fetch(`/api/commitments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to delete commitment");
      }

      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      console.error("Error deleting commitment:", err);
      alert("Gagal menghapus commitment. Coba lagi.");
    }
  };

  const activeMission = MISSIONS[currentMissionIdx];
  const isCurrentlyFollowing = !!isFollowingMission[activeMission.id];

  return (
    <section className="relative w-full py-20 px-4 bg-kraft border-b-2 border-vintage-black">
      {/* Absolute vintage collage scraps */}
      <div className="absolute top-10 left-[6%] hidden xl:block transform -rotate-6 pointer-events-none opacity-40">
        <span className="font-hand text-3xl text-stone-700 select-none">
          be sincere~
        </span>
      </div>

      <div className="absolute top-1/2 right-[4%] hidden xl:block transform rotate-12 pointer-events-none opacity-40">
        <div className="w-16 h-16 border-2 border-dashed border-vintage-black/20 rounded-full flex items-center justify-center font-sketch text-4xl text-vintage-black">
          📢
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header Campaign */}
        <div className="text-center mb-16 space-y-3">
          <div className="relative inline-block px-4 py-1.5 bg-cream/80 border border-vintage-black transform rotate-2 shadow-collage-sm rounded">
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-black text-vintage-black">
              📢 COMMUNITY ENGAGEMENT
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-vintage-black tracking-tight leading-tight pt-2">
            Kalau Peduli, Jangan Cuma Scroll
          </h2>

          <p className="font-sans text-sm sm:text-base text-vintage-black/80 max-w-3xl mx-auto leading-relaxed">
            Perubahan tidak akan pernah tercipta jika semua orang dari kita
            hanya diam menjadi penonton pasif. Internet dipenuhi kebisingan
            karena orang baik memilih menyembunyikan suaranya. Ikuti aksi
            interaktif di bawah ini:
          </p>
        </div>

        {/* ROW 1: Reminders & Daily Mission Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">
          {/* 1. CYBERWELLNESS STATEMENT STATS - Left Column */}
          <div className="bg-white border-2 border-vintage-black p-6 rounded-lg shadow-collage relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-1 -right-1 tape w-20 h-5"></div>

            <div>
              <div className="flex items-center gap-1 text-dusty-red font-mono text-[10.5px] uppercase font-bold tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>CYBERWELLNESS STATEMENT</span>
              </div>

              {/* Dynamic statement view */}
              <div className="min-h-[110px] flex flex-col justify-center my-3">
                <blockquote className="font-serif text-base sm:text-lg font-bold text-vintage-black leading-relaxed italic text-left">
                  “{REMINDERS[currentReminderIdx]}”
                </blockquote>
              </div>
            </div>

            {/* Steps & toggle control buttons */}
            <div className="mt-4 pt-4 border-t border-dashed border-stone-200 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-faded-gray">
                Reminder {String(currentReminderIdx + 1).padStart(2, "0")} /{" "}
                {String(REMINDERS.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={handleNextReminder}
                className="px-4 py-2 bg-cream hover:bg-vintage-black hover:text-white text-vintage-black border border-vintage-black font-serif text-xs font-bold uppercase transition tracking-wider shrink-0 cursor-pointer"
              >
                Ganti Reminder
              </button>
            </div>
          </div>

          {/* 2. DAILY MISSION TRACKER - Right Column */}
          <div className="bg-[#fcf8ef] border-2 border-vintage-black p-6 rounded-lg shadow-collage relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-4 font-mono text-[9px] bg-yellow-250 border border-vintage-black/15 px-2 py-0.5 uppercase text-stone-700 tracking-wider">
              DAILY MISSION
            </div>

            <div>
              <div className="space-y-1 mb-2">
                <span className="font-mono text-xs font-bold uppercase text-dusty-red">
                  {activeMission.label}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-vintage-black">
                  {activeMission.title}
                </h3>
              </div>

              <p className="font-sans text-sm text-vintage-black/90 leading-relaxed font-light py-1 min-h-[60px]">
                {activeMission.description}
              </p>

              {/* Progress committed counts */}
              <div className="font-mono text-[11px] text-[#827461] border-l-2 border-dusty-red/40 pl-3 py-1 mt-3">
                Misi ini telah diikuti oleh{" "}
                <strong className="font-black text-vintage-black">
                  {missionCount[activeMission.id].toLocaleString()}
                </strong>{" "}
                pejuang siber damai.
              </div>
            </div>

            {/* Mission controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 mt-4 border-t border-dashed border-stone-200/50">
              <button
                type="button"
                onClick={() => handleToggleFollowMission(activeMission.id)}
                className={`w-full sm:w-auto px-5 py-3 font-serif text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isCurrentlyFollowing
                    ? "bg-emerald-100 border border-emerald-400 text-emerald-950"
                    : "bg-vintage-black hover:bg-dusty-red hover:text-white text-white rounded-none"
                }`}
              >
                {isCurrentlyFollowing ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : (
                  <Flame className="w-4 h-4 animate-bounce" />
                )}
                <span>
                  {isCurrentlyFollowing
                    ? "Tantangan Diikuti"
                    : "Ikuti tantangan demi siber damai"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleNextMission}
                className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-stone-50 text-vintage-black border border-stone-300 font-mono text-[11px] font-bold uppercase tracking-wider transition cursor-pointer text-center"
              >
                Cari Misi Lain
              </button>
            </div>
          </div>
        </div>

        {/* Vintage Aesthetic Row Divider */}
        <div className="relative my-16 border-t-2 border-dashed border-vintage-black/20 flex justify-center">
          <span className="absolute -top-3.5 px-4 bg-kraft text-[#827461] font-mono text-xs uppercase tracking-[0.22em] font-extrabold">
            ✒️ Diskusi & Komitmen Digital Wellness
          </span>
        </div>

        {/* ROW 2 FULL WIDTH: Mading Board for efficient utilization of space */}
        <div className="space-y-8">
          {/* Mading Header Section with CTA Button for Pop-Up */}
          <div className="bg-[#fdfcf7] border-2 border-vintage-black p-6 rounded-lg shadow-collage flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <h3 className="font-serif text-2xl font-black text-vintage-black">
                Mading Komitmen Siber Negatif
              </h3>
              <p className="font-sans text-xs text-stone-600">
                Kumpulan pernyataan aksi nyata netizen mindful menolak kebencian
                di ruang siber. Sematkan milikmu sekarang!
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsWriteModalOpen(true)}
              className="px-6 py-3 bg-vintage-black hover:bg-dusty-red text-cream font-serif text-sm font-bold tracking-wider uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 border border-vintage-black"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Komitmen Baru</span>
            </button>
          </div>

          {/* Database Integration Status Card */}

          {/* Cards Grid: highly space-efficient, responsive layout */}
          {isLoadingCards ? (
            <div className="p-12 border-2 border-dashed border-stone-300 text-center rounded bg-white/50 text-faded-gray font-mono text-xs animate-pulse">
              ⏳ Memuat komitmen terbaru dari database MongoDB...
            </div>
          ) : cards.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-stone-400 text-center rounded bg-white/50 text-stone-400 font-sans italic text-sm">
              Belum ada komitmen tersemat. Klik tombol "Tulis Komitmen Baru" di
              atas untuk membuat yang pertama!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cards.map((card, index) => {
                // Simple staggered paper rotations for collage look
                const rotationClass =
                  index % 3 === 0
                    ? "rotate-1"
                    : index % 3 === 1
                      ? "-rotate-1"
                      : "rotate-2";

                return (
                  <div
                    key={card.id}
                    className={`p-6 border-2 border-vintage-black rounded-lg shadow-collage relative transition-all duration-300 ${card.themeClass} ${rotationClass} hover:rotate-0 flex flex-col justify-between min-h-[225px]`}
                  >
                    {/* Paper adhesive tape simulation overlay */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-28 h-5.5 tape opacity-90 z-20"></div>

                    {/* POSTCARD CARD DISPLAY VIEW */}
                    <div className="space-y-4 pt-2">
                      {/* Card metadata bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-white/80 border border-vintage-black/10 px-2 py-0.5 rounded-full">
                          <span className="text-sm">{card.emoji}</span>
                          <span className="font-mono text-[9px] text-[#827461] uppercase tracking-wider font-bold">
                            Digital Scout
                          </span>
                        </div>

                        {/* Small pin hole/sticker indicator */}
                        <div className="w-2.5 h-2.5 rounded-full bg-stone-300/85 shadow-inner"></div>
                      </div>

                      {/* Text values */}
                      <div className="space-y-1.5 font-sans text-left">
                        <div>
                          <span className="font-mono text-[9px] text-stone-400 block tracking-wider uppercase text-left">
                            NETIZEN KOMIT:
                          </span>
                          <h4 className="font-serif text-sm font-black text-vintage-black leading-tight text-left">
                            {card.author}
                          </h4>
                        </div>

                        <p className="font-serif text-sm font-medium text-vintage-black italic leading-normal pl-3 border-l-2 border-dashed border-stone-400 text-left">
                          “{card.text}”
                        </p>
                      </div>
                    </div>

                    {/* Footer parameters of the postcard */}
                    <div className="pt-3 mt-4 border-t border-dashed border-stone-200/80 flex items-center justify-between gap-2 text-left">
                      <div className="space-y-0.5">
                        <span className="inline-block px-2 py-0.5 bg-yellow-250 border border-vintage-black/15 text-[8.5px] font-mono font-black uppercase text-stone-800 tracking-widest leading-none">
                          {card.status}
                        </span>
                        <p className="font-mono text-[8px] text-faded-gray pl-0.5">
                          {card.dateStr}
                        </p>
                      </div>

                      {/* Only Delete Action remains, no edit button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1.5 bg-white hover:bg-red-50 text-[#827461] hover:text-red-700 border border-stone-200 hover:border-red-350 rounded transition cursor-pointer"
                        title="Hapus Postcard ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Simulated vintage paper receipt note */}
          {/* <div className="p-5 bg-stone-50 border border-stone-300 rounded-md relative text-[10px] text-stone-500 text-left font-mono space-y-2 shadow-inner">
            <span className="font-black text-stone-700 tracking-wider">
              📜 MONGODB PERSISTENCE PROTOCOL #2026
            </span>
            <p className="leading-normal">
              Setiap komitmen di atas kini tersinkronisasi secara langsung ke
              database MongoDB Cloud via Express. Dengan menyimpan dan
              mengorganisir lembaran ini secara global, kamu menyuarakan aksi
              damai siber yang nyata dan berkelanjutan.
            </p>
          </div> */}
        </div>
      </div>

      {/* Write commitment postcard Popup Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <div
            className="absolute inset-0 bg-stone-900/65 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsWriteModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="bg-[#faf8f5] border-2 border-vintage-black p-6 rounded-lg max-w-lg w-full shadow-collage relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Close button in top right */}
            <button
              type="button"
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-vintage-black transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Heading Badge */}
            <span className="inline-block px-3 py-0.5 bg-vintage-black text-[#faf8f5] font-mono text-[9px] tracking-widest uppercase mb-3">
              ⚙️ KOMITMEN LAB
            </span>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="space-y-1 text-left">
                <h3 className="font-serif text-xl font-black text-vintage-black">
                  Tulis Komitmen Onlinemu Hari Ini
                </h3>
                <p className="font-sans text-xs text-stone-500">
                  Buat postcard komitmen kustom milikmu sendiri untuk melatih
                  disiplin digital
                </p>
              </div>

              {/* Username Input */}
              <div className="space-y-1 text-left">
                <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest block font-bold">
                  Nama Samaran
                </span>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Contoh: Dimas Anggara, Rania, etc."
                  className="w-full p-2.5 bg-cream border border-stone-300 focus:border-vintage-black text-xs font-sans rounded text-vintage-black outline-none font-medium"
                />
                <span className="font-mono text-[8.5px] text-stone-400 italic block">
                  *Nama kosong akan diisi “Netizen Mindful” secara otomatis.
                </span>
              </div>

              {/* Main Commitment message input */}
              <div className="space-y-1 text-left">
                <span className="font-mono text-[9px] text-[#827461] uppercase tracking-widest block font-bold">
                  Isi Komitmen
                </span>
                <textarea
                  id="commitment-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Contoh: Saya tidak akan menyindir orang lain lagi secara online..."
                  rows={3}
                  className="w-full p-2.5 bg-cream border border-stone-300 focus:border-vintage-black text-xs font-sans rounded text-vintage-black outline-none resize-none font-medium"
                  required
                ></textarea>
              </div>

              {/* Interactive customizer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Emoji style picker */}
                <div className="space-y-1.5 text-left">
                  <span className="font-mono text-[9px] text-[#827461] uppercase tracking-widest block font-bold">
                    Pilih Simbol
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`w-7 h-7 flex items-center justify-center rounded text-sm transition-all cursor-pointer ${
                          selectedEmoji === emoji
                            ? "bg-vintage-black text-white scale-110 border border-vintage-black"
                            : "bg-stone-50 hover:bg-stone-150 text-vintage-black border border-stone-200"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gaya Kertas Paper Style selection */}
                <div className="space-y-1.5 text-left">
                  <span className="font-mono text-[9px] text-[#827461] uppercase tracking-widest block font-bold">
                    Gaya Kertas
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`px-2 py-1 rounded text-[10px] font-mono border transition-all cursor-pointer flex items-center gap-1 ${
                          selectedThemeId === theme.id
                            ? "bg-vintage-black text-cream border-vintage-black font-extrabold"
                            : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                        }`}
                        title={theme.label}
                      >
                        <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
                        {theme.id.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tag Status input */}
              <div className="space-y-1 text-left pt-1">
                <span className="font-mono text-[9px] text-[#827461] uppercase tracking-widest block font-bold">
                  Tag Aktivitas/Status
                </span>
                <input
                  type="text"
                  value={inputStatus}
                  onChange={(e) => setInputStatus(e.target.value)}
                  placeholder="Contoh: PERSISTEN, KOMIT, MEMBARA, WARAS"
                  className="w-full p-2.5 bg-cream border border-stone-300 focus:border-vintage-black text-xs font-mono uppercase tracking-wider rounded text-vintage-black outline-none font-semibold"
                />
              </div>

              {/* Action Submit */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-full py-3 mt-2 bg-vintage-black hover:bg-dusty-red text-cream disabled:bg-stone-300 disabled:text-stone-500 rounded-none font-serif text-sm font-bold tracking-widest uppercase shadow transition-all duration-300 md:cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Sematkan ke Mading</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
