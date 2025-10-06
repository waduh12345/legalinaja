"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Eye,
  Heart,
  User,
  Calendar,
  CheckCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Question, questionCategories } from "../data/questions";

interface PopularQuestionsProps {
  questions: Question[];
  onQuestionClick?: (question: Question) => void;
  onViewAllClick?: () => void;
}

export default function PopularQuestions({
  questions,
  onQuestionClick,
  onViewAllClick,
}: PopularQuestionsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getCategoryInfo = (categoryId: string) => {
    return questionCategories.find((cat) => cat.id === categoryId);
  };

  if (questions.length === 0) {
    return (
      <Card className="border-awqaf-border-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-awqaf-primary font-comfortaa">
            <TrendingUp className="w-5 h-5" />
            Pertanyaan Populer
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <MessageCircle className="w-12 h-12 text-awqaf-foreground-secondary mx-auto mb-4" />
          <p className="text-awqaf-foreground-secondary font-comfortaa">
            Belum ada pertanyaan populer saat ini.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-awqaf-border-light">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-awqaf-primary font-comfortaa">
            <TrendingUp className="w-5 h-5" />
            Pertanyaan Populer
          </CardTitle>
          {onViewAllClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewAllClick}
              className="text-awqaf-primary hover:text-awqaf-primary/80 font-comfortaa"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
        <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
          Pertanyaan yang paling banyak dilihat dan disukai
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {questions.map((question, index) => {
            const categoryInfo = getCategoryInfo(question.category);

            return (
              <div
                key={question.id}
                className="p-4 rounded-lg border border-awqaf-border-light hover:bg-awqaf-primary/5 transition-colors duration-200 cursor-pointer"
                onClick={() => onQuestionClick?.(question)}
              >
                <div className="space-y-3">
                  {/* Rank and Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-awqaf-primary text-white text-xs font-bold flex items-center justify-center font-comfortaa">
                        {index + 1}
                      </div>
                      {categoryInfo && (
                        <Badge className="bg-awqaf-primary/10 text-awqaf-primary border-awqaf-primary/20 font-comfortaa text-xs">
                          {categoryInfo.icon} {categoryInfo.name}
                        </Badge>
                      )}
                      {question.isAnswered && (
                        <Badge className="bg-green-100 text-green-700 border-green-200 font-comfortaa text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Terjawab
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Question Title */}
                  <h4 className="font-semibold text-card-foreground font-comfortaa text-sm leading-tight">
                    {question.subject}
                  </h4>

                  {/* Question Preview */}
                  <p className="text-xs text-awqaf-foreground-secondary font-comfortaa leading-relaxed line-clamp-2">
                    {question.question}
                  </p>

                  {/* Answer Preview */}
                  {question.isAnswered && question.answer && (
                    <div className="bg-green-50 border border-green-200 rounded p-2">
                      <p className="text-xs text-green-700 font-comfortaa leading-relaxed line-clamp-2">
                        <span className="font-medium">Jawaban:</span>{" "}
                        {question.answer.content}
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-awqaf-foreground-secondary">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="font-comfortaa">
                          {question.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className="font-comfortaa">
                          {formatDate(question.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span className="font-comfortaa">{question.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span className="font-comfortaa">{question.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
