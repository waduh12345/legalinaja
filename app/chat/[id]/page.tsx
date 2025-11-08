// "use client";

// import { useState, useEffect, useRef, useMemo } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   ArrowLeft,
//   User,
//   Paperclip,
//   Send,
//   Loader2,
//   FileText,
//   Video,
//   Image as ImageIcon,
//   Check,
//   CheckCheck,
// } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"; // Asumsi Anda punya Popover
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Asumsi Anda punya Avatar
// import { cn } from "@/lib/utils";

// // --- Firebase (Wajib untuk Real-time) ---
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInAnonymously,
//   signInWithCustomToken,
// } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   collection,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
//   query,
//   orderBy,
//   Timestamp, // Impor Timestamp
// } from "firebase/firestore";

// // --- Dummy Data & Tipe ---
// // (Store ini untuk mengambil info header, bukan untuk chat)
// const dummyLawyerDataStore = [
//   {
//     id: "C-123-456",
//     lawyerName: "Dr. Budi Santoso, S.H., M.H.",
//     lawyerAvatar: "/logo-legal-app.webp",
//     specialty: "Hukum Keluarga",
//   },
//   {
//     id: "C-789-012",
//     lawyerName: "Siti Aminah, S.H.",
//     lawyerAvatar: "/logo-legal-app.webp",
//     specialty: "Hukum Bisnis",
//   },
//   {
//     id: "C-345-678",
//     lawyerName: "Rizky Pratama, S.H.",
//     lawyerAvatar: "/logo-legal-app.webp",
//     specialty: "Hukum Properti",
//   },
// ];

// type LawyerInfo = {
//   id: string;
//   lawyerName: string;
//   lawyerAvatar: string;
//   specialty: string;
// };

// type Message = {
//   id: string;
//   text: string;
//   type: "text" | "image" | "document" | "video";
//   contentUrl?: string; // URL untuk gambar, dokumen, video
//   senderId: string;
//   timestamp: Timestamp | null;
//   isUser: boolean; // Ditentukan di client-side
// };

// // --- Konfigurasi Firebase ---
// // (Variabel global ini harus tersedia)
// const appId =
//   typeof window !== "undefined" && (window as any).__app_id !== undefined
//     ? (window as any).__app_id
//     : "default-app-id";
// const firebaseConfig =
//   typeof window !== "undefined" && (window as any).firebaseConfig !== undefined
//     ? (window as any).firebaseConfig
//     : {};

// const firebaseConfigJson = JSON.stringify(firebaseConfig);
// const initialAuthToken =
//   typeof window !== "undefined" && (window as any).__initial_auth_token !== undefined
//     ? (window as any).__initial_auth_token
//     : undefined;

// // Inisialisasi Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export default function ChatPage() {
//   const router = useRouter();
//   const params = useParams();
//   const chatId = params.id as string;

//   const [lawyerInfo, setLawyerInfo] = useState<LawyerInfo | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [userId, setUserId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSending, setIsSending] = useState(false);
//   const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
//   const chatEndRef = useRef<null | HTMLDivElement>(null);

//   // 1. Autentikasi Firebase
//   useEffect(() => {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserId(user.uid);
//       } else if (initialAuthToken) {
//         try {
//           const userCredential = await signInWithCustomToken(
//             auth,
//             initialAuthToken
//           );
//           setUserId(userCredential.user.uid);
//         } catch (error) {
//           console.error("Error signing in with custom token:", error);
//           const userCredential = await signInAnonymously(auth);
//           setUserId(userCredential.user.uid);
//         }
//       } else {
//         const userCredential = await signInAnonymously(auth);
//         setUserId(userCredential.user.uid);
//       }
//     });
//   }, []);

//   // 2. Ambil Info Lawyer & Langganan Chat Real-time
//   useEffect(() => {
//     if (!userId || !chatId) return;

//     // Ambil info lawyer (dari dummy store)
//     const info = dummyLawyerDataStore.find((l) => l.id === chatId);
//     if (info) {
//       setLawyerInfo(info);
//     } else {
//       // Jika tidak ada di store, buat data dummy
//       setLawyerInfo({
//         id: chatId,
//         lawyerName: "Mitra Hukum",
//         lawyerAvatar: "/logo-legal-app.webp",
//         specialty: "Kasus Anda",
//       });
//     }

//     // Path ke koleksi pesan
//     const messagesColRef = collection(
//       db,
//       "artifacts",
//       appId,
//       "public",
//       "data",
//       "chats",
//       chatId,
//       "messages"
//     );

//     const q = query(messagesColRef, orderBy("timestamp", "asc"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedMessages = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           text: data.text,
//           type: data.type,
//           contentUrl: data.contentUrl,
//           senderId: data.senderId,
//           timestamp: data.timestamp as Timestamp,
//           isUser: data.senderId === userId,
//         };
//       });
//       setMessages(fetchedMessages);
//       setIsLoading(false);
//     });

//     return () => unsubscribe(); // Berhenti mendengarkan saat komponen unmount
//   }, [userId, chatId]);

//   // 3. Auto-scroll ke pesan terbaru
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // 4. Handle Kirim Pesan
//   const handleSend = async (
//     type: "text" | "image" | "document" | "video",
//     url?: string
//   ) => {
//     if (!userId || !chatId || (type === "text" && !newMessage.trim())) return;

//     setIsSending(true);
//     setIsAttachmentOpen(false); // Tutup popover

//     const messagesColRef = collection(
//       db,
//       "artifacts",
//       appId,
//       "public",
//       "data",
//       "chats",
//       chatId,
//       "messages"
//     );

//     let messageData = {
//       senderId: userId,
//       timestamp: serverTimestamp(),
//       type: type,
//       text: "",
//       contentUrl: "",
//     };

//     if (type === "text") {
//       messageData.text = newMessage;
//     } else if (type === "image") {
//       messageData.text = "Mengirim gambar...";
//       messageData.contentUrl =
//         url || "https://placehold.co/400x300/EBF4FF/1D4ED8?text=Image.jpg"; // URL dummy
//     } else if (type === "document") {
//       messageData.text = "Kontrak.pdf";
//       messageData.contentUrl = url || "#";
//     } else if (type === "video") {
//       messageData.text = "Mengirim video...";
//       messageData.contentUrl =
//         url ||
//         "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // URL dummy
//     }

//     try {
//       await addDoc(messagesColRef, messageData);
//       setNewMessage(""); // Kosongkan input
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   if (isLoading && !lawyerInfo) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
//         <p className="ml-2">Memuat percakapan...</p>
//       </div>
//     );
//   }

//   return (
//     // Layout Full-Screen
//     <div className="min-h-screen h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 flex flex-col">
//       {/* Header Chat (Sticky) */}
//       <header className="sticky top-0 z-30">
//         <div className="max-w-md mx-auto">
//           <div className="relative bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm px-4 py-3">
//             <div className="flex items-center justify-between gap-3">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="-ml-2"
//                 onClick={() => router.back()} // Kembali ke /kasus-saya
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </Button>

//               {/* Info Lawyer */}
//               <div className="flex items-center gap-3 flex-1 min-w-0">
//                 <Avatar className="w-10 h-10 border-2 border-blue-100">
//                   <AvatarImage
//                     src={lawyerInfo?.lawyerAvatar}
//                     alt={lawyerInfo?.lawyerName}
//                   />
//                   <AvatarFallback className="bg-blue-100 text-blue-700">
//                     {lawyerInfo?.lawyerName[0].toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-sm font-bold text-gray-900 truncate">
//                     {lawyerInfo?.lawyerName}
//                   </h1>
//                   <p className="text-xs text-green-600 font-medium">Online</p>
//                 </div>
//               </div>

//               {/* Tombol Opsi (jika perlu) */}
//               <div className="w-10 h-10">
//                 {/* <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Area Pesan (Scrolling) */}
//       <main className="flex-1 overflow-y-auto p-4 space-y-4 max-w-md w-full mx-auto">
//         {messages.map((msg) => (
//           <ChatBubble key={msg.id} message={msg} />
//         ))}
//         {/* Ref untuk auto-scroll */}
//         <div ref={chatEndRef} />
//       </main>

//       {/* Input Area (Sticky) */}
//       <footer className="sticky bottom-0 z-10 mt-auto bg-white border-t border-gray-200/50 shadow-sm">
//         <div className="max-w-md mx-auto p-3 flex items-center gap-2">
//           {/* Tombol Attachment (Popover) */}
//           <Popover open={isAttachmentOpen} onOpenChange={setIsAttachmentOpen}>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="w-10 h-10 rounded-full text-blue-600 hover:bg-blue-100 hover:text-blue-700"
//               >
//                 <Paperclip className="w-5 h-5" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-48 bg-white mb-2 p-2">
//               <div className="space-y-1">
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start"
//                   onClick={() => handleSend("image")}
//                 >
//                   <ImageIcon className="w-4 h-4 mr-2" /> Gambar
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start"
//                   onClick={() => handleSend("document")}
//                 >
//                   <FileText className="w-4 h-4 mr-2" /> Dokumen
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start"
//                   onClick={() => handleSend("video")}
//                 >
//                   <Video className="w-4 h-4 mr-2" /> Video
//                 </Button>
//               </div>
//             </PopoverContent>
//           </Popover>

//           {/* Input Teks */}
//           <Input
//             type="text"
//             placeholder="Ketik pesan..."
//             className="flex-1 h-11 rounded-full bg-gray-100 border-gray-300 focus:bg-white focus:border-blue-500"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={(e) => {
//               if (e.key === "Enter" && !isSending) {
//                 handleSend("text");
//               }
//             }}
//           />

//           {/* Tombol Kirim */}
//           <Button
//             size="icon"
//             className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700"
//             onClick={() => handleSend("text")}
//             disabled={isSending || !newMessage.trim()}
//           >
//             {isSending ? (
//               <Loader2 className="w-5 h-5 animate-spin" />
//             ) : (
//               <Send className="w-5 h-5" />
//             )}
//           </Button>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // --- Komponen Chat Bubble ---
// function ChatBubble({ message }: { message: Message }) {
//   // Format waktu
//   const formatTime = (timestamp: Timestamp | null) => {
//     if (!timestamp) return "";
//     return timestamp
//       .toDate()
//       .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
//   };

//   const renderContent = () => {
//     switch (message.type) {
//       case "image":
//         return (
//           <Image
//             src={message.contentUrl || ""}
//             alt="Lampiran Gambar"
//             width={300}
//             height={200}
//             className="rounded-lg object-cover"
//           />
//         );
//       case "document":
//         return (
//           <a
//             href={message.contentUrl || "#"}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={cn(
//               "flex items-center gap-2 p-3 rounded-lg",
//               message.isUser
//                 ? "bg-blue-700 hover:bg-blue-800"
//                 : "bg-gray-100 hover:bg-gray-200"
//             )}
//           >
//             <FileText className="w-6 h-6 flex-shrink-0" />
//             <span className="truncate font-medium">{message.text}</span>
//           </a>
//         );
//       case "video":
//         return (
//           <video
//             controls
//             src={message.contentUrl || ""}
//             className="rounded-lg w-full max-w-[300px]"
//           />
//         );
//       case "text":
//       default:
//         return <p className="whitespace-pre-wrap">{message.text}</p>;
//     }
//   };

//   return (
//     <div
//       className={cn(
//         "flex",
//         message.isUser ? "justify-end" : "justify-start"
//       )}
//     >
//       <div
//         className={cn(
//           "relative max-w-xs md:max-w-md rounded-xl px-4 py-2",
//           message.isUser
//             ? "bg-blue-600 text-white rounded-br-none"
//             : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
//         )}
//       >
//         {/* Render konten berdasarkan tipe */}
//         {renderContent()}

//         {/* Timestamp & Status */}
//         <div
//           className={cn(
//             "flex justify-end items-center gap-1 mt-1",
//             message.isUser ? "text-blue-100" : "text-gray-400"
//           )}
//         >
//           <span className="text-xs">
//             {formatTime(message.timestamp)}
//           </span>
//           {/* Status (Hanya untuk user) */}
//           {message.isUser && (
//             <CheckCheck className="w-4 h-4 text-blue-100" /> // Ganti dengan Check jika belum dibaca
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  User,
  ArrowLeft,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NotificationButton from "../../components/NotificationButton";

// --- Dummy Data untuk Riwayat Chat ---
type ChatHistory = {
  id: string; // Ini akan menjadi ID untuk dynamic route chat/[id]
  lawyerName: string;
  lawyerAvatar: string;
  specialty: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
};

const chatData: ChatHistory[] = [
  {
    id: "C-123-456",
    lawyerName: "Dr. Budi Santoso, S.H., M.H.",
    lawyerAvatar: "/LegalApp-logo.png", // Ganti dengan path
    specialty: "Hukum Keluarga",
    lastMessage: "Baik, Pak. Mohon kirimkan draf kontraknya agar...",
    lastMessageTimestamp: "2025-11-09T10:45:00Z", // 10 menit lalu (simulasi)
    unreadCount: 2,
  },
  {
    id: "C-789-012",
    lawyerName: "Siti Aminah, S.H.",
    lawyerAvatar: "/LegalApp-logo.png", // Ganti dengan path
    specialty: "Hukum Bisnis",
    lastMessage: "Sudah saya terima. Terima kasih banyak, Bu.",
    lastMessageTimestamp: "2025-11-08T15:30:00Z", // Kemarin (simulasi)
    unreadCount: 0,
  },
  {
    id: "C-345-678",
    lawyerName: "Rizky Pratama, S.H.",
    lawyerAvatar: "/LegalApp-logo.png", // Ganti dengan path
    specialty: "Hukum Properti",
    lastMessage: "Sama-sama. Semoga lancar prosesnya ya.",
    lastMessageTimestamp: "2025-11-06T09:15:00Z", // 3 hari lalu
    unreadCount: 0,
  },
];
// --- Akhir Dummy Data ---

export default function KasusSayaPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Format tanggal (copy dari NotificationModal)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 1) return "Baru saja";
    if (diffMinutes < 60) return `${diffMinutes} mnt`;
    if (diffHours < 24) return `${diffHours} jam`;
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // --- Logika Filter ---
  const filteredChats = useMemo(() => {
    return chatData.filter(
      (chat) =>
        chat.lawyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    // Tema disesuaikan: bg-gradient-to-br from-blue-50 to-indigo-50
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      {/* Header - Konsisten */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-2"
                  onClick={() => router.back()} // Tombol kembali
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-lg font-bold text-blue-700">Kasus Saya</h1>
              </div>
              <div className="flex items-center gap-2">
                <NotificationButton />
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari percakapan..."
            className="pl-10 h-11 text-base border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* --- Daftar Percakapan --- */}
        <div className="space-y-3">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <Link
                href={`/chat/${chat.id}`} // Sesuai permintaan
                key={chat.id}
                className="block w-full"
              >
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-150 gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Image
                      src={chat.lawyerAvatar}
                      alt={chat.lawyerName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/48x48/EBF4FF/1D4ED8?text=${chat.lawyerName
                          .charAt(0)
                          .toUpperCase()}`;
                      }}
                    />
                  </div>

                  {/* Info Chat */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-gray-900 truncate">
                        {chat.lawyerName}
                      </h4>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {formatDate(chat.lastMessageTimestamp)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <p className="text-sm text-gray-500 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <Badge className="w-5 h-5 p-0 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs flex-shrink-0 ml-2">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Indikator */}
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </Link>
            ))
          ) : (
            // --- Empty State ---
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  {searchTerm
                    ? "Percakapan tidak ditemukan"
                    : "Belum Ada Kasus Aktif"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {searchTerm
                    ? "Coba gunakan kata kunci lain."
                    : "Konsultasi yang sudah dimulai akan muncul di sini."}
                </p>
                {!searchTerm && (
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/konsultasi">Mulai Konsultasi Baru</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}