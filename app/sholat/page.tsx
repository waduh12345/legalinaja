import { Clock, MapPin, Calendar } from "lucide-react";

export default function SholatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm border-b border-awqaf-border-light sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa">
            Jadwal Sholat
          </h1>
          <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
            Waktu sholat berdasarkan lokasi Anda
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Location Card */}
        <div className="bg-card rounded-2xl shadow-sm p-6 mb-6 border border-awqaf-border-light">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-awqaf-primary" />
            <div>
              <h2 className="font-semibold text-card-foreground font-comfortaa">
                Lokasi Saat Ini
              </h2>
              <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                Jakarta, Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Prayer Times */}
        <div className="bg-card rounded-2xl shadow-sm p-6 border border-awqaf-border-light">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-awqaf-primary" />
            <h3 className="font-semibold text-card-foreground font-comfortaa">
              Jadwal Sholat Hari Ini
            </h3>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Subuh", arabic: "الفجر", time: "04:45", status: "completed" },
              { name: "Dzuhur", arabic: "الظهر", time: "12:15", status: "current" },
              { name: "Ashar", arabic: "العصر", time: "15:30", status: "upcoming" },
              { name: "Maghrib", arabic: "المغرب", time: "18:20", status: "upcoming" },
              { name: "Isya", arabic: "العشاء", time: "19:35", status: "upcoming" }
            ].map((prayer) => (
              <div key={prayer.name} className={`
                flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-200
                ${prayer.status === "current" ? "bg-accent-100 border border-accent-200" : "hover:bg-accent-50"}
              `}>
                <div className="flex items-center gap-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${prayer.status === "current" ? "bg-awqaf-primary text-white" : "bg-accent-100 text-awqaf-primary"}
                  `}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-card-foreground font-comfortaa font-semibold text-lg">
                      {prayer.name}
                    </span>
                    <p className="text-sm text-awqaf-primary font-tajawal">
                      {prayer.arabic}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`
                    font-comfortaa font-bold text-xl
                    ${prayer.status === "current" ? "text-awqaf-primary" : "text-awqaf-foreground-secondary"}
                  `}>
                    {prayer.time}
                  </span>
                  {prayer.status === "current" && (
                    <p className="text-xs text-success font-comfortaa mt-1">
                      Sedang berlangsung
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
