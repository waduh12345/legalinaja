"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TermsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TermsModal({ isOpen, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-blue-800">Syarat & Ketentuan</DialogTitle>
          <DialogDescription>
            Harap baca syarat dan ketentuan kami dengan seksama.
          </DialogDescription>
        </DialogHeader>
        
        {/* Konten Modal */}
        <div className="prose prose-sm max-h-[60vh] overflow-y-auto pr-4 text-gray-600">
          <p>
            Selamat datang di LegalAja. Dengan menggunakan layanan kami, Anda
            menyetujui syarat dan ketentuan berikut:
          </p>
          
          <h4 className="font-semibold text-gray-800 mt-4">1. Layanan Kami</h4>
          <p>
            LegalAja adalah platform teknologi yang menghubungkan pengguna dengan
            profesional hukum (Advokat, Notaris, dan Konsultan) yang terdaftar
            sebagai mitra. Kami tidak memberikan nasihat hukum secara langsung
            dan bukan merupakan kantor hukum.
          </p>
          
          <h4 className="font-semibold text-gray-800 mt-4">2. Hubungan Klien-Advokat</h4>
          <p>
            Penggunaan aplikasi ini tidak secara otomatis menciptakan hubungan
            klien-advokat antara Anda dan LegalAja. Hubungan tersebut hanya
            terbentuk antara Anda dan Mitra Profesional yang Anda pilih untuk
            berkonsultasi.
          </p>
          
          <h4 className="font-semibold text-gray-800 mt-4">3. Kerahasiaan Data</h4>
          <p>
            Kami menjaga kerahasiaan data pribadi Anda sesuai dengan Kebijakan
            Privasi kami. Komunikasi antara Anda dan Mitra Profesional melalui
            platform kami dilindungi oleh kewajiban kerahasiaan profesional.
          </p>
          
          <h4 className="font-semibold text-gray-800 mt-4">4. Biaya dan Pembayaran</h4>
          <p>
            Anda setuju untuk membayar semua biaya yang terkait dengan layanan
            yang Anda gunakan sesuai dengan tarif yang tertera di aplikasi.
            Semua pembayaran bersifat final dan tidak dapat dikembalikan.
          </p>
          
          <h4 className="font-semibold text-gray-800 mt-4">5. Penafian (Disclaimer)</h4>
          <p>
            Semua informasi dan template dokumen yang disediakan di platform
            ini bersifat umum dan tidak boleh dianggap sebagai nasihat hukum
            pengganti konsultasi dengan profesional.
          </p>
          
          <p className="mt-4">
            Dengan mencentang kotak "Saya setuju", Anda mengonfirmasi bahwa Anda
            telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan
            ini.
          </p>
        </div>

        <DialogFooter className="mt-4">
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => onOpenChange(false)}
          >
            Saya Mengerti
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}