/*
 * Header — Workshop Blueprint Design
 * "Before You Call" branding with safety orange accent
 * Persistent top navigation with category links + Wizard
 */
import { Link, useLocation } from "wouter";
import { categories } from "@/lib/knowledgeData";
import { Flame, Menu, X, Zap, Car, ChevronDown, TreePine, Bike, ClipboardList, BarChart3 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-navy sticky top-0 z-50 border-b-2 border-safety-orange">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-safety-orange flex items-center justify-center transition-transform group-hover:rotate-12">
            <Flame className="w-5 h-5 text-navy-dark" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-sans font-bold text-warm-white text-lg tracking-tight">
              Before You Call
            </span>
            <span className="font-mono text-[10px] text-safety-orange tracking-widest uppercase">
              If It's Smokin', It's Broken
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Wizard Dropdown */}
          <div className="relative group">
            <Link
              href="/wizards"
              className={`px-3 py-1.5 rounded font-sans text-sm font-bold transition-all flex items-center gap-1.5 ${
                location.startsWith("/wizard")
                  ? "bg-safety-orange text-navy-dark"
                  : "text-safety-orange hover:bg-safety-orange/15"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Wizards
              <ChevronDown className="w-3 h-3" />
            </Link>
            <div className="absolute top-full left-0 mt-1 w-56 bg-navy-dark border border-navy-light rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                href="/wizards"
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-sans font-semibold text-safety-orange hover:text-warm-white hover:bg-navy-light rounded-t-lg transition-colors border-b border-navy-light"
              >
                <BarChart3 className="w-4 h-4" />
                All Wizards
              </Link>
              <Link
                href="/wizard"
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-sans font-medium text-steel hover:text-warm-white hover:bg-navy-light transition-colors"
              >
                <Zap className="w-4 h-4 text-safety-orange" />
                Electrical Wizard
              </Link>
              <Link
                href="/wizard/automotive"
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-sans font-medium text-steel hover:text-warm-white hover:bg-navy-light transition-colors"
              >
                <Car className="w-4 h-4 text-safety-orange" />
                Car Won't Start
              </Link>
              <Link
                href="/wizard/lawn-garden"
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-sans font-medium text-steel hover:text-warm-white hover:bg-navy-light transition-colors"
              >
                <TreePine className="w-4 h-4 text-safety-orange" />
                Mower Won't Start
              </Link>
              <Link
                href="/wizard/motorcycle"
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-sans font-medium text-steel hover:text-warm-white hover:bg-navy-light rounded-b-lg transition-colors"
              >
                <Bike className="w-4 h-4 text-safety-orange" />
                Motorcycle Won't Start
              </Link>
            </div>
          </div>
          <Link
            href="/my-diagnoses"
            className={`px-3 py-1.5 rounded font-sans text-sm font-medium transition-all flex items-center gap-1.5 ${
              location === "/my-diagnoses"
                ? "bg-safety-orange text-navy-dark"
                : "text-steel hover:text-warm-white hover:bg-navy-light"
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            My Diagnoses
          </Link>
          <div className="w-px h-5 bg-navy-light mx-1" />
          {categories.map((cat) => {
            const isActive = location.startsWith(`/category/${cat.slug}`);
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded font-sans text-sm font-medium transition-all ${
                  isActive
                    ? "bg-safety-orange text-navy-dark"
                    : "text-steel hover:text-warm-white hover:bg-navy-light"
                }`}
              >
                {cat.title}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-steel hover:text-warm-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-navy-dark border-t border-navy-light overflow-hidden"
          >
            <div className="container py-3 flex flex-col gap-1">
              <Link
                href="/wizards"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded font-sans text-sm font-bold transition-all flex items-center gap-2 ${
                  location === "/wizards"
                    ? "bg-safety-orange text-navy-dark"
                    : "text-safety-orange hover:bg-safety-orange/15"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                All Wizards
              </Link>
              <Link
                href="/wizard"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded font-sans text-sm font-bold transition-all flex items-center gap-2 ml-2 ${
                  location === "/wizard"
                    ? "bg-safety-orange text-navy-dark"
                    : "text-safety-orange/70 hover:bg-safety-orange/15"
                }`}
              >
                <Zap className="w-4 h-4" />
                Electrical Wizard
              </Link>
              <Link
                href="/wizard/automotive"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded font-sans text-sm font-bold transition-all flex items-center gap-2 ${
                  location === "/wizard/automotive"
                    ? "bg-safety-orange text-navy-dark"
                    : "text-safety-orange hover:bg-safety-orange/15"
                }`}
              >
                <Car className="w-4 h-4" />
                Car Won't Start
              </Link>
              <Link
                href="/wizard/lawn-garden"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded font-sans text-sm font-bold transition-all flex items-center gap-2 ${
                  location === "/wizard/lawn-garden"
                    ? "bg-safety-orange text-navy-dark"
                    : "text-safety-orange hover:bg-safety-orange/15"
                }`}
              >
                <TreePine className="w-4 h-4" />
                Mower Won't Start
              </Link>
              <Link
                href="/wizard/motorcycle"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded font-sans text-sm font-bold transition-all flex items-center gap-2 ${
                  location === "/wizard/motorcycle"
                    ? "bg-safety-orange text-navy-dark"
                    : "text-safety-orange hover:bg-safety-orange/15"
                }`}
              >
                <Bike className="w-4 h-4" />
                Motorcycle Won't Start
              </Link>
              <div className="border-t border-navy-light my-1" />
              <Link
                href="/my-diagnoses"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded font-sans text-sm font-medium transition-all flex items-center gap-2 ${
                  location === "/my-diagnoses"
                    ? "bg-safety-orange text-navy-dark"
                    : "text-steel hover:text-warm-white hover:bg-navy-light"
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                My Diagnoses
              </Link>
              <div className="border-t border-navy-light my-1" />
              {categories.map((cat) => {
                const isActive = location.startsWith(`/category/${cat.slug}`);
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded font-sans text-sm font-medium transition-all ${
                      isActive
                        ? "bg-safety-orange text-navy-dark"
                        : "text-steel hover:text-warm-white hover:bg-navy-light"
                    }`}
                  >
                    {cat.title}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
