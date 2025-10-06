export interface Question {
  id: string;
  author: string;
  subject: string;
  question: string;
  category: string;
  createdAt: Date;
  views: number;
  likes: number;
  isAnswered: boolean;
  answer?: {
    content: string;
    answeredBy: string;
    answeredAt: Date;
  };
}

export interface QuestionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
}

export const questionCategories: QuestionCategory[] = [
  {
    id: "aqidah",
    name: "Aqidah",
    description: "Pertanyaan tentang keimanan dan keyakinan",
    icon: "🕌",
    questionCount: 45,
  },
  {
    id: "ibadah",
    name: "Ibadah",
    description: "Pertanyaan tentang sholat, puasa, dan ibadah lainnya",
    icon: "🕋",
    questionCount: 78,
  },
  {
    id: "muamalah",
    name: "Muamalah",
    description: "Pertanyaan tentang hubungan sosial dan ekonomi",
    icon: "🤝",
    questionCount: 32,
  },
  {
    id: "akhlak",
    name: "Akhlak",
    description: "Pertanyaan tentang adab dan moral",
    icon: "😊",
    questionCount: 28,
  },
  {
    id: "keluarga",
    name: "Keluarga",
    description: "Pertanyaan tentang pernikahan dan keluarga",
    icon: "👨‍👩‍👧‍👦",
    questionCount: 56,
  },
  {
    id: "fiqih",
    name: "Fiqih",
    description: "Pertanyaan tentang hukum-hukum Islam",
    icon: "📖",
    questionCount: 67,
  },
];

export const mockQuestions: Question[] = [
  {
    id: "1",
    author: "Ahmad Rizki",
    subject: "Hukum Sholat Jumat untuk Wanita",
    question:
      "Assalamu'alaikum Ustadz. Apakah wanita wajib melaksanakan sholat Jumat? Bagaimana jika tidak bisa ke masjid karena ada halangan?",
    category: "ibadah",
    createdAt: new Date("2024-01-15"),
    views: 1250,
    likes: 45,
    isAnswered: true,
    answer: {
      content:
        "Wa'alaikumussalam. Sholat Jumat hukumnya wajib bagi laki-laki muslim yang sudah baligh, berakal, merdeka, dan bermukim. Bagi wanita, sholat Jumat tidak wajib, namun jika ingin melaksanakan tetap diperbolehkan dan mendapat pahala. Jika tidak bisa ke masjid, wanita bisa melaksanakan sholat Dzuhur di rumah sebagai gantinya.",
      answeredBy: "Ustadz Dr. Ahmad Fauzi, M.Ag",
      answeredAt: new Date("2024-01-15"),
    },
  },
  {
    id: "2",
    author: "Siti Nurhaliza",
    subject: "Cara Menghitung Zakat Mal",
    question:
      "Ustadz, bagaimana cara menghitung zakat mal yang benar? Apakah semua harta harus dizakati? Mohon penjelasannya.",
    category: "muamalah",
    createdAt: new Date("2024-01-14"),
    views: 2100,
    likes: 78,
    isAnswered: true,
    answer: {
      content:
        "Zakat mal dihitung dari harta yang telah mencapai nishab (batas minimum) dan haul (masa kepemilikan selama 1 tahun). Nishab zakat mal adalah senilai 85 gram emas. Harta yang wajib dizakati meliputi: emas, perak, uang tunai, investasi, dan harta dagang. Tidak semua harta wajib dizakati, hanya yang memenuhi syarat nishab dan haul.",
      answeredBy: "Ustadz Prof. Dr. Muhammad Yusuf, M.Ag",
      answeredAt: new Date("2024-01-14"),
    },
  },
  {
    id: "3",
    author: "Budi Santoso",
    subject: "Hukum Investasi Saham",
    question:
      "Assalamu'alaikum. Apakah investasi saham diperbolehkan dalam Islam? Bagaimana cara memilih saham yang halal?",
    category: "muamalah",
    createdAt: new Date("2024-01-13"),
    views: 1800,
    likes: 52,
    isAnswered: true,
    answer: {
      content:
        "Investasi saham diperbolehkan dalam Islam dengan syarat perusahaan yang sahamnya dibeli bergerak di bidang yang halal dan tidak melibatkan riba. Hindari saham perusahaan yang bergerak di bidang perbankan konvensional, asuransi konvensional, atau bisnis yang haram lainnya. Pilihlah saham dari perusahaan yang transparan dan sesuai syariah.",
      answeredBy: "Ustadz Dr. Abdul Rahman, M.Ec",
      answeredAt: new Date("2024-01-13"),
    },
  },
  {
    id: "4",
    author: "Fatimah Zahra",
    subject: "Adab Berbicara dengan Orang Tua",
    question:
      "Bagaimana adab yang benar ketika berbicara dengan orang tua? Apakah boleh membantah pendapat mereka?",
    category: "akhlak",
    createdAt: new Date("2024-01-12"),
    views: 950,
    likes: 34,
    isAnswered: true,
    answer: {
      content:
        "Adab berbicara dengan orang tua meliputi: menggunakan kata-kata yang lembut, tidak mengangkat suara, mendengarkan dengan baik, dan menghormati pendapat mereka. Jika ada perbedaan pendapat, sampaikan dengan cara yang sopan dan tidak menyakiti hati. Ingatlah bahwa berbakti kepada orang tua adalah kewajiban yang sangat besar dalam Islam.",
      answeredBy: "Ustadzah Dr. Aisyah Nur, M.Ag",
      answeredAt: new Date("2024-01-12"),
    },
  },
  {
    id: "5",
    author: "Muhammad Ali",
    subject: "Hukum Nikah Siri",
    question:
      "Apakah nikah siri diperbolehkan dalam Islam? Bagaimana status hukumnya?",
    category: "keluarga",
    createdAt: new Date("2024-01-11"),
    views: 3200,
    likes: 89,
    isAnswered: true,
    answer: {
      content:
        "Nikah siri dalam arti nikah yang tidak dicatatkan secara resmi di KUA sebenarnya sah secara syar'i jika memenuhi rukun dan syarat nikah. Namun, di Indonesia, pencatatan nikah di KUA adalah kewajiban hukum positif. Oleh karena itu, meskipun sah secara syar'i, tetap harus dicatatkan di KUA untuk kepentingan administrasi dan perlindungan hukum.",
      answeredBy: "Ustadz Dr. H. Abdullah Syafi'i, M.Ag",
      answeredAt: new Date("2024-01-11"),
    },
  },
  {
    id: "6",
    author: "Nurul Hikmah",
    subject: "Hukum Memakai Makeup",
    question:
      "Assalamu'alaikum Ustadzah. Apakah wanita muslimah boleh memakai makeup? Adakah batasan-batasannya?",
    category: "fiqih",
    createdAt: new Date("2024-01-10"),
    views: 1500,
    likes: 41,
    isAnswered: false,
  },
  {
    id: "7",
    author: "Rizki Pratama",
    subject: "Hukum Trading Forex",
    question:
      "Apakah trading forex diperbolehkan dalam Islam? Bagaimana dengan leverage dan margin?",
    category: "muamalah",
    createdAt: new Date("2024-01-09"),
    views: 2800,
    likes: 67,
    isAnswered: true,
    answer: {
      content:
        "Trading forex dalam Islam memiliki perbedaan pendapat di kalangan ulama. Sebagian memperbolehkan dengan syarat tidak mengandung riba dan gharar (ketidakpastian berlebihan). Leverage dan margin yang berlebihan dapat mengandung unsur gharar. Sebaiknya konsultasikan dengan lembaga syariah yang kompeten sebelum melakukan trading forex.",
      answeredBy: "Ustadz Dr. Ahmad Hidayat, M.Ec",
      answeredAt: new Date("2024-01-09"),
    },
  },
  {
    id: "8",
    author: "Sari Indah",
    subject: "Hukum Donor Darah",
    question:
      "Apakah donor darah diperbolehkan dalam Islam? Adakah syarat-syaratnya?",
    category: "fiqih",
    createdAt: new Date("2024-01-08"),
    views: 1100,
    likes: 38,
    isAnswered: true,
    answer: {
      content:
        "Donor darah diperbolehkan dalam Islam bahkan sangat dianjurkan karena termasuk dalam kategori menolong sesama manusia. Syaratnya adalah: tidak membahayakan kesehatan pendonor, dilakukan dengan niat yang baik untuk menolong, dan tidak ada unsur eksploitasi. Donor darah adalah bentuk sedekah yang sangat mulia.",
      answeredBy: "Ustadz Dr. Muhammad Iqbal, M.Ag",
      answeredAt: new Date("2024-01-08"),
    },
  },
];

// Helper functions
export function getQuestionsByCategory(categoryId: string): Question[] {
  return mockQuestions.filter((question) => question.category === categoryId);
}

export function getPopularQuestions(limit: number = 5): Question[] {
  return mockQuestions
    .filter((question) => question.isAnswered)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getRecentQuestions(limit: number = 10): Question[] {
  return mockQuestions
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export function searchQuestions(query: string): Question[] {
  const lowercaseQuery = query.toLowerCase();
  return mockQuestions.filter(
    (question) =>
      question.subject.toLowerCase().includes(lowercaseQuery) ||
      question.question.toLowerCase().includes(lowercaseQuery) ||
      question.author.toLowerCase().includes(lowercaseQuery)
  );
}

export function sortQuestions(
  questions: Question[],
  sortBy: "newest" | "oldest" | "popular" | "most-liked"
): Question[] {
  switch (sortBy) {
    case "newest":
      return [...questions].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    case "oldest":
      return [...questions].sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    case "popular":
      return [...questions].sort((a, b) => b.views - a.views);
    case "most-liked":
      return [...questions].sort((a, b) => b.likes - a.likes);
    default:
      return questions;
  }
}
