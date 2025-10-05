import { BookOpen, Search, Bookmark, Settings } from "lucide-react";

export default function QuranPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm border-b border-awqaf-border-light sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa">
            Al-Qur'an
          </h1>
          <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
            Kitab suci umat Islam
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="bg-card rounded-2xl shadow-sm p-4 mb-6 border border-awqaf-border-light">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-awqaf-foreground-secondary" />
            <input
              type="text"
              placeholder="Cari surah atau ayat..."
              className="flex-1 bg-transparent text-awqaf-foreground placeholder-awqaf-foreground-secondary font-comfortaa outline-none"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <BookOpen className="w-8 h-8 text-awqaf-primary mx-auto mb-2" />
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Baca Al-Qur'an
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Mulai dari surah Al-Fatihah
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <Bookmark className="w-8 h-8 text-info mx-auto mb-2" />
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Bookmark
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Ayat yang disimpan
            </p>
          </div>
        </div>

        {/* Recent Surahs */}
        <div className="bg-card rounded-2xl shadow-sm p-6 border border-awqaf-border-light">
          <h3 className="font-semibold text-card-foreground mb-4 font-comfortaa">
            Surah Terbaru
          </h3>
          
          <div className="space-y-3">
            {[
              { name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, lastRead: "2 menit yang lalu" },
              { name: "Al-Baqarah", arabic: "البقرة", verses: 286, lastRead: "1 jam yang lalu" },
              { name: "Ali 'Imran", arabic: "آل عمران", verses: 200, lastRead: "Kemarin" }
            ].map((surah) => (
              <div key={surah.name} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent-50 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-awqaf-primary" />
                  </div>
                  <div>
                    <span className="text-card-foreground font-comfortaa font-semibold">
                      {surah.name}
                    </span>
                    <p className="text-sm text-awqaf-primary font-tajawal">
                      {surah.arabic}
                    </p>
                    <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                      {surah.verses} ayat
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                    {surah.lastRead}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
