"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary"></div>

      {/* Nav */}
      <div className="backdrop-blur-md bg-white/80 border-b border-zinc-200">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="Castpotro Logo"
              width={100}
              height={40}
              className="rounded-md"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-700">
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#community" className="hover:text-primary">Community</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden text-foreground focus:outline-none"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="sm:hidden bg-white/90 backdrop-blur-md border-t border-zinc-200 px-6 py-4 text-zinc-700 text-sm">
            <a href="#about" className="block py-2 hover:text-primary">About</a>
            <a href="#features" className="block py-2 hover:text-primary">Features</a>
            <a href="#community" className="block py-2 hover:text-primary">Community</a>
          </div>
        )}
      </div>
    </header>
  );
}
