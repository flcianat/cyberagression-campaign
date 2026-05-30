import { EduCard, QuizQuestion, Article, WellnessTip, SocialChallenge } from "./types";

// Custom generated asset URLs from compile-time artifacts
export const ASSETS = {
  hero: "/src/assets/images/hero_collage_1779610650036.png",
  disinhibition: "/src/assets/images/online_disinhibition_1779610672525.png",
  impact: "/src/assets/images/emotional_impact_1779610692672.png",
  tips: "/src/assets/images/digital_wellness_tips_1779610714053.png",
};

export const EDUCATION_CARDS: EduCard[] = [
  {
    id: "edu-1",
    category: "cyberaggression",
    title: "Mengapa Jempol Lebih Tajam Daripada Lidah?",
    rawText: "Cyberaggression adalah tindakan permusuhan, hinaan, atau kekerasan emosional yang dilakukan secara sadar melalui media digital. Di dunia maya, batasan etika sering kali meleleh. Orang biasa yang ramah di dunia nyata bisa berubah menjadi sosok yang sangat agresif dalam kolom komentar.",
    notes: [
      "Di balik layar, empati kita menurun hingga 50% karena kurangnya ekspresi wajah secara langsung.",
      "Komentar jahat dilempar dalam 3 detik tanpa memikirkan luka psikologis yang tertinggal bertahun-tahun."
    ],
    stickers: ["📌 Fakta Psikologi", "⚠️ Pikirkan Lagi"],
    comments: [
      "Hahaha caper banget sih ni orang",
      "Mending hapus akun aja lu mental lemah!",
      "Nggak usah sok suci deh, dulu juga pernah..."
    ],
    citation: "Jurnal Cyberpsychology, Behavior, and Social Networking (2025)"
  },
  {
    id: "edu-2",
    category: "statistics",
    title: "Catatan Kaki Angka & Realita Kampanye",
    rawText: "Kekerasan digital bukan sekedar drama media sosial. Ini adalah epidemi sunyi yang dialami oleh jutaan netizen setiap harinya, terutama generasi muda yang hidupnya terikat penuh pada layar.",
    notes: [
      "49% remaja mengaku pernah mengalami pelecehan atau perundungan siber secara langsung.",
      "Hanya 1 dari 10 korban cyberaggression yang berani menceritakannya ke orang tua atau konselor siber.",
      "72% pelaku komentar kasar merasa tindakan mereka 'hanya candaan' atau 'kritik objektif biasa'."
    ],
    stickers: ["📊 Data Riil", "💔 Sunyi tapi Nyata"],
    comments: [
      "Alah baperan banget, namanya juga medsos",
      "Seriusan ada yang sampai stres gara-gara ini?"
    ],
    citation: "Status Literasi Digital & Kesehatan Mental Remaja (Kemenkominfo, 2024)"
  }
];

export const DISINHIBITION_CONCEPTS = [
  {
    keyword: "Anonimitas Disosiatif",
    tagline: "“Ini bukan saya.”",
    description: "Saat identitasmu tersembunyi di balik avatar kucing atau nama palsu, kamu merasa terbebas dari tuntutan norma sosial. Karakter aslimu terlapisi topeng digital.",
    accent: "bg-amber-100 border-amber-300",
  },
  {
    keyword: "Ketidaktampakan (Invisibility)",
    tagline: "“Kamu nggak bisa lihat aku marah.”",
    description: "Karena kita tidak perlu berhadapan mata secara langsung atau melihat respons fisik korban saat terluka, sensor empati di otak kita gagal memicu rasa bersalah.",
    accent: "bg-blue-100 border-blue-300",
  },
  {
    keyword: "Asinkronitas",
    tagline: "“Tulis sekarang, tinggalin aja.”",
    description: "Komunikasi tidak terjadi secara real-time. Kamu mengetik ucapan kasar, menutup aplikasi, lalu pergi. Otakmu memperlakukannya seperti melemparkan batu dari mobil berjalan.",
    accent: "bg-stone-200 border-stone-300",
  },
  {
    keyword: "Solipsisme Disosiatif",
    tagline: "“Ini semua cuma permainan komputer.”",
    description: "Tanpa sadar kamu menganggap dunia internet hanyalah sebuah game interaktif, di mana orang lain hanyalah karakter non-pemain (NPC) yang tidak memiliki perasaan sungguhan.",
    accent: "bg-rose-100 border-rose-300",
  }
];

export const IMPACTS = [
  {
    name: "Stres Akut & Paranoia",
    description: "Korban terus-menerus mengantisipasi serangan berikutnya, membuat sistem syaraf dalam kondisi waspada tinggi (fight or flight) berkepanjangan.",
    color: "bg-red-50 text-red-950 border-red-300"
  },
  {
    name: "Severe Social Anxiety",
    description: "Kecemasan hebat saat bertemu orang karena takut mereka adalah sosok yang sama dengan para anonim penyerang di balik layar.",
    color: "bg-blue-50 text-blue-950 border-blue-200"
  },
  {
    name: "Kehilangan Rasa Aman",
    description: "Rumah atau kamar yang seharusnya menjadi tempat perlindungan terasa ditembus oleh teror konstan dari layar sakumu.",
    color: "bg-amber-50 text-amber-950 border-amber-200"
  },
  {
    name: "Internalized Shame (Rasa Malu Mendalam)",
    description: "Secara perlahan memercayai semua hal hina yang ditulis orang lain tentang dirinya, merusak harga diri hingga titik terendah.",
    color: "bg-stone-100 text-stone-900 border-stone-300"
  },
  {
    name: "Isolasi Sosial Total",
    description: "Menghapus akun, mengunci diri di kamar, menarik diri sepenuhnya dari interaksi keluarga demi menghindari dunia luar.",
    color: "bg-neutral-50 text-neutral-900 border-neutral-300"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Pernahkah kamu mengetik komentar ketus karena merasa tersindir atau kesal dengan suatu unggahan?",
    description: "Membawa kemarahan dari kehidupan pribadi ke kolom komentar figur publik atau teman.",
    points: 3,
    category: "Impulsivitas"
  },
  {
    id: 2,
    question: "Pernahkah kamu menyindir seseorang lewat Story atau cuitan tanpa menyebutkan namanya secara langsung?",
    description: "Sering disebut 'subtweeting' atau pasif-agresif digital untuk melampiaskan emosi samar.",
    points: 2,
    category: "Agresi Terselubung"
  },
  {
    id: 3,
    question: "Apakah kamu merasa 'halah, cuma komentar kok seram amat' saat melihat orang lain tersinggung di internet?",
    description: "Meremehkan atau menyepelekan beratnya beban emosi di dunia maya.",
    points: 4,
    category: "Kurang Empati"
  },
  {
    id: 4,
    question: "Pernahkah kamu menggunakan akun palsu (second account/alter) khusus untuk berdebat atau memaki orang lain?",
    description: "Pemanfaatan filter anonimitas untuk melontarkan hal-hal yang tidak berani kamu ucapkan langsung.",
    points: 5,
    category: "Anonimitas"
  },
  {
    id: 5,
    question: "Pernahkah kamu ikut meninggalkan komentar negatif atau sekadar menyukai hujatan hanya karena semua orang melakukannya?",
    description: "Efek gerombolan (cyber-mobbing) yang memberikan rasa aman semu dalam kelompok penyerang siber.",
    points: 3,
    category: "Konformitas Kelompok"
  },
  {
    id: 6,
    question: "Saat berselancar di internet, seberapa sering kamu melupakan bahwa ada manusia nyata yang memiliki keluarga di sisi lain layar?",
    description: "Melihat profil hanya sebagai rangkaian teks dan pixel belaka.",
    points: 4,
    category: "Disosiasi"
  }
];

export const WELLNESS_TIPS: WellnessTip[] = [
  {
    id: "tip-1",
    title: "Pause Sebelum Posting (Jeda 3 Detik)",
    details: "Saat jempolmu gatal ingin membalas argumen kasar, letakkan HP. Tarik napas sedalam-dalamnya. Tanyakan: 'Apakah ini akan memberikan dampak produktif, atau cuma emosi sesaat?'",
    handwrittenNote: "“Kemarahan online itu gratis, tapi kedamaian pikiran itu mahal.”",
    pinType: "tape",
    colorClass: "bg-amber-100 border-amber-300 rotate-1"
  },
  {
    id: "tip-2",
    title: "Nggak Semua Hal Harus Dibalas",
    details: "Algoritma menyukai keributan. Berdebat dengan akun palsu atau orang asing tanpa wajah di komentar hanyalah buang-buang energi kehidupan berhargamu.",
    handwrittenNote: "“Diam di medsos bukan berarti kalah, tapi kamu waras.”",
    pinType: "tape-blue",
    colorClass: "bg-blue-100 border-blue-200 -rotate-1"
  },
  {
    id: "tip-3",
    title: "Gunakan Filter Kata Kunci",
    details: "Lindungi ketenangan pikiranmu. Aktifkan fitur blokir komentar otomatis dengan kata-kata kasar atau sensitif di pengaturan privasi akun media sosialmu.",
    handwrittenNote: "“Batasan personal adalah bentuk cinta diri paling tinggi.”",
    pinType: "clip",
    colorClass: "bg-stone-100 border-stone-300 rotate-2"
  },
  {
    id: "tip-4",
    title: "Batasi Doomscrolling Malam Hari",
    details: "Membaca konten-konten toksik sebelum tidur memaksa otak melepaskan kortisol, merusak kualitas tidur, dan menurunkan pertahanan emosionalmu esok pagi.",
    handwrittenNote: "“Layar mati, dunia nyata menanti.”",
    pinType: "pin",
    colorClass: "bg-rose-50 border-rose-200 -rotate-2"
  }
];

export const ARTICLES: Article[] = [
  {
    id: "post-1",
    title: "Ilusi Monitor Semu: Kenapa Orang Sangat Berani di Internet?",
    summary: "Sebuah tinjauan psikologis mendalam mengenai Online Disinhibition Effect yang mengubah kepribadian kalem menjadi monster siber.",
    content: "Di dunia nyata, kita berpegang pada petunjuk sosial: raut wajah yang sedih, getaran suara yang terluka, atau kerumunan penonton yang menatap dingin saat kita menghina seseorang. Hal ini bertindak sebagai rem psikologis bawaan. Di balik layar monitor, rem tersebut dicopot paksa. Penyerang siber tidak melihat rem psikologis tersebut sehingga mereka melaju kencang tanpa rasa bersalah. Inilah alasan kenapa empati terasa sangat langka saat kita berselancar di platform digital.",
    readTime: "5 Menit Baca",
    date: "14 April 2026",
    polaroidUrl: "/src/assets/images/article_monitor_illusion_1779618315506.png",
    polaroidCaption: "Ruang Gelap Anonim",
    stickers: ["🧠 Psikologi", "👁️ Eksklusif"]
  },
  {
    id: "post-2",
    title: "Panduan Menjaga Kewarasan di Tengah Tsunami Komentar Toksik",
    summary: "Seni mengabaikan drama dunia maya dan menjatuhkan jangkar emosi pada realita yang ada di sekitarmu.",
    content: "Media sosial dirancang agar kita terus berinteraksi, dan emosi negatif adalah pemicu interaksi tertinggi. Saat kamu merasa sesak membaca ujaran kebencian di sebuah thread viral, ingatlah: kamu tidak wajib ikut menenggelamkan diri. Matikan notifikasi. Lihat ke sekeliling kamarmu. Rasakan berat badanmu di kursi, sentuh permukaan meja logam yang dingin. Kembalikan kesadaranmu ke koordinat bumi tempat tubuhmu bernyawa. Internet hanyalah fiksi berukuran 6 inci.",
    readTime: "4 Menit Baca",
    date: "8 Mei 2026",
    polaroidUrl: "/src/assets/images/article_digital_detox_1779618334236.png",
    polaroidCaption: "Detoks Layar HP",
    stickers: ["🌿 Meditasi", "🔒 Ketenangan"]
  },
  {
    id: "post-3",
    title: "Dampak Jangka Panjang Penolakan Siber Bagi Otak Remaja",
    summary: "Penelitian terbaru membuktikan luka verbal digital mengaktifkan area nyeri fisik yang sama di otak manusia.",
    content: "Saat seorang remaja membaca makian siber yang ditujukan padanya, area anterior cingulate cortex di otaknya menyala terang—sebuah respons saraf yang identik dengan saat seseorang mendapati cedera fisik atau luka bakar. Trauma siber bukanlah hal yang 'bisa dilupakan begitu saja'. Luka emosional tersebut mengendap, merubah struktur rasa percaya diri, dan mendistorsi perkembangan mental anak muda dalam jangka panjang.",
    readTime: "7 Menit Baca",
    date: "20 Mei 2026",
    polaroidUrl: "/src/assets/images/article_brain_wound_1779618353846.png",
    polaroidCaption: "Luka Yang Tak Terlihat",
    stickers: ["🩹 Otak & Sains", "📌 Urgent"]
  }
];

export const SOCIAL_CHALLENGES: SocialChallenge[] = [
  {
    id: "chal-1",
    title: "Tantangan Komentar Hangat (Warm Comment Challenge)",
    description: "Tuliskan 3 pesan penyemangat yang tulus pada unggahan acak hari ini. Angkat seseorang ke atas daripada menjatuhkannya.",
    hashtag: "#JempolHangat",
    stickerStyle: "bg-blue-100 text-blue-900 border-blue-300",
    completedCount: 2043
  },
  {
    id: "chal-2",
    title: "Tantangan Jeda 2 Jam Sebelum Tidur",
    description: "Matikan koneksi internet ponselmu setelah jam 9 malam. Singkirkan layar, ganti dengan buku fisik atau buku harian analog.",
    hashtag: "#AnalogPikiran",
    stickerStyle: "bg-amber-100 text-amber-900 border-amber-300",
    completedCount: 1589
  },
  {
    id: "chal-3",
    title: "Tantangan Saring Dulu Sebelum Sharing",
    description: "Setiap ada berita mengejutkan, luangkan waktu 5 menit mencari validasi dari setidaknya 2 portal berita kredibel sebelum meneruskan.",
    hashtag: "#InternetSehatSaring",
    stickerStyle: "bg-rose-100 text-rose-900 border-rose-300",
    completedCount: 3125
  }
];
