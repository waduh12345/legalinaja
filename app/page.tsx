import {
  Clock,
  Compass,
  BookOpen,
  Heart,
  Calendar,
  Sun,
  Moon,
  Sunrise,
  Sunset,
} from "lucide-react";

export default function Home() {
  const currentTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Pagi" : currentHour < 18 ? "Siang" : "Malam";

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm border-b border-awqaf-border-light sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa">
                IbadahApp
              </h1>
              <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                Aplikasi Ibadah Muslim
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-awqaf-foreground font-comfortaa">
                {currentTime}
              </div>
              <div className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                {currentDate}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Welcome Card */}
        <div className="bg-card rounded-2xl shadow-sm p-6 mb-6 border border-awqaf-border-light">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-200 to-accent-300 rounded-full flex items-center justify-center">
              <Sun className="w-6 h-6 text-awqaf-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground font-comfortaa">
                Selamat {greeting}
              </h2>
              <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                <span className="font-tajawal text-awqaf-primary">
                  السلام عليكم
                </span>
                <br />
                Assalamu'alaikum
              </p>
            </div>
          </div>
          <p className="text-awqaf-foreground-secondary text-sm font-comfortaa">
            Mari kita tingkatkan ibadah kita hari ini dengan penuh keikhlasan
            dan ketakwaan.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-awqaf-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Jadwal Sholat
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Waktu sholat hari ini
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Compass className="w-6 h-6 text-info" />
            </div>
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Arah Qibla
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Menuju Ka'bah
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <div className="w-12 h-12 bg-accent-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-accent-800" />
            </div>
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Al-Quran
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Baca Al-Quran
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Dzikir
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Dzikir & Doa
            </p>
          </div>
        </div>

        {/* Prayer Times Card */}
        <div className="bg-card rounded-2xl shadow-sm p-6 border border-awqaf-border-light mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-awqaf-primary" />
            <h3 className="font-semibold text-card-foreground font-comfortaa">
              <span className="font-tajawal text-awqaf-primary">
                أوقات الصلاة
              </span>
              <br />
              Jadwal Sholat Hari Ini
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "Subuh",
                arabic: "الفجر",
                time: "04:45",
                icon: Sunrise,
                isActive: false,
              },
              {
                name: "Dzuhur",
                arabic: "الظهر",
                time: "12:15",
                icon: Sun,
                isActive: true,
              },
              {
                name: "Ashar",
                arabic: "العصر",
                time: "15:30",
                icon: Sun,
                isActive: false,
              },
              {
                name: "Maghrib",
                arabic: "المغرب",
                time: "18:20",
                icon: Sunset,
                isActive: false,
              },
              {
                name: "Isya",
                arabic: "العشاء",
                time: "19:35",
                icon: Moon,
                isActive: false,
              },
            ].map((prayer) => {
              const Icon = prayer.icon;
              return (
                <div
                  key={prayer.name}
                  className={`
                  flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200
                  ${
                    prayer.isActive
                      ? "bg-accent-100 border border-accent-200"
                      : "hover:bg-accent-50"
                  }
                `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${
                        prayer.isActive
                          ? "bg-awqaf-primary text-white"
                          : "bg-accent-100 text-awqaf-primary"
                      }
                    `}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-card-foreground font-comfortaa font-medium">
                        {prayer.name}
                      </span>
                      <span className="text-xs text-awqaf-primary font-tajawal">
                        {prayer.arabic}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`
                      font-comfortaa font-semibold
                      ${
                        prayer.isActive
                          ? "text-awqaf-primary"
                          : "text-awqaf-foreground-secondary"
                      }
                    `}
                    >
                      {prayer.time}
                    </span>
                    {prayer.isActive && (
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Quote */}
        <div className="bg-gradient-to-r from-accent-100 to-accent-200 rounded-2xl p-6 border border-accent-200">
          <div className="text-center">
            <h4 className="font-semibold text-awqaf-primary font-comfortaa mb-2">
              Quote Hari Ini
            </h4>
            <p className="text-awqaf-foreground-secondary text-sm font-comfortaa italic">
              "Dan barangsiapa yang bertakwa kepada Allah, niscaya Dia akan
              mengadakan baginya jalan keluar."
            </p>
            <p className="text-xs text-awqaf-primary font-tajawal mt-2">
              - QS. At-Talaq: 2
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
