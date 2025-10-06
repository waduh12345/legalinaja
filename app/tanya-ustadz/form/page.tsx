"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, CheckCircle } from "lucide-react";
import QuestionForm from "../components/QuestionForm";
import Link from "next/link";

export default function QuestionFormPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuestionSubmit = (questionData: {
    author: string;
    subject: string;
    question: string;
    category: string;
  }) => {
    console.log("New question submitted:", questionData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-awqaf-primary to-awqaf-primary/80 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold font-comfortaa mb-4">
                Pertanyaan Terkirim
              </h1>
              <p className="text-lg text-white/90 font-comfortaa mb-6 max-w-2xl mx-auto">
                Terima kasih! Pertanyaan Anda telah berhasil dikirim dan akan
                segera dijawab oleh ustadz.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-800 font-comfortaa mb-4">
                  Pertanyaan Berhasil Dikirim!
                </h2>
                <p className="text-green-700 font-comfortaa mb-6 leading-relaxed">
                  Pertanyaan Anda telah diterima dan akan diproses oleh tim
                  ustadz. Anda akan mendapat notifikasi ketika pertanyaan sudah
                  dijawab.
                </p>
                <div className="space-y-4">
                  <Link href="/tanya-ustadz">
                    <Button className="w-full bg-awqaf-primary hover:bg-awqaf-primary/90 text-white font-comfortaa">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali ke Tanya Ustadz
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full font-comfortaa"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ajukan Pertanyaan Lain
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-awqaf-primary to-awqaf-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-comfortaa mb-4">
              Ajukan Pertanyaan
            </h1>
            <p className="text-lg text-white/90 font-comfortaa mb-6 max-w-2xl mx-auto">
              Sampaikan pertanyaan Anda tentang Islam kepada ustadz yang
              berkompeten. Dapatkan jawaban yang tepat dan terpercaya.
            </p>
            <Link href="/tanya-ustadz">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-comfortaa"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Tanya Ustadz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <QuestionForm onSubmit={handleQuestionSubmit} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Guidelines */}
              <Card className="border-awqaf-border-light">
                <CardHeader>
                  <CardTitle className="text-awqaf-primary font-comfortaa">
                    Panduan Bertanya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm font-comfortaa">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-awqaf-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <p className="text-awqaf-foreground-secondary">
                        Tuliskan pertanyaan dengan jelas dan spesifik
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-awqaf-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <p className="text-awqaf-foreground-secondary">
                        Pilih kategori yang sesuai dengan topik pertanyaan
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-awqaf-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <p className="text-awqaf-foreground-secondary">
                        Gunakan bahasa yang sopan dan santun
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-awqaf-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        4
                      </div>
                      <p className="text-awqaf-foreground-secondary">
                        Berikan konteks yang cukup untuk pertanyaan Anda
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="border-awqaf-border-light bg-gradient-to-r from-accent-100 to-accent-200">
                <CardHeader>
                  <CardTitle className="text-awqaf-primary font-comfortaa">
                    Tips Bertanya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm font-comfortaa">
                    <p className="text-awqaf-foreground-secondary">
                      • Hindari pertanyaan yang terlalu umum
                    </p>
                    <p className="text-awqaf-foreground-secondary">
                      • Sertakan situasi atau kondisi spesifik
                    </p>
                    <p className="text-awqaf-foreground-secondary">
                      • Jangan ragu untuk memberikan detail yang relevan
                    </p>
                    <p className="text-awqaf-foreground-secondary">
                      • Pastikan pertanyaan belum pernah ditanyakan sebelumnya
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Motivational Quote */}
              <Card className="border-awqaf-border-light bg-gradient-to-r from-awqaf-primary/5 to-awqaf-primary/10">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-awqaf-primary font-comfortaa mb-1">
                    &quot;Barangsiapa yang menempuh jalan untuk mencari ilmu,
                    maka Allah akan memudahkan baginya jalan menuju surga&quot;
                  </p>
                  <p className="text-xs text-awqaf-foreground-secondary font-tajawal">
                    - HR. Muslim
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
