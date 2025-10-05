import { GraduationCap, Play, Clock, Users } from "lucide-react";

export default function KajianPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm border-b border-awqaf-border-light sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa">
            Kajian Islam
          </h1>
          <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
            Belajar dan memperdalam ilmu agama
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <GraduationCap className="w-8 h-8 text-awqaf-primary mx-auto mb-2" />
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Video Kajian
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Ceramah dan tausiyah
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <Users className="w-8 h-8 text-info mx-auto mb-2" />
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Live Streaming
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Kajian langsung
            </p>
          </div>
        </div>

        {/* Featured Kajian */}
        <div className="bg-card rounded-2xl shadow-sm p-6 border border-awqaf-border-light mb-6">
          <h3 className="font-semibold text-card-foreground mb-4 font-comfortaa">
            Kajian Terbaru
          </h3>
          
          <div className="space-y-4">
            {[
              { 
                title: "Keutamaan Sholat Berjamaah", 
                speaker: "Ust. Ahmad Hidayat", 
                duration: "45:30",
                views: "12.5K"
              },
              { 
                title: "Hikmah Puasa Sunnah", 
                speaker: "Ust. Muhammad Ali", 
                duration: "38:15",
                views: "8.2K"
              },
              { 
                title: "Menjaga Lisan dalam Islam", 
                speaker: "Ust. Abdullah Rahman", 
                duration: "52:10",
                views: "15.7K"
              }
            ].map((kajian, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent-50 transition-all duration-200">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-awqaf-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-card-foreground font-comfortaa text-sm">
                    {kajian.title}
                  </h4>
                  <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                    {kajian.speaker}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-awqaf-foreground-secondary" />
                      <span className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                        {kajian.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-awqaf-foreground-secondary" />
                      <span className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                        {kajian.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-gradient-to-r from-accent-100 to-accent-200 rounded-2xl p-6 border border-accent-200">
          <div className="text-center">
            <h4 className="font-semibold text-awqaf-primary font-comfortaa mb-2">
              Akses Cepat
            </h4>
            <p className="text-awqaf-foreground-secondary text-sm font-comfortaa">
              Dapatkan notifikasi kajian terbaru dan jadwal live streaming
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
