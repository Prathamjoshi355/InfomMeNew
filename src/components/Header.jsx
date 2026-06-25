import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-5">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
           <img src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1782368527/image-removebg-preview_12_fsk0ma.png" alt="" className="h-12 w-12"/>

            <div>
              <h1 className="text-lg font-bold tracking-wide">
                InformxMe
              </h1>
              <p className="hidden sm:block text-sm text-slate-500">
                Roadside Assistance, Anytime
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
            <a href="#" className="hover:text-yellow-500 transition">
              Home
            </a>

            <a href="#services" className="hover:text-yellow-500 transition">
              Services
            </a>

            <a href="#how" className="hover:text-yellow-500 transition">
              How It Works
            </a>

            <a href="#about" className="hover:text-yellow-500 transition">
              About Us
            </a>

            <a
              href="#join"
              className="rounded-xl bg-yellow-400 px-5 py-2.5 font-semibold text-black hover:bg-yellow-500 transition"
            >
              Join Early Access
            </a>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-5">
            <nav className="flex flex-col gap-2 rounded-2xl bg-gray-50 p-4 shadow-lg">

              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 hover:bg-yellow-100"
              >
                Home
              </a>

              <a
                href="#services"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 hover:bg-yellow-100"
              >
                Services
              </a>

              <a
                href="#how"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 hover:bg-yellow-100"
              >
                How It Works
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 hover:bg-yellow-100"
              >
                About Us
              </a>

              <a
                href="#join"
                onClick={() => setMenuOpen(false)}
                className="mt-3 rounded-xl bg-yellow-400 py-3 text-center font-semibold text-black hover:bg-yellow-500 transition"
              >
                Join Early Access
              </a>

            </nav>
          </div>
        )}
      </div>
    </header>
  );
}