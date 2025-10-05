import { BookMarked, Download, Star, Clock } from "lucide-react";

export default function EBookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm border-b border-awqaf-border-light sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa">
            E-Book Islam
          </h1>
          <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
            Koleksi buku digital Islam
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <BookMarked className="w-8 h-8 text-awqaf-primary mx-auto mb-2" />
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Buku Fiqih
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Hukum-hukum Islam
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-200 border border-awqaf-border-light active:scale-95">
            <Star className="w-8 h-8 text-warning mx-auto mb-2" />
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Buku Akidah
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary mt-1 font-comfortaa">
              Keimanan dan tauhid
            </p>
          </div>
        </div>

        {/* Featured Books */}
        <div className="bg-card rounded-2xl shadow-sm p-6 border border-awqaf-border-light mb-6">
          <h3 className="font-semibold text-card-foreground mb-4 font-comfortaa">
            Buku Terpopuler
          </h3>
          
          <div className="space-y-4">
            {[
              { 
                title: "Riyadhus Shalihin", 
                author: "Imam Nawawi", 
                pages: 1200,
                rating: 4.9,
                downloads: "25.3K"
              },
              { 
                title: "Bulughul Maram", 
                author: "Ibnu Hajar Al-Asqalani", 
                pages: 800,
                rating: 4.8,
                downloads: "18.7K"
              },
              { 
                title: "Al-Adab Al-Mufrad", 
                author: "Imam Bukhari", 
                pages: 600,
                rating: 4.7,
                downloads: "15.2K"
              }
            ].map((book, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent-50 transition-all duration-200">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <BookMarked className="w-6 h-6 text-awqaf-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-card-foreground font-comfortaa text-sm">
                    {book.title}
                  </h4>
                  <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                    {book.author}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning fill-current" />
                      <span className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                        {book.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3 text-awqaf-foreground-secondary" />
                      <span className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                        {book.downloads}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-awqaf-foreground-secondary" />
                      <span className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                        {book.pages} hlm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Status */}
        <div className="bg-gradient-to-r from-accent-100 to-accent-200 rounded-2xl p-6 border border-accent-200">
          <div className="text-center">
            <h4 className="font-semibold text-awqaf-primary font-comfortaa mb-2">
              Download Gratis
            </h4>
            <p className="text-awqaf-foreground-secondary text-sm font-comfortaa">
              Semua e-book tersedia gratis untuk pembelajaran dan dakwah
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
