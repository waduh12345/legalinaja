import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeatureNavigation from "@/app/components/FeatureNavigation";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm border-b border-awqaf-border-light sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5 text-awqaf-primary" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa">
                Semua Fitur
              </h1>
              <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                Kumpulan fitur lengkap IbadahApp
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <FeatureNavigation />
      </main>
    </div>
  );
}
