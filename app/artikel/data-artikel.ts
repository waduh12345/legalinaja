// --- DATA DUMMY BARU (HUKUM) ---

// Definisikan tipe Artikel
export type Artikel = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Bisnis" | "Properti" | "Keluarga" | "Pidana" | "Startup";
  tags: string[];
  readTime: string;
  views: number;
  publishedAt: string;
  featured: boolean;
  author: string;
  content: string; // Konten HTML lengkap
};

export const artikelData: Artikel[] = [
  {
    id: "1",
    slug: "5-langkah-mendirikan-pt-perorangan",
    title: "5 Langkah Mudah Mendirikan PT Perorangan di 2025",
    excerpt:
      "Pahami syarat dan prosedur terbaru untuk mendirikan PT perorangan tanpa notaris...",
    category: "Bisnis",
    tags: ["PT", "Bisnis", "Startup"],
    readTime: "5 mnt",
    views: 15200,
    publishedAt: "2025-11-08T10:00:00Z",
    featured: true,
    author: "Dr. Budi S, S.H., M.H.",
    content: `
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Apa Itu PT Perorangan?</h3>
      <p class="mb-4">PT Perorangan adalah badan hukum baru yang diatur dalam UU Cipta Kerja, memungkinkan satu orang untuk mendirikan Perseroan Terbatas dengan modal dasar yang fleksibel dan tanpa akta notaris.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 1: Persiapan Data</h3>
      <p class="mb-4">Siapkan KTP, NPWP, dan alamat email Anda. Pastikan Anda sudah memikirkan nama PT yang unik (minimal 3 kata) dan bidang usaha (KBLI) yang akan dijalankan.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 2: Pendaftaran di AHU Online</h3>
      <p class="mb-4">Proses pendaftaran dilakukan sepenuhnya secara online melalui sistem AHU (Administrasi Hukum Umum) milik Kemenkumham. Anda akan mengisi formulir elektronik...</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 3: Pembayaran PNBP</h3>
      <p class="mb-4">Setelah data terisi, Anda akan mendapatkan kode voucher untuk membayar Biaya Penerimaan Negara Bukan Pajak (PNBP) yang sangat terjangkau.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 4: Mendapatkan Sertifikat</h3>
      <p class="mb-4">Setelah pembayaran dikonfirmasi, Anda dapat langsung mengunduh Sertifikat Pendirian PT Perorangan yang sah secara hukum.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 5: Mengurus Izin Usaha (NIB)</h3>
      <p class="mb-4">Langkah terakhir adalah mendaftarkan PT Anda ke sistem OSS (Online Single Submission) untuk mendapatkan Nomor Induk Berusaha (NIB) agar PT Anda dapat beroperasi secara komersial.</p>
    `,
  },
  {
    id: "2",
    slug: "memahami-hukum-waris-perdata-vs-islam",
    title: "Memahami Perbedaan Hukum Waris Perdata vs. Hukum Waris Islam",
    excerpt:
      "Bagaimana pembagian harta waris diatur di Indonesia? Pahami dua sistem hukum yang berlaku...",
    category: "Keluarga",
    tags: ["Waris", "Keluarga", "Notaris"],
    readTime: "7 mnt",
    views: 23100,
    publishedAt: "2025-11-07T09:00:00Z",
    featured: false,
    author: "Siti Aminah, S.H.",
    content: `
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Dualisme Hukum Waris di Indonesia</h3>
      <p class="mb-4">Di Indonesia, hukum waris tidak tunggal. Ada dua sistem utama yang sering digunakan: Hukum Waris Perdata (berdasarkan KUHPerdata atau BW) dan Hukum Waris Islam (berdasarkan Kompilasi Hukum Islam).</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Hukum Waris Perdata (BW)</h3>
      <p class="mb-4">Sistem ini umumnya berlaku bagi WNI non-Muslim atau WNI Muslim yang memilih untuk tunduk padanya. Pembagian didasarkan pada golongan ahli waris:</p>
      <ul class="list-disc list-inside mb-4 pl-4">
        <li>Golongan I: Suami/Istri dan anak-anak.</li>
        <li>Golongan II: Orang tua dan saudara kandung.</li>
        <li>Golongan III: Kakek/Nenek dan leluhur ke atas.</li>
        <li>Golongan IV: Keluarga sedarah dalam garis menyamping.</li>
      </ul>
      <p class="mb-4">Bagian anak laki-laki dan perempuan adalah sama (1:1).</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Hukum Waris Islam (KHI)</h3>
      <p class="mb-4">Sistem ini berlaku bagi WNI yang beragama Islam. Pembagiannya spesifik berdasarkan Al-Qur'an dan Hadist, dengan porsi yang telah ditentukan (disebut "dzawil furudh").</p>
      <p class="mb-4">Perbedaan utamanya adalah bagian anak laki-laki adalah dua kali lipat bagian anak perempuan (2:1).</p>
    `,
  },
  {
    id: "3",
    slug: "pentingnya-nda-untuk-startup",
    title: "Mengapa NDA (Non-Disclosure Agreement) Sangat Penting Untuk Startup?",
    excerpt:
      "Jangan sampai ide brilian Anda dicuri. Pelajari pentingnya NDA untuk melindungi aset digital...",
    category: "Startup",
    tags: ["NDA", "Startup", "Kontrak"],
    readTime: "4 mnt",
    views: 9500,
    publishedAt: "2025-11-06T14:30:00Z",
    featured: true,
    author: "Rizky Pratama, S.H.",
    content: `
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Ide Adalah Aset</h3>
      <p class="mb-4">Bagi startup, ide, model bisnis, dan data adalah aset paling berharga. Saat Anda berbicara dengan investor, calon karyawan, atau mitra, ada risiko ide Anda diambil.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Apa itu NDA?</h3>
      <p class="mb-4">NDA atau Perjanjian Kerahasiaan adalah kontrak hukum yang mengikat satu atau lebih pihak untuk tidak mengungkapkan informasi rahasia yang dibagikan kepada mereka.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Kapan Menggunakannya?</h3>
      <ul class="list-disc list-inside mb-4 pl-4">
        <li>Saat pitching ke Investor.</li>
        <li>Saat merekrut karyawan baru atau freelancer.</li>
        <li>Saat berdiskusi dengan vendor atau mitra strategis.</li>
      </ul>
      <p class="mb-4">Memiliki NDA yang ditandatangani menunjukkan bahwa Anda serius dalam melindungi kekayaan intelektual Anda.</p>
    `,
  },
  {
    id: "4",
    slug: "apa-yang-harus-dilakukan-saat-ditilang",
    title: "Apa yang Harus Dilakukan (dan Tidak Dilakukan) Saat Ditilang Polisi?",
    excerpt:
      "Ketahui hak dan kewajiban Anda saat menghadapi tilang di jalan agar terhindar dari...",
    category: "Pidana",
    tags: ["Tilang", "Polisi", "Pidana"],
    readTime: "6 mnt",
    views: 11200,
    publishedAt: "2025-11-05T11:00:00Z",
    featured: false,
    author: "Ahmad Fauzi, S.H.",
    content: `
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Tetap Tenang dan Kooperatif</h3>
      <p class="mb-4">Saat dihentikan, jangan panik. Matikan mesin, buka kaca jendela, dan tetap sopan. Jangan mencoba kabur atau berdebat dengan kasar.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Pahami Hak Anda</h3>
      <p class="mb-4">Anda berhak menanyakan nama dan tanda pengenal petugas. Anda juga berhak mengetahui kesalahan atau pelanggaran yang Anda lakukan.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Tilang Merah vs. Tilang Biru</h3>
      <p class="mb-4">Polisi biasanya akan menawarkan dua jenis surat tilang:</p>
      <ul class="list-disc list-inside mb-4 pl-4">
        <li><strong>Tilang Biru:</strong> Anda mengakui kesalahan dan bersedia membayar denda langsung melalui bank (transfer).</li>
        <li><strong>Tilang Merah:</strong> Anda merasa tidak bersalah dan ingin mengikuti sidang di pengadilan untuk membela diri.</li>
      </ul>
      <p class="mb-4">Hindari 'titip denda' atau 'damai di tempat' karena itu termasuk pungli (pungutan liar) dan gratifikasi.</p>
    `,
  },
  {
    id: "5",
    slug: "prosedur-jual-beli-tanah-ajb",
    title: "Panduan Lengkap Prosedur Jual Beli Tanah dan Pembuatan AJB",
    excerpt:
      "Langkah-langkah aman membeli properti, dari pengecekan sertifikat hingga tanda tangan PPAT.",
    category: "Properti",
    tags: ["AJB", "Properti", "PPAT"],
    readTime: "8 mnt",
    views: 19800,
    publishedAt: "2025-11-04T16:00:00Z",
    featured: false,
    author: "Dewi Lestari, S.H., M.Kn.",
    content: `
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Pentingnya Kehati-hatian</h3>
      <p class="mb-4">Membeli properti (tanah atau bangunan) adalah investasi besar. Jangan terburu-buru. Lakukan pengecekan menyeluruh terlebih dahulu.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 1: Pengecekan Sertifikat</h3>
      <p class="mb-4">Minta salinan sertifikat tanah dari penjual. Bawa ke kantor BPN (Badan Pertanahan Nasional) setempat untuk 'Pengecekan Sertifikat'. Ini untuk memastikan sertifikat tersebut asli, tidak sengketa, dan tidak sedang dijaminkan.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 2: PPJB (Jika Perlu)</h3>
      <p class="mb-4">Jika pembayaran bertahap atau ada syarat yang harus dipenuhi, buatlah Perjanjian Pengikatan Jual Beli (PPJB) di hadapan Notaris sebagai kesepakatan awal (tanda jadi).</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 3: Pembuatan AJB di PPAT</h3>
      <p class="mb-4">Transaksi jual beli tanah WAJIB dilakukan di hadapan Pejabat Pembuat Akta Tanah (PPAT). Siapkan dokumen: KTP, KK, NPWP (Penjual & Pembeli), Sertifikat Asli, dan bukti bayar PBB.</p>
      
      <h3 class="font-semibold text-lg text-gray-800 mb-2">Langkah 4: Balik Nama</h3>
      <p class="mb-4">Setelah AJB ditandatangani dan pajak (BPHTB oleh pembeli, PPh oleh penjual) lunas, PPAT akan mendaftarkan proses balik nama sertifikat ke BPN atas nama Anda.</p>
    `,
  },
];