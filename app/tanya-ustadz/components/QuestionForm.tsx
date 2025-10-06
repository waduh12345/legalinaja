"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, User, BookOpen, MessageSquare } from "lucide-react";
import { questionCategories } from "../data/questions";

interface QuestionFormProps {
  onSubmit?: (questionData: {
    author: string;
    subject: string;
    question: string;
    category: string;
  }) => void;
}

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    author: "",
    subject: "",
    question: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.author ||
      !formData.subject ||
      !formData.question ||
      !formData.category
    ) {
      alert("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit?.(formData);

      // Reset form
      setFormData({
        author: "",
        subject: "",
        question: "",
        category: "",
      });

      alert("Pertanyaan berhasil dikirim! Ustadz akan menjawab segera.");
    } catch (error) {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = questionCategories.find(
    (cat) => cat.id === formData.category
  );

  return (
    <Card className="border-awqaf-border-light">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-awqaf-primary font-comfortaa">
          <MessageSquare className="w-5 h-5" />
          Ajukan Pertanyaan
        </CardTitle>
        <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
          Sampaikan pertanyaan Anda kepada ustadz yang berkompeten
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground font-comfortaa flex items-center gap-2">
              <User className="w-4 h-4" />
              Nama Lengkap
            </label>
            <Input
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap Anda"
              className="font-comfortaa"
              required
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground font-comfortaa flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Subjek Pertanyaan
            </label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Ringkasan singkat pertanyaan Anda"
              className="font-comfortaa"
              required
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-card-foreground font-comfortaa">
              Kategori Pertanyaan
            </label>
            <div className="grid grid-cols-2 gap-2">
              {questionCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategorySelect(category.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    formData.category === category.id
                      ? "border-awqaf-primary bg-awqaf-primary/10"
                      : "border-awqaf-border-light hover:border-awqaf-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-card-foreground font-comfortaa">
                        {category.name}
                      </p>
                      <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {selectedCategory && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                  Kategori terpilih:
                </span>
                <Badge className="bg-awqaf-primary text-white font-comfortaa">
                  {selectedCategory.icon} {selectedCategory.name}
                </Badge>
              </div>
            )}
          </div>

          {/* Question */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground font-comfortaa">
              Pertanyaan Detail
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="Tuliskan pertanyaan Anda secara detail dan jelas..."
              className="w-full min-h-[120px] px-3 py-2 border border-awqaf-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-awqaf-primary focus:border-transparent font-comfortaa resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-awqaf-primary hover:bg-awqaf-primary/90 text-white font-comfortaa"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Mengirim...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Kirim Pertanyaan
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
