"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import QuestionFilter, { SortOption } from "./components/QuestionFilter";
import QuestionList from "./components/QuestionList";
import PopularQuestions from "./components/PopularQuestions";
import {
  mockQuestions,
  getPopularQuestions,
  searchQuestions,
  sortQuestions,
  questionCategories,
  Question,
} from "./data/questions";

export default function TanyaUstadzPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Get popular questions
  const popularQuestions = getPopularQuestions(5);

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    let questions = mockQuestions;

    // Apply search filter
    if (searchQuery) {
      questions = searchQuestions(searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      questions = questions.filter((q) => q.category === selectedCategory);
    }

    // Apply sorting
    questions = sortQuestions(questions, sortBy);

    return questions;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleQuestionClick = (question: Question) => {
    console.log("Question clicked:", question);
    // TODO: Navigate to question detail page
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("newest");
  };

  const handleViewAllQuestions = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("newest");
    // Scroll to questions list
    document
      .getElementById("questions-list")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-awqaf-primary to-awqaf-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-comfortaa mb-4">
              Tanya Ustadz
            </h1>
            <p className="text-lg text-white/90 font-comfortaa mb-6 max-w-2xl mx-auto">
              Ajukan pertanyaan tentang Islam kepada ustadz yang berkompeten.
              Dapatkan jawaban yang tepat dan terpercaya.
            </p>
            <Link href="/tanya-ustadz/form">
              <Button className="bg-white text-awqaf-primary hover:bg-white/90 font-comfortaa">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ajukan Pertanyaan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-awqaf-border-light">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="w-8 h-8 text-awqaf-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-card-foreground font-comfortaa">
                    {mockQuestions.length}
                  </p>
                  <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                    Total Pertanyaan
                  </p>
                </CardContent>
              </Card>

              <Card className="border-awqaf-border-light">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-card-foreground font-comfortaa">
                    {mockQuestions.filter((q) => q.isAnswered).length}
                  </p>
                  <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                    Terjawab
                  </p>
                </CardContent>
              </Card>

              <Card className="border-awqaf-border-light">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-card-foreground font-comfortaa">
                    {questionCategories.length}
                  </p>
                  <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                    Kategori
                  </p>
                </CardContent>
              </Card>

              <Card className="border-awqaf-border-light">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-card-foreground font-comfortaa">
                    {popularQuestions.length}
                  </p>
                  <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                    Populer
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filter */}
            <QuestionFilter
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />

            {/* Questions List */}
            <div id="questions-list">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-card-foreground font-comfortaa">
                  Daftar Pertanyaan
                </h2>
                <Badge className="bg-awqaf-primary/10 text-awqaf-primary border-awqaf-primary/20 font-comfortaa">
                  {filteredQuestions.length} pertanyaan
                </Badge>
              </div>
              <QuestionList
                questions={filteredQuestions}
                onQuestionClick={handleQuestionClick}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Questions */}
            <PopularQuestions
              questions={popularQuestions}
              onQuestionClick={handleQuestionClick}
              onViewAllClick={handleViewAllQuestions}
            />

            {/* Categories */}
            <Card className="border-awqaf-border-light">
              <CardHeader>
                <CardTitle className="text-awqaf-primary font-comfortaa">
                  Kategori Pertanyaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {questionCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left font-comfortaa ${
                        selectedCategory === category.id
                          ? "border-awqaf-primary bg-awqaf-primary/10"
                          : "border-awqaf-border-light hover:border-awqaf-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </div>
                        <Badge className="bg-awqaf-primary/10 text-awqaf-primary text-xs">
                          {category.questionCount}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Motivational Quote */}
            <Card className="border-awqaf-border-light bg-gradient-to-r from-accent-100 to-accent-200">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-awqaf-primary font-comfortaa mb-1">
                  &quot;Menuntut ilmu adalah kewajiban bagi setiap muslim&quot;
                </p>
                <p className="text-xs text-awqaf-foreground-secondary font-tajawal">
                  - HR. Ibnu Majah
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
