"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  User,
  Share2,
  Bookmark,
  Heart,
  BookOpen,
  Tag,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Impor useRouter
import { artikelData, type Artikel } from "../data-artikel"; // Impor dari file data baru
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Untuk notifikasi 'copied'

export default function ArtikelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [artikel, setArtikel] = useState<Artikel | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<Artikel[]>([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false); // State untuk alert

  useEffect(() => {
    // Find artikel by slug
    const foundArtikel = artikelData.find((a) => a.slug === params.slug);
    if (foundArtikel) {
      setArtikel(foundArtikel);

      // Find related articles (same category, excluding current article)
      const related = artikelData
        .filter(
          (a) =>
            a.category === foundArtikel.category && a.id !== foundArtikel.id
        )
        .slice(0, 3);
      setRelatedArticles(related);

      // Load bookmark and like status from localStorage (Namespaced)
      const bookmarks = JSON.parse(
        localStorage.getItem("legalaja-artikel-bookmarks") || "[]"
      );
      const likes = JSON.parse(
        localStorage.getItem("legalaja-artikel-likes") || "[]"
      );

      setIsBookmarked(bookmarks.includes(foundArtikel.id));
      setIsLiked(likes.includes(foundArtikel.id));
    }
  }, [params.slug]);

  const handleBookmark = () => {
    if (!artikel) return;

    const bookmarks = JSON.parse(
      localStorage.getItem("legalaja-artikel-bookmarks") || "[]"
    );
    const newBookmarks = isBookmarked
      ? bookmarks.filter((id: string) => id !== artikel.id)
      : [...bookmarks, artikel.id];

    localStorage.setItem(
      "legalaja-artikel-bookmarks",
      JSON.stringify(newBookmarks)
    );
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    if (!artikel) return;

    const likes = JSON.parse(
      localStorage.getItem("legalaja-artikel-likes") || "[]"
    );
    const newLikes = isLiked
      ? likes.filter((id: string) => id !== artikel.id)
      : [...likes, artikel.id];

    localStorage.setItem("legalaja-artikel-likes", JSON.stringify(newLikes));
    setIsLiked(!isLiked);
  };

  // --- Share Logic Diperbarui (sesuai instruksi) ---
  const handleShare = async () => {
    if (!artikel) return;

    const shareData = {
      title: artikel.title,
      text: artikel.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard (menggunakan execCommand)
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setShowCopyAlert(true); // Tampilkan modal/alert
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // --- Halaman Loading / Tidak Ditemukan (Styling LegalAja) ---
  if (!artikel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
        {/* Header */}
        <header className="sticky top-0 z-30">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg px-4 py-3">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-2"
                  onClick={() => router.push("/artikel")}
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </Button>
                <h1 className="text-lg font-bold text-blue-700">Info Hukum</h1>
                <div className="w-10 h-10"></div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 py-6">
          <Card className="border-gray-200">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Artikel tidak ditemukan
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Artikel yang Anda cari tidak ditemukan atau telah dihapus.
              </p>
              <Link href="/artikel">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-600"
                >
                  Kembali ke Info Hukum
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // --- Halaman Detail Artikel (Styling LegalAja) ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      {/* Header (Diubah) */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="-ml-2"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Button>
              <h1 className="text-lg font-bold text-blue-700 truncate px-2">
                Info Hukum
              </h1>
              {/* Tombol Share dipindah ke header */}
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 rounded-full bg-blue-100 hover:bg-blue-200"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 text-blue-700" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Article Header */}
        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-4">
            {/* Category and Featured Badge */}
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="text-xs bg-indigo-100 text-indigo-700"
              >
                {artikel.category}
              </Badge>
              {artikel.featured && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-yellow-100 text-yellow-700"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Artikel Pilihan
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              {artikel.title}
            </h1>

            {/* Excerpt */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {artikel.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {artikel.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(artikel.publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {artikel.readTime}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {artikel.views.toLocaleString()}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {artikel.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-gray-300 text-gray-600"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Actions (Tombol Share dihapus dari sini) */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                className="flex-1"
              >
                <Bookmark
                  className={`w-4 h-4 mr-2 ${
                    isBookmarked
                      ? "fill-blue-600 text-blue-600"
                      : "text-gray-500"
                  }`}
                />
                {isBookmarked ? "Tersimpan" : "Simpan"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className="flex-1"
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
                  }`}
                />
                {isLiked ? "Disukai" : "Suka"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div
              className="prose prose-sm max-w-none prose-blue text-gray-700"
              dangerouslySetInnerHTML={{ __html: artikel.content }}
            />
          </CardContent>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-800">
              Artikel Terkait
            </h2>

            <div className="space-y-3">
              {relatedArticles.map((relatedArtikel) => (
                <Link
                  key={relatedArtikel.id}
                  href={`/artikel/${relatedArtikel.slug}`}
                >
                  <Card className="border-gray-200 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-blue-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="secondary"
                              className="text-xs bg-indigo-100 text-indigo-700"
                            >
                              {relatedArtikel.category}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                            {relatedArtikel.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {relatedArtikel.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(relatedArtikel.publishedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {relatedArtikel.readTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {relatedArtikel.views.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Articles */}
        <div className="text-center">
          <Link href="/artikel">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-600 text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Lihat Semua Info Hukum
            </Button>
          </Link>
        </div>
      </main>

      {/* Modal Notifikasi "Copied" */}
      <Dialog open={showCopyAlert} onOpenChange={setShowCopyAlert}>
        <DialogContent className="sm:max-w-xs bg-white">
          <DialogHeader>
            <DialogTitle className="text-blue-800 text-center">
              Berhasil Disalin
            </DialogTitle>
            <DialogDescription className="text-center">
              Link artikel telah disalin ke clipboard Anda.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}