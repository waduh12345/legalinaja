"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, FileText } from "lucide-react"; // Impor ikon fallback
import Link from "next/link";
import Image from "next/image"; // Impor Next/Image

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string | number;
  views: string | number;
  publishedAt: string;
  image?: string; // Prop gambar sekarang akan digunakan
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link className="block" href={`/artikel/${article.slug}`}>
      {/* Warna border diubah menjadi abu-abu netral */}
      <Card className="border-gray-200 hover:shadow-md transition-all duration-200">
        <CardContent className="p-4">
          {/* Gambar landscape di paling atas */}
          <div className="relative w-full h-36 bg-blue-100 rounded-lg overflow-hidden mb-4">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
        )}
          </div>

          {/* Konten lainnya di bawah gambar */}
          <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="text-xs bg-blue-100 text-blue-700"
          >
            {article.category}
          </Badge>
          <span className="text-xs text-gray-500">
            {article.publishedAt}
          </span>
        </div>

        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{article.views}</span>
          </div>
        </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}