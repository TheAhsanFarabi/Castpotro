import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-10 mt-20 bg-gradient-to-r from-primary to-secondary">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <div className="flex justify-center gap-6 mb-4">

          <a href="https://instagram.com/castpotro" target="_blank" rel="noreferrer"
            className="text-white/80 hover:text-white transition">
            <Instagram size={22} />
          </a>

          <a href="https://linkedin.com/company/castpotro" target="_blank" rel="noreferrer"
            className="text-white/80 hover:text-white transition">
            <Linkedin size={22} />
          </a>

          <a href="https://twitter.com/castpotro" target="_blank" rel="noreferrer"
            className="text-white/80 hover:text-white transition">
            <Twitter size={22} />
          </a>
        </div>

        <div className="text-sm text-white/90">
          © {new Date().getFullYear()} Castpotro 2025 — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
