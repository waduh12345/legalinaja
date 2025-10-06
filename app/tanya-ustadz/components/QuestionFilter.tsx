"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  X,
  Clock,
  TrendingUp,
  Heart,
  Calendar,
} from "lucide-react";
import { questionCategories } from "../data/questions";

export type SortOption = "newest" | "oldest" | "popular" | "most-liked";

interface QuestionFilterProps {
  searchQuery: string;
  selectedCategory: string;
  sortBy: SortOption;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
}

export default function QuestionFilter({
  searchQuery,
  selectedCategory,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClearFilters,
}: QuestionFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: "newest", label: "Terbaru", icon: Clock },
    { value: "oldest", label: "Terlama", icon: Calendar },
    { value: "popular", label: "Populer", icon: TrendingUp },
    { value: "most-liked", label: "Paling Disukai", icon: Heart },
  ] as const;

  const hasActiveFilters =
    searchQuery || selectedCategory || sortBy !== "newest";

  return (
    <Card className="border-awqaf-border-light">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-awqaf-foreground-secondary w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari pertanyaan, subjek, atau penulis..."
              className="pl-10 font-comfortaa"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="font-comfortaa"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {hasActiveFilters && (
                <Badge className="ml-2 bg-awqaf-primary text-white text-xs">
                  {
                    [
                      searchQuery,
                      selectedCategory,
                      sortBy !== "newest" ? sortBy : "",
                    ].filter(Boolean).length
                  }
                </Badge>
              )}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-awqaf-foreground-secondary hover:text-awqaf-primary font-comfortaa"
              >
                <X className="w-4 h-4 mr-1" />
                Hapus Filter
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t border-awqaf-border-light">
              {/* Category Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-card-foreground font-comfortaa">
                  Kategori
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onCategoryChange("")}
                    className={`px-3 py-1 rounded-full text-xs font-comfortaa transition-colors ${
                      selectedCategory === ""
                        ? "bg-awqaf-primary text-white"
                        : "bg-awqaf-border-light text-awqaf-foreground-secondary hover:bg-awqaf-primary/10"
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {questionCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => onCategoryChange(category.id)}
                      className={`px-3 py-1 rounded-full text-xs font-comfortaa transition-colors ${
                        selectedCategory === category.id
                          ? "bg-awqaf-primary text-white"
                          : "bg-awqaf-border-light text-awqaf-foreground-secondary hover:bg-awqaf-primary/10"
                      }`}
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-card-foreground font-comfortaa">
                  Urutkan Berdasarkan
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => onSortChange(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-left font-comfortaa ${
                          sortBy === option.value
                            ? "border-awqaf-primary bg-awqaf-primary/10"
                            : "border-awqaf-border-light hover:border-awqaf-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-awqaf-border-light">
              {searchQuery && (
                <Badge className="bg-awqaf-primary/10 text-awqaf-primary border-awqaf-primary/20">
                  Pencarian: &quot;{searchQuery}&quot;
                </Badge>
              )}
              {selectedCategory && (
                <Badge className="bg-awqaf-primary/10 text-awqaf-primary border-awqaf-primary/20">
                  {
                    questionCategories.find(
                      (cat) => cat.id === selectedCategory
                    )?.icon
                  }{" "}
                  {
                    questionCategories.find(
                      (cat) => cat.id === selectedCategory
                    )?.name
                  }
                </Badge>
              )}
              {sortBy !== "newest" && (
                <Badge className="bg-awqaf-primary/10 text-awqaf-primary border-awqaf-primary/20">
                  {sortOptions.find((opt) => opt.value === sortBy)?.label}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
