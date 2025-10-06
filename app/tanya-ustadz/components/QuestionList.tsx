"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Heart,
  MessageCircle,
  User,
  Calendar,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Question, questionCategories } from "../data/questions";
import { useState } from "react";

interface QuestionListProps {
  questions: Question[];
  onQuestionClick?: (question: Question) => void;
}

export default function QuestionList({
  questions,
  onQuestionClick,
}: QuestionListProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set()
  );

  const toggleExpanded = (questionId: string) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getCategoryInfo = (categoryId: string) => {
    return questionCategories.find((cat) => cat.id === categoryId);
  };

  if (questions.length === 0) {
    return (
      <Card className="border-awqaf-border-light">
        <CardContent className="p-8 text-center">
          <MessageCircle className="w-12 h-12 text-awqaf-foreground-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground font-comfortaa mb-2">
            Tidak Ada Pertanyaan
          </h3>
          <p className="text-awqaf-foreground-secondary font-comfortaa">
            Belum ada pertanyaan yang sesuai dengan filter Anda.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => {
        const categoryInfo = getCategoryInfo(question.category);
        const isExpanded = expandedQuestions.has(question.id);
        const isLongQuestion = question.question.length > 200;

        return (
          <Card
            key={question.id}
            className="border-awqaf-border-light hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => onQuestionClick?.(question)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {categoryInfo && (
                        <Badge className="bg-awqaf-primary/10 text-awqaf-primary border-awqaf-primary/20 font-comfortaa">
                          {categoryInfo.icon} {categoryInfo.name}
                        </Badge>
                      )}
                      {question.isAnswered && (
                        <Badge className="bg-green-100 text-green-700 border-green-200 font-comfortaa">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Terjawab
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground font-comfortaa mb-2">
                      {question.subject}
                    </h3>
                  </div>
                </div>

                {/* Question Content */}
                <div className="space-y-3">
                  <p className="text-awqaf-foreground-secondary font-comfortaa leading-relaxed">
                    {isExpanded || !isLongQuestion
                      ? question.question
                      : `${question.question.substring(0, 200)}...`}
                  </p>

                  {isLongQuestion && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(question.id);
                      }}
                      className="text-awqaf-primary hover:text-awqaf-primary/80 font-comfortaa p-0 h-auto"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Tampilkan Lebih Sedikit
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          Tampilkan Lebih Banyak
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Answer Preview */}
                {question.isAnswered && question.answer && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800 font-comfortaa">
                        Jawaban dari {question.answer.answeredBy}
                      </span>
                    </div>
                    <p className="text-sm text-green-700 font-comfortaa leading-relaxed">
                      {question.answer.content.length > 150
                        ? `${question.answer.content.substring(0, 150)}...`
                        : question.answer.content}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-awqaf-border-light">
                  <div className="flex items-center gap-4 text-sm text-awqaf-foreground-secondary">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="font-comfortaa">{question.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-comfortaa">
                        {formatDate(question.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-awqaf-foreground-secondary">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span className="font-comfortaa">{question.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="font-comfortaa">{question.likes}</span>
                    </div>
                    {!question.isAnswered && (
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-comfortaa">Menunggu Jawaban</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
